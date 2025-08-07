import React, { useState, useEffect, useRef } from "react";
import { AptosWalletAdapterProvider, useWallet } from "@aptos-labs/wallet-adapter-react";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { ArrowUp, Bot, User, Wallet } from "lucide-react";

const MODULE_ADDRESS = "0xbce003f32dde6d7da63e49d6bd5e1ad28fcda376a531859ff9f14f3e33a2f4b8";

const ChatApp = () => {
  const { connect, account, signAndSubmitTransaction, connected, wallet } = useWallet();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [onChainLoaded, setOnChainLoaded] = useState(false);
  const chatEndRef = useRef(null);

  // Scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  // Load on-chain messages when wallet connects
  useEffect(() => {
    if (connected && account?.address) {
      fetchOnChainMessages(account.address);
    } else {
      setChat([]);
      setOnChainLoaded(false);
    }
  }, [connected, account]);

  // Fetch on-chain messages for this account
  async function fetchOnChainMessages(address) {
    setIsLoading(true);
    try {
      const res = await fetch("https://fullnode.testnet.aptoslabs.com/v1/view", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          function: `${MODULE_ADDRESS}::chat_storage::get_messages`,
          type_arguments: [],
          arguments: [address],
        }),
      });
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0])) {
        // Messages are stored as a vector<string>
        setChat(
          data[0].map((msg, idx) => ({
            role: idx % 2 === 0 ? "user" : "ai",
            content: msg,
          }))
        );
      } else {
        setChat([]);
      }
      setOnChainLoaded(true);
    } catch (e) {
      // Probably account not initialized yet
      setChat([]);
      setOnChainLoaded(true);
    } finally {
      setIsLoading(false);
    }
  }

  // Initialize account if not exists
  async function ensureAccountInitialized() {
    try {
      await signAndSubmitTransaction({
        type: "entry_function_payload",
        function: `${MODULE_ADDRESS}::chat_storage::init_account`,
        arguments: [],
        type_arguments: [],
      });
    } catch (e) {
      // Ignore if already initialized
    }
  }

  // OpenAI API call
  const getBotReply = async (userMessage) => {
    setIsLoading(true);
    const apiKey = "process.env.OPENAI_API_KEY"; //  API key
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    const payload = {
      contents: [
        {
          role: "user",
          parts: [{ text: userMessage }],
        },
      ],
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        return `Error: ${errorBody.error.message}`;
      }

      const result = await response.json();
      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content &&
        result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0
      ) {
        return result.candidates[0].content.parts[0].text;
      } else {
        return "I'm sorry, I couldn't generate a response. Please try again.";
      }
    } catch (error) {
      return "Sorry, something went wrong while connecting to the AI.";
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;
    const userMsg = { role: "user", content: message };
    setChat((prev) => [...prev, userMsg]);
    setMessage("");

    let aiReply = await getBotReply(message);
    const aiMsg = { role: "ai", content: aiReply };
    setChat((prev) => [...prev, aiMsg]);

    // Save both messages to the chain (one at a time)
    if (connected && account?.address) {
      setIsLoading(true);
      try {
        if (!onChainLoaded) await ensureAccountInitialized();
        // Save user message
        await signAndSubmitTransaction({
          type: "entry_function_payload",
          function: `${MODULE_ADDRESS}::chat_storage::save_message`,
          arguments: [userMsg.content],
          type_arguments: [],
        });
        // Save AI message
        await signAndSubmitTransaction({
          type: "entry_function_payload",
          function: `${MODULE_ADDRESS}::chat_storage::save_message`,
          arguments: [aiMsg.content],
          type_arguments: [],
        });
        // Optionally, reload from chain to ensure sync (or just append in UI)
        await fetchOnChainMessages(account.address);
      } catch (error) {
        setChat((prev) => [
          ...prev,
          {
            role: "ai",
            content: "Failed to save chat on-chain. See console for details.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Single chat message component
  const ChatMessage = ({ role, content }) => {
    const isUser = role === "user";
    return (
      <div className={`flex items-start gap-3 my-4 ${isUser ? "justify-end" : ""}`}>
        {!isUser && (
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
            <Bot className="w-6 h-6 text-gray-300" />
          </div>
        )}
        <div
          className={`p-3 rounded-lg max-w-md md:max-w-lg lg:max-w-xl ${
            isUser
              ? "bg-blue-600 text-white rounded-br-none"
              : "bg-gray-700 text-gray-200 rounded-bl-none"
          }`}
        >
          <p className="text-sm whitespace-pre-wrap">{content}</p>
        </div>
        {isUser && (
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white font-sans">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800/50 backdrop-blur-sm">
        <h1 className="text-xl font-bold">Aptos AI Chat</h1>
        {connected && account ? (
          <div className="flex items-center gap-2 bg-green-500/20 text-green-300 px-3 py-1.5 rounded-lg text-sm">
            <Wallet className="w-4 h-4" />
            <span>{`${account.address.slice(0, 6)}...${account.address.slice(-4)}`}</span>
          </div>
        ) : (
          <button
            onClick={() => connect(PetraWallet.name)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            <Wallet className="w-5 h-5" />
            Connect Wallet
          </button>
        )}
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto">
          {chat.length === 0 && (
            <div className="text-center text-gray-400 mt-20">
              <Bot size={48} className="mx-auto mb-4" />
              <p className="text-lg">Welcome to Aptos AI Chat!</p>
              <p>Ask me anything. Connect your wallet to save conversations on-chain.</p>
            </div>
          )}
          {chat.map((msg, i) => (
            <ChatMessage key={i} role={msg.role} content={msg.content} />
          ))}
          {isLoading && (
            <div className="flex items-start gap-3 my-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                <Bot className="w-6 h-6 text-gray-300" />
              </div>
              <div className="p-3 rounded-lg bg-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="animate-pulse">...</span>
                  <span>Thinking</span>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="p-4 bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center bg-gray-700 rounded-lg p-2">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              rows="1"
              className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none resize-none px-2"
              style={{ maxHeight: "100px" }}
            />
            <button
              onClick={sendMessage}
              disabled={!message.trim() || isLoading}
              className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AptosWalletAdapterProvider plugins={[new PetraWallet()]}>
      <ChatApp />
    </AptosWalletAdapterProvider>
  );
}

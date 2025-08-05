import React, { useState } from "react";
import axios from "axios";
import { AptosWalletAdapterProvider, useWallet } from "@aptos-labs/wallet-adapter-react";
import { PetraWallet } from "petra-plugin-wallet-adapter";

function ChatApp() {
    const { connect, account, signAndSubmitTransaction } = useWallet();
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);

    const sendMessage = async () => {
        const res = await axios.post("http://localhost:5000/chat", { message });
        const reply = res.data.reply;

        setChat([...chat, { role: "user", content: message }, { role: "ai", content: reply }]);

        if (account?.address) {
            const txn = {
                type: "entry_function_payload",
                function: `${account.address}::chat_storage::save_message`,
                arguments: [message],
                type_arguments: [],
            };
            await signAndSubmitTransaction(txn);
        }

        setMessage("");
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Aptos AI Chat</h1>
            {account?.address ? (
                <p>Connected: {account.address}</p>
            ) : (
                <button onClick={() => connect(PetraWallet.name)}>Connect Wallet</button>
            )}

            <div style={{ margin: "20px 0" }}>
                {chat.map((msg, i) => (
                    <p key={i}><b>{msg.role}:</b> {msg.content}</p>
                ))}
            </div>

            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default function App() {
    return (
        <AptosWalletAdapterProvider plugins={[new PetraWallet()]}>
            <ChatApp />
        </AptosWalletAdapterProvider>
    );
}

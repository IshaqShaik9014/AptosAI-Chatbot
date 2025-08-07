<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aptos AI Chat DApp - README</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'; line-height: 1.6; color: #24292e; background-color: #f6f8fa; margin: 0; padding: 20px;">

    <div style="max-width: 800px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e1e4e8; border-radius: 6px; padding: 25px 40px;">

        <h1 style="font-size: 2em; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; margin-top: 24px; margin-bottom: 16px; font-weight: 600;">Aptos AI Chat DApp 🤖</h1>
        <p style="margin-top: 0; margin-bottom: 16px;">A revolutionary decentralized AI chat application that combines the power of artificial intelligence with the security and transparency of the Aptos blockchain.</p>
        <div>
            <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer" style="color: #0366d6; text-decoration: none;"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT" style="margin-right: 5px;"></a>
            <a href="#" target="_blank" rel="noopener noreferrer" style="color: #0366d6; text-decoration: none;"><img src="https://img.shields.io/badge/Build-Passing-brightgreen.svg" alt="Build Status" style="margin-right: 5px;"></a>
            <a href="#" target="_blank" rel="noopener noreferrer" style="color: #0366d6; text-decoration: none;"><img src="https://img.shields.io/badge/Platform-Aptos-black.svg" alt="Platform: Aptos" style="margin-right: 5px;"></a>
        </div>
        <hr style="height: 0.25em; padding: 0; margin: 24px 0; background-color: #e1e4e8; border: 0;">

        <h2 style="font-size: 1.5em; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; margin-top: 24px; margin-bottom: 16px; font-weight: 600;">🎯 Project Vision</h2>
        <blockquote style="margin: 0 0 16px 0; padding: 0 1em; color: #6a737d; border-left: 0.25em solid #dfe2e5;">
            <p style="margin-top: 0; margin-bottom: 0;">Our vision is to create a secure, transparent, and decentralized communication platform where users can interact with AI while maintaining complete ownership and control of their conversation history. By leveraging the Aptos blockchain's high performance and the Move language's security features, we aim to set a new standard for privacy-focused AI interactions.</p>
        </blockquote>
        <hr style="height: 0.25em; padding: 0; margin: 24px 0; background-color: #e1e4e8; border: 0;">

        <h2 style="font-size: 1.5em; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; margin-top: 24px; margin-bottom: 16px; font-weight: 600;">✨ Key Features</h2>
        <ul style="margin-top: 0; margin-bottom: 16px; padding-left: 2em;">
            <li style="margin-bottom: 0.5em;"><strong>⛓️ Decentralized Storage:</strong> All chat messages are securely stored on the Aptos blockchain.</li>
            <li style="margin-bottom: 0.5em;"><strong>🧠 AI Integration:</strong> Advanced conversational AI powered by state-of-the-art language models.</li>
            <li style="margin-bottom: 0.5em;"><strong>🛡️ Blockchain Security:</strong> Leverages the Move language's robust security features for data integrity.</li>
            <li style="margin-bottom: 0.5em;"><strong>🔑 Web3 Authentication:</strong> Secure and seamless wallet-based authentication.</li>
            <li style="margin-bottom: 0.5em;"><strong>💬 Real-time Interaction:</strong> Instant message delivery and AI responses for a smooth user experience.</li>
            <li style="margin-bottom: 0.5em;"><strong>📜 Immutable History:</strong> Permanent and unalterable chat history stored on-chain.</li>
            <li style="margin-bottom: 0.5em;"><strong>👤 User Ownership:</strong> You have complete control and ownership over your personal chat data.</li>
        </ul>
        <hr style="height: 0.25em; padding: 0; margin: 24px 0; background-color: #e1e4e8; border: 0;">

        <h2 style="font-size: 1.5em; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; margin-top: 24px; margin-bottom: 16px; font-weight: 600;">🛠️ Technical Implementation</h2>
        <h3 style="font-size: 1.25em; border-bottom: none; padding-bottom: 0.3em; margin-top: 24px; margin-bottom: 16px; font-weight: 600;">Smart Contract Architecture</h3>
        <p style="margin-top: 0; margin-bottom: 16px;">The core logic is handled by the <code style="font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace; font-size: 85%; background-color: rgba(27,31,35,0.05); border-radius: 3px; padding: 0.2em 0.4em;">chat_storage.move</code> smart contract, which implements:</p>
        <ul style="margin-top: 0; margin-bottom: 16px; padding-left: 2em;">
            <li style="margin-bottom: 0.5em;">Message storage system</li>
            <li style="margin-bottom: 0.5em;">On-chain account initialization</li>
            <li style="margin-bottom: 0.5em;">Functions to save and retrieve messages</li>
        </ul>
        <p style="margin-top: 0; margin-bottom: 16px;"><strong>Core Functions:</strong></p>
        <pre style="background-color: #f6f8fa; border-radius: 3px; font-size: 85%; line-height: 1.45; overflow: auto; padding: 16px; margin-bottom: 16px;"><code style="font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace; background-color: transparent; padding: 0; font-size: 100%;">// Initializes an account resource on-chain.
public entry fun init_account(account: &signer)

// Saves a new message for the sender.
public entry fun save_message(account: &signer, msg: string::String)

// Retrieves all messages for a given address.
public fun get_messages(addr: address): vector&lt;string::String&gt;</code></pre>

        <h3 style="font-size: 1.25em; border-bottom: none; padding-bottom: 0.3em; margin-top: 24px; margin-bottom: 16px; font-weight: 600;">Project Structure</h3>
        <p style="margin-top: 0; margin-bottom: 16px;">The repository is organized into three main parts: the on-chain contract, the backend server, and the frontend application.</p>
        <pre style="background-color: #f6f8fa; border-radius: 3px; font-size: 85%; line-height: 1.45; overflow: auto; padding: 16px; margin-bottom: 16px;"><code style="font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace; background-color: transparent; padding: 0; font-size: 100%;">aptos-ai-chat/
├── 📂 move_contract/     # Smart contract implementation (Aptos Move)
├── 📂 backend/          # API server (Node.js)
└── 📂 frontend/         # Web application (React)</code></pre>
        <hr style="height: 0.25em; padding: 0; margin: 24px 0; background-color: #e1e4e8; border: 0;">

        <h2 style="font-size: 1.5em; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; margin-top: 24px; margin-bottom: 16px; font-weight: 600;">🚀 Getting Started</h2>
        <h3 style="font-size: 1.25em; border-bottom: none; padding-bottom: 0.3em; margin-top: 24px; margin-bottom: 16px; font-weight: 600;">Prerequisites</h3>
        <p style="margin-top: 0; margin-bottom: 16px;">Make sure you have the following installed on your system:</p>
        <ul style="margin-top: 0; margin-bottom: 16px; padding-left: 2em;">
            <li style="margin-bottom: 0.5em;"><a href="https://nodejs.org/en/" target="_blank" rel="noopener noreferrer" style="color: #0366d6; text-decoration: none;">Node.js</a> (v16+)</li>
            <li style="margin-bottom: 0.5em;"><a href="https://aptos.dev/cli-tools/aptos-cli/install-aptos-cli" target="_blank" rel="noopener noreferrer" style="color: #0366d6; text-decoration: none;">Aptos CLI</a></li>
            <li style="margin-bottom: 0.5em;">A Web3 wallet compatible with the Aptos network (e.g., Petra, Martian).</li>
        </ul>
        
        <h3 style="font-size: 1.25em; border-bottom: none; padding-bottom: 0.3em; margin-top: 24px; margin-bottom: 16px; font-weight: 600;">Quick Start Guide</h3>
        <ol style="margin-top: 0; margin-bottom: 16px; padding-left: 2em;">
            <li style="margin-bottom: 0.5em;"><strong>Clone the repository:</strong>
                <pre style="background-color: #f6f8fa; border-radius: 3px; font-size: 85%; line-height: 1.45; overflow: auto; padding: 16px; margin-bottom: 16px;"><code style="font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace; background-color: transparent; padding: 0; font-size: 100%;">git clone https://github.com/IshaqShaik9014/aptos-ai-chat.git
cd aptos-ai-chat</code></pre>
            </li>
            <li style="margin-bottom: 0.5em;"><strong>Deploy the smart contract:</strong>
                <p style="margin-top: 0; margin-bottom: 16px;">Navigate to the <code style="font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace; font-size: 85%; background-color: rgba(27,31,35,0.05); border-radius: 3px; padding: 0.2em 0.4em;">move_contract</code> directory and follow the deployment instructions.</p>
                <pre style="background-color: #f6f8fa; border-radius: 3px; font-size: 85%; line-height: 1.45; overflow: auto; padding: 16px; margin-bottom: 16px;"><code style="font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace; background-color: transparent; padding: 0; font-size: 100%;"># Detailed deployment steps will be in the contract's own README</code></pre>
            </li>
            <li style="margin-bottom: 0.5em;"><strong>Set up the backend server:</strong>
                <pre style="background-color: #f6f8fa; border-radius: 3px; font-size: 85%; line-height: 1.45; overflow: auto; padding: 16px; margin-bottom: 16px;"><code style="font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace; background-color: transparent; padding: 0; font-size: 100%;">cd backend
npm install
npm start</code></pre>
            </li>
            <li style="margin-bottom: 0.5em;"><strong>Launch the frontend application:</strong>
                <pre style="background-color: #f6f8fa; border-radius: 3px; font-size: 85%; line-height: 1.45; overflow: auto; padding: 16px; margin-bottom: 16px;"><code style="font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace; background-color: transparent; padding: 0; font-size: 100%;">cd frontend
npm install
npm run dev</code></pre>
            </li>
        </ol>
        <hr style="height: 0.25em; padding: 0; margin: 24px 0; background-color: #e1e4e8; border: 0;">

        <h2 style="font-size: 1.5em; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; margin-top: 24px; margin-bottom: 16px; font-weight: 600;">🔮 Roadmap: Future Scope</h2>
        
        <h3 style="font-size: 1.25em; border-bottom: none; padding-bottom: 0.3em; margin-top: 24px; margin-bottom: 16px; font-weight: 600;">Enhanced Privacy Features</h3>
        <ul style="margin-top: 0; margin-bottom: 16px; padding-left: 2em;">
            <li style="margin-bottom: 0.5em;">End-to-end encryption for all messages</li>
            <li style="margin-bottom: 0.5em;">Private, access-controlled chat rooms</li>
            <li style="margin-bottom: 0.5em;">Zero-knowledge proofs for verified anonymity</li>
        </ul>

        <h3 style="font-size: 1.25em; border-bottom: none; padding-bottom: 0.3em; margin-top: 24px; margin-bottom: 16px; font-weight: 600;">Advanced AI Capabilities</h3>
        <ul style="margin-top: 0; margin-bottom: 16px; padding-left: 2em;">
            <li style="margin-bottom: 0.5em;">Support for multiple AI models (e.g., GPT-4, Llama 3)</li>
            <li style="margin-bottom: 0.5em;">Customizable AI personalities and voices</li>
            <li style="margin-bottom: 0.5em;">Multi-language and voice interaction support</li>
        </ul>

        <h3 style="font-size: 1.25em; border-bottom: none; padding-bottom: 0.3em; margin-top: 24px; margin-bottom: 16px; font-weight: 600;">Social & Community Features</h3>
        <ul style="margin-top: 0; margin-bottom: 16px; padding-left: 2em;">
            <li style="margin-bottom: 0.5em;">Decentralized user profiles (DIDs)</li>
            <li style="margin-bottom: 0.5em;">Community chat rooms and a user reputation system</li>
            <li style="margin-bottom: 0.5em;">Token-gated access for exclusive content</li>
        </ul>

        <h3 style="font-size: 1.25em; border-bottom: none; padding-bottom: 0.3em; margin-top: 24px; margin-bottom: 16px; font-weight: 600;">Technical Enhancements</h3>
        <ul style="margin-top: 0; margin-bottom: 16px; padding-left: 2em;">
            <li style="margin-bottom: 0.5em;">Integration of Layer 2 scaling solutions</li>
            <li style="margin-bottom: 0.5em;">Cross-chain message bridging capabilities</li>
            <li style="margin-bottom: 0.5em;">Advanced data indexing and real-time analytics</li>
        </ul>
    </div>

</body>
</html>

 
![WhatsApp Image 2025-08-07 at 13 04 32_3fa15102](https://github.com/user-attachments/assets/ab001abc-b131-4d05-9e16-9791bf045287)

 ![WhatsApp Image 2025-08-07 at 13 04 32_e414232d](https://github.com/user-attachments/assets/b4b0214e-c8ff-4699-9335-797f51dc4afd)

<img width="930" height="1000" alt="Screenshot 2025-08-07 132456" src="https://github.com/user-attachments/assets/29147b8f-a285-43ff-977f-ae73aab94d4a" />







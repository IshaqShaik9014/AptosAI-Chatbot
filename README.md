# Aptos AI Chat DApp 🤖🔗

Welcome to the Aptos AI Chat DApp! This is a fully decentralized chat application built on the **Aptos blockchain**, featuring a React frontend and a Node.js backend. Interact with an AI and have your conversations permanently stored on-chain.

![Aptos AI Chat DApp Banner](https://user-images.githubusercontent.com/10142337/230182390-8472a1e8-3a9c-4f7a-95c5-2ba19e6f3b0f.png)

***

## ✨ Features

* **Decentralized Chat:** All messages are sent to and fetched from the Aptos blockchain.
* **AI-Powered:** Integrates with OpenAI to provide intelligent and interactive chat responses.
* **Seamless Wallet Integration:** Easily connect using the Petra Wallet browser extension.
* **Modern Tech Stack:** Built with React, Node.js, and Move for a robust and scalable application.

***

## 🛠️ Tech Stack

* **Frontend:** React
* **Backend:** Node.js, Express.js
* **Blockchain:** Aptos
* **Smart Contract Language:** Move
* **Wallet:** Petra Wallet

***

## 📁 Project Structure

Here is the layout of the project directories:

aptos-ai-chat/

Here is the layout of the project directories:
├── 📂 move_contract/      # Aptos Move smart contract
├── 📂 backend/           # Node.js server (Express.js)
└── 📂 frontend/          # React client application

***

## 🚀 Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

Make sure you have the following installed on your machine:

* **Node.js** (v16 or higher)
* **Aptos CLI**
* **Petra Wallet** (browser extension)

### Installation & Setup

#### 1. Deploy the Move Contract

First, you need to deploy the smart contract to the Aptos network.

* Navigate to the contract directory:
    ```bash
    cd move_contract
    ```
* In the `Move.toml` file, update the `[addresses]` section with your Aptos account address:
    ```toml
    # Move.toml
    [addresses]
    ai_chat = "0xYourAccountAddress"
    ```
* Publish the contract to the devnet (or your desired network):
    ```bash
    aptos move publish --named-addresses ai_chat=YourAccountAddress
    ```

---

#### 2. Configure the Backend

Next, set up the Node.js server which handles interactions with OpenAI.

* Navigate to the backend directory:
    ```bash
    cd backend
    ```
* Install the required npm packages:
    ```bash
    npm install
    ```
* Create a `.env` file by copying the example file:
    ```bash
    cp .env.example .env
    ```
* Open the new `.env` file and add your **OpenAI API Key** and your **Aptos Private Key**:
    ```env
    # .env
    OPENAI_API_KEY="sk-..."
    APTOS_PRIVATE_KEY="0x..."
    ```
* Start the backend server:
    ```bash
    npm start
    ```
    The server will be running on `http://localhost:5000`.

---

#### 3. Run the Frontend

Finally, get the React user interface running.

* Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
* Install the required npm packages:
    ```bash
    npm install
    ```
* Start the React development server:
    ```bash
    npm start
    ```
    The application will open automatically in your browser at `http://localhost:3000`.

***

## Usage

1.  Open your browser and go to `http://localhost:3000`.
2.  Click the "Connect Wallet" button to link your Petra wallet.
3.  Start sending messages in the chat interface.
4.  Your messages will be sent to the AI, and the conversation history will be stored on the Aptos blockchain!








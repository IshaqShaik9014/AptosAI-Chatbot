import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import OpenAI from "openai";
import { AptosClient, AptosAccount, TxnBuilderTypes, BCS } from "aptos";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
dotenv.config({ path: path.join(__dirname, ".env") });

console.log("Environment variables:", {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  APTOS_NODE_URL: process.env.APTOS_NODE_URL,
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  MODULE_ADDRESS: process.env.MODULE_ADDRESS,
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

// OpenAI setup
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Aptos setup
const client = new AptosClient(
  process.env.APTOS_NODE_URL || "https://fullnode.testnet.aptoslabs.com"
);

// Private key cleanup
if (!process.env.PRIVATE_KEY) {
  throw new Error("PRIVATE_KEY is missing in .env");
}
let privateKey = process.env.PRIVATE_KEY;
if (privateKey.startsWith("ed25519-priv-")) {
  privateKey = privateKey.slice("ed25519-priv-".length);
}
if (privateKey.startsWith("0x")) {
  privateKey = privateKey.slice(2);
}
const account = new AptosAccount(Buffer.from(privateKey, "hex"));

// Module address cleanup
if (!process.env.MODULE_ADDRESS) {
  throw new Error("MODULE_ADDRESS is missing in .env");
}
const moduleAddress = process.env.MODULE_ADDRESS.trim();
console.log("Using module address:", moduleAddress);

// AI Chat endpoint
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
    });

    const reply = completion.choices[0].message.content;

    await saveMessageOnChain(message);

    res.json({ reply });
  } catch (err) {
    console.error("Error details:", err);
    res.status(500).json({ error: err.message || "Error processing chat" });
  }
});

// Save message to Aptos blockchain
async function saveMessageOnChain(msg) {
  try {
    console.log("Sending message to Aptos with address:", moduleAddress);

    const payload = new TxnBuilderTypes.TransactionPayloadEntryFunction(
      TxnBuilderTypes.EntryFunction.natural(
        "0xbce003f32dde6d7da63e49d6bd5e1ad28fcda376a531859ff9f14f3e33a2f4b8::chat_storage",
        "save_message",
        [],
        [BCS.bcsSerializeStr(msg)]
        )
    );

    const txnRequest = await client.generateTransaction(account.address(), payload);
    const signedTxn = await client.signTransaction(account, txnRequest);
    const res = await client.submitTransaction(signedTxn);
    await client.waitForTransaction(res.hash);

    console.log("Message saved on-chain:", msg);
  } catch (error) {
    console.error("Error saving message to chain:", error);
    throw error;
  }
}

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
// test.js
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

console.log("Module address:", process.env.MODULE_ADDRESS);

const run = async () => {
  const res = await fetch("http://localhost:5000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "Hello Aptos AI" }),
  });
  const data = await res.json();
  console.log(data);
};

run();
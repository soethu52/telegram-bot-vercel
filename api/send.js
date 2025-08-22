import fetch from "node-fetch";
import { saveMessage } from "../lib/memoryDB.js";
import 'dotenv/config';

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;

    const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
    });

    const data = await response.json();

    // frontend မှာပို့လိုက်တဲ့ စာလည်း DB ထဲထည့်
    saveMessage({ user: "Me (WebApp)", text: message, date: new Date().toISOString() });

    return res.status(200).json(data);
  }
  res.status(405).json({ error: "Method Not Allowed" });
}

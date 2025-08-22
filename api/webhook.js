import fetch from "node-fetch";
import { saveMessage } from "../lib/memoryDB.js";
import 'dotenv/config';

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const update = req.body;

    if (update.message) {
      const chatId = update.message.chat.id;
      const text = update.message.text;
      const user = update.message.from?.first_name || "Unknown";

      // DB ထဲသိမ်း
      saveMessage({ user, text, date: new Date().toISOString() });

      // Bot က တိုက်ရိုက်ပြန်လို့လည်းရ (မလိုရင် ဖြုတ်လို့ရ)
      await sendMessage(chatId, `📩 Bot got: ${text}`);
    }

    return res.status(200).json({ ok: true });
  }

  res.status(200).send("Webhook running...");
}

async function sendMessage(chatId, text) {
  const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}

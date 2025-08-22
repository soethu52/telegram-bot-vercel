import fetch from "node-fetch";
import { saveMessage } from "../lib/memoryDB.js";

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const update = req.body;

    if (update.message) {
      const chatId = update.message.chat.id;
      const text = update.message.text;
      const user = update.message.from?.first_name || "Unknown";

      saveMessage({ user, text, date: new Date().toISOString() });

      await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: `Bot got: ${text}` }),
      });
    }

    return res.status(200).json({ ok: true });
  }

  res.status(405).json({ error: "Method Not Allowed" });
}

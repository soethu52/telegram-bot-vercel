import { getMessages } from "../lib/memoryDB.js";

export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json(getMessages());
  }
  res.status(405).json({ error: "Method Not Allowed" });
}

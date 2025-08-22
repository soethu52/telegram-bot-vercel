import { useState, useEffect } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  // Messages load
  const loadMessages = async () => {
    const res = await fetch("/api/messages");
    const data = await res.json();
    setChat(data);
  };

  // Interval polling (3 sec)
  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return;
    await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    setMessage("");
    loadMessages();
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>📢 Telegram Group Chat</h2>
      <div style={{
        border: "1px solid #ccc", padding: "10px", height: "300px", overflowY: "auto", marginBottom: "10px"
      }}>
        {chat.map((m, i) => (
          <div key={i}>
            <b>{m.user}</b>: {m.text}
            <span style={{ fontSize: "10px", color: "gray" }}> ({new Date(m.date).toLocaleTimeString()})</span>
          </div>
        ))}
      </div>
      <textarea
        rows="2"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message"
        style={{ width: "100%", padding: "5px" }}
      />
      <br />
      <button onClick={sendMessage} style={{ marginTop: "5px", padding: "8px 20px" }}>
        Send
      </button>
    </div>
  );
}

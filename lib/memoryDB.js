let messages = [];

export function saveMessage(msg) {
  messages.push(msg);
  if (messages.length > 100) {
    messages.shift(); // ၁၀၀ စာထိသာ သိမ်းထားမယ်
  }
}

export function getMessages() {
  return messages;
}

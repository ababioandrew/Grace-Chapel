import { useEffect, useRef, useState } from "react";
import "./Chat.css";

/* =========================
   STORAGE KEYS
========================= */
const CHAT_KEY = "prestige-chat";
const SESSION_KEY = "prestige-session";
const LAST_ACTIVE_KEY = "prestige-last-active";

/* =========================
   BOT DATA
========================= */
const botReplies = {
  greetings: {
    text: `Hello 👋\nWelcome to Prestige iBot.`,
  },

  pots: {
    text: `We offer ceramic, plastic, clay and outdoor pots.`,
    products: [
      { name: "Ceramic Pot", price: "GHS 80", emoji: "🪴" },
      { name: "Plastic Pot", price: "GHS 40", emoji: "🪴" },
      { name: "Outdoor Clay Pot", price: "GHS 120", emoji: "🏺" },
    ],
  },

  stones: {
    text: `We offer pebbles, gravel and decorative stones.`,
  },

  flowers: {
    text: `We offer roses, orchids, lilies and plants.`,
    products: [
      { name: "Rose Plant", price: "GHS 60", emoji: "🌹" },
      { name: "Orchid", price: "GHS 120", emoji: "🌸" },
      { name: "Lily Plant", price: "GHS 90", emoji: "🌺" },
    ],
  },

  location: {
    text: `📍 Tema, Ghana\n📞 +233 501195737`,
  },

  default: {
    text: `Ask about pots, stones, flowers or location.`,
  },
};

/* =========================
   QUICK REPLIES
========================= */
const quickReplies = ["Pots", "Stones", "Flowers", "Location"];

/* =========================
   RESPONSE ENGINE
========================= */
const getResponse = (text = "") => {
  const t = text.toLowerCase();

  if (t.includes("pot")) return botReplies.pots;
  if (t.includes("stone") || t.includes("pebble")) return botReplies.stones;
  if (t.includes("flower") || t.includes("plant")) return botReplies.flowers;
  if (t.includes("location") || t.includes("address")) return botReplies.location;

  return botReplies.default;
};

/* =========================
   TYPING DOTS
========================= */
const TypingDots = () => (
  <div className="typing-dots">
    <span>.</span><span>.</span><span>.</span>
  </div>
);

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const bottomRef = useRef(null);

  /* =========================
     SESSION ID
  ========================= */
  const [sessionId] = useState(() => {
    let id = localStorage.getItem(SESSION_KEY);

    if (!id) {
      id = "sess_" + Date.now() + "_" + Math.floor(Math.random() * 9999);
      localStorage.setItem(SESSION_KEY, id);
    }

    return id;
  });

  /* =========================
     LOAD MESSAGES
  ========================= */
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem(CHAT_KEY);

    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            sender: "bot",
            data: botReplies.greetings,
          },
        ];
  });

  /* =========================
     SAVE CHAT
  ========================= */
  useEffect(() => {
    localStorage.setItem(CHAT_KEY, JSON.stringify(messages));
  }, [messages]);

  /* =========================
     AUTO SCROLL
  ========================= */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  /* =========================
     REFRESH = CLEAR CHAT
  ========================= */
  useEffect(() => {
    const isReload =
      performance.getEntriesByType("navigation")[0]?.type === "reload";

    if (isReload) {
      localStorage.removeItem(CHAT_KEY);
      setMessages([
        {
          id: 1,
          sender: "bot",
          data: botReplies.greetings,
        },
      ]);
    }
  }, []);

  /* =========================
     30 MIN AUTO CLEAR
  ========================= */
  useEffect(() => {
    const updateLastActive = () => {
      localStorage.setItem(LAST_ACTIVE_KEY, Date.now().toString());
    };

    updateLastActive();

    const interval = setInterval(() => {
      const last = parseInt(
        localStorage.getItem(LAST_ACTIVE_KEY) || "0",
        10
      );

      const now = Date.now();

      // 30 minutes = 1800000 ms
      if (now - last > 1800000) {
        localStorage.removeItem(CHAT_KEY);

        setMessages([
          {
            id: 1,
            sender: "bot",
            data: botReplies.greetings,
          },
        ]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  /* =========================
     SEND MESSAGE
  ========================= */
  const sendMessage = (textOverride) => {
    const text = (textOverride || input).trim();
    if (!text) return;

    localStorage.setItem(LAST_ACTIVE_KEY, Date.now().toString());

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        text,
      },
    ]);

    setInput("");
    setTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          data: getResponse(text),
        },
      ]);

      setTyping(false);
    }, 800);
  };

  /* =========================
     VOICE INPUT
  ========================= */
  const startVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input not supported.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
  };

  return (
    <div className="chat-page">
      <div className="chat-card">

        {/* HEADER */}
        <div className="chat-header">
          <div>
            <h3>🌿 Prestige iBot</h3>
            <small>Session: {sessionId.slice(-6)}</small>
          </div>
        </div>

        {/* CHAT BODY */}
        <div className="chat-body">

          {messages.map((m) => (
            <div key={m.id} className={`row ${m.sender}`}>

              <div className="avatar">
                {m.sender === "bot" ? "🤖" : "🧑"}
              </div>

              <div className={`bubble ${m.sender}`}>

                {(m.data?.text || m.text)
                  .split("\n")
                  .map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}

                {/* PRODUCT CARDS */}
                {m.data?.products && (
                  <div className="product-grid">
                    {m.data.products.map((p, i) => (
                      <div key={i} className="product-card">
                        <div className="emoji">{p.emoji}</div>
                        <div className="name">{p.name}</div>
                        <div className="price">{p.price}</div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>
          ))}

          {/* TYPING DOTS */}
          {typing && (
            <div className="row bot">
              <div className="avatar">🤖</div>
              <div className="bubble bot">
                <TypingDots />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* QUICK REPLIES */}
        <div className="quick-replies">
          {quickReplies.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              className="quick-btn"
            >
              {q}
            </button>
          ))}
        </div>

        {/* INPUT */}
        <div className="chat-input">

          <button className="mic-btn" onClick={startVoice}>
            🎤
          </button>

          <input
            value={input}
            placeholder="Ask something..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button onClick={() => sendMessage()}>
            Send
          </button>

        </div>

      </div>
    </div>
  );
}
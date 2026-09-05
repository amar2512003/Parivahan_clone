import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { X, Send, Loader2 } from "lucide-react";
import api from "../api/axios";

// The model replies with light Markdown (**bold**, the occasional
// `code`). Chat bubbles are plain text, so turn just those two inline
// forms into real elements instead of showing the literal asterisks.
function renderFormattedText(text) {
  const parts = text.split(/(\*\*[^*\n]+\*\*|`[^`\n]+`)/g);

  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="chatbot-inline-code">
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

const COPY = {
  en: {
    fabLabel: "ASK ME",
    panelTitle: "Traffic Assistant",
    panelSubtitle: "Ask about any service on this site",
    placeholder: "Type your question…",
    send: "Send",
    greeting:
      "Hi! I'm a demo assistant for this site. Ask me about driving licences, vehicle registration, eChallan, permits, or anything else here — everything is demo data, nothing is real.",
    notConfigured:
      "The chat assistant isn't wired up yet — add GROQ_API_KEY in backend/.env to enable real replies.",
    genericError: "Something went wrong reaching the assistant. Please try again.",
    close: "Close chat",
    open: "Open chat assistant",
  },
  hi: {
    fabLabel: "मुझसे पूछें",
    panelTitle: "यातायात सहायक",
    panelSubtitle: "इस साइट की किसी भी सेवा के बारे में पूछें",
    placeholder: "अपना सवाल लिखें…",
    send: "भेजें",
    greeting:
      "नमस्ते! मैं इस साइट का डेमो सहायक हूं। ड्राइविंग लाइसेंस, वाहन पंजीकरण, ई-चालान, परमिट या यहां किसी भी चीज़ के बारे में पूछें — सब कुछ डेमो डेटा है, कुछ भी असली नहीं है।",
    notConfigured:
      "चैट सहायक अभी सेट नहीं हुआ है — असली जवाब पाने के लिए backend/.env में GROQ_API_KEY जोड़ें।",
    genericError: "सहायक तक पहुंचने में समस्या हुई। कृपया फिर से प्रयास करें।",
    close: "चैट बंद करें",
    open: "चैट सहायक खोलें",
  },
};

export default function Chatbot() {
  const { i18n } = useTranslation();
  const lang = i18n.language === "hi" ? "hi" : "en";
  const copy = COPY[lang];

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(() => [
    { role: "assistant", content: COPY[lang].greeting },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const seededLang = useRef(lang);

  // If the language toggles before the user has said anything, swap the
  // seeded greeting too so it isn't stuck in the old language.
  useEffect(() => {
    if (seededLang.current !== lang && messages.length === 1 && messages[0].role === "assistant") {
      setMessages([{ role: "assistant", content: COPY[lang].greeting }]);
      seededLang.current = lang;
    }
  }, [lang, messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, loading]);

  async function sendMessage(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await api.post("/chat", {
        message: text,
        history: nextMessages.slice(0, -1),
        lang,
      });
      setMessages((cur) => [...cur, { role: "assistant", content: res.data.reply }]);
    } catch (err) {
      const status = err.response?.status;
      const serverMessage = err.response?.data?.message;
      const fallback =
        status === 503
          ? copy.notConfigured
          : serverMessage || copy.genericError;
      setMessages((cur) => [...cur, { role: "assistant", content: fallback, isNotice: status === 503 }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? copy.close : copy.open}
        className="chatbot-fab-triangle focus-ring"
      >
        <svg
          className="chatbot-fab-triangle-svg"
          viewBox="0 0 100 92"
          aria-hidden="true"
        >
          <path
            d="M50 6 L92 84 L8 84 Z"
            fill="#FFCC00"
            stroke="#E11D2E"
            strokeWidth="9"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
        <span className="chatbot-fab-triangle-shine" aria-hidden="true" />
        <span className="chatbot-fab-triangle-label">{copy.fabLabel}</span>
      </button>

      {open && (
        <div className="chatbot-panel" role="dialog" aria-label={copy.panelTitle}>
          <div className="chatbot-panel-header">
            <div className="flex items-center gap-3">
              <span className="chatbot-fab-housing chatbot-fab-housing-sm" aria-hidden="true">
                <span className="chatbot-light chatbot-light-red" />
                <span className="chatbot-light chatbot-light-yellow" />
                <span className="chatbot-light chatbot-light-green" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white leading-tight">
                  {copy.panelTitle}
                </p>
                <p className="text-xs text-blue-100 leading-tight">
                  {copy.panelSubtitle}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={copy.close}
              className="chatbot-close-btn focus-ring"
            >
              <X size={18} />
            </button>
          </div>

          <div className="chatbot-messages" ref={scrollRef}>
            {messages.map((m, i) => (
              <div
                key={i}
                className={`chatbot-bubble-row ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={
                    m.role === "user"
                      ? "chatbot-bubble chatbot-bubble-user"
                      : m.isNotice
                        ? "chatbot-bubble chatbot-bubble-notice"
                        : "chatbot-bubble chatbot-bubble-assistant"
                  }
                >
                  {renderFormattedText(m.content)}
                </div>
              </div>
            ))}

            {loading && (
              <div className="chatbot-bubble-row justify-start">
                <div className="chatbot-bubble chatbot-bubble-assistant flex items-center gap-2">
                  <Loader2 size={14} className="animate-spin" />
                  <span className="chatbot-typing-dots" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </span>
                </div>
              </div>
            )}
          </div>

          <form className="chatbot-input-row" onSubmit={sendMessage}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={copy.placeholder}
              className="chatbot-input focus-ring"
              maxLength={1000}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              aria-label={copy.send}
              className="chatbot-send-btn focus-ring"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
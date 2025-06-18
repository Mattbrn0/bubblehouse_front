import { useState, useRef, useEffect } from 'react';
import { SendHorizonal } from 'lucide-react';
import Navbar from "@/components/Navbar";

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const basePrompt = {
        role: 'system',
        content:
          "Tu es Charles, un assistant virtuel bienveillant, à l'écoute et empathique. Tu parles comme un humain, avec douceur, simplicité et sans jugement. Tu es spécialisé dans le bien-être mental, en particulier pour les jeunes hommes, mais tu restes ouvert à tous. Tu réponds toujours avec des mots chaleureux, apaisants et sincères, comme le ferait un ami de confiance. Tu n'utilises jamais de termes trop techniques, tu préfères expliquer les choses avec des mots simples et compréhensibles. Ton objectif est d’apporter du soutien, de la clarté et de la bienveillance, sans jamais forcer ni imposer.",
      };

      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [basePrompt, ...newMessages] }),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP ! status: ${response.status}`);
      }

      const data = await response.json();
      const aiReply = data.reply;

      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: aiReply || "Pas de réponse pour le moment.",
        },
      ]);
    } catch (error) {
      console.error('Erreur API:', error);
      setMessages([
        ...newMessages,
        { role: 'assistant', content: "Erreur de connexion." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-6 text-gray-900">
      <div className="w-full max-w-2xl space-y-4">
        {/* Header */}
        <header
          className="rounded-b-[48px] p-6 text-white text-center shadow-md"
          style={{ backgroundColor: "#A67DB9" }}
        >
          <h1 className="text-2xl font-semibold">BubbleAI</h1>
        </header>

        {/* Chat Box */}
        <div className="bg-white shadow-xl rounded-2xl p-4 h-[500px] overflow-y-auto border" style={{ borderColor: "#A67DB9" }}>
          <div className="flex-1 overflow-y-auto space-y-4 bg-white">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl text-sm shadow-sm ${
                    msg.role === 'user'
                      ? 'text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                  style={{
                    backgroundColor: msg.role === 'user' ? '#A67DB9' : undefined,
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#A67DB9]/10 rounded-2xl p-4 animate-pulse">
                  <div className="h-4 w-4 bg-[#A67DB9] rounded-full animate-bounce" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Zone */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="flex-1 px-4 py-3 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2"
            style={{ borderColor: "#A67DB9", boxShadow: "0 0 0 2px #A67DB9" }}
            placeholder="Écris ton message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="text-white p-3 rounded-full shadow-md transition"
            style={{ backgroundColor: "#A67DB9" }}
          >
            <SendHorizonal size={20} />
          </button>
        </div>
      </div>

      <Navbar />
    </div>
  );
}

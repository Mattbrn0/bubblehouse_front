import { useState, useRef, useEffect } from 'react';

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    { role: 'user', content: 'Bonjour, qui es-tu ?' },
  ]);
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
        content: "Tu es BubbleAI, un assistant virtuel bienveillant spécialisé en santé mentale pour les jeunes hommes plus particulièrement. Tu donnes des conseils de manière simple, douce et non jugeante."
      }
      
      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [basePrompt, ...newMessages] }),
      });

      if (!response.ok) {
        throw new Error('erreur HTTP ! status: ${response.status}');
      }

      const data = await response.json();
      console.log('Réponse backend:', data);

      const aiReply = data.reply;
      console.log('Réponse AI:', aiReply);


      if (!aiReply) {
      setMessages([...newMessages, { role: 'assistant', content: "Pas de réponse pour le moment." }]);
      } else {
        setMessages([...newMessages, { role: 'assistant', content: aiReply }]);
      }
    } catch (error) {
      console.error('Erreur API:', error);
      setMessages([...newMessages, { role: 'assistant', content: "Erreur de connexion." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Bubblehouse Chat</h1>
      <div className="border rounded-lg p-4 h-96 overflow-y-auto bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block px-3 py-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'}`}>
              {msg.content}
            </span>
          </div>
        ))}
        {loading && <p className="text-gray-400 text-sm">Chargement...</p>}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Écris ton message..."
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={sendMessage}
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}

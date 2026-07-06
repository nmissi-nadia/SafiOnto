import React, { useState } from 'react';
import { Send, Bot, User, Loader2, X, MessageSquare } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Bonjour ! Je suis SafiBot, votre guide touristique sémantique. Posez-moi une question sur les monuments de Safi !' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { sender: 'bot', text: data.answer }]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'bot', text: "Désolé, je rencontre un problème de connexion avec ma base de connaissances." }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-brand text-white p-4 rounded-full shadow-2xl hover:bg-brand-dark transition-all transform hover:scale-110 z-50 flex items-center justify-center"
      >
        <MessageSquare size={28} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden flex flex-col h-[500px] max-h-[80vh]">
      {/* Header */}
      <div className="bg-brand text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot size={24} />
          <h3 className="font-bold">SafiBot (IA Sémantique)</h3>
        </div>
        <button onClick={() => setIsOpen(false)} className="hover:text-gray-200">
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-3 text-sm shadow-sm ${msg.sender === 'user' ? 'bg-brand text-white rounded-tr-sm' : 'bg-white text-gray-800 border border-gray-100 rounded-tl-sm'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 rounded-2xl p-3 text-sm text-gray-500 rounded-tl-sm flex items-center gap-2 shadow-sm">
              <Loader2 size={16} className="animate-spin text-brand" />
              SafiBot réfléchit...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="p-3 bg-white border-t border-gray-200 flex gap-2">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          placeholder="Posez votre question..." 
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50"
          disabled={loading}
        />
        <button 
          type="submit" 
          disabled={loading || !input.trim()} 
          className="bg-brand text-white p-2 rounded-full hover:bg-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default Chatbot;

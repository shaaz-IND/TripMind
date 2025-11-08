import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader2, Trash2 } from 'lucide-react';
import { api } from '../utils/api';

export default function Plan() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '👋 Hello! I\'m your autonomous travel planning assistant. I can help you:\n\n• Plan complete trips\n• Find flights & hotels\n• Create itineraries\n• Manage budgets\n• Remember preferences\n\nJust tell me where you\'d like to go, your budget, and any preferences - I\'ll handle the rest autonomously!'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const result = await api.planTrip(userMessage);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: result.response || result.error || 'Sorry, I encountered an error.' 
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I couldn\'t process your request. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = async () => {
    try {
      await api.resetMemory();
      setMessages([{
        role: 'assistant',
        content: '✅ Memory cleared! Let\'s start fresh. Where would you like to go?'
      }]);
    } catch (error) {
      console.error('Failed to clear memory:', error);
    }
  };

  const suggestions = [
    '🏖️ Plan a 5-day beach trip to Goa under $500 in December',
    '🗼 7-day Paris family trip with culture and food',
    '⛰️ Weekend trekking in Manali with hotel recommendations',
    '✈️ Find cheapest flights from Delhi to Mumbai next month'
  ];

  return (
    <div className="min-h-screen pt-24 pb-8 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-primary-400 to-navy-400 bg-clip-text text-transparent">
              Plan Your Trip
            </span>
          </h1>
          <p className="text-white/60">Tell me what you need, and I'll create the perfect itinerary</p>
        </motion.div>

        <div className="glass-card p-6 mb-6 h-[60vh] flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
                      <Bot size={18} />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-primary-500 text-white'
                        : 'bg-white/10 backdrop-blur-sm'
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-navy-500 flex items-center justify-center flex-shrink-0">
                      <User size={18} />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3 justify-start"
              >
                <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center">
                  <Bot size={18} />
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3">
                  <Loader2 className="animate-spin" size={20} />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your ideal trip..."
              className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary-500 transition-colors"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-primary-500 hover:bg-primary-600 disabled:bg-white/10 disabled:cursor-not-allowed rounded-xl px-6 py-3 transition-colors"
            >
              <Send size={20} />
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="bg-white/5 hover:bg-white/10 rounded-xl px-4 py-3 transition-colors"
              title="Clear conversation"
            >
              <Trash2 size={20} />
            </button>
          </form>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-white/60 text-center">Try these examples:</p>
          <div className="grid md:grid-cols-2 gap-3">
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setInput(suggestion)}
                className="glass-card p-3 text-left text-sm hover:bg-white/15 transition-all"
              >
                {suggestion}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

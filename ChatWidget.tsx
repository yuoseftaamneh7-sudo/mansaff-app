import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, X, User, Phone, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'يا هلا بك في مطبخ أبو محمد! 🇯🇴\nاكتب استفسارك هون، ورح تتحول فوراً للواتساب عشان يجاوبك المعلم بنفسه.',
      sender: 'support',
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // 1. Show user message locally
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    const textToSend = inputValue;
    setInputValue('');

    // 2. Redirect to WhatsApp
    setTimeout(() => {
        const phoneNumber = "962772272961";
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(textToSend)}`;
        window.open(whatsappUrl, '_blank');
        
        // Optional: Add a system note indicating redirection
        const systemMsg: Message = {
            id: (Date.now() + 1).toString(),
            text: 'جاري تحويلك إلى واتساب للمتابعة... ⏳',
            sender: 'support',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, systemMsg]);
    }, 600);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ar-JO', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[350px] h-[450px] bg-zinc-950 rounded-2xl shadow-2xl border border-zinc-800 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#075e54] p-3 flex justify-between items-center text-white shadow-md z-10">
              <div className="flex items-center gap-3">
                <div className="relative">
                    <div className="bg-white p-1 rounded-full overflow-hidden w-10 h-10 flex items-center justify-center">
                        <User size={24} className="text-zinc-600" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#075e54]"></div>
                </div>
                <div>
                  <h3 className="font-bold text-sm">أبو محمد (مباشر)</h3>
                  <div className="flex items-center gap-1 opacity-90 text-xs">
                    <span className="flex items-center gap-1">واتساب <ExternalLink size={10}/></span>
                    <span className="w-1 h-1 bg-white rounded-full mx-1"></span>
                    <span>متصل الآن</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                 <a href="tel:0772272961" className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <Phone size={18} />
                 </a>
                 <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <X size={20} />
                 </button>
              </div>
            </div>

            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-5 pointer-events-none" 
                 style={{backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")'}}>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10 custom-scrollbar bg-[#0b141a]/95">
               {messages.map((msg) => (
                   <motion.div 
                     key={msg.id}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}
                   >
                       <div className={`
                         max-w-[85%] rounded-xl p-3 shadow-sm relative text-sm
                         ${msg.sender === 'user' 
                            ? 'bg-[#005c4b] text-white rounded-tr-none' 
                            : 'bg-[#202c33] text-zinc-200 rounded-tl-none border border-zinc-800'}
                       `}>
                           <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                           <div className="flex items-center justify-end gap-1 mt-1 opacity-70 text-[10px]">
                               <span>{formatTime(msg.timestamp)}</span>
                           </div>
                       </div>
                   </motion.div>
               ))}
               <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-2 bg-[#202c33] z-20 flex items-center gap-2 border-t border-zinc-800">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="اكتب رسالتك للواتساب..."
                className="flex-1 bg-[#2a3942] text-white rounded-lg px-4 py-3 text-sm outline-none placeholder-zinc-500 border border-transparent focus:border-[#005c4b] transition-all text-right"
                dir="rtl"
              />
              <button 
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="bg-[#25D366] text-white p-3 rounded-full hover:bg-[#1ebc57] disabled:opacity-50 disabled:bg-zinc-700 transition-all flex items-center justify-center shadow-lg"
              >
                <Send size={18} className={document.dir === 'rtl' ? 'rotate-180' : ''} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#25D366] text-white p-4 rounded-full shadow-lg shadow-green-500/30 hover:bg-[#20bd5a] transition-all flex items-center justify-center relative group"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-zinc-950"></span>
        </span>
        {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
        
        {/* Tooltip */}
        {!isOpen && (
            <span className="absolute right-full mr-4 bg-white text-zinc-900 px-3 py-1 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
                تواصل واتساب 🇯🇴
            </span>
        )}
      </motion.button>
    </div>
  );
};

export default ChatWidget;
import React, { useState, useRef, useEffect } from 'react';
import { SUSANNA_CHAT_HISTORY } from '../constants';
import { ChatMessage } from '../types';
import { Send, Bot, User as UserIcon } from 'lucide-react';

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(SUSANNA_CHAT_HISTORY);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "I've logged that feedback. We will monitor your recovery metrics tomorrow morning to decide if adjustments are needed for the Sunday Long Run.",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-[85vh] bg-white border border-stone-100 rounded-[2rem] shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-stone-100 bg-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center relative">
            <Bot className="text-stone-900" size={24} />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <h2 className="font-bold text-stone-900 text-lg">Coach Susanna</h2>
            <p className="text-xs text-stone-500 font-medium">ELITE PERFORMANCE AI • ONLINE</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-[#F9F9F9]">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.sender === 'ai' ? 'bg-white text-stone-900 border border-stone-100 shadow-sm' : 'bg-stone-900 text-white'}`}>
                {msg.sender === 'ai' ? <Bot size={16} /> : <UserIcon size={16} />}
              </div>
              <div>
                <div className={`p-5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-stone-900 text-white rounded-tr-none' 
                    : 'bg-white text-stone-700 border border-stone-100 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-stone-400 mt-1 block px-2 text-right">
                  {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
             <div className="flex gap-3 max-w-[80%]">
               <div className="w-8 h-8 rounded-full bg-white text-stone-900 border border-stone-100 flex items-center justify-center">
                 <Bot size={16} />
               </div>
               <div className="bg-white border border-stone-100 p-4 rounded-2xl rounded-tl-none flex gap-1 items-center shadow-sm">
                 <span className="w-2 h-2 bg-stone-300 rounded-full animate-bounce"></span>
                 <span className="w-2 h-2 bg-stone-300 rounded-full animate-bounce delay-75"></span>
                 <span className="w-2 h-2 bg-stone-300 rounded-full animate-bounce delay-150"></span>
               </div>
             </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <div className="p-6 bg-white border-t border-stone-100">
        <div className="relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Susanna about your training, pacing, or nutrition..."
            className="w-full bg-stone-50 text-stone-900 rounded-2xl pl-6 pr-14 py-4 border border-stone-200 focus:outline-none focus:border-stone-400 focus:ring-0 transition-all text-sm font-medium"
          />
          <button
            onClick={handleSend}
            className="absolute right-2 top-2 p-2.5 bg-yellow-400 hover:bg-yellow-300 text-stone-900 rounded-xl transition-colors shadow-sm"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
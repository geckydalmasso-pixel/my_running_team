import React, { useState, useEffect, useRef } from 'react';
import { View, ChatMessage } from '../types';
import { Send, Cpu, Activity } from 'lucide-react';
import { INITIAL_CHAT_MESSAGES } from '../constants';

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newUserMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response logic
    setTimeout(() => {
      let aiText = "Understood. Updating biometric baseline.";
      if (messages.length > 2) {
         aiText = "Profile calibrated. The mission to Sub 2:20 starts now. Initializing dashboard...";
         setTimeout(() => onComplete(), 2500); 
      } else {
         aiText = "Noted. 63kg is optimal power-to-weight ratio. What is your recent 10k PB?";
      }

      const newAiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiText,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, newAiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-6 md:p-10">
      <div className="flex-none py-8 flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-stone-900 flex items-center justify-center text-white shadow-lg">
          <Activity size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-stone-900 tracking-tight">MRT AGENT</h2>
          <p className="text-xs text-stone-500 font-bold uppercase tracking-wider">SYSTEM: ONLINE</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 py-4 scrollbar-hide">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] px-6 py-5 rounded-[2rem] text-sm leading-relaxed shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-stone-900 text-white rounded-br-none'
                  : 'bg-white text-stone-700 rounded-bl-none border border-stone-100'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
           <div className="flex justify-start">
             <div className="bg-white px-5 py-4 rounded-[2rem] rounded-bl-none border border-stone-100 flex gap-1 shadow-sm">
               <span className="w-2 h-2 bg-stone-300 rounded-full animate-bounce"></span>
               <span className="w-2 h-2 bg-stone-300 rounded-full animate-bounce delay-75"></span>
               <span className="w-2 h-2 bg-stone-300 rounded-full animate-bounce delay-150"></span>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex-none pt-4 pb-4">
        <div className="relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your response..."
            className="w-full bg-white text-stone-900 rounded-2xl pl-6 pr-14 py-5 border border-stone-200 focus:outline-none focus:border-stone-400 transition-all font-medium shadow-sm"
          />
          <button
            onClick={handleSend}
            className="absolute right-3 top-3 p-2.5 bg-yellow-400 hover:bg-yellow-300 text-stone-900 rounded-xl transition-colors shadow-sm"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
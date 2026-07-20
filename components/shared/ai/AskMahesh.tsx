'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { MockAskMaheshService } from '@/lib/services/ai';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

export function AskMahesh() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'bot', text: "Hello! Ask me anything about Mahesh's projects, Linux certifications, training, or leadership experiences." }
  ]);
  const [loading, setLoading] = useState(false);
  
  const aiService = useRef(new MockAskMaheshService());
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const suggestions = [
    "What is your tech stack?",
    "Tell me about your Linux RHCSA certification.",
    "What projects have you built?"
  ];

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text: textToSend
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const reply = await aiService.current.ask(textToSend);
      const botMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: 'bot',
        text: reply
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 hover:bg-amber-600 text-zinc-950 shadow-lg hover:scale-105 transition-all cursor-pointer"
          aria-label="Ask Mahesh AI Assistant"
        >
          <MessageSquare className="w-5 h-5" />
        </button>
      )}

      {/* Chat Window Dialog Drawer */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[450px] rounded-2xl border border-zinc-900 bg-zinc-950 shadow-2xl flex flex-col overflow-hidden">
          
          {/* Header */}
          <div className="px-4 py-3 border-b border-zinc-900 bg-zinc-900/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-semibold text-zinc-200">Ask Mahesh AI</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-zinc-900 text-zinc-500 hover:text-zinc-300"
              aria-label="Close chat window"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(msg => {
              const isBot = msg.sender === 'bot';
              return (
                <div key={msg.id} className={`flex gap-2 items-start ${!isBot ? 'justify-end' : ''}`}>
                  {isBot && (
                    <div className="p-1 rounded bg-zinc-900 border border-zinc-800 text-amber-500 shrink-0">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-3 py-2 rounded-lg text-xs leading-relaxed ${
                      isBot 
                        ? 'bg-zinc-900/60 border border-zinc-900 text-zinc-300' 
                        : 'bg-amber-500 text-zinc-950 font-medium'
                    }`}
                  >
                    {msg.text}
                  </div>
                  {!isBot && (
                    <div className="p-1 rounded bg-amber-500/20 text-amber-500 shrink-0">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions boxes */}
          {messages.length === 1 && (
            <div className="px-4 py-2 flex flex-col gap-1 border-t border-zinc-900/30">
              <span className="text-[9px] uppercase tracking-wider text-zinc-600 font-semibold font-mono">Suggestions</span>
              <div className="flex flex-col gap-1.5">
                {suggestions.map(s => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    className="text-left text-[11px] text-zinc-400 hover:text-amber-500 transition-colors"
                  >
                    → {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input text box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="p-3 border-t border-zinc-900 bg-zinc-900/10 flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="h-8 text-xs"
              disabled={loading}
            />
            <Button
              type="submit"
              variant="primary"
              className="h-8 w-8 p-0 shrink-0"
              disabled={loading}
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

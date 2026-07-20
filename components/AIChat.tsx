"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Bot, User, CornerDownLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  sender: "bot" | "user";
  text: string;
}

export default function AIChat({ portfolioData }: { portfolioData: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hi there! I am Mahesh's AI Assistant. Ask me anything about his projects, skills, certifications, work history, or karate achievements!"
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInput("");

    // Processing response based on local search
    setTimeout(() => {
      const responseText = getResponse(userText.toLowerCase());
      setMessages((prev) => [...prev, { sender: "bot", text: responseText }]);
    }, 600);
  };

  const getResponse = (query: string): string => {
    if (query.includes("hello") || query.includes("hi") || query.includes("hey")) {
      return "Hello! How can I help you learn more about Mahesh today?";
    }
    if (query.includes("who is") || query.includes("about") || query.includes("mahesh")) {
      return `Mahesh Namdev Khandebharad is a Computer Science Engineering student based in Chhatrapati Sambhajinagar. He is a Technical Trainer, President of the T&P Cell, and a passionate DevOps & Linux builder.`;
    }
    if (query.includes("project") || query.includes("work") || query.includes("build")) {
      const list = portfolioData.projects.map((p: any) => `• ${p.title} (${p.category}): ${p.description}`).join("\n");
      return `Here are some featured projects built by Mahesh:\n\n${list}\n\nAsk me about any specific project (e.g., 'CHRI Platform' or 'PharmaManage') for more details!`;
    }
    if (query.includes("chri")) {
      const p = portfolioData.projects.find((pr: any) => pr.title.toLowerCase().includes("chri"));
      return `The CHRI Platform is a Child Health Record & Immunization tracking system built with ${p.tech}. It automates vaccination records and notifies parents.`;
    }
    if (query.includes("pharma")) {
      return `PharmaManage Pro is a pharmaceutical inventory & billing system built using Next.js, Radix UI, Tailwind, and PostgreSQL. It tracks stock and sales trends.`;
    }
    if (query.includes("army") || query.includes("depot")) {
      return `The Army Depot Management System is a secure logistics tool for ammunition and arsenal tracking. Built with React, SQLite, and Framer Motion for military depots.`;
    }
    if (query.includes("solidity") || query.includes("decentralized") || query.includes("blog")) {
      return `Mahesh built a Decentralized Blog using Ethereum smart contracts (Solidity), IPFS for storing files, and Next.js for a censorship-resistant publication hub.`;
    }
    if (query.includes("skill") || query.includes("tech") || query.includes("languages") || query.includes("stack")) {
      return `Mahesh's core tech stack includes:\n• Frontend: Next.js, React, TypeScript, Tailwind CSS, Framer Motion\n• Systems & Cloud: Red Hat Enterprise Linux (RHCSA), Docker, AWS, Google Cloud (64+ Skill Badges)\n• Backend: Node.js, Express, PostgreSQL, SQLite, MongoDB`;
    }
    if (query.includes("certification") || query.includes("certificate") || query.includes("rhcsa")) {
      const list = portfolioData.certifications.map((c: any) => `• ${c.title} (by ${c.issuer})`).join("\n");
      return `Mahesh holds several industry-standard certifications:\n\n${list}`;
    }
    if (query.includes("google cloud") || query.includes("gcp") || query.includes("badge")) {
      return `Mahesh has achieved 64+ Google Cloud Skill Badges, covering Associate Cloud Engineer tasks, Kubernetes Engine, DevOps architectures, and cloud networking.`;
    }
    if (query.includes("hackathon") || query.includes("cognisphere")) {
      const list = portfolioData.hackathons.map((h: any) => `• ${h.title}: ${h.result} (${h.date})`).join("\n");
      return `Mahesh is an active hackathon builder:\n\n${list}\n\nHe recently took 1st place in the CogniSphere Hackathon 2026!`;
    }
    if (query.includes("karate") || query.includes("black belt") || query.includes("sports")) {
      return `Mahesh holds a 1st Dan Black Belt in Shotokan Karate (awarded in 2023) after 6 years of training, demonstrating high discipline and focus.`;
    }
    if (query.includes("swami samarth")) {
      return `Mahesh is a devotee of Shri Swami Samarth, finding spiritual alignment and inspiration under the motto: '|| Shri Swami Samarth ||'.`;
    }
    if (query.includes("contact") || query.includes("email") || query.includes("phone")) {
      return `You can reach out to Mahesh via:\n• Email: ${portfolioData.personal.socials.email}\n• Phone: ${portfolioData.personal.socials.phone}\n• Location: ${portfolioData.personal.location}`;
    }
    if (query.includes("workshop") || query.includes("teaching")) {
      return `Mahesh delivered the workshop 'Hackathon Hacked 2K26' guiding 300+ engineering students on fast prototyping, ideation, and pitch delivery.`;
    }
    if (query.includes("leadership") || query.includes("placement") || query.includes("t&p")) {
      return `Mahesh is the President of the Training Placement & Entrepreneurship Student Cell, where he manages placement bootcamps and industrial connect drives for students.`;
    }

    return `I'm not fully sure about that query, but here's what you can ask me:\n• 'Show me your projects'\n• 'What certifications do you have?'\n• 'Tell me about your Linux/DevOps skills'\n• 'Contact info'\n• 'Karate achievements'`;
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-amber-500 hover:bg-amber-600 text-[#020202] rounded-full shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all transform hover:scale-115 flex items-center justify-center cursor-pointer"
        aria-label="Open AI Assistant"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] h-[500px] z-50 glass-panel rounded-2xl flex flex-col shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden border border-white/10"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-zinc-100">Mahesh's Assistant</h3>
                  <span className="text-[10px] text-emerald-500 flex items-center gap-1 font-mono">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" /> Online
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 text-zinc-400 hover:text-zinc-100 rounded-md transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex gap-2 max-w-[85%] ${
                      msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
                        msg.sender === "user"
                          ? "bg-zinc-800 text-zinc-400"
                          : "bg-amber-500/10 text-amber-500"
                      }`}
                    >
                      {msg.sender === "user" ? <User size={12} /> : <Bot size={12} />}
                    </div>
                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                        msg.sender === "user"
                          ? "bg-amber-500 text-[#020202] rounded-tr-none font-medium"
                          : "bg-zinc-900/90 text-zinc-200 rounded-tl-none border border-white/5"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSend}
              className="p-3 border-t border-white/10 bg-white/5 flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my RHCSA, T&P, karate..."
                className="flex-1 px-4 py-2 bg-zinc-900 border border-white/10 rounded-xl text-xs text-zinc-100 focus:outline-none focus:border-amber-500/50"
              />
              <button
                type="submit"
                className="p-2 bg-amber-500 hover:bg-amber-600 text-[#020202] rounded-xl flex items-center justify-center transition-colors cursor-pointer"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

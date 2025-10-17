"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import Image from "next/image";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Halo! Ada yang bisa saya bantu tentang Workshop SAQ 2025? 🤖",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Maaf, terjadi kesalahan. Silakan coba lagi.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Button - Fixed position */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 p-4 md:p-4 bg-biru hover:bg-blue-700 text-white rounded-full shadow-2xl transition-all ${
          isOpen ? "hidden" : "block"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle className="w-7 h-7 md:w-6 md:h-6" />
      </motion.button>

      {/* Chat Window - Responsive size & position */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 
                       w-[calc(100vw-2rem)] max-w-[380px] 
                       md:w-96 
                       h-[500px] md:h-[600px]
                       bg-white rounded-3xl border-2 border-black shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="bg-biru text-white p-3 md:p-4 rounded-t-3xl flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-3">
                {/* Bot Avatar */}
                <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-white/50 flex-shrink-0">
                  <Image
                    src="/bot-ws.png"
                    alt="SAQ Bot"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm md:text-base">
                    SAQ Bot
                  </h3>
                  <p className="text-xs text-white/80">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 md:p-2 hover:bg-white/20 rounded-full transition-all"
              >
                <X className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {/* Bot Avatar */}
                  {msg.role === "assistant" && (
                    <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full overflow-hidden border-2 border-gray-200 mt-auto">
                      <Image
                        src="/bot-ws.png"
                        alt="Bot"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[75%] p-2.5 md:p-3 rounded-2xl text-xs md:text-sm ${
                      msg.role === "user"
                        ? "bg-biru text-white rounded-br-sm"
                        : "bg-gray-100 text-gray-800 rounded-bl-sm"
                    }`}
                  >
                    <p className="leading-relaxed">{msg.content}</p>
                  </div>

                  {/* User Avatar */}
                  {msg.role === "user" && (
                    <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full bg-biru/20 flex items-center justify-center border-2 border-biru mt-auto">
                      <span className="text-biru text-[10px] md:text-xs font-bold">
                        U
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Loading */}
              {isLoading && (
                <div className="flex gap-2 justify-start">
                  <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full overflow-hidden border-2 border-gray-200">
                    <Image
                      src="/bot-ws.png"
                      alt="Bot"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div className="bg-gray-100 p-2.5 md:p-3 rounded-2xl rounded-bl-sm">
                    <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin text-gray-600" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 md:p-4 border-t-2 border-gray-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Tanya tentang workshop..."
                  className="flex-1 px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm border-2 border-gray-300 rounded-xl focus:border-biru focus:outline-none"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="p-2 md:p-3 bg-biru hover:bg-blue-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Send className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

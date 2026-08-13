"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageSquare } from "lucide-react";

interface Message {
    role: "user" | "assistant";
    content: string;
}

const INITIAL_MESSAGE: Message = {
    role: "assistant",
    content: "Hi! I'm Coffee's assistant 👋 Ask me anything about photography services, pricing, or how to book a session.",
};

const QUICK_QUESTIONS = [
    "What are your prices?",
    "How do I book?",
    "Do you travel outside Lagos?",
    "How long to get photos?",
];

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showWidget, setShowWidget] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => setShowWidget(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (isOpen) inputRef.current?.focus();
    }, [isOpen]);

    const sendMessage = async (content: string) => {
        if (!content.trim() || isLoading) return;

        const userMessage: Message = { role: "user", content };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: newMessages.filter((m) => m.role !== "assistant" || m !== INITIAL_MESSAGE),
                }),
            });
            const data = await res.json();
            setMessages([...newMessages, { role: "assistant", content: data.message }]);
        } catch {
            setMessages([
                ...newMessages,
                {
                    role: "assistant",
                    content: "Sorry, I'm having trouble. Please message Coffee directly on WhatsApp.",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage(input);
        }
    };

    return (
        <>
            <AnimatePresence>
                {showWidget && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-20 md:bottom-24 right-6 z-[190] hidden md:flex flex-col items-end gap-3"
                    >

                        {/* Chat window */}
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="w-[340px] sm:w-[380px] bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                                >
                                    {/* Header */}
                                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-black">
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                                                    <span className="signature-font text-amber-400 text-sm">C</span>
                                                </div>
                                                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border border-black" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-white">
                                                    Coffee's Assistant
                                                </p>
                                                <p className="text-[9px] text-green-400">
                                                    Online now
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                                        >
                                            <X size={12} className="text-white/40" />
                                        </button>
                                    </div>

                                    {/* Messages */}
                                    <div className="h-72 overflow-y-auto p-4 flex flex-col gap-3 scrollbar-thin">
                                        {messages.map((msg, i) => (
                                            <div
                                                key={i}
                                                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                            >
                                                <div
                                                    className={`max-w-[85%] px-3 py-2.5 rounded-xl text-xs leading-relaxed ${
                                                        msg.role === "user"
                                                            ? "bg-amber-500 text-black font-medium"
                                                            : "bg-white/5 border border-white/5 text-white/70"
                                                    }`}
                                                >
                                                    {msg.content}
                                                </div>
                                            </div>
                                        ))}

                                        {/* Loading indicator */}
                                        {isLoading && (
                                            <div className="flex justify-start">
                                                <div className="bg-white/5 border border-white/5 rounded-xl px-4 py-3 flex items-center gap-1.5">
                                                    {[0, 1, 2].map((i) => (
                                                        <motion.div
                                                            key={i}
                                                            className="w-1.5 h-1.5 rounded-full bg-white/30"
                                                            animate={{ opacity: [0.3, 1, 0.3] }}
                                                            transition={{
                                                                duration: 1,
                                                                repeat: Infinity,
                                                                delay: i * 0.2,
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        <div ref={messagesEndRef} />
                                    </div>

                                    {/* Quick questions — only show at start */}
                                    {messages.length <= 1 && (
                                        <div className="px-4 pb-3 flex flex-wrap gap-1.5">
                                            {QUICK_QUESTIONS.map((q) => (
                                                <button
                                                    key={q}
                                                    onClick={() => sendMessage(q)}
                                                    className="text-[10px] px-2.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/8 hover:border-amber-400/30 text-white/50 hover:text-white rounded-full transition-all duration-200"
                                                >
                                                    {q}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Input */}
                                    <div className="flex items-center gap-2 px-3 py-3 border-t border-white/5">
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder="Ask anything..."
                                            className="flex-1 bg-white/5 border border-white/8 rounded-xl px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-amber-400/30 transition-colors"
                                        />
                                        <motion.button
                                            onClick={() => sendMessage(input)}
                                            disabled={!input.trim() || isLoading}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-8 h-8 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors flex-shrink-0"
                                        >
                                            <Send size={12} className="text-black" />
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Toggle button */}
                        <motion.button
                            onClick={() => setIsOpen(!isOpen)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-12 h-12 rounded-full bg-black border border-white/15 hover:border-amber-400/40 flex items-center justify-center shadow-xl transition-all duration-300"
                            aria-label="Open chat"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {isOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        <X size={18} className="text-white/60" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="open"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        <MessageSquare size={18} className="text-amber-400" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
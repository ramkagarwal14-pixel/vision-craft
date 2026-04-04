"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./Chatbot.module.css";

type Message = {
    id: number;
    text: string;
    sender: "bot" | "user";
};

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Welcome to VisionCraft! How can I assist you today?", sender: "bot" }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleQuickReply = (question: string, botResponse: string) => {
        const userMsg: Message = { id: Date.now(), text: question, sender: "user" };
        setMessages(prev => [...prev, userMsg]);

        setIsTyping(true);
        setTimeout(() => {
            const botMsg: Message = { id: Date.now() + 1, text: botResponse, sender: "bot" };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1000);
    };

    return (
        <div className={styles.chatbotWrapper}>
            {!isOpen && (
                <button
                    className={styles.chatbotToggle}
                    onClick={() => setIsOpen(true)}
                    aria-label="Open support chat"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                </button>
            )}

            {isOpen && (
                <div className={styles.chatWindow}>
                    <div className={styles.chatHeader}>
                        <div className={styles.botInfo}>
                            <div className={styles.botAvatar}>VC</div>
                            <div>
                                <h4>VisionCraft Assistant</h4>
                                <span>Automated Support</span>
                            </div>
                        </div>
                        <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>×</button>
                    </div>

                    <div className={styles.chatBody}>
                        {messages.map((msg) => (
                            <div key={msg.id} className={`${styles.message} ${msg.sender === "bot" ? styles.botMsg : styles.userMsg}`}>
                                <p>{msg.text}</p>
                            </div>
                        ))}
                        {isTyping && (
                            <div className={`${styles.message} ${styles.botMsg} ${styles.typing}`}>
                                <span className={styles.dot}></span>
                                <span className={styles.dot}></span>
                                <span className={styles.dot}></span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className={styles.chatOptions}>
                        <p className={styles.optionsTitle}>Popular Questions:</p>
                        <button onClick={() => handleQuickReply("Where is my order?", "You can track your order status in real-time by clicking 'Track Order' at the top of the page, or by visiting your Account Dashboard.")}>
                            Track my order
                        </button>
                        <button onClick={() => handleQuickReply("How does the AR Try-On work?", "Simply click the 'Virtual Try-On' button on any product page, allow camera access, and instantly see the frames on your face!")}>
                            How does AR work?
                        </button>
                        <button onClick={() => handleQuickReply("What is your return policy?", "We offer a 14-day zero-questions-asked return policy. If the frames don't fit perfectly, simply drop them at any of our flagship stores or mail them back.")}>
                            Returns & Exchanges
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

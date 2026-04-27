import React, { useState, useRef, useEffect } from 'react';
import styles from './Chatbot.module.css';
import { chatbotService } from '../services/chatbotService';

const MessageArea = ({ messages, isTyping, messagesEndRef }) => {
  return (
    <div className={styles.messagesArea}>
      {messages.map((msg, idx) => (
        <div key={idx} className={`${styles.messageWrapper} ${msg.sender === 'bot' ? styles.bot : styles.user}`}>
          <div className={styles.messageBubble}>
            {msg.text}
          </div>
          <div className={styles.timestamp}>
            {msg.timestamp}
          </div>
        </div>
      ))}
      
      {isTyping && (
        <div className={`${styles.messageWrapper} ${styles.bot}`}>
          <div className={`${styles.messageBubble} ${styles.typingIndicator}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  
  const messagesEndRef = useRef(null);
  
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    // Upon opening for the first time, show greeting
    if (!isOpen && messages.length === 0) {
      setMessages([
        {
          text: "Hello! Welcome to J-NEON IT HUB. How can I help you today?",
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages(prev => [...prev, { text: userText, sender: 'user', timestamp }]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await chatbotService.chat(userText, sessionId);
      const botResponse = response.answer;
      
      // Update session id if not set yet
      if (!sessionId && response.session_id) {
        setSessionId(response.session_id);
      }

      setMessages(prev => [...prev, {
        text: botResponse,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (error) {
      console.error("Error communicating with Chatbot backend:", error);
      setMessages(prev => [...prev, {
        text: "I'm sorry, I'm having trouble connecting to my service right now. Please try again later.",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend(e);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button 
          className={styles.floatingButton} 
          onClick={toggleChatbot}
          aria-label="Open Chat"
        >
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={styles.chatbotContainer}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerIcon}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"></path>
              </svg>
            </div>
            <div className={styles.headerText}>
              <h3>J-NEON Support</h3>
              <span>We typically reply instantly</span>
            </div>
            <button className={styles.closeButton} onClick={toggleChatbot} aria-label="Close Chat">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <MessageArea messages={messages} isTyping={isTyping} messagesEndRef={messagesEndRef} />

          {/* Input Area */}
          <div className={styles.inputArea}>
            <div className={styles.inputFieldWrapper}>
              <input 
                type="text" 
                className={styles.inputField} 
                placeholder="Type your message..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isTyping}
              />
            </div>
            <button 
              className={styles.sendButton} 
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              aria-label="Send Message"
            >
              <svg viewBox="0 0 24 24">
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

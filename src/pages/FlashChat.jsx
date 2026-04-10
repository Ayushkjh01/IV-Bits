import React, { useState, useEffect, useRef } from 'react';
import { Timer, Send, AlertTriangle, User } from 'lucide-react';
import PaywallModal from '../components/PaywallModal';
import './FlashChat.css';

const FlashChat = () => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I saw you match my target company. I'm a Frontend developer looking for a referral.", sender: 'sent', time: '10:00 AM' },
    { id: 2, text: "Hey there! I'd love to learn more about your experience with React.", sender: 'received', time: '10:01 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [moderationWarning, setModerationWarning] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  
  const messagesEndRef = useRef(null);

  // Formatting timer
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      if (!isUnlocked) setIsLocked(true);
      return;
    }
    if (isUnlocked) return; // Stop timer if unlocked via paywall
    
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isUnlocked]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Moderation filter logic
  const checkModeration = (text) => {
    // Basic regex catching phone numbers, emails, and common domains (linkedin, github, general URLs)
    const urlPattern = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|(\b[a-z0-9-]+\.(com|org|net|io|in)\b)/gi;
    const phonePattern = /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/im;
    const emailPattern = /\S+@\S+\.\S+/;
    
    return urlPattern.test(text) || phonePattern.test(text) || emailPattern.test(text);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || isLocked) return;

    if (!isUnlocked && checkModeration(newMessage)) {
      setModerationWarning(true);
      return;
    }

    setModerationWarning(false);
    
    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'sent',
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Auto-reply simulation
    setTimeout(() => {
      if (isLocked) return;
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: "That sounds impressive. Could we go over your latest project?",
        sender: 'received',
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      }]);
    }, 2000);
  };

  const handleUnlockChat = () => {
    setIsUnlocked(true);
    setIsLocked(false);
    setTimeLeft(300); // Give 5 more mins or stop timer based on business logic
  };

  const handleUnlockProfile = () => {
    setIsUnlocked(true);
    setIsLocked(false);
    // Real app would reveal LinkedIn link and stop timer indefinitely
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text: "System: Employer's full profile unlocked. You may now share external links freely.",
      sender: 'system',
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }]);
  };

  // Test button to skip timer for testing
  const skipTimer = () => setTimeLeft(2);

  return (
    <div className="chat-container animate-fade-in">
      {isLocked && (
        <PaywallModal onUnlockChat={handleUnlockChat} onUnlockProfile={handleUnlockProfile} />
      )}

      <div className="chat-header">
        <div className="chat-user-info">
          <div className="chat-avatar"><User size={24} /></div>
          <div className="chat-user-details">
            <h3>Senior Backend Engineer</h3>
            <p>At FinTech Startup</p>
          </div>
        </div>
        
        {!isUnlocked && (
          <div className={`timer-box ${timeLeft < 30 ? 'warning' : ''}`} onClick={skipTimer}>
            <Timer size={18} /> {timeString}
          </div>
        )}
      </div>

      <div className="chat-messages">
        <div style={{textAlign: 'center', margin: '1rem 0', color: 'var(--slate-grey)', fontSize: '0.8rem'}}>
          Flash Chat Started. You have {isUnlocked ? 'unlimited' : '5'} minutes to make an impression!
        </div>
        
        {messages.map((msg) => (
          msg.sender === 'system' ? (
             <div key={msg.id} style={{textAlign: 'center', color: 'var(--mint-green-hover)', fontSize: '0.85rem', padding: '0.5rem', background: 'var(--mint-green-light)', borderRadius: '8px', marginBottom: '1rem'}}>
               {msg.text}
             </div>
          ) : (
            <div key={msg.id} className={`message ${msg.sender}`}>
              <div className="message-content">{msg.text}</div>
              <span className="message-time">{msg.time}</span>
            </div>
          )
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        {moderationWarning && (
           <div className="moderation-alert">
             <AlertTriangle size={16} /> Contact details, links (like LinkedIn), or emails cannot be shared during the free trial!
           </div>
        )}
        
        <form className="chat-input-form" onSubmit={handleSendMessage}>
          <textarea
            className="chat-input"
            placeholder={isLocked ? "Chat locked..." : "Type your message..."}
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              if (moderationWarning) setModerationWarning(false);
            }}
            disabled={isLocked}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
          />
          <button type="submit" className="send-btn" disabled={isLocked || !newMessage.trim()}>
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default FlashChat;

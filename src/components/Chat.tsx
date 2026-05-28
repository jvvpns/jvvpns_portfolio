'use client';

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';


type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi there! 👋🏻 I'm JV. Thanks for visiting my website. Ask me anything about my work!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Typewriter Sync
  const [targetText, setTargetText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // High-performance catch-up typewriter
  useEffect(() => {
    if (targetText.length > 0) {
      setIsTyping(true);
      const timer = setInterval(() => {
        setMessages(prev => {
          const newMsgs = [...prev];
          const lastMsg = newMsgs[newMsgs.length - 1];
          
          if (lastMsg.role === 'assistant' && lastMsg.content.length < targetText.length) {
            newMsgs[newMsgs.length - 1] = {
              ...lastMsg,
              content: targetText.slice(0, lastMsg.content.length + 1)
            };
            return newMsgs;
          } else {
            clearInterval(timer);
            setIsTyping(false);
            return prev;
          }
        });
      }, 10); // Fast, smooth typing

      return () => clearInterval(timer);
    }
  }, [targetText]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setTargetText(''); // Reset target for new message

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error('Failed to connect');

      // Prep assistant message
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let accumulated = '';

      while (!done) {
        const { value, done: doneReading } = await reader!.read();
        done = doneReading;
        const chunk = decoder.decode(value, { stream: !done });
        accumulated += chunk;
        setTargetText(accumulated); // Update target so typewriter catches up
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now. Please try again later!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: isOpen ? 'none' : 'flex',
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          height: '48px',
          padding: '0 20px',
          borderRadius: '24px',
          background: 'var(--accent)',
          color: 'var(--bg)',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          boxShadow: 'var(--shadow-md)',
          cursor: 'pointer',
          zIndex: 1000,
          border: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
      >
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, whiteSpace: 'nowrap' }}>Chat with JV</span>
          </>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fade-up"
          style={{
            position: 'fixed',
            bottom: '6rem',
            right: '2rem',
            width: 'clamp(320px, 90vw, 400px)',
            height: 'min(550px, 70vh)',
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 'var(--shadow-md)',
            zIndex: 1000,
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div style={{ padding: '1rem', borderBottom: '1px solid var(--border)', background: 'var(--surface)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img 
              src="/assets/chat_profile.jpg" 
              alt="JV"
              style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border)' }}
            />
            <div>
              <p style={{ fontSize: '0.85rem', fontWeight: 700 }}>John Vincent (JV)</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--status-dot)', display: 'inline-block' }} />
                <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Online</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ 
                marginLeft: 'auto',
                background: 'var(--surface)', 
                border: '1px solid var(--border)', 
                borderRadius: '50%', 
                width: '36px', 
                height: '36px', 
                minWidth: '36px',
                minHeight: '36px',
                flexShrink: 0,
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                cursor: 'pointer', 
                color: 'var(--text-primary)',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                padding: 0
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(90deg)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(0deg)'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            style={{
              flex: 1,
              padding: '1.25rem',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              background: 'var(--bg)',
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '90%',
                  padding: '0.85rem 1.1rem',
                  borderRadius: msg.role === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                  background: msg.role === 'user' ? 'var(--accent)' : 'var(--surface)',
                  border: msg.role === 'user' ? 'none' : '1px solid var(--border)',
                  color: msg.role === 'user' ? 'var(--bg)' : 'var(--text-primary)',
                  fontSize: '0.82rem',
                  lineHeight: 1.6,
                  boxShadow: msg.role === 'user' ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                <div className="markdown-content">
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <p style={{ margin: 0 }}>{children}</p>,
                      ul: ({ children }) => <ul style={{ margin: '0.5rem 0', paddingLeft: '1.2rem' }}>{children}</ul>,
                      ol: ({ children }) => <ol style={{ margin: '0.5rem 0', paddingLeft: '1.2rem' }}>{children}</ol>,
                      li: ({ children }) => <li style={{ marginBottom: '0.25rem' }}>{children}</li>,
                      strong: ({ children }) => <strong style={{ fontWeight: 700 }}>{children}</strong>,
                      code: ({ children }) => (
                        <code style={{ 
                          background: 'var(--tag-bg)',
                          border: '1px solid var(--border)', 
                          padding: '0.2rem 0.4rem', 
                          borderRadius: '4px',
                          fontSize: '0.9em',
                          fontFamily: 'monospace'
                        }}>
                          {children}
                        </code>
                      ),
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            {isLoading && !isTyping && targetText === '' && (
              <div style={{ alignSelf: 'flex-start', background: 'var(--surface)', padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                JV is thinking...
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} style={{ padding: '1rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              style={{
                flex: 1,
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                background: 'var(--surface)',
                color: 'var(--text-primary)',
                fontSize: '16px', // 16px prevents iOS Safari zoom on focus
                outline: 'none',
              }}
            />
            <button
              type="submit"
              disabled={isLoading}
              style={{
                background: 'var(--accent)',
                color: 'var(--bg)',
                border: 'none',
                padding: '0 1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                opacity: isLoading ? 0.5 : 1,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" /><polyline points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}

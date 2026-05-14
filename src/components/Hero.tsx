'use client';

import { useState } from "react";
import { site, awards } from "@/lib/data";

export default function Hero() {
  const [showAwards, setShowAwards] = useState(false);

  return (
    <section style={{ paddingTop: "clamp(2.5rem, 8vh, 4rem)", paddingBottom: "3rem", borderBottom: "1px solid var(--border)" }}>
      <div 
        style={{ 
          display: "flex", 
          flexDirection: "row", 
          alignItems: "flex-start", 
          gap: "clamp(1.5rem, 5vw, 2.5rem)", 
          flexWrap: "wrap" 
        }}
      >
        {/* Left Side: Image */}
        <div 
          className="fade-up"
          style={{ 
            flexShrink: 0,
            animationDelay: "0.05s",
            marginTop: "0.5rem"
          }}
        >
          <div
            style={{
              width: "clamp(100px, 12vw, 120px)",
              height: "clamp(100px, 12vw, 120px)",
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--surface) 0%, var(--border) 100%)",
              border: "3px solid var(--bg)",
              boxShadow: "0 0 0 1px var(--border), var(--shadow-md)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden"
            }}
          >
            <img
              src="/assets/portfolio_profile_lm.jpg"
              alt={site.name}
              className="light-image"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
            <img
              src="/assets/portfolio_profile_dm.jpg"
              alt={site.name}
              className="dark-image"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
        </div>

        {/* Right Side: Content */}
        <div style={{ flex: "1 1 400px" }}>
          {/* Top Metadata Row */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
            <p
              className="fade-up"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "var(--text-muted)",
                animationDelay: "0.1s",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {site.location}
            </p>
            
            <button
              onClick={() => setShowAwards(true)}
              className="fade-up"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.72rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                background: "var(--surface)",
                border: "1.5px solid #d4a017",
                borderRadius: "100px",
                padding: "0.25rem 0.6rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
                animationDelay: "0.12s",
                boxShadow: "0 2px 8px rgba(212, 160, 23, 0.1)",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#b48c14" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
              </svg>
              View Distinctions
            </button>
          </div>

          {/* Name & Role */}
          <div style={{ marginBottom: "1rem" }}>
            <h1
              className="fade-up"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 2.5rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                color: "var(--text-primary)",
                marginBottom: "0.4rem",
                letterSpacing: "-0.02em",
                animationDelay: "0.15s",
              }}
            >
              {site.firstName} {site.lastName}
            </h1>
            <p
              className="fade-up"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "var(--text-secondary)",
                animationDelay: "0.2s",
              }}
            >
              {site.role}
            </p>
          </div>

          {/* Tagline */}
          <p
            className="fade-up"
            style={{
              fontSize: "0.88rem",
              color: "var(--text-secondary)",
              maxWidth: "540px",
              lineHeight: 1.6,
              marginBottom: "1.25rem",
              animationDelay: "0.25s",
            }}
          >
            {site.tagline}
          </p>

          {/* Status badge */}
          <div
            className="fade-up status-pill"
            style={{
              marginBottom: "2.5rem",
              animationDelay: "0.25s",
            }}
          >
            <span className="status-dot" />
            {site.status}
          </div>

          {/* CTA Buttons */}
          <div
            className="fade-up"
            style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", animationDelay: "0.35s" }}
          >
            <a href="#projects" className="btn-primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              View Projects
            </a>
            <a href={`mailto:${site.email}`} className="btn-ghost">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
              </svg>
              Email Me
            </a>
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Awards Modal */}
      {showAwards && (
        <div
          onClick={() => setShowAwards(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(13, 27, 53, 0.8)",
            backdropFilter: "blur(8px)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="fade-up"
            style={{
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "2rem",
              maxWidth: "500px",
              width: "100%",
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>Awards & Distinctions</h3>
              <button 
                onClick={() => setShowAwards(false)} 
                style={{ 
                  background: "var(--surface)", 
                  border: "1px solid var(--border)", 
                  color: "var(--text-muted)", 
                  cursor: "pointer",
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <ul className="bullet-list">
              {awards.map((award, i) => (
                <li key={i} style={{ marginBottom: "0.85rem", lineHeight: 1.6, fontSize: "0.9rem", color: "var(--text-secondary)" }}>{award}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}

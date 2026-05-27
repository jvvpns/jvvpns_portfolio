'use client';

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { site, techStack, certificates } from "@/lib/data";

const categoryIcons: Record<string, React.ReactNode> = {
  "Languages": (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  "Frontend & Mobile": (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
  "AI & Data Engineering": (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v8" /><path d="m4.93 4.93 5.66 5.66" /><path d="M2 12h8" /><path d="m4.93 19.07 5.66-5.66" /><path d="M12 22v-8" /><path d="m19.07 19.07-5.66-5.66" /><path d="M22 12h-8" /><path d="m19.07 4.93-5.66 5.66" />
    </svg>
  ),
  "Cloud & Backend": (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  "Operational Reliability": (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="m9 12 2 2 4-4" />
    </svg>
  ),
};

export default function About() {
  const [selectedCertificate, setSelectedCertificate] = useState<typeof certificates[0] | null>(null);
  const [mounted, setMounted] = useState(false);
  const stackEntries = Object.entries(techStack);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedCertificate) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedCertificate]);

  const renderDetailModal = () => {
    if (!mounted || !selectedCertificate) return null;
    return createPortal(
      <div className="modal-overlay" style={{ zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }} onClick={() => setSelectedCertificate(null)}>
        <div 
          className="modal-content" 
          onClick={(e) => e.stopPropagation()}
          style={{ 
            maxWidth: '900px', 
            width: '100%', 
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}
        >
          <button 
            onClick={() => setSelectedCertificate(null)}
            style={{ 
              position: 'absolute', 
              top: '1.5rem', 
              right: '1.5rem', 
              background: 'var(--surface)', 
              border: '1px solid var(--border)', 
              borderRadius: '50%', 
              width: '48px', 
              height: '48px', 
              minWidth: '48px',
              minHeight: '48px',
              flexShrink: 0,
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              cursor: 'pointer', 
              zIndex: 10, 
              color: 'var(--text-primary)',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              padding: 0
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(90deg)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(0deg)'}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div style={{ width: '100%', background: 'var(--surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
            {selectedCertificate.imageUrl ? (
              <img 
                src={selectedCertificate.imageUrl} 
                alt={selectedCertificate.title} 
                style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain' }} 
              />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--text-muted)' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem', opacity: 0.5 }}>
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                </svg>
                <p style={{ fontWeight: 600 }}>Image not yet uploaded</p>
              </div>
            )}
          </div>
          
          <div style={{ padding: '2rem' }}>
            <span style={{ 
              fontFamily: "var(--font-mono)", 
              fontSize: "0.8rem", 
              fontWeight: 700, 
              color: "var(--text-muted)", 
              background: "var(--surface)", 
              padding: "0.3rem 0.6rem", 
              borderRadius: "4px",
              marginBottom: "1rem",
              display: "inline-block"
            }}>
              {selectedCertificate.year}
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
              {selectedCertificate.title}
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              Issued by {selectedCertificate.issuer}
            </p>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <section id="about" style={{ paddingTop: "2.5rem", paddingBottom: "2.5rem", borderBottom: "1px solid var(--border)" }}>
      <h2 className="section-title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
        </svg>
        About
      </h2>

      {/* Bio */}
      <div style={{ marginBottom: "2rem" }}>
        {site.about.map((paragraph, index) => (
          <p
            key={index}
            style={{
              fontSize: "0.88rem",
              color: "var(--text-secondary)",
              lineHeight: 1.6,
              marginBottom: "0.75rem",
            }}
          >
            {paragraph}
          </p>
        ))}
      </div>

      {/* Tech Stack Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem", marginBottom: "3rem" }}>
        {stackEntries.map(([category, items]) => (
          <div key={category}>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "0.5rem",
              }}
            >
              {categoryIcons[category] || null}
              {category}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
              {items.map((item) => (
                <span key={item} className="tag">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Certificates Slideshow */}
      <div style={{ marginTop: "3rem" }}>
        <h3 style={{ 
          fontSize: "1.1rem", 
          fontWeight: 800, 
          color: "var(--text-primary)", 
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="7"></circle>
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
          </svg>
          Certifications
        </h3>
        
        <div style={{ 
          display: "flex", 
          gap: "1.25rem", 
          overflowX: "auto", 
          paddingBottom: "1.5rem",
          paddingRight: "1rem",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          marginRight: "-1rem" // Negative margin to allow full-width scroll on mobile
        }}>
          {certificates.map((cert, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedCertificate(cert)}
              style={{ 
                minWidth: "280px",
                maxWidth: "320px",
                flex: "0 0 auto",
                scrollSnapAlign: "start",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.08)";
                e.currentTarget.style.borderColor = "var(--text-muted)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.03)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              {cert.imageUrl ? (
                <div style={{ width: "100%", aspectRatio: "4/3", borderRadius: "8px", overflow: "hidden", background: "var(--surface-hover)", marginBottom: "0.5rem" }}>
                  <img src={cert.imageUrl} alt={cert.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ) : (
                <div style={{ 
                  width: "100%", 
                  aspectRatio: "4/3", 
                  borderRadius: "8px", 
                  background: "var(--surface-hover)", 
                  marginBottom: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-muted)",
                  border: "1px dashed var(--border)"
                }}>
                  <div style={{ textAlign: "center" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 0.5rem", opacity: 0.5 }}>
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                    </svg>
                    <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>Image Placeholder</span>
                  </div>
                </div>
              )}
              
              <div>
                <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.25rem", lineHeight: 1.3 }}>{cert.title}</h4>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 500 }}>{cert.issuer}</p>
              </div>
              <span style={{ 
                fontFamily: "var(--font-mono)", 
                fontSize: "0.7rem", 
                fontWeight: 700, 
                color: "var(--text-muted)", 
                background: "var(--surface-hover)", 
                padding: "0.2rem 0.5rem", 
                borderRadius: "4px",
                alignSelf: "flex-start",
                marginTop: "auto"
              }}>
                {cert.year}
              </span>
            </div>
          ))}
        </div>
      </div>
      {renderDetailModal()}
    </section>
  );
}

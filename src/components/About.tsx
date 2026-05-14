'use client';

import { site, techStack } from "@/lib/data";

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
  const stackEntries = Object.entries(techStack);

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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
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
    </section>
  );
}

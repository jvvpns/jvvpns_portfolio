import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" style={{ paddingTop: "2.5rem", paddingBottom: "2.5rem", borderBottom: "1px solid var(--border)" }}>
      {/* Experience */}
      <h2 className="section-title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
        Experience & Leadership
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {experience.map((exp, i) => (
          <div key={i} style={{ position: "relative" }}>
            {/* Role Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: "0.65rem",
                gap: "1rem",
              }}
            >
              <div style={{ maxWidth: "80%" }}>
                <p
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    lineHeight: 1.2,
                    marginBottom: "0.2rem",
                  }}
                >
                  {exp.role}
                </p>
                <p
                  style={{
                    fontSize: "0.83rem",
                    fontWeight: 600,
                    color: "var(--text-muted)",
                  }}
                >
                  {exp.company}
                </p>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  fontWeight: 500,
                  color: "var(--text-muted)",
                  whiteSpace: "nowrap",
                }}
              >
                {exp.year}
              </span>
            </div>

            {/* Bullets - Refined for readability */}
            {exp.bullets && exp.bullets.length > 0 && (
              <ul className="bullet-list" style={{ marginTop: "0.5rem" }}>
                {exp.bullets.map((bullet, idx) => (
                  <li 
                    key={idx} 
                    style={{ 
                      fontSize: "0.85rem", 
                      color: "var(--text-secondary)", 
                      lineHeight: 1.6, 
                      marginBottom: "0.45rem",
                      opacity: 0.9
                    }}
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

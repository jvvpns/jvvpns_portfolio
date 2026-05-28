'use client';

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { projects } from "@/lib/data";

type Project = typeof projects[0];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isGridModalOpen, setIsGridModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const recentProjects = projects.slice(0, 2);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedProject || isGridModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProject, isGridModalOpen]);

  const renderGridModal = () => {
    if (!mounted || !isGridModalOpen) return null;
    return createPortal(
      <div className="modal-overlay" onClick={() => setIsGridModalOpen(false)}>
        <div 
          className="modal-content" 
          onClick={(e) => e.stopPropagation()}
          style={{ 
            maxWidth: '1100px', 
            flexDirection: 'column', 
            padding: '3rem',
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.5)',
            display: 'flex'
          }}
        >
          {/* Top Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem', width: '100%' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                All Projects
              </h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', fontWeight: 500, maxWidth: '600px', lineHeight: 1.5 }}>
                A curated gallery of systems, applications, and experiments I've built throughout my career.
              </p>
            </div>
            <button 
              onClick={() => setIsGridModalOpen(false)} 
              style={{ 
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
          </div>
          
          {/* Scrollable Gallery Grid */}
          <div 
            className="gallery-grid"
            style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 480px), 1fr))", 
              gap: "1.5rem",
              overflowY: 'auto',
              flex: 1,
              width: '100%',
              paddingRight: '0.5rem',
              paddingBottom: '1rem'
            }}
          >
            {projects.map((project) => (
              <ProjectCard 
                key={project.name} 
                project={project} 
                showTags={true}
                onClick={() => setSelectedProject(project)} 
              />
            ))}
          </div>
        </div>
      </div>,
      document.body
    );
  };

  const renderDetailModal = () => {
    if (!mounted || !selectedProject) return null;
    return createPortal(
      <div className="modal-overlay" style={{ zIndex: 99999 }} onClick={() => setSelectedProject(null)}>
        <div className="modal-content detail-view" onClick={(e) => e.stopPropagation()}>
          <button 
            onClick={() => setSelectedProject(null)}
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

          <div className="modal-left" style={{ position: 'relative', overflow: 'hidden' }}>
              <div className="preview-placeholder">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                </svg>
                <p style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '1.5rem', color: 'var(--text-primary)' }}>System Discovery</p>
                <p style={{ fontSize: '0.85rem', opacity: 0.8, maxWidth: '280px', lineHeight: 1.6 }}>Contact the developer for a live interactive link to {selectedProject.name}.</p>
              </div>
          </div>

          <div className="modal-right">
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>
              {selectedProject.subtitle} • {selectedProject.year}
            </p>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
              {selectedProject.name}
            </h2>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                {selectedProject.description}
              </p>
              
              <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Tech Stack
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '3rem' }}>
                {selectedProject.tech.map((t) => (
                  <span key={t} className="tag" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem', borderRadius: '6px' }}>{t}</span>
                ))}
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <section id="projects" style={{ paddingTop: "3rem", paddingBottom: "3rem", borderBottom: "1px solid var(--border)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h2 className="section-title" style={{ marginBottom: 0, fontSize: '1.25rem' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
          </svg>
          Recent Projects
        </h2>
        <button 
          onClick={() => setIsGridModalOpen(true)}
          style={{ 
            fontSize: "0.9rem", color: "var(--text-secondary)", background: "none", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", gap: "0.35rem", fontWeight: 700, transition: "all 0.2s"
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
        >
          View All
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))", gap: "1.5rem" }}>
        {recentProjects.map((project) => (
          <ProjectCard key={project.name} project={project} onClick={() => setSelectedProject(project)} />
        ))}
      </div>

      {renderGridModal()}
      {renderDetailModal()}
    </section>
  );
}

function ProjectCard({ project, onClick, showTags = false }: { project: Project, onClick: () => void, showTags?: boolean }) {
  return (
    <div
      className="card fade-up"
      onClick={onClick}
      style={{ 
        cursor: 'pointer', 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%', 
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem", gap: "1rem" }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            {project.name}
          </h3>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: '0.1rem' }}>
            {project.subtitle}
          </p>
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", background: 'var(--surface-hover)', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>
          {project.year}
        </span>
      </div>

      <p style={{ 
        fontSize: "0.9rem", 
        color: "var(--text-secondary)", 
        lineHeight: 1.7, 
        margin: "0.75rem 0 1.5rem", 
        display: '-webkit-box',
        WebkitLineClamp: 4,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        minHeight: '6em'
      }}>
        {project.description}
      </p>

      {showTags && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
          {project.tech.slice(0, 3).map((t) => (
            <span key={t} style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-muted)', background: 'var(--accent-soft)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
              {t}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-muted)', padding: '0.15rem 0.25rem' }}>
              +{project.tech.length - 3}
            </span>
          )}
        </div>
      )}

      <div style={{ display: "flex", gap: "0.5rem", marginTop: 'auto' }}>
        <button className="btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.8rem", pointerEvents: 'none', fontWeight: 700 }}>
          View Project
        </button>
      </div>
    </div>
  );
}

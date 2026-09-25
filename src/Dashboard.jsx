// SVG Icons — inline, no emoji
const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconAlert = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 5v3.5M8 10.5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconEye = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

export default function Dashboard({
  autoApproved,
  pendingCount,
  corrections,
  onGoToReview,
  onGoToParent,
}) {
  return (
    <div>
      {/* Hero stat */}
      <div className="dash-hero">
        <div className="dash-hero-number">47</div>
        <div className="dash-hero-label">reels generated this week</div>
      </div>

      {/* Two stat cards */}
      <div className="dash-stats">
        <div className="dash-stat-card">
          <div className="dash-stat-number success">{autoApproved}</div>
          <div className="dash-stat-label">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <IconCheck /> auto-approved
            </span>
          </div>
        </div>
        <div
          className={`dash-stat-card ${pendingCount > 0 ? 'interactive' : ''}`}
          onClick={pendingCount > 0 ? onGoToReview : undefined}
        >
          <div className="dash-stat-number accent">{pendingCount}</div>
          <div className="dash-stat-label">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              {pendingCount > 0 ? <><IconAlert /> need review <IconArrow /></> : <><IconCheck /> all reviewed</>}
            </span>
          </div>
        </div>
      </div>

      {/* Recently corrected */}
      <div className="card">
        <div className="dash-section-title">Recently corrected</div>
        {corrections.slice(0, 4).map(c => (
          <div key={c.id} className="dash-correction-item">
            <div className="dash-correction-jersey">#{c.jersey}</div>
            <div className="dash-correction-text">
              <span>{c.original}</span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ margin: '0 6px', verticalAlign: 'middle' }}>
                <path d="M4 8h8M9 5l3 3-3 3" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <strong>{c.corrected}</strong>
            </div>
          </div>
        ))}
        {corrections.length === 0 && (
          <div style={{ fontSize: 13, color: '#6B6B6B', padding: '8px 0' }}>
            No corrections yet this week.
          </div>
        )}
      </div>

      {/* Preview parent reel link */}
      <button className="dash-preview-link" onClick={onGoToParent}>
        <IconEye />
        Preview a parent's reel
        <IconArrow />
      </button>
    </div>
  );
}

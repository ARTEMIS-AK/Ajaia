// SVG Icons for Presentation Explainer
const IconSignal = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
    <path d="M2 13h12M4 10v3M8 6v7M12 2v11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

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

const IconMerge = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M6 3v6a3 3 0 003 3h6a3 3 0 013 3v6M18 3v6a3 3 0 01-3 3H9a3 3 0 00-3 3v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export default function Explainer() {
  const signalCards = [
    {
      label: 'Client Email',
      source: 'Ridgeline ($180k)',
      takeaway: 'Pushes for livestreaming; threatens renewal if not built.',
      tag: 'Single Stakeholder',
      tagClass: 'badge-accent',
      collapsed: true,
    },
    {
      label: 'Sales Slack Thread',
      source: 'Internal Sales Rep',
      takeaway: 'Amplifies Ridgeline email to protect Q3 commission.',
      tag: 'Internal Echo',
      tagClass: 'badge-accent',
      collapsed: true,
    },
    {
      label: 'Support Tickets',
      source: '3 Unrelated Clubs',
      takeaway: 'Identical failure: wrong kid in reel (#14 vs #4, digit swaps).',
      tag: 'Direct Evidence',
      tagClass: 'badge-success',
      collapsed: false,
    },
    {
      label: 'Product Health Dash',
      source: 'Internal Analytics',
      takeaway: '92% share rate skews high; ~30% unopened reels are wrong-kid clips.',
      tag: 'Direct Evidence',
      tagClass: 'badge-success',
      collapsed: false,
    },
    {
      label: 'Parent Survey + Data',
      source: '210 Parents / Telemetry',
      takeaway: '58% ask editing tools, but <1% complete edits (stated vs revealed).',
      tag: 'Self-Reported',
      tagClass: 'badge-primary',
      collapsed: false,
    },
  ];

  const criteria = [
    'Clips ≥ 85% confidence auto-publish to family reels without manual intervention.',
    'Clips < 85% confidence are held and routed to Coach Review with jersey alert badges.',
    'Coaches can approve, correct, or reject any queued clip in under 2 clicks.',
    'Correction instantly updates player tags and feeds back into confidence model.',
    'Parents can flag wrong clips from reel, auto-routing back to Coach Review Queue.',
  ];

  return (
    <div className="explainer-container">
      {/* SECTION A */}
      <section className="explainer-section">
        <div className="explainer-header">
          <span className="explainer-pill">Task 1 Presentation</span>
          <h2>Section A — The Signal Map & Roadmap Decision</h2>
          <p className="explainer-lead">
            Synthesis of 5 input signals, collapsing stakeholder noise into a single data-backed priority call.
          </p>
        </div>

        {/* 5 Signal Cards Row */}
        <div className="signal-cards-grid">
          {signalCards.map((card, idx) => (
            <div
              key={idx}
              className={`explainer-card signal-card ${
                card.collapsed ? 'signal-card-collapsed' : ''
              }`}
            >
              <div className="signal-card-header">
                <span className="signal-label">{card.label}</span>
                <span className={`badge ${card.tagClass}`}>{card.tag}</span>
              </div>
              <div className="signal-source">{card.source}</div>
              <p className="signal-takeaway">{card.takeaway}</p>
            </div>
          ))}
        </div>

        {/* Connecting Visual Box */}
        <div className="explainer-callout insight-callout">
          <div className="insight-callout-icon">
            <IconMerge />
          </div>
          <div>
            <h4 className="insight-title">
              Core Roadmap Insight: 3 Stakeholder Inputs Collapse into 1 Single Signal
            </h4>
            <p className="insight-body">
              Client Email + Sales Slack + Renewal Risk are <strong>not three independent data points</strong> — they are a single customer ask (Ridgeline) echoed internally through sales. In contrast, Support Tickets + Analytics represent <strong>independent, convergent horizontal evidence</strong> across all clubs.
            </p>
          </div>
        </div>

        {/* 3-Column Roadmap Results */}
        <div className="roadmap-grid">
          {/* BUILD NEXT */}
          <div className="explainer-card roadmap-card build-next-card">
            <div className="roadmap-header">
              <span className="badge badge-success" style={{ fontSize: 13, padding: '6px 14px' }}>
                <IconCheck /> BUILD NEXT (Top Priority)
              </span>
              <h3>Roster Tagging Accuracy</h3>
            </div>
            <p className="roadmap-reason">
              Fixes systemic wrong-kid clips (#14 vs #4). Backed by convergent support tickets + 30% unopened reel anomaly. Improves core product value for 100% of clubs.
            </p>
            <div className="roadmap-metric">
              <span>Target Metric:</span> Reduce unopened reels from ~30% to &lt;10%
            </div>
          </div>

          {/* HOLD */}
          <div className="explainer-card roadmap-card hold-card">
            <div className="roadmap-header">
              <span className="badge badge-accent" style={{ fontSize: 13, padding: '6px 14px' }}>
                HOLD (De-prioritized)
              </span>
              <h3>Editing Controls</h3>
            </div>
            <p className="roadmap-reason">
              Stated preference (58% survey) directly contradicts revealed usage (&lt;1% completion). Fixing tagging removes the underlying need to edit broken reels manually.
            </p>
            <div className="roadmap-metric">
              <span>Status:</span> Re-evaluate post-tagging release
            </div>
          </div>

          {/* REJECT */}
          <div className="explainer-card roadmap-card reject-card">
            <div className="roadmap-header">
              <span className="badge badge-danger" style={{ fontSize: 13, padding: '6px 14px' }}>
                REJECT (Out of Scope)
              </span>
              <h3>Livestreaming</h3>
            </div>
            <p className="roadmap-reason">
              Single-account vertical feature masquerading as 3 signals. Massive technical complexity (CDN/live ingest) and minor compliance risks divert core platform engineers.
            </p>
            <div className="roadmap-metric">
              <span>Decision:</span> Decline for current product cycle
            </div>
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <hr className="explainer-divider" />

      {/* SECTION B */}
      <section className="explainer-section">
        <div className="explainer-header">
          <span className="explainer-pill">Task 2 Presentation</span>
          <h2>Section B — The Product Spec at a Glance</h2>
          <p className="explainer-lead">
            Architectural summary, scope boundary, acceptance criteria, and failure mode defenses.
          </p>
        </div>

        {/* Outcome Statement */}
        <div className="outcome-banner">
          <span className="outcome-tag">Primary Outcome</span>
          <p className="outcome-text">
            Reduce unopened reels from ~30% to &lt;10% and drop wrong-kid flags to &lt;2% by introducing AI confidence scoring and a 2-click coach review queue.
          </p>
        </div>

        {/* Two-Column In-Scope / Out-of-Scope */}
        <div className="scope-grid">
          <div className="explainer-card scope-card scope-in">
            <h4>
              <span className="scope-icon success">✓</span> In Scope
            </h4>
            <ul>
              <li>AI confidence scoring (0–100%) per clip match</li>
              <li>Queuing &lt;85% confidence clips for Coach Review</li>
              <li>Visual jersey digit swap detection (#14 vs #4)</li>
              <li>2-click coach re-assignment dropdown</li>
              <li>Parent reel flagging integration for wrong clips</li>
            </ul>
          </div>

          <div className="explainer-card scope-card scope-out">
            <h4>
              <span className="scope-icon danger">✕</span> Out of Scope
            </h4>
            <ul>
              <li>Full video editing / timeline trimming tools</li>
              <li>Real-time livestream broadcasting engine</li>
              <li>Parent notification cadence changes</li>
              <li>Manual highlight clip trimming</li>
              <li>Multi-game season archive analytics</li>
            </ul>
          </div>
        </div>

        {/* Callout Box: Human in the Loop */}
        <div className="explainer-callout human-callout">
          <div className="human-callout-icon">🤖 + 🧢</div>
          <div>
            <h4 className="human-title">Human Stays in the Loop</h4>
            <p className="human-body">
              AI automates high-confidence matches (&ge;85%), but coaches retain final human authority for ambiguous clips before weekly reels ship to parents.
            </p>
          </div>
        </div>

        {/* Acceptance Criteria Checklist */}
        <div className="explainer-card criteria-card">
          <h4 className="criteria-title">
            <IconSignal /> 5 Core Acceptance Criteria
          </h4>
          <div className="criteria-list">
            {criteria.map((item, idx) => (
              <div key={idx} className="criteria-item">
                <span className="criteria-check">✓</span>
                <span className="criteria-text">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Two Failure Mode Cards */}
        <div className="failure-modes-grid">
          <div className="explainer-card failure-card">
            <div className="failure-badge">
              <IconAlert /> Failure Mode 1
            </div>
            <h5>Visually Similar Jersey Numbers</h5>
            <div className="failure-line">
              <strong>Risk:</strong> #14 tagged when player is #4, leading to wrong child in parent reel.
            </div>
            <div className="failure-line catch-line">
              <strong>Catch Mechanism:</strong> Confidence engine drops match score to 58%, routing clip to Coach Review.
            </div>
          </div>

          <div className="explainer-card failure-card">
            <div className="failure-badge">
              <IconAlert /> Failure Mode 2
            </div>
            <h5>Unreviewed Queue at Distribution Deadline</h5>
            <div className="failure-line">
              <strong>Risk:</strong> Coach misses review before Sunday evening weekly recap send.
            </div>
            <div className="failure-line catch-line">
              <strong>Catch Mechanism:</strong> Unreviewed &lt;85% clips are safely held back from weekly recap to prevent wrong-kid sends.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

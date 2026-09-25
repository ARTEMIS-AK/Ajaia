import { useState } from 'react';
import { MOCK_REEL } from './data.js';

// SVG Icons
const IconPlay = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
    <path d="M8 5v14l11-7L8 5z"/>
  </svg>
);
const IconFlag = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 2v12M3 2l9 3.5L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconShare = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 8v5a1 1 0 001 1h6a1 1 0 001-1V8M8 2v7M5 5l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconDownload = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 11v2a1 1 0 001 1h6a1 1 0 001-1v-2M8 2v8M5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function ParentReel() {
  const [flagged, setFlagged] = useState(false);

  return (
    <div>
      {/* Video player chrome */}
      <div className="reel-player">
        <div className="reel-video-area">
          <button className="reel-play-btn" aria-label="Play reel">
            <IconPlay />
          </button>
          <div className="reel-clips-label">{MOCK_REEL.clipCount} clips</div>
          <div className="reel-duration">{MOCK_REEL.duration}</div>
        </div>
        <div className="reel-info">
          <div className="reel-player-name">
            #{MOCK_REEL.jersey} {MOCK_REEL.playerName}
          </div>
          <div className="reel-meta">
            {MOCK_REEL.teamName} · {MOCK_REEL.weekLabel}
          </div>
        </div>
      </div>

      {/* Share buttons */}
      <div className="share-bar">
        <button className="share-btn primary">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <IconShare /> Share reel
          </span>
        </button>
        <button className="share-btn secondary">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <IconDownload /> Save to phone
          </span>
        </button>
      </div>

      {/* Flag section — the core interaction for this spec */}
      <div className="flag-section" style={{ marginTop: 24 }}>
        <button
          className={`flag-btn ${flagged ? 'flagged' : ''}`}
          onClick={() => setFlagged(true)}
          disabled={flagged}
        >
          {flagged ? <IconCheck /> : <IconFlag />}
          {flagged ? 'Flagged for coach review' : 'Wrong kid in this clip?'}
        </button>

        {flagged && (
          <div className="flag-confirm">
            <strong>Thanks — we've flagged this for your coach to review.</strong>
            <br />
            Your coach will check the clip and make sure the right highlight ends
            up in the right reel. No action needed from you.
          </div>
        )}
      </div>

      {/* Context card */}
      <div className="card" style={{ marginTop: 16 }}>
        <div className="context-card-title">How this works</div>
        <div className="context-card-text">
          SidelineReel matches jersey numbers in the game footage to your team's
          roster. If a clip doesn't look right, tap the flag above and your coach
          will review it before the next recap goes out.
        </div>
      </div>
    </div>
  );
}

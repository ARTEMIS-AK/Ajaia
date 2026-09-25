import { useState } from 'react';
import { CONFIDENCE_THRESHOLD, ROSTER, TEAM } from './data.js';

// SVG Icons
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconX = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconAlert = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 5v3.5M8 10.5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconClapboard = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
    <rect x="6" y="14" width="36" height="26" rx="4" stroke="currentColor" strokeWidth="2.5"/>
    <path d="M6 22h36M14 8l4 14M26 8l4 14M38 8l4 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

// Confidence ring component
function ConfidenceRing({ value }) {
  const r = 12;
  const circ = 2 * Math.PI * r;
  const filled = (value / 100) * circ;
  const isHigh = value >= 90;
  const colorClass = isHigh ? 'high' : 'low';

  return (
    <div className="confidence-ring-wrap">
      <svg className="confidence-ring" viewBox="0 0 32 32">
        <circle className="confidence-ring-bg" cx="16" cy="16" r={r} />
        <circle
          className={`confidence-ring-fill ${colorClass}`}
          cx="16" cy="16" r={r}
          strokeDasharray={`${filled} ${circ - filled}`}
          strokeDashoffset={circ * 0.25}
          transform="rotate(-90 16 16)"
        />
      </svg>
      <span className={`confidence-ring-text ${colorClass}`}>{value}%</span>
    </div>
  );
}

export default function CoachReview({
  matches,
  onApprove,
  onReject,
  onCorrect,
  totalFlagged,
  reviewedCount,
  pendingCount,
  onBack,
}) {
  const [correctingId, setCorrectingId] = useState(null);

  function handleCorrectSelect(id, newPlayerId) {
    onCorrect(id, newPlayerId);
    setCorrectingId(null);
  }

  return (
    <div>
      <div className="review-header">
        <div className="review-title">Highlight Tag Review</div>
        <div className="review-subtitle">
          {TEAM.name} · Latest game upload
        </div>
        <div className="review-progress">
          {pendingCount === 0 ? (
            <span className="badge badge-success">
              <IconCheck /> All matches reviewed — reels ready to send
            </span>
          ) : (
            <span className="badge badge-primary">
              {reviewedCount} of {totalFlagged} flagged matches reviewed
            </span>
          )}
        </div>
      </div>

      {matches.map(match => {
        const needsReview = match.confidence < CONFIDENCE_THRESHOLD;
        const isDone = match.status !== 'pending' && match.status !== 'auto-approved';
        const isCorrecting = correctingId === match.id;

        return (
          <div
            key={match.id}
            className={`card ${isDone && needsReview ? 'reviewed' : ''}`}
          >
            <div className="match-card">
              <div className="match-thumb">
                <div className="match-thumb-play"></div>
                <div className="match-thumb-time">{match.timestamp}</div>
              </div>
              <div className="match-info">
                <div className="match-top-row">
                  <span className="match-jersey">#{match.detectedJersey}</span>
                  <span className="match-name">
                    {match.correctedTo || match.matchedPlayerName}
                  </span>
                </div>
                <div className="match-highlight">{match.highlightLabel}</div>

                <div className="match-status-row">
                  <ConfidenceRing value={match.confidence} />

                  {needsReview && match.status === 'pending' && (
                    <span className="badge badge-accent">
                      <IconAlert /> Needs review
                    </span>
                  )}
                  {match.status === 'auto-approved' && (
                    <span className="badge badge-success">
                      <IconCheck /> Auto-approved
                    </span>
                  )}
                </div>

                {/* Reviewed badge */}
                {isDone && needsReview && (
                  <div className="reviewed-badge">
                    {match.status === 'approved' && (
                      <span className="badge badge-success">
                        <IconCheck /> Approved
                      </span>
                    )}
                    {match.status === 'corrected' && (
                      <span className="badge badge-primary">
                        <IconArrowRight /> Corrected to {match.correctedTo}
                      </span>
                    )}
                    {match.status === 'rejected' && (
                      <span className="badge badge-danger">
                        <IconX /> Rejected — clip removed
                      </span>
                    )}
                  </div>
                )}

                {/* Action buttons for pending low-confidence */}
                {needsReview && match.status === 'pending' && !isCorrecting && (
                  <div className="match-actions">
                    <button
                      className="btn btn-success"
                      onClick={() => onApprove(match.id)}
                    >
                      <IconCheck /> Approve
                    </button>
                    <button
                      className="btn btn-accent"
                      onClick={() => setCorrectingId(match.id)}
                    >
                      <IconArrowRight /> Correct
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => { onReject(match.id); setCorrectingId(null); }}
                    >
                      <IconX /> Reject
                    </button>
                  </div>
                )}

                {/* Correction dropdown */}
                {isCorrecting && (
                  <div className="correct-dropdown">
                    <label>Reassign this clip to:</label>
                    <select
                      defaultValue=""
                      onChange={e => {
                        const val = parseInt(e.target.value, 10);
                        if (val) handleCorrectSelect(match.id, val);
                      }}
                    >
                      <option value="" disabled>
                        Select the correct player…
                      </option>
                      {ROSTER.filter(r => r.id !== match.matchedPlayerId).map(
                        r => (
                          <option key={r.id} value={r.id}>
                            #{r.jersey} — {r.name}
                          </option>
                        )
                      )}
                    </select>
                    <div className="correct-dropdown-actions">
                      <button
                        className="btn btn-danger"
                        onClick={() => setCorrectingId(null)}
                        style={{ fontSize: 12, padding: '5px 12px' }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {pendingCount === 0 && (
        <div className="empty-state" style={{ marginTop: 8 }}>
          <div className="empty-state-icon">
            <IconClapboard />
          </div>
          <div className="empty-state-title">Review complete</div>
          <div className="empty-state-desc">
            All flagged highlights have been reviewed. Reels are ready to send
            to families.
          </div>
          <button
            className="btn btn-primary"
            style={{ marginTop: 16 }}
            onClick={onBack}
          >
            Back to dashboard
          </button>
        </div>
      )}
    </div>
  );
}

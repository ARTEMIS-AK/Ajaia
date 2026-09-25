import { useState, useCallback, useEffect } from 'react';
import { INITIAL_MATCHES, CONFIDENCE_THRESHOLD, ROSTER } from './data.js';
import Dashboard from './Dashboard.jsx';
import CoachReview from './CoachReview.jsx';
import ParentReel from './ParentReel.jsx';
import Explainer from './Explainer.jsx';

const TABS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'review', label: 'Review Queue' },
  { id: 'parent', label: 'Parent Reel' },
  { id: 'explainer', label: 'Signal & Spec Explainer' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState(() => {
    if (window.location.pathname === '/explainer' || window.location.hash === '#explainer') {
      return 'explainer';
    }
    return 'dashboard';
  });

  useEffect(() => {
    const handlePop = () => {
      if (window.location.pathname === '/explainer' || window.location.hash === '#explainer') {
        setActiveTab('explainer');
      }
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'explainer') {
      window.history.pushState({}, '', '/explainer');
    } else if (window.location.pathname === '/explainer') {
      window.history.pushState({}, '', '/');
    }
  };

  // Lifted match state — shared between Dashboard and CoachReview
  const [matches, setMatches] = useState(
    INITIAL_MATCHES.map(m => ({
      ...m,
      status: m.confidence >= CONFIDENCE_THRESHOLD ? 'auto-approved' : 'pending',
      correctedTo: null,
    }))
  );

  // Track corrections for "Recently corrected" on dashboard
  const [corrections, setCorrections] = useState([
    // Seed with 2 mock past corrections
    { jersey: 9, original: 'Ethan Brown', corrected: 'Lucas Davis', id: 'seed-1' },
    { jersey: 21, original: 'Lucas Davis', corrected: 'Zoe Washington', id: 'seed-2' },
  ]);

  const handleApprove = useCallback((id) => {
    setMatches(prev =>
      prev.map(m => (m.id === id ? { ...m, status: 'approved' } : m))
    );
  }, []);

  const handleReject = useCallback((id) => {
    setMatches(prev =>
      prev.map(m => (m.id === id ? { ...m, status: 'rejected' } : m))
    );
  }, []);

  const handleCorrect = useCallback((id, newPlayerId) => {
    const player = ROSTER.find(r => r.id === newPlayerId);
    if (!player) return;
    setMatches(prev => {
      const match = prev.find(m => m.id === id);
      if (match && match.status !== 'corrected') {
        setCorrections(c => [
          {
            jersey: match.detectedJersey,
            original: match.matchedPlayerName,
            corrected: player.name,
            id: `corr-${id}`,
          },
          ...c,
        ]);
      }
      return prev.map(m =>
        m.id === id
          ? {
              ...m,
              status: 'corrected',
              correctedTo: player.name,
              matchedPlayerName: player.name,
              matchedPlayerId: player.id,
            }
          : m
      );
    });
  }, []);

  // Derived counts
  const pendingCount = matches.filter(m => m.status === 'pending').length;
  const autoApproved = matches.filter(m => m.status === 'auto-approved').length;
  const reviewedCount = matches.filter(
    m => m.status !== 'pending' && m.status !== 'auto-approved'
  ).length;
  const totalFlagged = INITIAL_MATCHES.filter(
    m => m.confidence < CONFIDENCE_THRESHOLD
  ).length;

  return (
    <div className={`app ${activeTab === 'explainer' ? 'app-wide' : ''}`}>
      <div className="topbar">
        <div className="topbar-brand">SidelineReel</div>
        <div className="topbar-sub">Roster Tagging Accuracy — Prototype</div>
      </div>

      <div className="tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="content">
        {activeTab === 'dashboard' && (
          <Dashboard
            autoApproved={autoApproved + reviewedCount}
            pendingCount={pendingCount}
            corrections={corrections}
            onGoToReview={() => handleTabChange('review')}
            onGoToParent={() => handleTabChange('parent')}
          />
        )}
        {activeTab === 'review' && (
          <CoachReview
            matches={matches}
            onApprove={handleApprove}
            onReject={handleReject}
            onCorrect={handleCorrect}
            totalFlagged={totalFlagged}
            reviewedCount={reviewedCount}
            pendingCount={pendingCount}
            onBack={() => handleTabChange('dashboard')}
          />
        )}
        {activeTab === 'parent' && <ParentReel />}
        {activeTab === 'explainer' && <Explainer />}
      </div>

      <div className="footer">
        Prototype for{' '}
        <a href="https://ajaia.ai" target="_blank" rel="noopener noreferrer">
          Ajaia
        </a>{' '}
        · SidelineReel PM Assessment
      </div>
    </div>
  );
}

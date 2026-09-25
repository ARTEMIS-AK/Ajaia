// Mock data for SidelineReel Roster Tagging prototype
// All data is deterministic — no randomness, no external calls

export const TEAM = {
  name: "Ridgeline Youth Soccer",
  season: "Fall 2026",
};

export const ROSTER = [
  { id: 1, name: "Mia Chen", jersey: 4 },
  { id: 2, name: "Liam Rodriguez", jersey: 14 },
  { id: 3, name: "Ava Patel", jersey: 7 },
  { id: 4, name: "Noah Kim", jersey: 1 },
  { id: 5, name: "Sofia Martinez", jersey: 11 },
  { id: 6, name: "Ethan Brown", jersey: 9 },
  { id: 7, name: "Zoe Washington", jersey: 3 },
  { id: 8, name: "Lucas Davis", jersey: 21 },
];

// Highlight matches from the latest game — some are low-confidence
// because of the jersey-number confusion bug (visually similar numbers)
export const INITIAL_MATCHES = [
  {
    id: "m1",
    detectedJersey: 14,
    matchedPlayerId: 2,
    matchedPlayerName: "Liam Rodriguez",
    confidence: 94,
    timestamp: "12:34",
    highlightLabel: "Goal — left side",
  },
  {
    id: "m2",
    detectedJersey: 4,
    matchedPlayerId: 1,
    matchedPlayerName: "Mia Chen",
    confidence: 62,
    timestamp: "18:07",
    highlightLabel: "Save at the post",
    // This is the bug: jersey 4 vs 14, system guessed Mia (4) but
    // it might actually be Liam (14). Low confidence = needs review.
  },
  {
    id: "m3",
    detectedJersey: 11,
    matchedPlayerId: 5,
    matchedPlayerName: "Sofia Martinez",
    confidence: 58,
    timestamp: "24:51",
    highlightLabel: "Breakaway run",
    // Another ambiguous match: 11 vs 1
  },
  {
    id: "m4",
    detectedJersey: 7,
    matchedPlayerId: 3,
    matchedPlayerName: "Ava Patel",
    confidence: 97,
    timestamp: "31:20",
    highlightLabel: "Corner kick assist",
  },
  {
    id: "m5",
    detectedJersey: 1,
    matchedPlayerId: 4,
    matchedPlayerName: "Noah Kim",
    confidence: 71,
    timestamp: "42:15",
    highlightLabel: "Diving save",
    // 1 vs 11 confusion again
  },
];

export const CONFIDENCE_THRESHOLD = 85;

// Mock reel for the parent view
export const MOCK_REEL = {
  playerName: "Mia Chen",
  jersey: 4,
  teamName: "Ridgeline Youth Soccer",
  weekLabel: "Week 6 — Sept 20 Game",
  clipCount: 3,
  duration: "1:42",
};

// Metrics for the dashboard
export const METRICS = {
  reelsGenerated: 312,
  reelsOpened: 218,
  reelsSharedOfOpened: 201,
  shareRateOpenedOnly: 92,
  shareRateAllGenerated: 64,
};

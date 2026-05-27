import { writable, derived, get } from 'svelte/store';
import type { TournamentConfig, TournamentState, PlayerStats, PrizeStructure } from '$lib/types';

const DEFAULT_LEVELS = [
  { id: '1', level: 1, smallBlind: 25, bigBlind: 50, ante: 0, duration: 15, isBreak: false },
  { id: '2', level: 2, smallBlind: 50, bigBlind: 100, ante: 0, duration: 15, isBreak: false },
  { id: '3', level: 3, smallBlind: 75, bigBlind: 150, ante: 150, duration: 15, isBreak: false },
  { id: 'b1', level: 0, smallBlind: 0, bigBlind: 0, ante: 0, duration: 10, isBreak: true, breakLabel: 'INTERVALO' },
  { id: '4', level: 4, smallBlind: 100, bigBlind: 200, ante: 200, duration: 15, isBreak: false },
  { id: '5', level: 5, smallBlind: 150, bigBlind: 300, ante: 300, duration: 15, isBreak: false },
  { id: '6', level: 6, smallBlind: 200, bigBlind: 400, ante: 400, duration: 15, isBreak: false },
  { id: 'b2', level: 0, smallBlind: 0, bigBlind: 0, ante: 0, duration: 15, isBreak: true, breakLabel: 'JANTAR' },
  { id: '7', level: 7, smallBlind: 300, bigBlind: 600, ante: 600, duration: 15, isBreak: false },
  { id: '8', level: 8, smallBlind: 400, bigBlind: 800, ante: 800, duration: 15, isBreak: false },
  { id: '9', level: 9, smallBlind: 500, bigBlind: 1000, ante: 1000, duration: 15, isBreak: false },
  { id: '10', level: 10, smallBlind: 600, bigBlind: 1200, ante: 1200, duration: 15, isBreak: false },
  { id: '11', level: 11, smallBlind: 800, bigBlind: 1600, ante: 1600, duration: 15, isBreak: false },
  { id: '12', level: 12, smallBlind: 1000, bigBlind: 2000, ante: 2000, duration: 15, isBreak: false },
];

const DEFAULT_CONFIG: TournamentConfig = {
  id: crypto.randomUUID(),
  name: 'Torneio Principal',
  clubName: 'Kamikaze Poker Club',
  logoUrl: '/kpc-logo.png',
  buyIn: 100,
  rebuyAmount: 100,
  rebuyLevels: 3,
  addOnAmount: 100,
  addOnLevel: 4,
  startingStack: 10000,
  levels: DEFAULT_LEVELS,
  primaryColor: '#c9a84c',
  secondaryColor: '#1a5c2a',
  backgroundColor: '#0a0a0a',
  backgroundImageUrl: '',
  theme: 'dark',
  lateRegistrationLevel: 4,
};

const DEFAULT_STATE: TournamentState = {
  isRunning: false,
  isPaused: false,
  currentLevelIndex: 0,
  timeRemainingSeconds: DEFAULT_LEVELS[0].duration * 60,
  players: 0,
  playersRemaining: 0,
  totalRebuys: 0,
  totalAddOns: 0,
  handNumber: 0,
};

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof localStorage === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T) {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
}

export const tournamentConfig = writable<TournamentConfig>(
  loadFromStorage('holdem_config', DEFAULT_CONFIG)
);

export const tournamentState = writable<TournamentState>(
  loadFromStorage('holdem_state', DEFAULT_STATE)
);

export const players = writable<PlayerStats[]>(
  loadFromStorage('holdem_players', [])
);

export const prizeStructure = writable<PrizeStructure[]>(
  loadFromStorage('holdem_prizes', [
    { position: 1, percentage: 50 },
    { position: 2, percentage: 30 },
    { position: 3, percentage: 20 },
  ])
);

tournamentConfig.subscribe(v => saveToStorage('holdem_config', v));
tournamentState.subscribe(v => saveToStorage('holdem_state', v));
players.subscribe(v => saveToStorage('holdem_players', v));
prizeStructure.subscribe(v => saveToStorage('holdem_prizes', v));

export const currentLevel = derived(
  [tournamentConfig, tournamentState],
  ([$config, $state]) => $config.levels[$state.currentLevelIndex] ?? $config.levels[0]
);

export const nextLevel = derived(
  [tournamentConfig, tournamentState],
  ([$config, $state]) => $config.levels[$state.currentLevelIndex + 1] ?? null
);

export const prizePool = derived(
  [tournamentConfig, tournamentState],
  ([$config, $state]) => {
    const entries = $state.players;
    const rebuys = $state.totalRebuys;
    const addOns = $state.totalAddOns;
    return entries * $config.buyIn + rebuys * $config.rebuyAmount + addOns * $config.addOnAmount;
  }
);

export const avgStack = derived(
  [tournamentConfig, tournamentState],
  ([$config, $state]) => {
    if ($state.playersRemaining <= 0) return 0;
    const totalChips = $state.players * $config.startingStack +
      $state.totalRebuys * $config.startingStack +
      $state.totalAddOns * $config.startingStack;
    return Math.floor(totalChips / $state.playersRemaining);
  }
);

export function resetTournament() {
  const config = get(tournamentConfig);
  tournamentState.set({
    ...DEFAULT_STATE,
    timeRemainingSeconds: config.levels[0].duration * 60,
  });
}

export function applyConfig(config: TournamentConfig) {
  tournamentConfig.set(config);
  const state = get(tournamentState);
  if (!state.isRunning) {
    tournamentState.update(s => ({
      ...s,
      currentLevelIndex: 0,
      timeRemainingSeconds: config.levels[0].duration * 60,
    }));
  }
}

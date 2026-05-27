export interface BlindLevel {
  id: string;
  level: number;
  smallBlind: number;
  bigBlind: number;
  ante: number;
  duration: number; // minutes
  isBreak: boolean;
  breakLabel?: string;
}

export interface TournamentConfig {
  id: string;
  name: string;
  clubName: string;
  logoUrl: string;
  buyIn: number;
  rebuyAmount: number;
  rebuyLevels: number;
  addOnAmount: number;
  addOnLevel: number;
  startingStack: number;
  levels: BlindLevel[];
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  backgroundImageUrl: string;
  theme: 'dark' | 'light';
  lateRegistrationLevel: number;
}

export interface TournamentState {
  isRunning: boolean;
  isPaused: boolean;
  currentLevelIndex: number;
  timeRemainingSeconds: number;
  players: number;
  playersRemaining: number;
  totalRebuys: number;
  totalAddOns: number;
  handNumber: number;
}

export interface PlayerStats {
  id: string;
  name: string;
  seat: number;
  chipCount: number;
  isEliminated: boolean;
  position?: number;
  prize?: number;
}

export interface PrizeStructure {
  position: number;
  percentage: number;
}

export interface SponsorBanner {
  id: string;
  imageUrl: string;
  linkUrl?: string;
  duration: number; // seconds to display
}

export interface SoundSettings {
  enabled: boolean;
  levelChange: boolean;
  breakStart: boolean;
  lastMinute: boolean;
  volume: number;
}

export interface AppSettings {
  sound: SoundSettings;
  announcements: boolean;
  announcementVoice: string;
  showSponsorBanners: boolean;
  banners: SponsorBanner[];
  overlayMode: boolean;
  fullscreenMode: boolean;
}

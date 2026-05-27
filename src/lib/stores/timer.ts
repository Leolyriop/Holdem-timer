import { get } from 'svelte/store';
import { tournamentState, tournamentConfig, currentLevel } from './tournament';
import { playSound, speak } from '$lib/utils/audio';

let interval: ReturnType<typeof setInterval> | null = null;

export function startTimer() {
  if (interval) return;
  tournamentState.update(s => ({ ...s, isRunning: true, isPaused: false }));
  interval = setInterval(tick, 1000);
}

export function pauseTimer() {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
  tournamentState.update(s => ({ ...s, isRunning: false, isPaused: true }));
}

export function toggleTimer() {
  const state = get(tournamentState);
  if (state.isRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
}

export function addTime(seconds: number) {
  tournamentState.update(s => ({
    ...s,
    timeRemainingSeconds: s.timeRemainingSeconds + seconds,
  }));
}

export function nextLevel() {
  const config = get(tournamentConfig);
  const state = get(tournamentState);
  const nextIndex = state.currentLevelIndex + 1;
  if (nextIndex >= config.levels.length) return;

  const nextLvl = config.levels[nextIndex];
  tournamentState.update(s => ({
    ...s,
    currentLevelIndex: nextIndex,
    timeRemainingSeconds: nextLvl.duration * 60,
  }));

  announceLevel(nextLvl);
}

export function prevLevel() {
  const config = get(tournamentConfig);
  const state = get(tournamentState);
  const prevIndex = state.currentLevelIndex - 1;
  if (prevIndex < 0) return;

  const prevLvl = config.levels[prevIndex];
  tournamentState.update(s => ({
    ...s,
    currentLevelIndex: prevIndex,
    timeRemainingSeconds: prevLvl.duration * 60,
  }));
}

export function jumpToLevel(index: number) {
  const config = get(tournamentConfig);
  if (index < 0 || index >= config.levels.length) return;
  const lvl = config.levels[index];
  tournamentState.update(s => ({
    ...s,
    currentLevelIndex: index,
    timeRemainingSeconds: lvl.duration * 60,
  }));
}

function tick() {
  tournamentState.update(state => {
    const newTime = state.timeRemainingSeconds - 1;

    if (newTime === 60) {
      playSound('warning');
      speak('Um minuto restante');
    }

    if (newTime >= 1 && newTime <= 5) {
      playSound(newTime === 1 ? 'countdownFinal' : 'countdown');
    }

    if (newTime <= 0) {
      const config = get(tournamentConfig);
      const nextIndex = state.currentLevelIndex + 1;

      if (nextIndex >= config.levels.length) {
        if (interval) clearInterval(interval);
        interval = null;
        return { ...state, isRunning: false, timeRemainingSeconds: 0 };
      }

      const nextLvl = config.levels[nextIndex];
      playSound('levelChange');
      announceLevel(nextLvl);

      return {
        ...state,
        currentLevelIndex: nextIndex,
        timeRemainingSeconds: nextLvl.duration * 60,
      };
    }

    return { ...state, timeRemainingSeconds: newTime };
  });
}

function announceLevel(lvl: { isBreak: boolean; breakLabel?: string; level: number; smallBlind: number; bigBlind: number; ante: number }) {
  if (lvl.isBreak) {
    speak(lvl.breakLabel ?? 'Intervalo');
  } else {
    const anteText = lvl.ante > 0 ? `, ante ${lvl.ante}` : '';
    speak(`Nível ${lvl.level}. Blinds ${lvl.smallBlind} e ${lvl.bigBlind}${anteText}`);
  }
}

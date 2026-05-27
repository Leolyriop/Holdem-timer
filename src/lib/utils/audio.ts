let audioCtx: AudioContext | null = null;
let soundEnabled = true;
let volume = 0.8;

export function setSoundEnabled(enabled: boolean) {
  soundEnabled = enabled;
}

export function setVolume(v: number) {
  volume = Math.max(0, Math.min(1, v));
}

function getCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  return audioCtx;
}

function beep(frequency: number, duration: number, type: OscillatorType = 'sine', vol = volume) {
  if (!soundEnabled) return;
  try {
    const ctx = getCtx();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    gainNode.gain.setValueAtTime(vol, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch (e) {
    console.warn('Audio error:', e);
  }
}

export function playSound(type: 'levelChange' | 'warning' | 'break' | 'start' | 'pause' | 'countdown' | 'countdownFinal') {
  if (!soundEnabled) return;
  switch (type) {
    case 'levelChange':
      beep(880, 0.15, 'square', 0.4);
      setTimeout(() => beep(1100, 0.15, 'square', 0.4), 180);
      setTimeout(() => beep(1320, 0.3, 'square', 0.4), 360);
      break;
    case 'warning':
      beep(660, 0.1, 'sine', 0.3);
      setTimeout(() => beep(660, 0.1, 'sine', 0.3), 200);
      break;
    case 'countdown':
      beep(880, 0.08, 'sine', 0.35);
      break;
    case 'countdownFinal':
      beep(1320, 0.15, 'sine', 0.5);
      break;
    case 'break':
      beep(523, 0.2, 'triangle', 0.3);
      setTimeout(() => beep(659, 0.2, 'triangle', 0.3), 250);
      setTimeout(() => beep(784, 0.4, 'triangle', 0.3), 500);
      break;
    case 'start':
      beep(523, 0.1, 'sine', 0.4);
      setTimeout(() => beep(659, 0.1, 'sine', 0.4), 150);
      setTimeout(() => beep(784, 0.2, 'sine', 0.4), 300);
      break;
    case 'pause':
      beep(784, 0.1, 'sine', 0.3);
      setTimeout(() => beep(523, 0.2, 'sine', 0.3), 150);
      break;
  }
}

export function speak(text: string) {
  if (typeof window === 'undefined') return;
  if (!window.speechSynthesis) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'pt-BR';
  utterance.rate = 0.9;
  utterance.pitch = 1.2;
  utterance.volume = volume;

  const voices = window.speechSynthesis.getVoices();
  const female = voices.find(v =>
    v.lang.startsWith('pt') && /female|feminino|woman|francisca|luciana|f\b/i.test(v.name)
  ) ?? voices.find(v =>
    /female|feminino|woman|francisca|luciana/i.test(v.name)
  );
  if (female) utterance.voice = female;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

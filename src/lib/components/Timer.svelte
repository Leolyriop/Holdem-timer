<script lang="ts">
  import { tournamentState, currentLevel } from '$lib/stores/tournament';
  import { formatTime } from '$lib/utils/format';

  $: timeStr = formatTime($tournamentState.timeRemainingSeconds);
  $: isUrgent = $tournamentState.timeRemainingSeconds <= 60 && !$currentLevel.isBreak;
  $: isWarning = $tournamentState.timeRemainingSeconds <= 180 && $tournamentState.timeRemainingSeconds > 60 && !$currentLevel.isBreak;
</script>

<div class="timer-container flex flex-col items-center justify-center">
  <div
    class="timer-display font-display tabular-nums select-none transition-colors duration-500"
    class:text-red-400={isUrgent}
    class:animate-pulse={isUrgent && $tournamentState.isRunning}
    class:text-yellow-400={isWarning}
    class:text-white={!isUrgent && !isWarning}
  >
    {timeStr}
  </div>

  {#if !$tournamentState.isRunning && $tournamentState.isPaused}
    <div class="mt-2 text-xs font-display tracking-widest text-yellow-400 animate-blink uppercase">
      Pausado
    </div>
  {/if}
</div>

<style>
  .timer-display {
    font-size: clamp(4rem, 18vw, 14rem);
    line-height: 1;
    text-shadow: 0 2px 8px rgba(0,0,0,0.6);
    letter-spacing: 0.05em;
  }
</style>

<script lang="ts">
  import { tournamentState, tournamentConfig } from '$lib/stores/tournament';
  import { toggleTimer, nextLevel, prevLevel, addTime } from '$lib/stores/timer';
  import { playSound } from '$lib/utils/audio';

  $: state = $tournamentState;
  $: config = $tournamentConfig;
  $: isFirst = state.currentLevelIndex === 0;
  $: isLast = state.currentLevelIndex >= config.levels.length - 1;

  function handleToggle() {
    toggleTimer();
    playSound(state.isRunning ? 'pause' : 'start');
  }
</script>

<div class="controls flex flex-wrap items-center justify-center gap-3">
  <button
    class="btn-control btn-secondary"
    on:click={prevLevel}
    disabled={isFirst}
    title="Nível anterior"
  >
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
    </svg>
  </button>

  <button
    class="btn-control btn-primary text-2xl px-8 py-4"
    on:click={handleToggle}
  >
    {#if state.isRunning}
      <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
      </svg>
    {:else}
      <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z"/>
      </svg>
    {/if}
  </button>

  <button
    class="btn-control btn-secondary"
    on:click={nextLevel}
    disabled={isLast}
    title="Próximo nível"
  >
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
    </svg>
  </button>

  <div class="flex gap-2 ml-2">
    <button class="btn-control btn-ghost text-sm" on:click={() => addTime(60)} title="+1 min">+1:00</button>
    <button class="btn-control btn-ghost text-sm" on:click={() => addTime(300)} title="+5 min">+5:00</button>
    <button class="btn-control btn-ghost text-sm text-red-400" on:click={() => addTime(-60)} title="-1 min">-1:00</button>
  </div>
</div>

<style>
  .btn-control {
    @apply rounded-lg font-display tracking-wide transition-all duration-150 flex items-center justify-center gap-2;
  }
  .btn-primary {
    @apply bg-poker-gold text-black hover:bg-yellow-400 active:scale-95 shadow-lg px-6 py-3;
  }
  .btn-secondary {
    @apply bg-gray-800 text-white hover:bg-gray-700 active:scale-95 px-4 py-3 disabled:opacity-30 disabled:cursor-not-allowed;
  }
  .btn-ghost {
    @apply bg-transparent border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200 px-3 py-2;
  }
</style>

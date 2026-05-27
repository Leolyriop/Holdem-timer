<script lang="ts">
  import { tournamentConfig, tournamentState, currentLevel, nextLevel, prizePool, avgStack } from '$lib/stores/tournament';
  import { formatTime, formatChips, formatBlind, formatCurrency } from '$lib/utils/format';
  import { base } from '$app/paths';

  function resolveUrl(url: string) {
    if (!url || url.startsWith('data:') || url.startsWith('http')) return url;
    return base + url;
  }

  $: config = $tournamentConfig;
  $: state = $tournamentState;
  $: lvl = $currentLevel;
  $: next = $nextLevel;
  $: pool = $prizePool;
  $: avg = $avgStack;
  $: timeStr = formatTime(state.timeRemainingSeconds);

  $: isUrgent = state.timeRemainingSeconds <= 60 && !lvl.isBreak;
  $: isWarning = state.timeRemainingSeconds <= 180 && state.timeRemainingSeconds > 60 && !lvl.isBreak;

  $: totalLevels = config.levels.filter(l => !l.isBreak).length;
</script>

<!-- Transparent overlay for OBS Browser Source -->
<!-- Set browser source size: 1920x1080, transparent background -->
<div class="overlay w-screen h-screen relative overflow-hidden" style="background: transparent;">

  <!-- Bottom bar overlay -->
  <div class="absolute bottom-0 left-0 right-0 h-24 flex items-stretch">
    <!-- Club branding -->
    <div class="flex items-center gap-3 px-5 min-w-[200px]"
      style="background: linear-gradient(135deg, rgba(10,10,10,0.95) 0%, rgba(20,20,20,0.9) 100%); border-top: 2px solid {config.primaryColor};">
      {#if config.logoUrl}
        <img src={resolveUrl(config.logoUrl)} alt={config.clubName} class="h-12 w-auto" style="mix-blend-mode: screen" />
      {:else}
        <div class="text-3xl" style="color: {config.primaryColor}">♠</div>
      {/if}
      <div>
        <div class="font-display text-sm leading-tight" style="color: {config.primaryColor}">{config.clubName}</div>
        <div class="text-xs text-gray-500">{config.name}</div>
      </div>
    </div>

    <!-- Divider -->
    <div class="w-px bg-gray-700/50"></div>

    <!-- Blinds -->
    <div class="flex flex-col justify-center items-center px-6 min-w-[180px]"
      style="background: rgba(10,10,10,0.92); border-top: 2px solid {config.primaryColor};">
      {#if lvl.isBreak}
        <div class="font-display text-lg text-amber-400 tracking-widest uppercase">{lvl.breakLabel ?? 'INTERVALO'}</div>
      {:else}
        <div class="text-xs text-gray-500 uppercase tracking-widest mb-1">Blinds — Nível {lvl.level}</div>
        <div class="font-display text-2xl text-white">{formatBlind(lvl.smallBlind, lvl.bigBlind)}</div>
        {#if lvl.ante > 0}
          <div class="text-sm text-amber-400">Ante {formatChips(lvl.ante)}</div>
        {/if}
      {/if}
    </div>

    <!-- Divider -->
    <div class="w-px bg-gray-700/50"></div>

    <!-- Timer -->
    <div class="flex flex-col justify-center items-center px-6 min-w-[160px]"
      style="background: rgba(10,10,10,0.92); border-top: 2px solid {isUrgent ? '#ef4444' : isWarning ? '#f59e0b' : config.primaryColor};">
      <div class="text-xs text-gray-500 uppercase tracking-widest mb-1">Tempo</div>
      <div
        class="font-display text-4xl tabular-nums"
        class:text-red-400={isUrgent}
        class:text-yellow-400={isWarning}
        class:text-white={!isUrgent && !isWarning}
        class:animate-pulse={isUrgent && state.isRunning}
      >
        {timeStr}
      </div>
    </div>

    <!-- Divider -->
    <div class="w-px bg-gray-700/50"></div>

    <!-- Stats -->
    <div class="flex-1 flex items-center justify-around px-4"
      style="background: rgba(10,10,10,0.92); border-top: 2px solid {config.primaryColor};">
      <div class="text-center">
        <div class="text-xs text-gray-500 uppercase tracking-widest">Jogadores</div>
        <div class="font-display text-xl text-white">{state.playersRemaining}<span class="text-gray-600 text-sm">/{state.players}</span></div>
      </div>
      <div class="text-center">
        <div class="text-xs text-gray-500 uppercase tracking-widest">Prize Pool</div>
        <div class="font-display text-xl" style="color: {config.primaryColor}">{formatCurrency(pool)}</div>
      </div>
      <div class="text-center">
        <div class="text-xs text-gray-500 uppercase tracking-widest">Avg Stack</div>
        <div class="font-display text-xl text-white">{formatChips(avg)}</div>
      </div>
      {#if next && !lvl.isBreak}
        <div class="text-center">
          <div class="text-xs text-gray-500 uppercase tracking-widest">Próximo</div>
          <div class="font-display text-sm text-gray-400">
            {next.isBreak ? (next.breakLabel ?? 'Break') : formatBlind(next.smallBlind, next.bigBlind)}
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  :global(html, body) {
    background: transparent !important;
    overflow: hidden;
  }
</style>

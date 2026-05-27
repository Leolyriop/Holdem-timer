<script lang="ts">
  import { onDestroy } from 'svelte';
  import Timer from '$lib/components/Timer.svelte';
  import BlindInfo from '$lib/components/BlindInfo.svelte';
  import Controls from '$lib/components/Controls.svelte';
  import StatCard from '$lib/components/StatCard.svelte';
  import LevelList from '$lib/components/LevelList.svelte';
  import PlayerManager from '$lib/components/PlayerManager.svelte';

  import {
    tournamentConfig,
    tournamentState,
    currentLevel,
    nextLevel,
    prizePool,
    avgStack,
    resetTournament,
  } from '$lib/stores/tournament';
  import { toggleTimer, nextLevel as goNextLevel, prevLevel as goPrevLevel, addTime, jumpToLevel } from '$lib/stores/timer';
  import { formatCurrency, formatChips, formatTime } from '$lib/utils/format';

  let showSidebar = true;
  let showLevels = false;
  let isFullscreen = false;

  $: config = $tournamentConfig;
  $: state = $tournamentState;
  $: lvl = $currentLevel;
  $: pool = $prizePool;
  $: avg = $avgStack;

  $: bgStyle = config.backgroundImageUrl
    ? `background-image: url(${config.backgroundImageUrl}); background-size: cover; background-position: center;`
    : `background: radial-gradient(ellipse at center, ${config.secondaryColor}33 0%, #050505 70%)`;

  $: progressPercent = (() => {
    if (!lvl) return 0;
    const total = lvl.duration * 60;
    return (state.timeRemainingSeconds / total) * 100;
  })();

  $: progressColor = (() => {
    if (progressPercent > 50) return config.primaryColor;
    if (progressPercent > 20) return '#f59e0b';
    return '#ef4444';
  })();

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      isFullscreen = true;
    } else {
      document.exitFullscreen();
      isFullscreen = false;
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
    switch (e.code) {
      case 'Space':
        e.preventDefault();
        toggleTimer();
        break;
      case 'KeyF': toggleFullscreen(); break;
      case 'KeyS': showSidebar = !showSidebar; break;
      case 'KeyL': showLevels = !showLevels; break;
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div
  class="main-layout min-h-screen flex flex-col relative overflow-hidden"
  style={bgStyle}
>
  <!-- Background overlay -->
  <div class="absolute inset-0 bg-black/60 pointer-events-none"></div>


  <!-- Header bar -->
  <header class="relative z-10 flex items-center justify-between px-6 py-3 border-b border-gray-800/60">
    <div class="flex items-center gap-3">
      {#if config.logoUrl}
        <img src={config.logoUrl} alt={config.clubName} class="h-10 w-auto object-contain" style="mix-blend-mode: screen" />
      {:else}
        <div class="h-10 w-10 rounded-full flex items-center justify-center border-2" style="border-color: {config.primaryColor}">
          <span class="text-lg font-display" style="color: {config.primaryColor}">♠</span>
        </div>
      {/if}
      <div>
        <div class="font-display text-lg leading-tight" style="color: {config.primaryColor}">{config.clubName}</div>
        <div class="text-xs text-gray-500 tracking-widest uppercase">{config.name}</div>
      </div>
    </div>

    <nav class="flex items-center gap-2">
      <a href="/admin" class="btn-nav">Admin</a>
      <a href="/overlay" target="_blank" class="btn-nav">OBS Overlay</a>
      <button class="btn-nav" on:click={() => showSidebar = !showSidebar}>
        {showSidebar ? 'Ocultar' : 'Mostrar'} Painel
      </button>
      <button class="btn-nav" on:click={toggleFullscreen}>
        {isFullscreen ? 'Sair' : 'Tela Cheia'}
      </button>
    </nav>
  </header>

  <!-- Main content -->
  <main class="relative z-10 flex flex-1 overflow-hidden">
    <!-- Center stage -->
    <div class="flex-1 flex flex-col items-center justify-center px-6 py-4 gap-4 relative">

      <!-- Logo watermark centrada no timer -->
      {#if config.logoUrl}
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <img src={config.logoUrl} alt="" class="logo-watermark" />
        </div>
      {/if}

      <!-- Blind info -->
      <div class="w-full max-w-2xl animate-fade-in">
        <BlindInfo />
      </div>

      <!-- Timer -->
      <div class="w-full flex justify-center">
        <Timer />
      </div>

      <!-- Progress bar -->
      <div class="w-full max-w-xl h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <div
          class="h-full rounded-full transition-all duration-1000"
          style="width: {progressPercent}%; background-color: {progressColor};"
        ></div>
      </div>

      <!-- Controls -->
      <div class="mt-2">
        <Controls />
      </div>

      <!-- Stats row -->
      <div class="w-full max-w-3xl grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
        <StatCard label="Jogadores" value={String(state.playersRemaining)} sub={"de " + state.players} />
        <StatCard label="Prize Pool" value={formatCurrency(pool)} highlight />
        <StatCard label="Média Stack" value={formatChips(avg)} />
        <StatCard label="Buy-in" value={formatCurrency(config.buyIn)} sub={state.totalRebuys > 0 ? state.totalRebuys + " rebuys" : ""} />
      </div>
    </div>

    <!-- Sidebar -->
    {#if showSidebar}
      <aside class="w-72 border-l border-gray-800/60 bg-black/40 backdrop-blur-sm flex flex-col p-4 gap-5 overflow-y-auto">
        <PlayerManager />

        <div class="border-t border-gray-800 pt-4">
          <button
            class="text-xs tracking-widest uppercase text-gray-500 hover:text-gray-300 mb-3 flex items-center gap-1"
            on:click={() => showLevels = !showLevels}
          >
            Estrutura de Níveis
            <svg class="w-3 h-3 transition-transform" class:rotate-180={showLevels} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {#if showLevels}
            <LevelList />
          {/if}
        </div>

        <div class="border-t border-gray-800 pt-4 mt-auto">
          <button
            class="w-full text-xs text-red-500 hover:text-red-400 py-2 tracking-widest uppercase border border-red-900/50 rounded hover:border-red-700 transition-colors"
            on:click={resetTournament}
          >
            Reiniciar Torneio
          </button>
        </div>
      </aside>
    {/if}
  </main>

  <!-- Keyboard shortcuts hint -->
  <footer class="relative z-10 px-6 py-2 border-t border-gray-800/40 flex items-center gap-6 text-xs text-gray-700">
    <span><kbd class="kbd">Espaço</kbd> Play/Pause</span>
    <span><kbd class="kbd">F</kbd> Tela cheia</span>
    <span><kbd class="kbd">S</kbd> Painel</span>
    <span><kbd class="kbd">L</kbd> Níveis</span>
  </footer>
</div>

<style>
  .btn-nav {
    @apply text-xs tracking-widest uppercase text-gray-400 hover:text-white px-3 py-1.5 rounded border border-gray-700 hover:border-gray-500 transition-colors;
  }
  kbd.kbd {
    @apply bg-gray-800 border border-gray-700 rounded px-1.5 py-0.5 font-mono text-gray-400 mr-1;
  }
  .logo-watermark {
    width: min(85vw, 85vh);
    height: min(85vw, 85vh);
    object-fit: contain;
    opacity: 0.12;
    mix-blend-mode: screen;
    filter: grayscale(20%);
    user-select: none;
    -webkit-user-drag: none;
  }
</style>

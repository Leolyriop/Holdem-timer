<script lang="ts">
  import { tournamentConfig, applyConfig, resetTournament } from '$lib/stores/tournament';
  import type { TournamentConfig, BlindLevel } from '$lib/types';
  import { formatChips } from '$lib/utils/format';

  let config: TournamentConfig = JSON.parse(JSON.stringify($tournamentConfig));
  let activeTab: 'general' | 'levels' | 'prizes' | 'appearance' = 'general';
  let saved = false;
  let editingLevelId: string | null = null;

  function save() {
    applyConfig(config);
    saved = true;
    setTimeout(() => (saved = false), 2000);
  }

  function addLevel() {
    const lastNonBreak = [...config.levels].reverse().find(l => !l.isBreak);
    const nextNum = (lastNonBreak?.level ?? 0) + 1;
    const newLevel: BlindLevel = {
      id: crypto.randomUUID(),
      level: nextNum,
      smallBlind: (lastNonBreak?.bigBlind ?? 100) * 1.5,
      bigBlind: (lastNonBreak?.bigBlind ?? 100) * 2,
      ante: lastNonBreak?.ante ?? 0,
      duration: 15,
      isBreak: false,
    };
    config.levels = [...config.levels, newLevel];
  }

  function addBreak() {
    const newBreak: BlindLevel = {
      id: crypto.randomUUID(),
      level: 0,
      smallBlind: 0,
      bigBlind: 0,
      ante: 0,
      duration: 10,
      isBreak: true,
      breakLabel: 'INTERVALO',
    };
    config.levels = [...config.levels, newBreak];
  }

  function removeLevel(id: string) {
    config.levels = config.levels.filter(l => l.id !== id);
  }

  function moveLevel(id: string, dir: -1 | 1) {
    const idx = config.levels.findIndex(l => l.id === id);
    if (idx < 0) return;
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= config.levels.length) return;
    const arr = [...config.levels];
    [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
    config.levels = arr;
  }

  function handleLogoUpload(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      config.logoUrl = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  function handleBgUpload(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      config.backgroundImageUrl = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  function exportConfig() {
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${config.name.replace(/\s+/g, '_')}_config.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function importConfig(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const imported = JSON.parse(ev.target?.result as string);
        config = imported;
      } catch {
        alert('Arquivo inválido');
      }
    };
    reader.readAsText(file);
  }
</script>

<div class="admin-page min-h-screen bg-gray-950 text-white">
  <!-- Header -->
  <header class="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
    <div class="flex items-center gap-4">
      <a href="/" class="text-gray-400 hover:text-white transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </a>
      <h1 class="font-display text-xl text-poker-gold">Painel Administrativo</h1>
    </div>
    <div class="flex items-center gap-3">
      <button class="btn-outline text-xs" on:click={exportConfig}>Exportar Config</button>
      <label class="btn-outline text-xs cursor-pointer">
        Importar Config
        <input type="file" accept=".json" class="hidden" on:change={importConfig} />
      </label>
      <button
        class="btn-primary px-6"
        on:click={save}
        class:bg-green-600={saved}
      >
        {saved ? '✓ Salvo' : 'Salvar Configurações'}
      </button>
    </div>
  </header>

  <div class="flex flex-1 h-[calc(100vh-65px)]">
    <!-- Sidebar tabs -->
    <nav class="w-48 border-r border-gray-800 p-3 space-y-1">
      {#each [
        { key: 'general', label: 'Geral' },
        { key: 'levels', label: 'Níveis' },
        { key: 'prizes', label: 'Premiação' },
        { key: 'appearance', label: 'Aparência' },
      ] as tab}
        <button
          class="tab-item w-full"
          class:active={activeTab === tab.key}
          on:click={() => (activeTab = tab.key)}
        >
          {tab.label}
        </button>
      {/each}
    </nav>

    <!-- Content -->
    <div class="flex-1 overflow-y-auto p-6">

      <!-- GENERAL -->
      {#if activeTab === 'general'}
        <div class="max-w-2xl space-y-6">
          <section class="card-section">
            <h2 class="section-title">Identificação do Torneio</h2>
            <div class="grid grid-cols-2 gap-4">
              <div class="field-group col-span-2">
                <label class="field-label">Nome do Torneio</label>
                <input class="field-input" bind:value={config.name} />
              </div>
              <div class="field-group col-span-2">
                <label class="field-label">Nome do Clube</label>
                <input class="field-input" bind:value={config.clubName} />
              </div>
            </div>
          </section>

          <section class="card-section">
            <h2 class="section-title">Financeiro</h2>
            <div class="grid grid-cols-2 gap-4">
              <div class="field-group">
                <label class="field-label">Buy-in (R$)</label>
                <input class="field-input" type="number" bind:value={config.buyIn} />
              </div>
              <div class="field-group">
                <label class="field-label">Stack Inicial</label>
                <input class="field-input" type="number" bind:value={config.startingStack} />
              </div>
              <div class="field-group">
                <label class="field-label">Valor Rebuy (R$)</label>
                <input class="field-input" type="number" bind:value={config.rebuyAmount} />
              </div>
              <div class="field-group">
                <label class="field-label">Até Nível (Rebuy)</label>
                <input class="field-input" type="number" bind:value={config.rebuyLevels} />
              </div>
              <div class="field-group">
                <label class="field-label">Valor Add-on (R$)</label>
                <input class="field-input" type="number" bind:value={config.addOnAmount} />
              </div>
              <div class="field-group">
                <label class="field-label">Nível Add-on</label>
                <input class="field-input" type="number" bind:value={config.addOnLevel} />
              </div>
              <div class="field-group">
                <label class="field-label">Late Reg. até Nível</label>
                <input class="field-input" type="number" bind:value={config.lateRegistrationLevel} />
              </div>
            </div>
          </section>
        </div>

      <!-- LEVELS -->
      {:else if activeTab === 'levels'}
        <div class="max-w-4xl">
          <div class="flex items-center justify-between mb-4">
            <h2 class="section-title mb-0">Estrutura de Blinds</h2>
            <div class="flex gap-2">
              <button class="btn-outline text-xs" on:click={addBreak}>+ Break</button>
              <button class="btn-primary text-xs px-4 py-2" on:click={addLevel}>+ Nível</button>
            </div>
          </div>

          <div class="space-y-1">
            <!-- Header -->
            <div class="grid grid-cols-12 gap-2 text-xs text-gray-500 uppercase tracking-widest px-3 py-2">
              <div class="col-span-1">#</div>
              <div class="col-span-2">Small Blind</div>
              <div class="col-span-2">Big Blind</div>
              <div class="col-span-2">Ante</div>
              <div class="col-span-2">Duração (min)</div>
              <div class="col-span-3">Ações</div>
            </div>

            {#each config.levels as level, i (level.id)}
              {#if level.isBreak}
                <div class="grid grid-cols-12 gap-2 items-center bg-amber-950/30 border border-amber-900/30 rounded px-3 py-2">
                  <div class="col-span-1 text-amber-600 font-display text-sm">⏸</div>
                  <div class="col-span-4">
                    <input class="field-input text-amber-400 bg-transparent border-amber-900/50 text-sm" bind:value={level.breakLabel} placeholder="Label do break" />
                  </div>
                  <div class="col-span-2">
                    <input class="field-input text-sm" type="number" bind:value={level.duration} min="1" />
                  </div>
                  <div class="col-span-5 flex gap-1">
                    <button class="btn-icon" on:click={() => moveLevel(level.id, -1)} disabled={i === 0} title="Subir">↑</button>
                    <button class="btn-icon" on:click={() => moveLevel(level.id, 1)} disabled={i === config.levels.length - 1} title="Descer">↓</button>
                    <button class="btn-icon text-red-400 hover:bg-red-900/30" on:click={() => removeLevel(level.id)} title="Remover">✕</button>
                  </div>
                </div>
              {:else}
                <div class="grid grid-cols-12 gap-2 items-center bg-gray-900/50 border border-gray-800 rounded px-3 py-2 hover:border-gray-700 transition-colors">
                  <div class="col-span-1 font-display text-gray-400 text-sm">{level.level}</div>
                  <div class="col-span-2">
                    <input class="field-input text-sm" type="number" bind:value={level.smallBlind} min="0" />
                  </div>
                  <div class="col-span-2">
                    <input class="field-input text-sm" type="number" bind:value={level.bigBlind} min="0" />
                  </div>
                  <div class="col-span-2">
                    <input class="field-input text-sm" type="number" bind:value={level.ante} min="0" />
                  </div>
                  <div class="col-span-2">
                    <input class="field-input text-sm" type="number" bind:value={level.duration} min="1" />
                  </div>
                  <div class="col-span-3 flex gap-1">
                    <button class="btn-icon" on:click={() => moveLevel(level.id, -1)} disabled={i === 0} title="Subir">↑</button>
                    <button class="btn-icon" on:click={() => moveLevel(level.id, 1)} disabled={i === config.levels.length - 1} title="Descer">↓</button>
                    <button class="btn-icon text-red-400 hover:bg-red-900/30" on:click={() => removeLevel(level.id)} title="Remover">✕</button>
                  </div>
                </div>
              {/if}
            {/each}
          </div>
        </div>

      <!-- PRIZES -->
      {:else if activeTab === 'prizes'}
        <div class="max-w-xl space-y-6">
          <section class="card-section">
            <h2 class="section-title">Estrutura de Premiação</h2>
            <p class="text-xs text-gray-500 mb-4">Os percentuais são calculados sobre o Prize Pool total.</p>

            <div class="space-y-2">
              {#each Array(10) as _, i}
                {@const pos = i + 1}
                <div class="flex items-center gap-3">
                  <div class="font-display text-gray-400 w-8 text-right">{pos}º</div>
                  <input
                    class="field-input w-28"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="0"
                  />
                  <span class="text-gray-500 text-sm">%</span>
                </div>
              {/each}
            </div>
          </section>
        </div>

      <!-- APPEARANCE -->
      {:else if activeTab === 'appearance'}
        <div class="max-w-2xl space-y-6">
          <section class="card-section">
            <h2 class="section-title">Logo do Clube</h2>
            <div class="flex items-center gap-6">
              {#if config.logoUrl}
                <img src={config.logoUrl} alt="Logo" class="h-20 w-auto object-contain bg-gray-900 rounded p-2" />
              {:else}
                <div class="h-20 w-20 bg-gray-900 rounded flex items-center justify-center text-gray-700 text-3xl">♠</div>
              {/if}
              <div class="space-y-2">
                <label class="btn-outline text-xs cursor-pointer">
                  Carregar Logo
                  <input type="file" accept="image/*" class="hidden" on:change={handleLogoUpload} />
                </label>
                {#if config.logoUrl}
                  <button class="block text-xs text-red-500 hover:text-red-400" on:click={() => (config.logoUrl = '')}>Remover</button>
                {/if}
              </div>
            </div>
          </section>

          <section class="card-section">
            <h2 class="section-title">Cores</h2>
            <div class="grid grid-cols-2 gap-4">
              <div class="field-group">
                <label class="field-label">Cor Primária (Dourado)</label>
                <div class="flex items-center gap-3">
                  <input type="color" bind:value={config.primaryColor} class="h-10 w-20 rounded cursor-pointer bg-gray-900 border border-gray-700" />
                  <input class="field-input flex-1" bind:value={config.primaryColor} />
                </div>
              </div>
              <div class="field-group">
                <label class="field-label">Cor Secundária (Verde)</label>
                <div class="flex items-center gap-3">
                  <input type="color" bind:value={config.secondaryColor} class="h-10 w-20 rounded cursor-pointer bg-gray-900 border border-gray-700" />
                  <input class="field-input flex-1" bind:value={config.secondaryColor} />
                </div>
              </div>
              <div class="field-group">
                <label class="field-label">Background</label>
                <div class="flex items-center gap-3">
                  <input type="color" bind:value={config.backgroundColor} class="h-10 w-20 rounded cursor-pointer bg-gray-900 border border-gray-700" />
                  <input class="field-input flex-1" bind:value={config.backgroundColor} />
                </div>
              </div>
            </div>
          </section>

          <section class="card-section">
            <h2 class="section-title">Background Personalizado</h2>
            <div class="flex items-center gap-6">
              {#if config.backgroundImageUrl}
                <img src={config.backgroundImageUrl} alt="BG" class="h-20 w-32 object-cover rounded" />
              {/if}
              <div class="space-y-2">
                <label class="btn-outline text-xs cursor-pointer">
                  Carregar Imagem de Fundo
                  <input type="file" accept="image/*" class="hidden" on:change={handleBgUpload} />
                </label>
                {#if config.backgroundImageUrl}
                  <button class="block text-xs text-red-500 hover:text-red-400" on:click={() => (config.backgroundImageUrl = '')}>Remover</button>
                {/if}
              </div>
            </div>
          </section>

          <section class="card-section">
            <h2 class="section-title">Tema</h2>
            <div class="flex gap-3">
              <button
                class="btn-outline px-6"
                class:btn-primary={config.theme === 'dark'}
                on:click={() => (config.theme = 'dark')}
              >Escuro</button>
              <button
                class="btn-outline px-6"
                class:btn-primary={config.theme === 'light'}
                on:click={() => (config.theme = 'light')}
              >Claro</button>
            </div>
          </section>

          <!-- Preview -->
          <section class="card-section">
            <h2 class="section-title">Preview</h2>
            <div
              class="rounded-lg p-6 flex flex-col items-center justify-center gap-3 min-h-[200px]"
              style="background: {config.backgroundColor}; border: 2px solid {config.primaryColor}33"
            >
              <div class="font-display text-4xl" style="color: {config.primaryColor}">{config.clubName}</div>
              <div class="font-display text-6xl text-white tabular-nums">12:00</div>
              <div class="font-display text-2xl" style="color: {config.secondaryColor}">100 / 200</div>
            </div>
          </section>
        </div>
      {/if}

    </div>
  </div>
</div>

<style>
  .card-section {
    @apply bg-gray-900 border border-gray-800 rounded-lg p-5;
  }
  .section-title {
    @apply font-display text-sm tracking-widest uppercase text-gray-400 mb-4;
  }
  .field-group {
    @apply flex flex-col gap-1.5;
  }
  .field-label {
    @apply text-xs text-gray-500 tracking-wide;
  }
  .field-input {
    @apply bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-700 transition-colors;
  }
  .btn-primary {
    @apply bg-poker-gold text-black font-display tracking-wide rounded px-4 py-2 hover:bg-yellow-400 transition-colors;
  }
  .btn-outline {
    @apply border border-gray-700 text-gray-400 font-display tracking-wide rounded px-4 py-2 hover:border-gray-500 hover:text-gray-200 transition-colors inline-block;
  }
  .tab-item {
    @apply flex items-center gap-2 px-3 py-2 rounded text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors;
  }
  .tab-item.active {
    @apply bg-gray-800 text-white;
  }
  .btn-icon {
    @apply w-7 h-7 rounded bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white flex items-center justify-center text-xs transition-colors disabled:opacity-30 disabled:cursor-not-allowed;
  }
</style>

<script lang="ts">
  import { tournamentState } from '$lib/stores/tournament';

  function update(field: 'players' | 'playersRemaining' | 'totalRebuys' | 'totalAddOns', delta: number) {
    tournamentState.update(s => ({
      ...s,
      [field]: Math.max(0, s[field] + delta),
    }));
  }

  function setField(field: 'players' | 'playersRemaining', value: string) {
    const n = parseInt(value);
    if (!isNaN(n) && n >= 0) {
      tournamentState.update(s => ({ ...s, [field]: n }));
    }
  }
</script>

<div class="player-manager space-y-4">
  <h3 class="text-xs tracking-widest uppercase text-gray-500 mb-3">Jogadores</h3>

  <div class="grid grid-cols-2 gap-3">
    <div class="field">
      <label class="label-sm" for="total-players">Total</label>
      <div class="counter-row">
        <button class="btn-counter" on:click={() => update('players', -1)}>−</button>
        <input
          id="total-players"
          type="number"
          min="0"
          class="counter-input"
          value={$tournamentState.players}
          on:change={(e) => setField('players', e.currentTarget.value)}
        />
        <button class="btn-counter" on:click={() => update('players', 1)}>+</button>
      </div>
    </div>

    <div class="field">
      <label class="label-sm" for="remaining-players">Restantes</label>
      <div class="counter-row">
        <button class="btn-counter text-red-400" on:click={() => update('playersRemaining', -1)}>−</button>
        <input
          id="remaining-players"
          type="number"
          min="0"
          class="counter-input"
          value={$tournamentState.playersRemaining}
          on:change={(e) => setField('playersRemaining', e.currentTarget.value)}
        />
        <button class="btn-counter" on:click={() => update('playersRemaining', 1)}>+</button>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-2 gap-3">
    <div class="field">
      <label class="label-sm" for="rebuys">Rebuys</label>
      <div class="counter-row">
        <button class="btn-counter" on:click={() => update('totalRebuys', -1)}>−</button>
        <span class="counter-display">{$tournamentState.totalRebuys}</span>
        <button class="btn-counter" on:click={() => update('totalRebuys', 1)}>+</button>
      </div>
    </div>

    <div class="field">
      <label class="label-sm" for="addons">Add-ons</label>
      <div class="counter-row">
        <button class="btn-counter" on:click={() => update('totalAddOns', -1)}>−</button>
        <span class="counter-display">{$tournamentState.totalAddOns}</span>
        <button class="btn-counter" on:click={() => update('totalAddOns', 1)}>+</button>
      </div>
    </div>
  </div>
</div>

<style>
  .label-sm {
    @apply text-xs tracking-widest uppercase text-gray-500 mb-1 block;
  }
  .counter-row {
    @apply flex items-center gap-2;
  }
  .btn-counter {
    @apply w-8 h-8 rounded bg-gray-800 text-white hover:bg-gray-700 font-display text-lg flex items-center justify-center transition-colors;
  }
  .counter-input {
    @apply w-16 text-center bg-gray-900 border border-gray-700 rounded text-white text-lg font-display py-1;
  }
  .counter-display {
    @apply w-16 text-center text-white text-lg font-display;
  }
</style>

<script lang="ts">
  import { tournamentConfig, tournamentState } from '$lib/stores/tournament';
  import { jumpToLevel } from '$lib/stores/timer';
  import { formatChips } from '$lib/utils/format';

  $: config = $tournamentConfig;
  $: state = $tournamentState;
</script>

<div class="level-list overflow-y-auto max-h-[60vh] pr-1">
  <table class="w-full text-sm">
    <thead>
      <tr class="text-xs text-gray-500 uppercase tracking-widest border-b border-gray-800">
        <th class="text-left py-2 pl-2">Nível</th>
        <th class="text-right py-2">Small</th>
        <th class="text-right py-2">Big</th>
        <th class="text-right py-2">Ante</th>
        <th class="text-right py-2 pr-2">Tempo</th>
      </tr>
    </thead>
    <tbody>
      {#each config.levels as level, i}
        <tr
          class="level-row border-b border-gray-800/50 cursor-pointer transition-colors hover:bg-gray-800/60"
          class:active={i === state.currentLevelIndex}
          class:break-row={level.isBreak}
          on:click={() => jumpToLevel(i)}
          on:keydown={(e) => e.key === 'Enter' && jumpToLevel(i)}
          role="row"
          tabindex="0"
        >
          {#if level.isBreak}
            <td colspan="5" class="text-center py-3 text-amber-600 font-display tracking-widest text-xs uppercase">
              {level.breakLabel ?? 'INTERVALO'} — {level.duration} min
            </td>
          {:else}
            <td class="py-2 pl-2 font-display text-gray-300">{level.level}</td>
            <td class="text-right py-2 text-white">{formatChips(level.smallBlind)}</td>
            <td class="text-right py-2 text-white">{formatChips(level.bigBlind)}</td>
            <td class="text-right py-2 text-amber-500">{level.ante > 0 ? formatChips(level.ante) : '-'}</td>
            <td class="text-right py-2 pr-2 text-gray-400">{level.duration}m</td>
          {/if}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .active {
    background: rgba(201, 168, 76, 0.12);
    border-left: 3px solid #c9a84c;
  }
  .break-row {
    background: rgba(255,255,255,0.02);
  }
</style>

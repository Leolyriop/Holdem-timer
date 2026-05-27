<script lang="ts">
  import { currentLevel, nextLevel, tournamentConfig } from '$lib/stores/tournament';
  import { formatChips, formatBlind } from '$lib/utils/format';

  $: lvl = $currentLevel;
  $: next = $nextLevel;
  $: primary = $tournamentConfig.primaryColor;
</script>

<div class="blind-info w-full">
  {#if lvl.isBreak}
    <div class="break-display text-center animate-fade-in">
      <div class="text-5xl md:text-7xl font-display tracking-widest uppercase" style="color: {primary}">
        {lvl.breakLabel ?? 'INTERVALO'}
      </div>
      {#if next && !next.isBreak}
        <div class="mt-4 text-lg text-gray-400">
          Próximo: Blinds {formatBlind(next.smallBlind, next.bigBlind)}
          {#if next.ante > 0}<span class="ml-2">Ante {formatChips(next.ante)}</span>{/if}
        </div>
      {/if}
    </div>
  {:else}
    <div class="grid grid-cols-1 gap-2 text-center">
      <div class="level-badge mb-2">
        <span class="text-sm tracking-widest uppercase text-gray-400">Nível</span>
        <span class="ml-2 text-2xl font-display" style="color: {primary}">{lvl.level}</span>
      </div>

      <div class="blinds-current">
        <div class="label text-xs tracking-widest uppercase text-gray-500 mb-1">Blinds</div>
        <div class="value font-display text-white" style="font-size: clamp(1.5rem, 5vw, 3.5rem)">
          {formatBlind(lvl.smallBlind, lvl.bigBlind)}
        </div>
      </div>

      {#if lvl.ante > 0}
        <div class="ante-info">
          <div class="label text-xs tracking-widest uppercase text-gray-500 mb-1">Ante</div>
          <div class="value font-display text-amber-400 text-2xl md:text-3xl">
            {formatChips(lvl.ante)}
          </div>
        </div>
      {/if}

      {#if next}
        <div class="next-level mt-3 pt-3 border-t border-gray-700">
          <div class="text-xs tracking-widest uppercase text-gray-600 mb-1">
            {next.isBreak ? 'Próximo: ' + (next.breakLabel ?? 'Intervalo') : 'Próximos Blinds'}
          </div>
          {#if !next.isBreak}
            <div class="text-gray-400 text-lg font-display">
              {formatBlind(next.smallBlind, next.bigBlind)}
              {#if next.ante > 0}
                <span class="text-amber-600 ml-2 text-base">Ante {formatChips(next.ante)}</span>
              {/if}
            </div>
          {/if}
        </div>
      {/if}
    </div>
  {/if}
</div>

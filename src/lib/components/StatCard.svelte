<script lang="ts">
  export let label: string;
  export let value: string;
  export let sub: string | undefined = undefined;
  export let highlight = false;
</script>

<div class="stat-card rounded-lg border px-4 py-3 flex flex-col items-center text-center transition-all"
  class:border-yellow-700={highlight}
  class:border-gray-700={!highlight}
  style="background: rgba(255,255,255,0.04)"
>
  <div class="text-xs tracking-widest uppercase text-gray-500 mb-1">{label}</div>
  <div class="font-display text-xl md:text-2xl text-white" class:text-poker-gold={highlight}>{value}</div>
  {#if sub}
    <div class="text-xs text-gray-600 mt-1">{sub}</div>
  {/if}
</div>

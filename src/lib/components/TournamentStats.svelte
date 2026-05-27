<script lang="ts">
  import { tournamentState, tournamentConfig, prizePool, avgStack } from '$lib/stores/tournament';
  import StatCard from './StatCard.svelte';
  import { formatCurrency, formatChips } from '$lib/utils/format';

  $: state = $tournamentState;
  $: config = $tournamentConfig;
  $: pool = $prizePool;
  $: avg = $avgStack;
</script>

<div class="stats-grid grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
  <StatCard label="Jogadores" value={String(state.playersRemaining)} sub={"de " + state.players} />
  <StatCard label="Prize Pool" value={formatCurrency(pool)} highlight />
  <StatCard label="Média Stack" value={formatChips(avg)} />
  <StatCard label="Buy-in" value={formatCurrency(config.buyIn)} sub={state.totalRebuys > 0 ? state.totalRebuys + " rebuys" : ""} />
</div>

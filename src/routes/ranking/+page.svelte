<script lang="ts">
  interface RankingPlayer {
    name: string;
    games: number;
    wins: number;
    podiums: number;
    points: number;
    avatar: string;
    suit: string;
  }

  // ── Edite esta lista para atualizar o ranking ────────────────────────────────
  const allPlayers: RankingPlayer[] = [
    { name: 'Leozinho',    games: 12, wins: 4, podiums: 7,  points: 142, avatar: 'L', suit: '♠' },
    { name: 'Kaique',      games: 11, wins: 3, podiums: 6,  points: 118, avatar: 'K', suit: '♥' },
    { name: 'Marcão',      games: 10, wins: 2, podiums: 5,  points: 97,  avatar: 'M', suit: '♦' },
    { name: 'Thiagão',     games: 12, wins: 1, podiums: 4,  points: 84,  avatar: 'T', suit: '♣' },
    { name: 'Brunão',      games: 9,  wins: 2, podiums: 3,  points: 76,  avatar: 'B', suit: '♠' },
    { name: 'Rafaelzinho', games: 10, wins: 1, podiums: 3,  points: 65,  avatar: 'R', suit: '♥' },
    { name: 'Douglas',     games: 8,  wins: 1, podiums: 2,  points: 58,  avatar: 'D', suit: '♦' },
    { name: 'Gustavo',     games: 7,  wins: 0, podiums: 2,  points: 42,  avatar: 'G', suit: '♣' },
    { name: 'Vinícius',    games: 6,  wins: 0, podiums: 1,  points: 31,  avatar: 'V', suit: '♠' },
    { name: 'Fabinho',     games: 5,  wins: 0, podiums: 0,  points: 18,  avatar: 'F', suit: '♥' },
  ].sort((a, b) => b.points - a.points);

  const half = Math.ceil(allPlayers.length / 2);
  const leftCol  = allPlayers.slice(0, half).map((p, i) => ({ ...p, pos: i + 1 }));
  const rightCol = allPlayers.slice(half).map((p, i) => ({ ...p, pos: half + i + 1 }));

  const season = 'Temporada 2026';
</script>

<div class="page">

  <!-- ── Header ──────────────────────────────────────────────────────────────── -->
  <header class="header">
    <img src="/kpc-logo.png" alt="KPC" class="logo" />
    <div class="header-text">
      <h1 class="title">Ranking da Temporada</h1>
      <p class="subtitle">Kamikaze Poker Club &nbsp;·&nbsp; {season}</p>
    </div>
  </header>

  <!-- ── Grid de duas colunas ────────────────────────────────────────────────── -->
  <main class="grid">

    <!-- Coluna esquerda -->
    <section class="col">
      <div class="col-header">
        <span></span>
        <span class="pts-label">Pontos</span>
      </div>
      {#each leftCol as player}
        <div class="row" class:is-first={player.pos === 1}>
          <span class="pos" class:gold={player.pos === 1}>{player.pos}</span>

          <div class="avatar" class:avatar-gold={player.pos === 1}
               class:avatar-silver={player.pos === 2}
               class:avatar-bronze={player.pos === 3}>
            {player.avatar}
          </div>

          <div class="info">
            <span class="name">{player.name}</span>
            <span class="meta">
              <span class="suit" class:suit-red={player.suit === '♥' || player.suit === '♦'}>
                {player.suit}
              </span>
              {player.wins} vitória{player.wins !== 1 ? 's' : ''} &nbsp;·&nbsp; {player.games} jogos
            </span>
          </div>

          <span class="pts" class:gold={player.pos === 1}>
            {player.points.toLocaleString('pt-BR')}
          </span>
        </div>
      {/each}
    </section>

    <!-- Divisor vertical -->
    <div class="vdivider"></div>

    <!-- Coluna direita -->
    <section class="col">
      <div class="col-header">
        <span></span>
        <span class="pts-label">Pontos</span>
      </div>
      {#each rightCol as player}
        <div class="row">
          <span class="pos">{player.pos}</span>

          <div class="avatar">
            {player.avatar}
          </div>

          <div class="info">
            <span class="name">{player.name}</span>
            <span class="meta">
              <span class="suit" class:suit-red={player.suit === '♥' || player.suit === '♦'}>
                {player.suit}
              </span>
              {player.wins} vitória{player.wins !== 1 ? 's' : ''} &nbsp;·&nbsp; {player.games} jogos
            </span>
          </div>

          <span class="pts">{player.points.toLocaleString('pt-BR')}</span>
        </div>
      {/each}
    </section>

  </main>

</div>

<style>
  /* ── Base ─────────────────────────────────────────────────────────────────── */
  .page {
    min-height: 100vh;
    background: #0a0a0a;
    color: #fff;
    font-family: 'Oswald', 'Impact', sans-serif;
    padding: 0 0 4rem;
  }

  /* ── Header ───────────────────────────────────────────────────────────────── */
  .header {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    padding: 2rem 3rem 1.75rem;
  }
  .logo {
    width: 72px;
    height: auto;
    flex-shrink: 0;
    filter: drop-shadow(0 0 12px rgba(204,0,0,0.5));
  }
  .header-text { display: flex; flex-direction: column; gap: 0.15rem; }
  .title {
    font-size: clamp(1.6rem, 3.5vw, 2.6rem);
    font-weight: 700;
    letter-spacing: 0.04em;
    color: #fff;
    margin: 0;
    line-height: 1;
  }
  .subtitle {
    font-size: 0.85rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #666;
    margin: 0;
  }

  /* ── Grid 2 colunas ───────────────────────────────────────────────────────── */
  .grid {
    display: grid;
    grid-template-columns: 1fr 1px 1fr;
    gap: 0 2.5rem;
    padding: 0 3rem;
  }
  .vdivider {
    background: rgba(255,255,255,0.08);
    align-self: stretch;
  }

  /* ── Coluna ───────────────────────────────────────────────────────────────── */
  .col {
    display: flex;
    flex-direction: column;
  }
  .col-header {
    display: flex;
    justify-content: flex-end;
    padding: 0 0 0.5rem;
    border-bottom: 1px solid rgba(255,255,255,0.12);
    margin-bottom: 0;
  }
  .pts-label {
    font-size: 0.75rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #555;
    font-weight: 400;
  }

  /* ── Linha de jogador ─────────────────────────────────────────────────────── */
  .row {
    display: grid;
    grid-template-columns: 36px 56px 1fr auto;
    align-items: center;
    gap: 0 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    transition: background 0.15s;
  }
  .row:last-child { border-bottom: none; }
  .row:hover { background: rgba(255,255,255,0.02); }

  /* posição */
  .pos {
    font-size: 1.3rem;
    font-weight: 700;
    color: #fff;
    text-align: center;
    line-height: 1;
  }
  .pos.gold { color: #c9a84c; }

  /* avatar circular */
  .avatar {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: #1a1a1a;
    border: 2px solid rgba(255,255,255,0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: 700;
    color: #fff;
    flex-shrink: 0;
  }
  .avatar-gold   { border-color: #c9a84c; box-shadow: 0 0 12px rgba(201,168,76,0.35); }
  .avatar-silver { border-color: #9e9e9e; }
  .avatar-bronze { border-color: #b5651d; }

  /* info nome + meta */
  .info {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    min-width: 0;
  }
  .name {
    font-size: 1.05rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .row.is-first .name { color: #c9a84c; }

  .meta {
    font-size: 0.78rem;
    color: #555;
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-weight: 400;
  }
  .suit { color: #666; font-size: 0.85rem; }
  .suit-red { color: #cc0000; }

  /* pontos */
  .pts {
    font-size: 1.1rem;
    font-weight: 600;
    color: #ccc;
    text-align: right;
    white-space: nowrap;
    letter-spacing: 0.02em;
  }
  .pts.gold { color: #c9a84c; }

  /* ── Responsivo ───────────────────────────────────────────────────────────── */
  @media (max-width: 700px) {
    .header { padding: 1.5rem 1.25rem 1.25rem; }
    .grid {
      grid-template-columns: 1fr;
      padding: 0 1.25rem;
      gap: 0;
    }
    .vdivider { display: none; }
    .col + .col { margin-top: 2rem; }
  }
</style>

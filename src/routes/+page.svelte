<script lang="ts">
  import { base } from '$app/paths';

  // ── Próximos torneios ────────────────────────────────────────────────────────
  const nextTournaments = [
    {
      id: 1,
      name: 'Torneio #8 da Temporada',
      date: '14 Jun 2026',
      time: '19h00',
      local: 'A definir',
      buyIn: 100,
      rebuy: 100,
      format: 'Texas Hold\'em · Freezeout',
      seats: 20,
    },
    {
      id: 2,
      name: 'Torneio #9 da Temporada',
      date: '12 Jul 2026',
      time: '19h00',
      local: 'A definir',
      buyIn: 100,
      rebuy: 100,
      format: 'Texas Hold\'em · Rebuy',
      seats: 20,
    },
  ];

  // ── Top 5 ranking ────────────────────────────────────────────────────────────
  const top5 = [
    { pos: 1, name: 'Leozinho',  games: 12, wins: 4, points: 142 },
    { pos: 2, name: 'Kaique',    games: 11, wins: 3, points: 118 },
    { pos: 3, name: 'Marcão',    games: 10, wins: 2, points: 97  },
    { pos: 4, name: 'Thiagão',   games: 12, wins: 1, points: 84  },
    { pos: 5, name: 'Brunão',    games: 9,  wins: 2, points: 76  },
  ];

  // ── Como funciona ────────────────────────────────────────────────────────────
  const howItWorks = [
    { suit: '♠', title: 'Texas Hold\'em', desc: 'Todos os torneios seguem as regras oficiais do Texas Hold\'em. Estrutura de blinds progressiva com níveis de 15 minutos.' },
    { suit: '♣', title: 'Temporada', desc: 'A temporada conta com torneios mensais. Cada partida garante pontos de acordo com a posição final do jogador.' },
    { suit: '♦', title: 'Pontuação', desc: '1º = 10 pts · 2º = 7 pts · 3º = 5 pts · 4º = 3 pts · 5º = 2 pts · demais = 1 pt por participação.' },
    { suit: '♥', title: 'Premiação', desc: 'O prize pool é dividido entre os finalistas. O campeão da temporada leva um prêmio especial acumulado.' },
  ];

  // ── Campeões ─────────────────────────────────────────────────────────────────
  const champions = [
    { season: 'Temporada 2024', name: 'Leozinho',  tournaments: 10, wins: 5 },
    { season: 'Temporada 2025', name: 'Kaique',    tournaments: 11, wins: 4 },
  ];

  // ── Galeria (placeholders) ───────────────────────────────────────────────────
  const galleryItems = [
    { label: 'Final Torneio #7', suit: '♠' },
    { label: 'Pódio Torneio #6', suit: '♦' },
    { label: 'Mesa final',         suit: '♥' },
    { label: 'Torneio #5',         suit: '♣' },
    { label: 'Rebuy Night',        suit: '♠' },
    { label: 'Abertura 2025',      suit: '♥' },
  ];

  // ── Blog ─────────────────────────────────────────────────────────────────────
  const posts = [
    { date: '20 Mai 2026', title: 'Leozinho vence torneio #7 em final emocionante', excerpt: 'Com uma blefe arriscado no river, Leozinho desbancou Kaique na final e assumiu a liderança da temporada.' },
    { date: '15 Abr 2026', title: 'Novo formato de rebuy é aprovado pelo clube', excerpt: 'A partir do torneio #8, o rebuy passa a ser permitido apenas até o nível 4, tornando a disputa mais estratégica.' },
    { date: '10 Mar 2026', title: 'Torneio #6 bate recorde de inscritos', excerpt: '18 jogadores presentes no torneio de março, o maior público da temporada até agora.' },
  ];

  let mobileMenuOpen = false;

  const navLinks = [
    { label: 'Próximos Torneios', href: '#proximos-torneios' },
    { label: 'Ranking',           href: '#ranking' },
    { label: 'Como Funciona',     href: '#como-funciona' },
    { label: 'Blog',              href: '#blog' },
    { label: 'Lives',             href: `${base}/lives` },
    { label: 'Galeria',           href: '#galeria' },
    { label: 'Campeões KPC',      href: '#campeoes' },
    { label: 'Contato',           href: '#contato' },
  ];
</script>

<!-- ── Navbar ─────────────────────────────────────────────────────────────────── -->
<nav class="navbar">
  <div class="nav-inner">
    <a href="{base}/" class="nav-logo">
      <img src="/kpc-logo.png" alt="KPC" />
      <span>KPC</span>
    </a>

    <ul class="nav-links">
      {#each navLinks as link}
        <li><a href={link.href}>{link.label}</a></li>
      {/each}
    </ul>

    <a href="{base}/timer" class="nav-cta">Timer ♠</a>

    <button class="burger" on:click={() => mobileMenuOpen = !mobileMenuOpen} aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>

  {#if mobileMenuOpen}
    <ul class="mobile-menu">
      {#each navLinks as link}
        <li><a href={link.href} on:click={() => mobileMenuOpen = false}>{link.label}</a></li>
      {/each}
      <li><a href="{base}/timer" on:click={() => mobileMenuOpen = false}>Timer</a></li>
    </ul>
  {/if}
</nav>

<!-- ── Hero ───────────────────────────────────────────────────────────────────── -->
<section class="hero" id="hero">
  <div class="hero-bg" aria-hidden="true">
    <img src="/hero-bg.jpg" alt="" class="hero-photo" />
    <div class="hero-overlay"></div>
  </div>
  <div class="hero-content">
    <p class="hero-eyebrow">♠ &nbsp; Kamikaze Poker Club &nbsp; ♠</p>
    <h1 class="hero-title">Jogue.<br/>Vença.<br/>Domine.</h1>
    <p class="hero-desc">
      Texas Hold'em competitivo, temporadas acirradas e uma comunidade que
      vive pelo blefe perfeito. Bem-vindo ao KPC.
    </p>
    <div class="hero-actions">
      <a href="#proximos-torneios" class="btn-primary">Ver próximo torneio</a>
      <a href="#ranking" class="btn-ghost">Ranking da temporada</a>
    </div>
  </div>
  <div class="hero-suits" aria-hidden="true">
    <span>♠</span><span class="red">♦</span><span class="red">♥</span><span>♣</span>
  </div>
</section>

<!-- ── Próximos Torneios ──────────────────────────────────────────────────────── -->
<section class="section" id="proximos-torneios">
  <div class="container">
    <h2 class="section-title">Próximos Torneios</h2>
    <div class="tournaments-grid">
      {#each nextTournaments as t}
        <div class="tournament-card">
          <div class="t-header">
            <span class="t-badge">Torneio #{t.id + 6}</span>
            <span class="t-format">{t.format}</span>
          </div>
          <h3 class="t-name">{t.name}</h3>
          <div class="t-details">
            <div class="t-detail"><span>{t.date} · {t.time}</span></div>
            <div class="t-detail"><span>{t.local}</span></div>
            <div class="t-detail"><span>Buy-in R$ {t.buyIn} · Rebuy R$ {t.rebuy}</span></div>
            <div class="t-detail"><span>Até {t.seats} jogadores</span></div>
          </div>
          <div class="t-footer">
            <span class="t-seats-left">{t.seats} vagas disponíveis</span>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ── Ranking Preview ────────────────────────────────────────────────────────── -->
<section class="section section-dark" id="ranking">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">Ranking · Top 5</h2>
      <a href="{base}/ranking" class="section-link">Ver ranking completo →</a>
    </div>

    <div class="ranking-list">
      <div class="ranking-col-header">
        <span></span>
        <span class="pts-label">Pontos</span>
      </div>
      {#each top5 as p}
        <div class="ranking-row" class:is-first={p.pos === 1}>
          <span class="r-pos" class:gold={p.pos === 1}>{p.pos}</span>
          <div class="r-avatar" class:av-gold={p.pos === 1} class:av-silver={p.pos === 2} class:av-bronze={p.pos === 3}>
            {p.name[0]}
          </div>
          <div class="r-info">
            <span class="r-name">{p.name}</span>
            <span class="r-meta">{p.wins} vitória{p.wins !== 1 ? 's' : ''} · {p.games} jogos</span>
          </div>
          <span class="r-pts" class:gold={p.pos === 1}>{p.points}</span>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ── Como Funciona ──────────────────────────────────────────────────────────── -->
<section class="section" id="como-funciona">
  <div class="container">
    <h2 class="section-title">Como Funciona</h2>
    <div class="how-grid">
      {#each howItWorks as item}
        <div class="how-card">
          <span class="how-suit" class:how-suit-red={item.suit === '♥' || item.suit === '♦'}>{item.suit}</span>
          <h3 class="how-title">{item.title}</h3>
          <p class="how-desc">{item.desc}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ── Blog ───────────────────────────────────────────────────────────────────── -->
<section class="section section-dark" id="blog">
  <div class="container">
    <h2 class="section-title">Últimas Notícias</h2>
    <div class="blog-grid">
      {#each posts as post}
        <article class="blog-card">
          <div class="blog-date">{post.date}</div>
          <h3 class="blog-title">{post.title}</h3>
          <p class="blog-excerpt">{post.excerpt}</p>
          <span class="blog-link">Ler mais →</span>
        </article>
      {/each}
    </div>
  </div>
</section>

<!-- ── Galeria ────────────────────────────────────────────────────────────────── -->
<section class="section" id="galeria">
  <div class="container">
    <h2 class="section-title">Galeria</h2>
    <div class="gallery-grid">
      {#each galleryItems as item}
        <div class="gallery-item">
          <div class="gallery-placeholder">
            <span class="gallery-suit" class:red={item.suit === '♥' || item.suit === '♦'}>{item.suit}</span>
          </div>
          <span class="gallery-label">{item.label}</span>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ── Campeões KPC ───────────────────────────────────────────────────────────── -->
<section class="section section-dark" id="campeoes">
  <div class="container">
    <h2 class="section-title">Campeões KPC</h2>
    <div class="champions-grid">
      {#each champions as c}
        <div class="champion-card">
          <div class="champion-avatar">{c.name[0]}</div>
          <h3 class="champion-name">{c.name}</h3>
          <p class="champion-season">{c.season}</p>
          <div class="champion-stats">
            <span>{c.tournaments} torneios</span>
            <span class="dot">·</span>
            <span>{c.wins} vitórias</span>
          </div>
        </div>
      {/each}

      <!-- Temporada atual em aberto -->
      <div class="champion-card champion-open">
        <div class="champion-avatar open">?</div>
        <h3 class="champion-name">Temporada 2026</h3>
        <p class="champion-season">Em disputa</p>
        <div class="champion-stats">
          <span>Temporada em andamento</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── Contato / Comunidade ───────────────────────────────────────────────────── -->
<section class="section" id="contato">
  <div class="container">
    <h2 class="section-title">Contato &amp; Comunidade</h2>
    <div class="contact-grid">

      <div class="contact-card">
        <h3>WhatsApp</h3>
        <p>Entre no grupo oficial do KPC para acompanhar as novidades e confirmar presença nos torneios.</p>
        <a href="#" class="btn-primary btn-sm">Entrar no grupo</a>
      </div>

      <div class="contact-card">
        <h3>Instagram</h3>
        <p>Siga o KPC no Instagram e fique por dentro de fotos, resultados e bastidores dos torneios.</p>
        <a href="#" class="btn-primary btn-sm">@kamikazepokerclub</a>
      </div>

      <div class="contact-card">
        <h3>Localização</h3>
        <p>Os torneios acontecem mensalmente. O local é confirmado pelo grupo do WhatsApp antes de cada evento.</p>
        <span class="contact-info">São Paulo, SP</span>
      </div>

    </div>
  </div>
</section>

<!-- ── Footer ─────────────────────────────────────────────────────────────────── -->
<footer class="footer">
  <img src="/kpc-logo.png" alt="KPC" class="footer-logo" />
  <p class="footer-name">Kamikaze Poker Club</p>
  <div class="footer-suits">
    <span>♠</span><span class="red">♦</span><span class="red">♥</span><span>♣</span>
  </div>
  <p class="footer-copy">© 2026 KPC · Todos os direitos reservados</p>
</footer>

<style>
  /* ── Reset / base ─────────────────────────────────────────────────────────── */
  * { box-sizing: border-box; }
  a { text-decoration: none; color: inherit; }

  /* ── Navbar ───────────────────────────────────────────────────────────────── */
  .navbar {
    position: sticky;
    top: 0;
    z-index: 100;
    background: #0a0a0a;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .nav-inner {
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 0 2rem;
    height: 80px;
    max-width: 1280px;
    margin: 0 auto;
  }
  .nav-logo {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    flex-shrink: 0;
  }
  .nav-logo img {
    height: 64px;
    width: auto;
    filter: drop-shadow(0 0 6px rgba(204,0,0,0.4));
  }
  .nav-logo span {
    font-family: 'Oswald', sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: #fff;
  }
  .nav-links {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 0;
    flex: 1;
  }
  .nav-links a {
    display: block;
    padding: 0 0.9rem;
    height: 80px;
    line-height: 80px;
    font-family: 'Oswald', sans-serif;
    font-size: 0.78rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #aaa;
    transition: color 0.15s;
    white-space: nowrap;
  }
  .nav-links a:hover { color: #fff; }
  .nav-cta {
    flex-shrink: 0;
    font-family: 'Oswald', sans-serif;
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #fff;
    border: 1px solid #cc0000;
    padding: 0.4rem 0.9rem;
    border-radius: 3px;
    transition: background 0.15s;
  }
  .nav-cta:hover { background: #cc0000; }

  /* burger (mobile) */
  .burger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px;
    margin-left: auto;
  }
  .burger span {
    display: block;
    width: 22px;
    height: 2px;
    background: #fff;
    border-radius: 2px;
  }
  .mobile-menu {
    list-style: none;
    margin: 0;
    padding: 0.5rem 0;
    border-top: 1px solid rgba(255,255,255,0.06);
    background: #0a0a0a;
  }
  .mobile-menu a {
    display: block;
    padding: 0.75rem 2rem;
    font-family: 'Oswald', sans-serif;
    font-size: 0.9rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #aaa;
  }
  .mobile-menu a:hover { color: #fff; background: rgba(255,255,255,0.04); }

  /* ── Hero ─────────────────────────────────────────────────────────────────── */
  .hero {
    position: relative;
    min-height: 88vh;
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  .hero-bg {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .hero-photo {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: auto;
    opacity: 0.5;
    filter: grayscale(15%);
  }
  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      #0a0a0a 35%,
      rgba(10,10,10,0.75) 60%,
      rgba(10,10,10,0.2) 100%
    ), linear-gradient(
      180deg,
      rgba(10,10,10,0.3) 0%,
      transparent 40%,
      rgba(10,10,10,0.5) 100%
    );
  }
  .hero-content {
    position: relative;
    z-index: 2;
    padding: 4rem 2rem 4rem 6vw;
    max-width: 640px;
  }
  .hero-eyebrow {
    font-family: 'Oswald', sans-serif;
    font-size: 0.8rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #cc0000;
    margin: 0 0 1rem;
  }
  .hero-title {
    font-family: 'Oswald', sans-serif;
    font-size: clamp(3.5rem, 8vw, 6.5rem);
    font-weight: 700;
    line-height: 0.95;
    letter-spacing: -0.01em;
    color: #fff;
    margin: 0 0 1.5rem;
    text-shadow: 0 2px 30px rgba(0,0,0,0.8);
  }
  .hero-desc {
    font-family: 'Oswald', sans-serif;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.6;
    color: #999;
    margin: 0 0 2rem;
    max-width: 440px;
    letter-spacing: 0.03em;
  }
  .hero-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .hero-suits {
    position: absolute;
    bottom: 2rem;
    left: 6vw;
    z-index: 2;
    display: flex;
    gap: 0.75rem;
    font-size: 1.1rem;
    color: #333;
  }
  .hero-suits .red { color: #5a0000; }

  /* ── Botões ───────────────────────────────────────────────────────────────── */
  .btn-primary {
    display: inline-block;
    font-family: 'Oswald', sans-serif;
    font-size: 0.85rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    background: #cc0000;
    color: #fff;
    padding: 0.75rem 1.75rem;
    border-radius: 3px;
    transition: background 0.15s, transform 0.1s;
  }
  .btn-primary:hover { background: #e60000; transform: translateY(-1px); }
  .btn-ghost {
    display: inline-block;
    font-family: 'Oswald', sans-serif;
    font-size: 0.85rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #ccc;
    padding: 0.75rem 1.75rem;
    border-radius: 3px;
    border: 1px solid rgba(255,255,255,0.2);
    transition: border-color 0.15s, color 0.15s;
  }
  .btn-ghost:hover { border-color: #fff; color: #fff; }
  .btn-sm { padding: 0.5rem 1.25rem; font-size: 0.78rem; }

  /* ── Seções ───────────────────────────────────────────────────────────────── */
  .section { padding: 5rem 0; }
  .section-dark { background: #060606; }
  .container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  .section-title {
    font-family: 'Oswald', sans-serif;
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 700;
    letter-spacing: 0.04em;
    color: #fff;
    margin: 0 0 2.5rem;
  }
  .section-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .section-header .section-title { margin: 0; }
  .section-link {
    font-family: 'Oswald', sans-serif;
    font-size: 0.8rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #cc0000;
    transition: color 0.15s;
  }
  .section-link:hover { color: #ff3333; }

  /* ── Próximos Torneios ────────────────────────────────────────────────────── */
  .tournaments-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.25rem;
  }
  .tournament-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-top: 3px solid #cc0000;
    border-radius: 6px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  .t-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .t-badge {
    font-family: 'Oswald', sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    background: #cc0000;
    color: #fff;
    padding: 0.2rem 0.6rem;
    border-radius: 2px;
  }
  .t-format {
    font-family: 'Oswald', sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    color: #666;
    text-transform: uppercase;
  }
  .t-name {
    font-family: 'Oswald', sans-serif;
    font-size: 1.2rem;
    font-weight: 600;
    color: #fff;
    margin: 0;
    letter-spacing: 0.03em;
  }
  .t-details { display: flex; flex-direction: column; gap: 0.4rem; }
  .t-detail {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-family: 'Oswald', sans-serif;
    font-size: 0.9rem;
    color: #aaa;
    font-weight: 400;
    letter-spacing: 0.03em;
  }
  .t-icon { font-size: 0.9rem; }
  .t-footer {
    padding-top: 0.75rem;
    border-top: 1px solid rgba(255,255,255,0.06);
  }
  .t-seats-left {
    font-family: 'Oswald', sans-serif;
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #c9a84c;
  }

  /* ── Ranking Preview ──────────────────────────────────────────────────────── */
  .ranking-list { max-width: 600px; }
  .ranking-col-header {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }
  .pts-label {
    font-family: 'Oswald', sans-serif;
    font-size: 0.72rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #555;
  }
  .ranking-row {
    display: grid;
    grid-template-columns: 36px 50px 1fr auto;
    align-items: center;
    gap: 0 0.9rem;
    padding: 0.9rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .ranking-row:last-child { border-bottom: none; }
  .r-pos {
    font-family: 'Oswald', sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
    color: #fff;
    text-align: center;
  }
  .r-pos.gold { color: #c9a84c; }
  .r-avatar {
    width: 48px; height: 48px;
    border-radius: 50%;
    background: #1a1a1a;
    border: 2px solid rgba(255,255,255,0.1);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Oswald', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #fff;
    flex-shrink: 0;
  }
  .av-gold   { border-color: #c9a84c; box-shadow: 0 0 10px rgba(201,168,76,0.3); }
  .av-silver { border-color: #9e9e9e; }
  .av-bronze { border-color: #b5651d; }
  .r-info { display: flex; flex-direction: column; gap: 0.15rem; }
  .r-name {
    font-family: 'Oswald', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: #fff;
  }
  .is-first .r-name { color: #c9a84c; }
  .r-meta {
    font-family: 'Oswald', sans-serif;
    font-size: 0.75rem;
    color: #555;
    font-weight: 400;
    letter-spacing: 0.04em;
  }
  .r-pts {
    font-family: 'Oswald', sans-serif;
    font-size: 1.05rem;
    font-weight: 600;
    color: #ccc;
    text-align: right;
  }
  .r-pts.gold { color: #c9a84c; }

  /* ── Como Funciona ────────────────────────────────────────────────────────── */
  .how-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.25rem;
  }
  .how-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 6px;
    padding: 1.75rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    transition: border-color 0.15s;
  }
  .how-card:hover { border-color: rgba(204,0,0,0.3); }
  .how-suit { font-size: 1.6rem; line-height: 1; color: #fff; }
  .how-suit-red { color: #cc0000; }
  .how-title {
    font-family: 'Oswald', sans-serif;
    font-size: 1.05rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    color: #fff;
    margin: 0;
  }
  .how-desc {
    font-family: 'Oswald', sans-serif;
    font-size: 0.88rem;
    font-weight: 400;
    line-height: 1.55;
    color: #777;
    margin: 0;
    letter-spacing: 0.02em;
  }

  /* ── Blog ─────────────────────────────────────────────────────────────────── */
  .blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.25rem;
  }
  .blog-card {
    border-top: 2px solid rgba(255,255,255,0.08);
    padding: 1.5rem 0;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    cursor: pointer;
    transition: border-color 0.15s;
  }
  .blog-card:hover { border-color: #cc0000; }
  .blog-date {
    font-family: 'Oswald', sans-serif;
    font-size: 0.72rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #cc0000;
  }
  .blog-title {
    font-family: 'Oswald', sans-serif;
    font-size: 1.05rem;
    font-weight: 600;
    letter-spacing: 0.03em;
    color: #fff;
    margin: 0;
    line-height: 1.3;
  }
  .blog-excerpt {
    font-family: 'Oswald', sans-serif;
    font-size: 0.85rem;
    font-weight: 400;
    line-height: 1.55;
    color: #666;
    margin: 0;
    letter-spacing: 0.02em;
  }
  .blog-link {
    font-family: 'Oswald', sans-serif;
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #c9a84c;
    margin-top: auto;
  }

  /* ── Galeria ──────────────────────────────────────────────────────────────── */
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 0.75rem;
  }
  .gallery-item {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    cursor: pointer;
  }
  .gallery-placeholder {
    aspect-ratio: 4/3;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.15s, background 0.15s;
  }
  .gallery-item:hover .gallery-placeholder {
    border-color: rgba(204,0,0,0.3);
    background: rgba(204,0,0,0.05);
  }
  .gallery-suit {
    font-size: 2.5rem;
    color: #2a2a2a;
  }
  .gallery-suit.red { color: #2a0000; }
  .gallery-label {
    font-family: 'Oswald', sans-serif;
    font-size: 0.75rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #555;
  }

  /* ── Campeões ─────────────────────────────────────────────────────────────── */
  .champions-grid {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
  }
  .champion-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 2rem 2.5rem;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(201,168,76,0.2);
    border-radius: 6px;
    min-width: 200px;
    transition: border-color 0.15s;
  }
  .champion-card:hover { border-color: rgba(201,168,76,0.4); }
  .champion-open { border-color: rgba(255,255,255,0.07); }
  .champion-open:hover { border-color: rgba(255,255,255,0.12); }
  .champion-avatar {
    width: 60px; height: 60px;
    border-radius: 50%;
    background: #c9a84c;
    border: 2px solid rgba(201,168,76,0.4);
    box-shadow: 0 0 14px rgba(201,168,76,0.25);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Oswald', sans-serif;
    font-size: 1.4rem;
    font-weight: 700;
    color: #0a0a0a;
  }
  .champion-avatar.open {
    background: #1a1a1a;
    border-color: rgba(255,255,255,0.1);
    box-shadow: none;
    color: #555;
  }
  .champion-name {
    font-family: 'Oswald', sans-serif;
    font-size: 1.15rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    color: #fff;
    margin: 0;
    text-align: center;
  }
  .champion-season {
    font-family: 'Oswald', sans-serif;
    font-size: 0.75rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #c9a84c;
    margin: 0;
  }
  .champion-open .champion-season { color: #555; }
  .champion-stats {
    font-family: 'Oswald', sans-serif;
    font-size: 0.78rem;
    color: #555;
    display: flex;
    gap: 0.4rem;
    letter-spacing: 0.04em;
    flex-wrap: wrap;
    justify-content: center;
  }
  .dot { color: #333; }

  /* ── Contato ──────────────────────────────────────────────────────────────── */
  .contact-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.25rem;
  }
  .contact-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 6px;
    padding: 2rem 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  .contact-card h3 {
    font-family: 'Oswald', sans-serif;
    font-size: 1.05rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    color: #fff;
    margin: 0;
  }
  .contact-card p {
    font-family: 'Oswald', sans-serif;
    font-size: 0.88rem;
    font-weight: 400;
    line-height: 1.55;
    color: #666;
    margin: 0;
    letter-spacing: 0.02em;
  }
  .contact-info {
    font-family: 'Oswald', sans-serif;
    font-size: 0.85rem;
    color: #c9a84c;
    letter-spacing: 0.08em;
  }

  /* ── Footer ───────────────────────────────────────────────────────────────── */
  .footer {
    border-top: 1px solid rgba(255,255,255,0.07);
    padding: 3rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    background: #060606;
  }
  .footer-logo { width: 60px; height: auto; opacity: 0.7; }
  .footer-name {
    font-family: 'Oswald', sans-serif;
    font-size: 0.85rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #444;
    margin: 0;
  }
  .footer-suits {
    display: flex;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: #333;
  }
  .footer-suits .red { color: #3a0000; }
  .footer-copy {
    font-family: 'Oswald', sans-serif;
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    color: #333;
    margin: 0;
    text-transform: uppercase;
  }

  /* ── Responsivo ───────────────────────────────────────────────────────────── */
  @media (max-width: 768px) {
    .nav-links, .nav-cta { display: none; }
    .burger { display: flex; }
    .hero-content { padding: 4rem 1.5rem; }
    .section { padding: 3.5rem 0; }
    .champions-grid { justify-content: center; }
  }
</style>

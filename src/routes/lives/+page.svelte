<script lang="ts">
  import { base } from '$app/paths';

  type Status = 'ao-vivo' | 'em-breve' | 'encerrado';

  interface LiveEvent {
    id: number;
    name: string;
    edition: string;
    date: string;
    time: string;
    local: string;
    status: Status;
    streamUrl: string;
    replayUrl: string;
    resultsUrl: string;
    thumbnail: string;
    description: string;
  }

  // ── Edite esta lista para gerenciar os eventos ───────────────────────────────
  const events: LiveEvent[] = [
    {
      id: 8,
      name: 'Torneio KPC #8',
      edition: 'Temporada 2026',
      date: '14 Jun 2026',
      time: '19h00',
      local: 'São Paulo, SP',
      status: 'em-breve',
      streamUrl: '#',
      replayUrl: '',
      resultsUrl: '',
      thumbnail: '',
      description: 'O maior torneio da temporada 2026. Texas Hold\'em com estrutura Freezeout, blinds progressivos e prize pool garantido.',
    },
    {
      id: 7,
      name: 'Torneio KPC #7',
      edition: 'Temporada 2026',
      date: '10 Mai 2026',
      time: '19h00',
      local: 'São Paulo, SP',
      status: 'encerrado',
      streamUrl: '',
      replayUrl: '#',
      resultsUrl: '#',
      thumbnail: '',
      description: 'Final emocionante com blefe decisivo de Leozinho no river. 16 jogadores, prize pool de R$ 1.600.',
    },
    {
      id: 6,
      name: 'Torneio KPC #6',
      edition: 'Temporada 2026',
      date: '12 Abr 2026',
      time: '19h00',
      local: 'São Paulo, SP',
      status: 'encerrado',
      streamUrl: '',
      replayUrl: '#',
      resultsUrl: '#',
      thumbnail: '',
      description: 'Torneio Rebuy Night com 18 jogadores — recorde de inscritos da temporada.',
    },
    {
      id: 5,
      name: 'Torneio KPC #5',
      edition: 'Temporada 2026',
      date: '08 Mar 2026',
      time: '19h00',
      local: 'São Paulo, SP',
      status: 'encerrado',
      streamUrl: '',
      replayUrl: '#',
      resultsUrl: '#',
      thumbnail: '',
      description: 'Primeiro torneio do segundo trimestre. Vitória de Kaique com dois outs no river.',
    },
  ];

  const featured = events[0];
  const past = events.slice(1);

  const statusLabel: Record<Status, string> = {
    'ao-vivo':  'AO VIVO',
    'em-breve': 'EM BREVE',
    'encerrado': 'ENCERRADO',
  };

  const statusDesc: Record<Status, string> = {
    'ao-vivo':  'Transmissão em andamento',
    'em-breve': 'Confirme sua presença',
    'encerrado': 'Evento encerrado · Assistir replay',
  };

  const navLinks = [
    { label: 'Próximos Torneios', href: `${base}/#proximos-torneios` },
    { label: 'Ranking',           href: `${base}/ranking` },
    { label: 'Como Funciona',     href: `${base}/#como-funciona` },
    { label: 'Blog',              href: `${base}/#blog` },
    { label: 'Lives',             href: `${base}/lives` },
    { label: 'Galeria',           href: `${base}/#galeria` },
    { label: 'Campeões KPC',      href: `${base}/#campeoes` },
    { label: 'Contato',           href: `${base}/#contato` },
  ];

  let mobileMenuOpen = false;
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
        <li>
          <a href={link.href} class:active={link.href === `${base}/lives`}>{link.label}</a>
        </li>
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

<!-- ── Banner ─────────────────────────────────────────────────────────────────── -->
<div class="banner">
  <img src="/hero-bg.jpg" alt="" class="banner-photo" />
  <div class="banner-overlay"></div>
  <div class="banner-content">
    <p class="banner-eyebrow">Kamikaze Poker Club</p>
    <h1 class="banner-title">Lives &amp; Torneios</h1>
  </div>
</div>

<!-- ── Evento em destaque ─────────────────────────────────────────────────────── -->
<div class="status-bar status-{featured.status}">
  <span class="status-badge">{statusLabel[featured.status]}</span>
  <span class="status-desc">{statusDesc[featured.status]}</span>
</div>

<div class="featured-wrap">
  <div class="featured-card">

    <!-- Lado esquerdo: branding -->
    <div class="feat-left">
      <img src="/kpc-logo.png" alt="KPC" class="feat-logo" />
      <div class="feat-suits">
        <span>♠</span><span class="red">♦</span><span class="red">♥</span><span>♣</span>
      </div>
      <h2 class="feat-name">{featured.name}</h2>
      <p class="feat-edition">{featured.edition}</p>
      <div class="feat-meta">
        <span>{featured.date} · {featured.time}</span>
        <span>{featured.local}</span>
      </div>
      <p class="feat-desc">{featured.description}</p>
    </div>

    <!-- Lado direito: player/thumbnail -->
    <div class="feat-right">
      <div class="feat-player">
        {#if featured.status === 'ao-vivo' && featured.streamUrl && featured.streamUrl !== '#'}
          <iframe
            src={featured.streamUrl}
            title="Live KPC"
            frameborder="0"
            allowfullscreen
            class="feat-iframe"
          ></iframe>
        {:else}
          <div class="feat-placeholder">
            <img src="/kpc-logo.png" alt="KPC" class="feat-placeholder-logo" />
            {#if featured.status === 'ao-vivo'}
              <span class="live-dot"></span>
              <span class="live-text">AO VIVO</span>
            {:else if featured.status === 'em-breve'}
              <span class="soon-text">{featured.date}</span>
              <span class="soon-time">{featured.time}</span>
            {/if}
          </div>
        {/if}

        <!-- Botões sobre o player -->
        <div class="feat-actions">
          {#if featured.status === 'ao-vivo'}
            <a href={featured.streamUrl} class="feat-btn feat-btn-primary">Assistir</a>
          {:else if featured.status === 'em-breve'}
            <a href="#contato" class="feat-btn feat-btn-primary">Confirmar Presença</a>
          {:else}
            {#if featured.resultsUrl}
              <a href={featured.resultsUrl} class="feat-btn feat-btn-secondary">Resultados</a>
            {/if}
            {#if featured.replayUrl}
              <a href={featured.replayUrl} class="feat-btn feat-btn-secondary">Replay</a>
            {/if}
          {/if}
        </div>
      </div>

      <div class="feat-location">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        {featured.local}
      </div>
    </div>

  </div>
</div>

<!-- ── Eventos anteriores ─────────────────────────────────────────────────────── -->
{#if past.length > 0}
  <section class="past-section">
    <div class="past-container">
      <h2 class="past-title">Eventos Anteriores</h2>

      <div class="past-list">
        {#each past as event}
          <div class="past-card">

            <!-- Thumbnail -->
            <div class="past-thumb">
              <img src="/kpc-logo.png" alt="KPC" class="past-thumb-logo" />
            </div>

            <!-- Info -->
            <div class="past-info">
              <div class="past-status-row">
                <span class="past-badge status-{event.status}">{statusLabel[event.status]}</span>
                <span class="past-date">{event.date}</span>
              </div>
              <h3 class="past-name">{event.name}</h3>
              <p class="past-desc">{event.description}</p>
            </div>

            <!-- Ações -->
            <div class="past-actions">
              {#if event.resultsUrl}
                <a href={event.resultsUrl} class="past-btn">Resultados</a>
              {/if}
              {#if event.replayUrl}
                <a href={event.replayUrl} class="past-btn past-btn-outline">Replay</a>
              {/if}
            </div>

          </div>
        {/each}
      </div>
    </div>
  </section>
{/if}

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
  * { box-sizing: border-box; }
  a { text-decoration: none; color: inherit; }

  /* ── Navbar ───────────────────────────────────────────────────────────────── */
  .navbar {
    position: sticky; top: 0; z-index: 100;
    background: #0a0a0a;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .nav-inner {
    display: flex; align-items: center; gap: 2rem;
    padding: 0 2rem; height: 80px;
    max-width: 1280px; margin: 0 auto;
  }
  .nav-logo { display: flex; align-items: center; gap: 0.6rem; flex-shrink: 0; }
  .nav-logo img {
    height: 64px; width: auto;
    filter: drop-shadow(0 0 6px rgba(204,0,0,0.4));
  }
  .nav-logo span {
    font-family: 'Oswald', sans-serif; font-size: 1.2rem;
    font-weight: 700; letter-spacing: 0.1em; color: #fff;
  }
  .nav-links {
    display: flex; list-style: none; margin: 0; padding: 0; gap: 0; flex: 1;
  }
  .nav-links a {
    display: block; padding: 0 0.9rem; height: 80px; line-height: 80px;
    font-family: 'Oswald', sans-serif; font-size: 0.78rem;
    letter-spacing: 0.1em; text-transform: uppercase; color: #aaa;
    transition: color 0.15s; white-space: nowrap;
  }
  .nav-links a:hover, .nav-links a.active { color: #fff; }
  .nav-links a.active { border-bottom: 2px solid #cc0000; }
  .nav-cta {
    flex-shrink: 0; font-family: 'Oswald', sans-serif;
    font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
    color: #fff; border: 1px solid #cc0000; padding: 0.4rem 0.9rem;
    border-radius: 3px; transition: background 0.15s;
  }
  .nav-cta:hover { background: #cc0000; }
  .burger {
    display: none; flex-direction: column; gap: 5px;
    background: none; border: none; cursor: pointer; padding: 6px; margin-left: auto;
  }
  .burger span { display: block; width: 22px; height: 2px; background: #fff; border-radius: 2px; }
  .mobile-menu {
    list-style: none; margin: 0; padding: 0.5rem 0;
    border-top: 1px solid rgba(255,255,255,0.06); background: #0a0a0a;
  }
  .mobile-menu a {
    display: block; padding: 0.75rem 2rem;
    font-family: 'Oswald', sans-serif; font-size: 0.9rem;
    letter-spacing: 0.1em; text-transform: uppercase; color: #aaa;
  }
  .mobile-menu a:hover { color: #fff; background: rgba(255,255,255,0.04); }

  /* ── Banner ───────────────────────────────────────────────────────────────── */
  .banner {
    position: relative; height: 220px; overflow: hidden;
  }
  .banner-photo {
    position: absolute; inset: 0; width: 100%; height: 100%;
    object-fit: cover; object-position: center 40%;
    opacity: 0.45; filter: grayscale(20%);
  }
  .banner-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(90deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.4) 100%);
  }
  .banner-content {
    position: relative; z-index: 2;
    padding: 3rem 3rem;
    display: flex; flex-direction: column; justify-content: center; height: 100%;
  }
  .banner-eyebrow {
    font-family: 'Oswald', sans-serif; font-size: 0.75rem;
    letter-spacing: 0.3em; text-transform: uppercase; color: #cc0000; margin: 0 0 0.4rem;
  }
  .banner-title {
    font-family: 'Oswald', sans-serif;
    font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 700;
    letter-spacing: 0.04em; color: #fff; margin: 0;
    text-shadow: 0 2px 20px rgba(0,0,0,0.8);
  }

  /* ── Barra de status ──────────────────────────────────────────────────────── */
  .status-bar {
    display: flex; align-items: center; gap: 1rem;
    padding: 0.75rem 3rem;
    background: #111; border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .status-badge {
    font-family: 'Oswald', sans-serif; font-size: 0.72rem;
    letter-spacing: 0.15em; font-weight: 600; text-transform: uppercase;
    padding: 0.25rem 0.7rem; border-radius: 2px;
  }
  .status-ao-vivo   .status-badge { background: #cc0000; color: #fff; }
  .status-em-breve  .status-badge { background: #c9a84c; color: #0a0a0a; }
  .status-encerrado .status-badge { background: #333; color: #aaa; }
  .status-desc {
    font-family: 'Oswald', sans-serif; font-size: 0.82rem;
    letter-spacing: 0.08em; color: #666;
  }
  .status-ao-vivo .status-desc { color: #cc0000; }

  /* ── Card em destaque ─────────────────────────────────────────────────────── */
  .featured-wrap {
    background: #0f0f0f;
    padding: 0 3rem 3rem;
  }
  .featured-card {
    max-width: 1100px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1.4fr;
    background: #161616;
    border: 1px solid rgba(255,255,255,0.07);
    border-top: none;
  }

  /* Esquerda */
  .feat-left {
    padding: 2.5rem 2rem;
    display: flex; flex-direction: column; gap: 0.75rem;
    border-right: 1px solid rgba(255,255,255,0.06);
    background: linear-gradient(135deg, rgba(204,0,0,0.04) 0%, transparent 60%);
  }
  .feat-logo { width: 80px; height: auto; }
  .feat-suits {
    display: flex; gap: 0.5rem; font-size: 0.9rem; color: #333;
  }
  .feat-suits .red { color: #5a0000; }
  .feat-name {
    font-family: 'Oswald', sans-serif; font-size: clamp(1.6rem, 3vw, 2.4rem);
    font-weight: 700; letter-spacing: 0.03em; color: #fff; margin: 0; line-height: 1.1;
  }
  .feat-edition {
    font-family: 'Oswald', sans-serif; font-size: 0.75rem;
    letter-spacing: 0.2em; text-transform: uppercase; color: #c9a84c; margin: 0;
  }
  .feat-meta {
    display: flex; flex-direction: column; gap: 0.2rem;
    font-family: 'Oswald', sans-serif; font-size: 0.85rem;
    font-weight: 400; color: #666; letter-spacing: 0.04em;
  }
  .feat-desc {
    font-family: 'Oswald', sans-serif; font-size: 0.88rem;
    font-weight: 400; line-height: 1.55; color: #555; margin: 0.5rem 0 0;
    letter-spacing: 0.02em;
  }

  /* Direita */
  .feat-right {
    display: flex; flex-direction: column;
  }
  .feat-player {
    flex: 1; position: relative; background: #0a0a0a;
    min-height: 300px;
  }
  .feat-iframe {
    position: absolute; inset: 0; width: 100%; height: 100%; border: none;
  }
  .feat-placeholder {
    position: absolute; inset: 0;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 0.75rem; background: #0d0d0d;
  }
  .feat-placeholder-logo {
    width: 90px; height: auto; opacity: 0.15; filter: grayscale(50%);
  }
  .live-dot {
    width: 10px; height: 10px; border-radius: 50%;
    background: #cc0000;
    box-shadow: 0 0 0 3px rgba(204,0,0,0.3);
    animation: pulse 1.5s ease-in-out infinite;
  }
  .live-text {
    font-family: 'Oswald', sans-serif; font-size: 0.8rem;
    letter-spacing: 0.2em; color: #cc0000; text-transform: uppercase;
  }
  .soon-text {
    font-family: 'Oswald', sans-serif; font-size: 1.4rem;
    font-weight: 700; letter-spacing: 0.05em; color: #fff;
  }
  .soon-time {
    font-family: 'Oswald', sans-serif; font-size: 0.85rem;
    letter-spacing: 0.15em; color: #c9a84c; text-transform: uppercase;
  }

  /* Botões sobre o player */
  .feat-actions {
    position: absolute; bottom: 1.25rem; right: 1.25rem;
    display: flex; gap: 0.6rem; z-index: 2;
  }
  .feat-btn {
    font-family: 'Oswald', sans-serif; font-size: 0.75rem;
    letter-spacing: 0.12em; text-transform: uppercase;
    padding: 0.55rem 1.3rem; border-radius: 3px; cursor: pointer;
    transition: opacity 0.15s, transform 0.1s;
    white-space: nowrap;
  }
  .feat-btn:hover { opacity: 0.85; transform: translateY(-1px); }
  .feat-btn-primary  { background: #cc0000; color: #fff; }
  .feat-btn-secondary { background: rgba(255,255,255,0.12); color: #fff; border: 1px solid rgba(255,255,255,0.2); }

  /* Localização */
  .feat-location {
    display: flex; align-items: center; gap: 0.4rem;
    padding: 0.65rem 1rem;
    background: #111; border-top: 1px solid rgba(255,255,255,0.06);
    font-family: 'Oswald', sans-serif; font-size: 0.78rem;
    letter-spacing: 0.1em; color: #555; text-transform: uppercase;
  }
  .feat-location svg { flex-shrink: 0; opacity: 0.5; }

  /* ── Eventos anteriores ───────────────────────────────────────────────────── */
  .past-section { background: #0a0a0a; padding: 3.5rem 0; }
  .past-container { max-width: 1100px; margin: 0 auto; padding: 0 3rem; }
  .past-title {
    font-family: 'Oswald', sans-serif; font-size: 1.4rem;
    font-weight: 700; letter-spacing: 0.05em; color: #fff; margin: 0 0 1.5rem;
  }
  .past-list { display: flex; flex-direction: column; gap: 0; }
  .past-card {
    display: grid; grid-template-columns: 160px 1fr auto;
    align-items: center; gap: 1.5rem;
    padding: 1.5rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    transition: background 0.15s;
  }
  .past-card:last-child { border-bottom: none; }
  .past-card:hover { background: rgba(255,255,255,0.02); }

  /* Thumbnail */
  .past-thumb {
    aspect-ratio: 16/9; background: #111;
    border: 1px solid rgba(255,255,255,0.07); border-radius: 3px;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden; flex-shrink: 0;
  }
  .past-thumb-logo { width: 48px; height: auto; opacity: 0.2; filter: grayscale(50%); }

  /* Info */
  .past-info { display: flex; flex-direction: column; gap: 0.4rem; min-width: 0; }
  .past-status-row { display: flex; align-items: center; gap: 0.75rem; }
  .past-badge {
    font-family: 'Oswald', sans-serif; font-size: 0.65rem;
    letter-spacing: 0.15em; text-transform: uppercase;
    padding: 0.15rem 0.5rem; border-radius: 2px;
  }
  .past-badge.status-encerrado { background: #1e1e1e; color: #555; border: 1px solid #333; }
  .past-badge.status-em-breve  { background: rgba(201,168,76,0.15); color: #c9a84c; border: 1px solid rgba(201,168,76,0.3); }
  .past-badge.status-ao-vivo   { background: rgba(204,0,0,0.2); color: #cc0000; border: 1px solid rgba(204,0,0,0.4); }
  .past-date {
    font-family: 'Oswald', sans-serif; font-size: 0.75rem;
    letter-spacing: 0.1em; color: #555;
  }
  .past-name {
    font-family: 'Oswald', sans-serif; font-size: 1.05rem;
    font-weight: 600; letter-spacing: 0.03em; color: #fff; margin: 0;
  }
  .past-desc {
    font-family: 'Oswald', sans-serif; font-size: 0.82rem;
    font-weight: 400; line-height: 1.5; color: #555; margin: 0;
    letter-spacing: 0.02em;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }

  /* Ações */
  .past-actions { display: flex; gap: 0.5rem; flex-shrink: 0; }
  .past-btn {
    font-family: 'Oswald', sans-serif; font-size: 0.72rem;
    letter-spacing: 0.12em; text-transform: uppercase;
    padding: 0.5rem 1.1rem; border-radius: 3px; cursor: pointer;
    white-space: nowrap; transition: opacity 0.15s;
    background: rgba(255,255,255,0.08); color: #ccc;
    border: 1px solid rgba(255,255,255,0.1);
  }
  .past-btn:hover { opacity: 0.75; }
  .past-btn-outline {
    background: transparent; color: #666;
    border: 1px solid rgba(255,255,255,0.07);
  }

  /* ── Footer ───────────────────────────────────────────────────────────────── */
  .footer {
    border-top: 1px solid rgba(255,255,255,0.07);
    padding: 3rem 2rem;
    display: flex; flex-direction: column; align-items: center; gap: 0.75rem;
    background: #060606;
  }
  .footer-logo { width: 60px; height: auto; opacity: 0.7; }
  .footer-name {
    font-family: 'Oswald', sans-serif; font-size: 0.85rem;
    letter-spacing: 0.25em; text-transform: uppercase; color: #444; margin: 0;
  }
  .footer-suits { display: flex; gap: 0.5rem; font-size: 0.9rem; color: #333; }
  .footer-suits .red { color: #3a0000; }
  .footer-copy {
    font-family: 'Oswald', sans-serif; font-size: 0.72rem;
    letter-spacing: 0.12em; color: #333; margin: 0; text-transform: uppercase;
  }

  /* ── Animações ────────────────────────────────────────────────────────────── */
  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 3px rgba(204,0,0,0.3); }
    50%       { box-shadow: 0 0 0 7px rgba(204,0,0,0); }
  }

  /* ── Responsivo ───────────────────────────────────────────────────────────── */
  @media (max-width: 768px) {
    .nav-links, .nav-cta { display: none; }
    .burger { display: flex; }
    .banner-content { padding: 2rem 1.5rem; }
    .status-bar { padding: 0.75rem 1.5rem; }
    .featured-wrap { padding: 0 1.5rem 2rem; }
    .featured-card { grid-template-columns: 1fr; }
    .feat-left { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); }
    .feat-player { min-height: 220px; }
    .past-container { padding: 0 1.5rem; }
    .past-card { grid-template-columns: 100px 1fr; }
    .past-actions { display: none; }
  }
</style>

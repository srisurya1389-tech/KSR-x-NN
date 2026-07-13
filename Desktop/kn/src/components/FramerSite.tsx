import { useState } from 'react'

// ═══════════════════════════════════════════════════════════════
// IMAGE PLACEHOLDERS — replace each URL with your own image link
// Ratio format is  W : H
// ═══════════════════════════════════════════════════════════════
const IMG = {
  // 1.  Nav logo              ratio 6.25 : 1  (wide horizontal wordmark)
  logo:        'https://framerusercontent.com/images/whYEF16Jw6pKjxiNIglb5UgWyM.svg',

  // ── HERO ──────────────────────────────────────────────────────
  // 2.  Hero floating card    ratio 1.43 : 1  (landscape screenshot)
  heroCard:    'https://framerusercontent.com/images/Tyo1qIEC8WkNYw0aeVSU28XFSB0.png',
  // 3.  Folder front          ratio 0.83 : 1  (portrait document)
  folderFront: 'https://framerusercontent.com/images/QV9pt3vGZpB3yihyEu5cSPRW5Zk.png',
  // 4.  Folder receipt        ratio 0.86 : 1  (portrait document)
  folderReceipt:'https://framerusercontent.com/images/6ArWxwCSt6lnDkcWCnZFFQlFI.png',
  // 5.  Folder paper          ratio 0.83 : 1  (portrait document)
  folderPaper: 'https://framerusercontent.com/images/mcpLofFTKVLDU0D00OGuK6nq0.png',
  // 6.  Folder back           ratio 0.83 : 1  (portrait document)
  folderBack:  'https://framerusercontent.com/images/4Vbka6yfEoCFjF47sI2QbBgc.png',
  // 7.  Main cover (central)  ratio 0.75 : 1  (portrait — MAIN HERO VISUAL)
  heroCover:   'https://framerusercontent.com/images/uotSV42TnXai6oJbXOYGN5m8.png',
  // 8.  Small side card       ratio 0.68 : 1  (tall portrait card)
  heroSideCard:'https://framerusercontent.com/images/QpcHuo7nij6uN7xwfKVCdmBEIM.webp',

  // ── SPONSORS (hero) ───────────────────────────────────────────
  // 9.  Sponsor logo 1        ratio 4.86 : 1
  sponsor1:    'https://framerusercontent.com/images/Wprb5D6auoGss28J3jJdAsqxXUg.png',
  // 10. Sponsor logo 2        ratio 7.42 : 1
  sponsor2:    'https://framerusercontent.com/images/J5IAmKnX15PXFHRSI4deiBK6yPY.svg',
  // 11. Sponsor logo 3        ratio 3.66 : 1
  sponsor3:    'https://framerusercontent.com/images/Gi75jRWeyL1hAuuEEBfcilngurY.svg',

  // ── LIVESTREAM (3 vinyl covers + 1 shared disc) ───────────────
  // 12. Vinyl cover episode 1 ratio 1 : 1  (square)
  vinyl1:      'https://framerusercontent.com/images/aPnhTR9VpZKnys1FFlKiUtn4XFo.png',
  // 13. Vinyl cover episode 2 ratio 1 : 1
  vinyl2:      'https://framerusercontent.com/images/HsfLXBq32v7ZJj8DN3oDSGwm0zI.png',
  // 14. Vinyl cover episode 3 ratio 1 : 1
  vinyl3:      'https://framerusercontent.com/images/HhVrOf7NWrvNtYVHrPIo0XIQM.png',
  // 15. Vinyl disc (shared)   ratio 1 : 1
  vinylDisc:   'https://framerusercontent.com/images/6hlk4ChXtx40AmZr00sjMTLJWs0.webp',

  // ── NEWSLETTER (3 cards) ──────────────────────────────────────
  // 16. Newsletter card 1     ratio 1.35 : 1  (landscape)
  nl1:         'https://framerusercontent.com/images/f2WMbhnwhAPU3kDgWwBDrp2h5To.png',
  // 17. Newsletter card 2     ratio 1.35 : 1
  nl2:         'https://framerusercontent.com/images/flyaNvsnZKH1FpDZRGQPaPxBcV0.png',
  // 18. Newsletter card 3     ratio 1.35 : 1
  nl3:         'https://framerusercontent.com/images/v6YSJOhCOWmaqW50MS89f8cJvk.png',

  // ── TAKEAWAYS (3 folder contents + shared sleeve) ─────────────
  // 19. Takeaway content 1    ratio 0.71 : 1  (portrait)
  tkw1:        'https://framerusercontent.com/images/YD2VYfsYvrvnOxsys78IC5u4.png',
  // 20. Takeaway content 2    ratio 0.71 : 1
  tkw2:        'https://framerusercontent.com/images/rFUOXRF18CnKQg9ZR6wTCNvPy4A.png',
  // 21. Takeaway content 3    ratio 0.71 : 1
  tkw3:        'https://framerusercontent.com/images/9pMJOVYBhdi9wtix0HTvZZXDk.png',
  // 22. Plastic sleeve        ratio 0.75 : 1  (shared overlay)
  sleeve:      'https://framerusercontent.com/images/c1qDQ38dSeL41RjKs094eAH9uaA.png',

  // ── COMMUNITY (9 screenshots, 3 rows × 3) ─────────────────────
  // 23-31. All ratio 1.43 : 1  (landscape screenshots)
  com1:        'https://framerusercontent.com/images/Tyo1qIEC8WkNYw0aeVSU28XFSB0.png',
  com2:        'https://framerusercontent.com/images/RHHoXExC0w7SvD7Kgr4s9MottQw.png',
  com3:        'https://framerusercontent.com/images/P67D6vIpEWTgY3sk0baovYJuEY.png',
  com4:        'https://framerusercontent.com/images/VbtPlSgI1VGpB552FsWQmWfPk0.png',
  com5:        'https://framerusercontent.com/images/ywfx7OwlLu6mRBdf86p4BCAtxpk.png',
  com6:        'https://framerusercontent.com/images/UXzpGBtGEPufuONTUZNupcrJyw.png',
  com7:        'https://framerusercontent.com/images/Sd1cihkvgH8L2a02I9veJufHIo4.png',
  com8:        'https://framerusercontent.com/images/18X6tEihRsJZ7LKyzpoVP5QmU.png',
  com9:        'https://framerusercontent.com/images/9rlInE1XTM3P0yGvwLUtFhT1Lg.png',

  // ── FROM CHRIS ────────────────────────────────────────────────
  // 32. Handwritten note      ratio 0.71 : 1  (portrait)
  chrisNote:   'https://framerusercontent.com/images/iMzl7KsrkzTZYb6I6J6v5LZwgE.webp',
  // 33. Profile photo         ratio 1 : 1     (square)
  chrisPhoto:  'https://framerusercontent.com/images/ifeXg0mEEOn002JuZCzLim8Tw4.png',
  // 34. Washi tape strip      ratio 0.30 : 1  (thin vertical)
  washiTape:   'https://framerusercontent.com/images/9BHSS0twaJAXXqR6JQrD36Zew.png',
  // 35. Envelope              ratio 0.93 : 1  (slightly portrait)
  envelope:    'https://framerusercontent.com/images/fvmxLZWB7i9PseVROf5XIHIJbk.png',

  // ── FOOTER ────────────────────────────────────────────────────
  // 36. Large wordmark image  ratio 6.25 : 1  (wide horizontal)
  footerWord:  'https://framerusercontent.com/images/qm4TCqMnQqXy9IqsosWHlFj88.png',
}

// ── Text content — update everything here ─────────────────────
const TEXT = {
  siteTitle:      'KSR Grand Events',
  navLinks:       ['Livestream', 'Newsletter', 'Takeaways', 'Community', 'From Chris'],
  heroHeading:    ['Where designers', 'get unstuck'],
  sponsorLabel:   'TOGETHER WITH',
  liveHeading:    'Livestreams',
  liveSubtitle:   'Unpolished, honest conversations, with you in the room.',
  liveEpisodes: [
    { title: 'Bob Baxley on what he learned at Apple.', url: '#' },
    { title: 'Tommy Geoco on taste, play, and storytelling.', url: '#' },
    { title: 'Aneta Kmiecik on how to build a unique portfolio.', url: '#' },
  ],
  nlHeading:      'Newsletters',
  nlSubtitle:     'Real lessons from our career and what\'s happening in the industry worth paying attention to.',
  tkwHeading:     'Takeaways',
  tkwSubtitle:    'The best bits from the livestream, distilled.',
  comHeading:     'From our community',
  comSubtitle:    'Thousands of designers tuning in every week.',
  chrisHeading:   'A note from Chris',
  footerCopy:     '© 2026 KSR Grand Events. All rights reserved.',
}

// Fonts from Framer CDN
const FONT_STYLE = `
  @font-face { font-family:"Perfume Sans 1"; src:url("https://framerusercontent.com/assets/eEtLSL78VieQiIKjCgC4acH0wxU.woff2"); font-weight:600; }
  @font-face { font-family:"Forma DJR Display Regular"; src:url("https://framerusercontent.com/assets/C6wKrH7eIKbmEdUYT2717INf8PY.woff2"); font-weight:400; }
  @font-face { font-family:"Forma DJR Display Bold"; src:url("https://framerusercontent.com/assets/cW1TLQ7h8KOtTT1r5NAFiEzoA.woff2"); font-weight:700; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { -webkit-font-smoothing: antialiased; }
`

const BG   = '#121212'
const FG   = '#ffffff'
const DIM  = 'rgba(255,255,255,0.6)'

// ─────────────────────────────────────────────────────────────
// Nav
// ─────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 10,
      display: 'flex', justifyContent: 'center', pointerEvents: 'none',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        width: '100%', maxWidth: 1200, padding: '0 20px', height: 60,
        pointerEvents: 'auto',
      }}>
        <a href="#hero" style={{ textDecoration: 'none' }}>
          <img src={IMG.logo} alt={TEXT.siteTitle} style={{ height: 18, width: 'auto', display: 'block', filter: 'invert(1)' }} />
        </a>
        <div style={{ display: 'flex', gap: 32 }}>
          {TEXT.navLinks.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{
              fontFamily: '"Perfume Sans 1", sans-serif', fontWeight: 600,
              fontSize: 16, color: FG, textDecoration: 'none', letterSpacing: '.02em', opacity: .7,
            }}>{l}</a>
          ))}
        </div>
      </div>
    </nav>
  )
}

// ─────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section id="hero" style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', padding: '120px 20px 80px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 40, width: '100%', maxWidth: 1200 }}>

        {/* Left — text */}
        <div style={{ flex: '0 0 auto', paddingTop: 0, display: 'flex', flexDirection: 'column', gap: 40, maxWidth: 420 }}>
          <div>
            <h1 style={{
              fontFamily: '"Perfume Sans 1", sans-serif', fontWeight: 600,
              fontSize: 'clamp(56px,6vw,96px)', lineHeight: '.7em',
              letterSpacing: '-.03em', color: FG,
            }}>
              {TEXT.heroHeading[0]}<br />{TEXT.heroHeading[1]}
            </h1>
          </div>

          {/* Sponsors */}
          <div>
            <p style={{ fontFamily: '"Perfume Sans 1", sans-serif', fontWeight: 600, fontSize: 14, color: DIM, letterSpacing: '.02em', marginBottom: 12 }}>
              {TEXT.sponsorLabel}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
              <img src={IMG.sponsor1} alt="Sponsor 1" style={{ height: 20, width: 'auto', filter: 'brightness(0) invert(1)', opacity: .7 }} />
              <img src={IMG.sponsor2} alt="Sponsor 2" style={{ height: 20, width: 'auto', filter: 'brightness(0) invert(1)', opacity: .7 }} />
              <img src={IMG.sponsor3} alt="Sponsor 3" style={{ height: 27, width: 'auto', filter: 'brightness(0) invert(1)', opacity: .7 }} />
            </div>
          </div>

          {/* Email signup */}
          <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <input
              type="email" placeholder="Enter your email"
              style={{
                background: 'transparent', border: '1px solid rgba(255,255,255,0.3)',
                color: FG, padding: '16px 12px',
                fontFamily: '"Forma DJR Display Regular", sans-serif',
                fontSize: 13, letterSpacing: '.05em', outline: 'none',
              }}
            />
            <button type="submit" style={{
              background: FG, color: BG, border: 'none', cursor: 'pointer',
              padding: '16px 12px', fontFamily: '"Forma DJR Display Bold", sans-serif',
              fontWeight: 700, fontSize: 13, letterSpacing: '.04em',
            }}>
              Join the community
            </button>
          </form>
        </div>

        {/* Right — visual stack */}
        <div style={{ flex: 1, position: 'relative', height: 700, minWidth: 0 }}>

          {/* Floating small chat card (top-left of visual) */}
          <div style={{
            position: 'absolute', top: 0, left: -80, width: 310,
            transform: 'rotate(-12deg)',
            zIndex: 1,
          }}>
            <img src={IMG.heroCard} alt="Hero card" style={{ width: '100%', display: 'block' }} />
          </div>

          {/* Folder stack (center) */}
          <div style={{ position: 'absolute', top: 40, left: '10%', width: '60%', zIndex: 2 }}>
            <img src={IMG.folderBack}    alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', opacity: .6 }} />
            <img src={IMG.folderPaper}   alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', opacity: .8 }} />
            <img src={IMG.folderReceipt} alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', opacity: .9, filter: 'blur(.75px)' }} />
            <img src={IMG.folderFront}   alt="" style={{ position: 'relative',  width: '100%', display: 'block' }} />
          </div>

          {/* Central magazine cover */}
          <div style={{ position: 'absolute', top: 20, left: '5%', width: '65%', zIndex: 3 }}>
            <img src={IMG.heroCover} alt="Main cover" style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
          </div>

          {/* Small side book card */}
          <div style={{
            position: 'absolute', bottom: 40, right: 0, width: 220,
            transform: 'rotate(8deg)', zIndex: 2,
          }}>
            <img src={IMG.heroSideCard} alt="Side card" style={{ width: '100%', display: 'block', filter: 'blur(1px)' }} />
          </div>

        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// Livestream
// ─────────────────────────────────────────────────────────────
const VINYLS = [
  { cover: IMG.vinyl1, ...TEXT.liveEpisodes[0] },
  { cover: IMG.vinyl2, ...TEXT.liveEpisodes[1] },
  { cover: IMG.vinyl3, ...TEXT.liveEpisodes[2] },
]

function VinylCard({ cover, title, url }: { cover: string; title: string; url: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 480 }}>
      {/* Vinyl cover + disc stack */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '1' }}>
        <img src={IMG.vinylDisc} alt="" style={{
          position: 'absolute', top: 0, right: -80, width: '100%', height: '100%',
          objectFit: 'contain', zIndex: 0,
        }} />
        <img src={cover} alt={title} style={{
          position: 'relative', width: '100%', height: '100%',
          objectFit: 'contain', zIndex: 1, display: 'block',
        }} />
      </div>
      <p style={{ fontFamily: '"Forma DJR Display Regular", sans-serif', fontSize: 16, color: DIM, letterSpacing: '.06em' }}>{title}</p>
      <a href={url} target="_blank" rel="noopener" style={{
        fontFamily: '"Forma DJR Display Regular", sans-serif', fontSize: 16,
        color: DIM, letterSpacing: '.06em', textDecoration: 'underline',
      }}>Watch on Youtube ↗</a>
    </div>
  )
}

function LivestreamSection() {
  const [idx, setIdx] = useState(0)
  return (
    <section id="Livestream" style={{ padding: '120px 20px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 1200, display: 'flex', gap: 80 }}>

        {/* Sticky text left */}
        <div style={{ flex: '0 0 280px', position: 'sticky', top: 120, alignSelf: 'flex-start' }}>
          <h2 style={{ fontFamily: '"Perfume Sans 1", sans-serif', fontWeight: 600, fontSize: 'clamp(40px,4vw,60px)', lineHeight: '.9em', color: FG, marginBottom: 20 }}>
            {TEXT.liveHeading}
          </h2>
          <p style={{ fontFamily: '"Forma DJR Display Regular", sans-serif', fontSize: 16, color: DIM, letterSpacing: '.06em', lineHeight: 1.4 }}>
            {TEXT.liveSubtitle}
          </p>

          {/* Dot nav */}
          <div style={{ display: 'flex', gap: 8, marginTop: 32 }}>
            {VINYLS.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} style={{
                width: 8, height: 8, borderRadius: '50%', border: 'none', cursor: 'pointer',
                background: i === idx ? FG : 'rgba(255,255,255,0.3)',
                transition: 'background .2s',
              }} />
            ))}
          </div>
        </div>

        {/* Vinyl card */}
        <div style={{ flex: 1 }}>
          <VinylCard key={idx} {...VINYLS[idx]} />
        </div>

      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// Newsletter
// ─────────────────────────────────────────────────────────────
const NL_CARDS = [IMG.nl1, IMG.nl2, IMG.nl3]

function NewsletterSection() {
  return (
    <section id="Newsletter" style={{ padding: '120px 20px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 1200, display: 'flex', gap: 80 }}>

        <div style={{ flex: '0 0 280px', position: 'sticky', top: 120, alignSelf: 'flex-start' }}>
          <h2 style={{ fontFamily: '"Perfume Sans 1", sans-serif', fontWeight: 600, fontSize: 'clamp(40px,4vw,60px)', lineHeight: '.9em', color: FG, marginBottom: 20 }}>
            {TEXT.nlHeading}
          </h2>
          <p style={{ fontFamily: '"Forma DJR Display Regular", sans-serif', fontSize: 16, color: DIM, letterSpacing: '.06em', lineHeight: 1.4 }}>
            {TEXT.nlSubtitle}
          </p>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 40 }}>
          {NL_CARDS.map((src, i) => (
            <div key={i} style={{ borderRadius: 8, overflow: 'hidden', position: 'sticky', top: 120 + i * 20 }}>
              <img src={src} alt={`Newsletter ${i + 1}`} style={{ width: '100%', display: 'block', aspectRatio: '1.35' }} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// Takeaways
// ─────────────────────────────────────────────────────────────
function FolderCard({ img, rotate, x }: { img: string; rotate: number; x: number }) {
  return (
    <div style={{ width: 320, transform: `translateX(${x}px) rotate(${rotate}deg)`, transition: 'transform .3s' }}>
      <div style={{ position: 'relative' }}>
        <img src={IMG.sleeve} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: .6 }} />
        <img src={img} alt="Takeaway" style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
      </div>
    </div>
  )
}

function TakeawaysSection() {
  return (
    <section id="Takeaways" style={{ padding: '120px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 1200, position: 'sticky', top: 120, marginBottom: 40 }}>
        <h2 style={{ fontFamily: '"Perfume Sans 1", sans-serif', fontWeight: 600, fontSize: 'clamp(40px,4vw,60px)', lineHeight: '.9em', color: FG, marginBottom: 20 }}>
          {TEXT.tkwHeading}
        </h2>
        <p style={{ fontFamily: '"Forma DJR Display Regular", sans-serif', fontSize: 16, color: DIM, letterSpacing: '.06em' }}>
          {TEXT.tkwSubtitle}
        </p>
      </div>

      {/* Three folders displayed with offset rotations */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap', width: '100%', maxWidth: 1200 }}>
        <FolderCard img={IMG.tkw1} rotate={-10} x={188} />
        <FolderCard img={IMG.tkw2} rotate={0}   x={0}   />
        <FolderCard img={IMG.tkw3} rotate={10}  x={-188} />
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// Community
// ─────────────────────────────────────────────────────────────
const COM_ROWS = [
  [IMG.com1, IMG.com2, IMG.com3],
  [IMG.com4, IMG.com5, IMG.com6],
  [IMG.com7, IMG.com8, IMG.com9],
]

function CommunitySection() {
  return (
    <section id="Community" style={{ padding: '120px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 1200 }}>
        <div style={{ marginBottom: 60, position: 'sticky', top: 120 }}>
          <h2 style={{ fontFamily: '"Perfume Sans 1", sans-serif', fontWeight: 600, fontSize: 'clamp(40px,4vw,60px)', lineHeight: '.9em', color: FG, marginBottom: 20 }}>
            {TEXT.comHeading}
          </h2>
          <p style={{ fontFamily: '"Forma DJR Display Regular", sans-serif', fontSize: 16, color: DIM, letterSpacing: '.06em' }}>
            {TEXT.comSubtitle}
          </p>
        </div>

        {/* 3 rows, each with 3 images */}
        {COM_ROWS.map((row, ri) => (
          <div key={ri} style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
            {row.map((src, ci) => {
              const rotate = [[-13, 4, 9], [-14, 0, 8], [-9, -4, 10]][ri][ci]
              return (
                <div key={ci} style={{
                  flex: 1, borderRadius: 6, overflow: 'hidden',
                  transform: `rotate(${rotate}deg)`,
                  transition: 'transform .3s',
                }}>
                  <img src={src} alt={`Community ${ri * 3 + ci + 1}`} style={{ width: '100%', aspectRatio: '1.43', objectFit: 'contain', display: 'block' }} />
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// From Chris
// ─────────────────────────────────────────────────────────────
function FromChrisSection() {
  return (
    <section id="from-chris" style={{ padding: '120px 20px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 1200 }}>
        <h2 style={{ fontFamily: '"Perfume Sans 1", sans-serif', fontWeight: 600, fontSize: 'clamp(40px,4vw,60px)', lineHeight: '.9em', color: FG, marginBottom: 80 }}>
          {TEXT.chrisHeading}
        </h2>

        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', height: 700 }}>
          {/* Envelope behind */}
          <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, 0) rotate(-5deg) scale(1.2)', width: 500, zIndex: 1 }}>
            <img src={IMG.envelope} alt="Envelope" style={{ width: '100%', display: 'block' }} />
          </div>

          {/* Note in front */}
          <div style={{ position: 'relative', width: 480, zIndex: 2, transform: 'rotate(9deg)' }}>
            <img src={IMG.chrisNote} alt="Note from Chris" style={{ width: '100%', display: 'block' }} />
            {/* Profile photo on note */}
            <div style={{ position: 'absolute', top: -20, left: 40, width: 100, transform: 'rotate(-2deg)', border: '5px solid white' }}>
              <img src={IMG.chrisPhoto} alt="Profile" style={{ width: '100%', display: 'block', aspectRatio: '1', objectFit: 'cover' }} />
              <img src={IMG.washiTape} alt="" style={{ position: 'absolute', top: -40, left: -5, height: 80, width: 'auto' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────
const FOOTER_COLS = [
  { title: 'Listen',    links: ['Youtube', 'Spotify', 'Apple Podcasts'] },
  { title: 'Social',    links: ['LinkedIn', 'X / Twitter', 'Instagram', 'TikTok', 'Threads'] },
  { title: 'Resources', links: ['Freebies', 'Blog', 'Glossary', 'FAQs'] },
  { title: 'Company',   links: ['Sponsor', 'Survey', 'About', 'Contact'] },
]

function Footer() {
  return (
    <footer style={{ background: BG, padding: '80px 20px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 1200 }}>

        {/* Links grid */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 80 }}>
          {FOOTER_COLS.map(col => (
            <div key={col.title} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontFamily: '"Perfume Sans 1", sans-serif', fontWeight: 600, fontSize: 20, color: FG, textTransform: 'capitalize', letterSpacing: '.02em' }}>{col.title}</span>
              {col.links.map(l => (
                <a key={l} href="#" style={{ fontFamily: '"Perfume Sans 1", sans-serif', fontWeight: 600, fontSize: 20, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', textTransform: 'capitalize', letterSpacing: '.02em' }}>{l}</a>
              ))}
            </div>
          ))}
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.2)', marginBottom: 24 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 0, opacity: .5 }}>
          <span style={{ fontFamily: '"Perfume Sans 1", sans-serif', fontSize: 16, color: FG }}>{TEXT.footerCopy}</span>
        </div>

        {/* Large footer wordmark */}
        <div style={{ marginTop: 0 }}>
          <img src={IMG.footerWord} alt={TEXT.siteTitle} style={{ width: '101%', display: 'block', objectFit: 'contain', objectPosition: 'center top' }} />
        </div>

      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────────────────────
// Root
// ─────────────────────────────────────────────────────────────
export default function FramerSite() {
  return (
    <>
      <style>{FONT_STYLE}</style>
      <div style={{ background: BG, minHeight: '100vh', color: FG }}>
        <Nav />
        <main>
          <HeroSection />
          <LivestreamSection />
          <NewsletterSection />
          <TakeawaysSection />
          <CommunitySection />
          <FromChrisSection />
        </main>
        <Footer />
      </div>
    </>
  )
}

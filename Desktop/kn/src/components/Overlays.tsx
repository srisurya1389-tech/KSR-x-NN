import { motion } from 'framer-motion'
import { CSSProperties, useEffect, useState } from 'react'

interface OverlayProps {
  scrollProgress: number
}

// Wider fade window for smoother in/out
const getOpacity = (p: number, start: number, end: number, fade = 0.032): number => {
  if (p < start - fade || p > end + fade) return 0
  if (p < start) return (p - (start - fade)) / fade
  if (p > end) return 1 - ((p - end) / fade)
  return 1
}

const DISPLAY: CSSProperties = {
  fontFamily: "'Cormorant Garamond', serif",
  fontWeight: 300,
  lineHeight: 1.06,
  margin: 0,
}

const MONO: CSSProperties = {
  fontFamily: "'Montserrat', sans-serif",
}

const STATS = {
  events:  10000,
  years:   25,
  rating:  5,
  clients: 500,
}

const BODY_TEXT: CSSProperties = {
  fontFamily: "'Montserrat', sans-serif",
  fontSize: '0.84rem',
  color: 'rgba(245, 240, 232, 0.72)',
  lineHeight: 1.95,
}

// ─── Shared primitives ────────────────────────────────────

// Frosted glass card with gold corner ornaments
function GlassPanel({
  children,
  style,
  center = false,
}: {
  children: React.ReactNode
  style?: CSSProperties
  center?: boolean
}) {
  const corner: CSSProperties = { position: 'absolute', width: 18, height: 18 }
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: 'rgba(7, 5, 3, 0.54)',
        backdropFilter: 'blur(22px)',
        WebkitBackdropFilter: 'blur(22px)',
        border: '1px solid rgba(201, 168, 76, 0.24)',
        borderRadius: 22,
        padding: '2.6rem 3rem',
        position: 'relative',
        textAlign: center ? 'center' : 'left',
        ...style,
      }}
    >
      {/* Corner ornaments */}
      <div style={{ ...corner, top: 13, left: 13, borderTop: '1px solid rgba(201,168,76,0.7)', borderLeft: '1px solid rgba(201,168,76,0.7)' }} />
      <div style={{ ...corner, top: 13, right: 13, borderTop: '1px solid rgba(201,168,76,0.7)', borderRight: '1px solid rgba(201,168,76,0.7)' }} />
      <div style={{ ...corner, bottom: 13, left: 13, borderBottom: '1px solid rgba(201,168,76,0.7)', borderLeft: '1px solid rgba(201,168,76,0.7)' }} />
      <div style={{ ...corner, bottom: 13, right: 13, borderBottom: '1px solid rgba(201,168,76,0.7)', borderRight: '1px solid rgba(201,168,76,0.7)' }} />
      {children}
    </motion.div>
  )
}

// Word-by-word animated text
function Words({
  text,
  style,
  delay = 0,
}: {
  text: string
  style?: CSSProperties
  delay?: number
}) {
  return (
    <span style={{ display: 'inline' }}>
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: delay + i * 0.09, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'inline-block', marginRight: '0.28em', ...style }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

// Expanding gold separator line
function GoldLine({ delay = 0, align = 'left' }: { delay?: number; align?: 'left' | 'center' | 'right' }) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ delay, duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
      style={{
        height: 1,
        width: 240,
        background: 'linear-gradient(90deg, #C9A84C, #F5E07A, #C9A84C, transparent)',
        transformOrigin: align === 'right' ? 'right center' : align === 'center' ? 'center' : 'left center',
        margin: align === 'center' ? '1.6rem auto' : '1.6rem 0',
      }}
    />
  )
}

// Eyebrow label
function Eyebrow({ text, delay = 0, color = '#C9A84C' }: { text: string; delay?: number; color?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.48 }}
      style={{ ...MONO, fontSize: '0.6rem', color, letterSpacing: '0.48em', textTransform: 'uppercase', marginBottom: '1.1rem' }}
    >
      {text}
    </motion.div>
  )
}

// Staggered list item
function ListItem({
  icon, text, delay = 0, color = '#C9A84C', fromRight = false,
}: {
  icon: string; text: string; delay?: number; color?: string; fromRight?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: fromRight ? 24 : -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', ...MONO, fontSize: '0.8rem', color }}
    >
      {fromRight && <span style={{ fontSize: '0.92rem' }}>{icon}</span>}
      <span>{text}</span>
      {!fromRight && <span style={{ fontSize: '0.92rem' }}>{icon}</span>}
    </motion.div>
  )
}

// Animated counting number
function Counter({ to, suffix = '', delay = 0 }: { to: number; suffix?: string; delay?: number }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => {
      let step = 0
      const total = 55
      const iv = setInterval(() => {
        step++
        if (step >= total) { setVal(to); clearInterval(iv) }
        else setVal(Math.floor((step / total) * to))
      }, 28)
      return () => clearInterval(iv)
    }, delay * 1000)
    return () => clearTimeout(t)
  }, [to, delay])
  return <>{val.toLocaleString()}{suffix}</>
}

// ─────────────────────────────────────────────────────────
// ACT 1 — Grand Arrival   (scroll 0.01 → 0.12)
// ─────────────────────────────────────────────────────────
export function Overlay1({ scrollProgress }: OverlayProps) {
  const opacity = getOpacity(scrollProgress, 0.01, 0.12)
  if (opacity === 0) return null

  return (
    <motion.div
      style={{
        opacity,
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        pointerEvents: 'none',
      }}
    >
      <GlassPanel style={{ maxWidth: 680, width: '100%' }} center>

        {/* Shimmer top line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.12, duration: 0.95 }}
          style={{
            width: 80, height: 1, margin: '0 auto 2rem',
            background: 'linear-gradient(90deg, transparent, #C9A84C, #F5E07A, #C9A84C, transparent)',
          }}
        />

        <Eyebrow text="✦ Est. 2000  ·  Vijayawada  ·  Andhra Pradesh  ✦" delay={0.22} />

        <h1
          style={{
            ...DISPLAY,
            fontSize: 'clamp(3rem, 8.5vw, 7.4rem)',
            color: '#E8D5A3',
            letterSpacing: '-0.01em',
          }}
        >
          <Words text="Every Great" delay={0.36} />
          <br />
          <Words text="Celebration" delay={0.52} style={{ color: '#C9A84C', fontStyle: 'italic' }} />
          <br />
          <Words text="Starts Here." delay={0.68} />
        </h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.08, duration: 0.85 }}
          style={{
            width: 96, height: 1, margin: '2.2rem auto',
            background: 'linear-gradient(90deg, transparent, #C9A84C, #F5E07A, #C9A84C, transparent)',
            transformOrigin: 'center',
          }}
        />

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.18, duration: 0.6 }}
          style={{ display: 'flex', gap: 'clamp(1.6rem, 4vw, 3.8rem)', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          {[
            { to: STATS.events,  suffix: '+',  label: 'Events' },
            { to: STATS.years,   suffix: '+',  label: 'Years' },
            { to: STATS.rating,  suffix: ' ★', label: 'Rating' },
            { to: STATS.clients, suffix: '+',  label: 'Clients' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ ...DISPLAY, fontSize: 'clamp(1.6rem, 3vw, 2.6rem)', color: '#C9A84C', letterSpacing: '0.02em' }}>
                <Counter to={s.to} suffix={s.suffix} delay={1.32 + i * 0.1} />
              </div>
              <div style={{ ...MONO, fontSize: '0.54rem', color: 'rgba(201,168,76,0.55)', letterSpacing: '0.38em', textTransform: 'uppercase', marginTop: '0.38rem' }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.85 }}
          style={{ marginTop: '2.6rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}
        >
          <span style={{ ...MONO, fontSize: '0.54rem', letterSpacing: '0.44em', color: 'rgba(201,168,76,0.45)', textTransform: 'uppercase' }}>
            Scroll to Begin
          </span>
          <motion.div
            animate={{ scaleY: [0.7, 1.35, 0.7], opacity: [0.25, 0.95, 0.25] }}
            transition={{ repeat: Infinity, duration: 1.85, ease: 'easeInOut' }}
            style={{ width: 1, height: 52, background: 'linear-gradient(to bottom, #C9A84C, transparent)' }}
          />
        </motion.div>

      </GlassPanel>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────
// ACT 2 — Grand Entrance   (scroll 0.14 → 0.29)
// ─────────────────────────────────────────────────────────
export function Overlay2({ scrollProgress }: OverlayProps) {
  const opacity = getOpacity(scrollProgress, 0.14, 0.29)
  if (opacity === 0) return null

  return (
    <div
      style={{
        opacity,
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: '0 2rem 6%',
        pointerEvents: 'none',
      }}
    >
      <GlassPanel style={{ maxWidth: 580 }} center>
        <Eyebrow text="✦  Welcome  ✦" delay={0.1} />

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.22, duration: 0.72 }}
          style={{
            height: 1, width: 210, margin: '0 auto 1.7rem',
            background: 'linear-gradient(90deg, transparent, #C9A84C, #F5E07A, #C9A84C, transparent)',
            transformOrigin: 'center',
          }}
        />

        <h2 style={{ ...DISPLAY, fontSize: 'clamp(2.6rem, 7vw, 6rem)', color: '#E8D5A3' }}>
          <Words text="The Grand" delay={0.32} />
          <br />
          <Words text="Entrance" delay={0.48} style={{ color: '#C9A84C', fontStyle: 'italic' }} />
          <br />
          <Words text="Awaits" delay={0.64} />
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.92, duration: 0.55 }}
          style={{ ...BODY_TEXT, marginTop: '1.6rem', maxWidth: 380, margin: '1.6rem auto 0' }}
        >
          An emerald pathway leads through golden arches into a world of luxury celebration.
        </motion.p>
      </GlassPanel>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// ACT 3 — The Venue   (scroll 0.31 → 0.45)
// ─────────────────────────────────────────────────────────
export function Overlay3({ scrollProgress }: OverlayProps) {
  const opacity = getOpacity(scrollProgress, 0.31, 0.45)
  if (opacity === 0) return null

  const features = [
    { icon: '✦', text: 'Crystal chandelier lighting' },
    { icon: '✦', text: 'Premium linen table settings' },
    { icon: '✦', text: 'Fresh floral centerpieces' },
    { icon: '✦', text: 'Reflective marble floors' },
  ]

  return (
    <div
      style={{
        opacity,
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        padding: '0 4%',
        pointerEvents: 'none',
      }}
    >
      <GlassPanel style={{ maxWidth: 460 }}>
        <Eyebrow text="✦  The Venue  ✦" delay={0.1} />

        <h2 style={{ ...DISPLAY, fontSize: 'clamp(2.4rem, 6vw, 5.2rem)', color: '#E8D5A3' }}>
          <Words text="A Space Built" delay={0.22} />
          <br />
          <Words text="for Extraordinary" delay={0.38} style={{ color: '#C9A84C' }} />
          <br />
          <Words text="Moments." delay={0.62} />
        </h2>

        <GoldLine delay={0.88} />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.98, duration: 0.52 }}
          style={{ ...BODY_TEXT, marginBottom: '1.8rem' }}
        >
          Crystal chandeliers cast warm gold over meticulously set tables. Fresh florals and
          premium linens at every turn.
        </motion.p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {features.map((f, i) => (
            <ListItem key={i} icon={f.icon} text={f.text} delay={1.1 + i * 0.1} />
          ))}
        </div>
      </GlassPanel>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// ACT 4 — Experiences   (scroll 0.47 → 0.62)
// ─────────────────────────────────────────────────────────
export function Overlay4({ scrollProgress }: OverlayProps) {
  const opacity = getOpacity(scrollProgress, 0.47, 0.62)
  if (opacity === 0) return null

  const items = [
    { emoji: '🎨', text: 'Face Painting for Children', color: '#FF8AC0' },
    { emoji: '🎁', text: 'Premium Return Gift Curation', color: '#C9A84C' },
    { emoji: '🌸', text: 'Live Floral Arrangements', color: '#FF8AC0' },
    { emoji: '✨', text: 'Custom Event Décor', color: '#B8A0FF' },
  ]

  return (
    <div
      style={{
        opacity,
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 4%',
        pointerEvents: 'none',
      }}
    >
      <GlassPanel style={{ maxWidth: 420, textAlign: 'right' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Eyebrow text="✦  Experiences  ✦" delay={0.1} color="#B8A0FF" />
        </div>

        <h2 style={{ ...DISPLAY, fontSize: 'clamp(2.4rem, 6vw, 5rem)', color: '#E8D5A3', textAlign: 'right' }}>
          <Words text="More Than" delay={0.22} />
          <br />
          <Words text="an Event." delay={0.38} />
          <br />
          <Words text="An Experience." delay={0.56} style={{ color: '#B8A0FF', fontStyle: 'italic' }} />
        </h2>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <GoldLine delay={0.86} align="right" />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.96, duration: 0.52 }}
          style={{ ...BODY_TEXT, textAlign: 'right', marginBottom: '1.8rem' }}
        >
          Every detail thoughtfully curated — from artistic face painting to luxury return gifts
          that impress every guest.
        </motion.p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', alignItems: 'flex-end' }}>
          {items.map((item, i) => (
            <ListItem key={i} icon={item.emoji} text={item.text} delay={1.05 + i * 0.1} color={item.color} fromRight />
          ))}
        </div>
      </GlassPanel>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// ACT 5 — Catering   (scroll 0.64 → 0.78)
// ─────────────────────────────────────────────────────────
export function Overlay5({ scrollProgress }: OverlayProps) {
  const opacity = getOpacity(scrollProgress, 0.64, 0.78)
  if (opacity === 0) return null

  const stations = [
    { emoji: '🔥', text: 'Live Tandoor Station', color: '#FF7733' },
    { emoji: '🍜', text: 'Live Wok & Chinese Counter', color: '#FF9944' },
    { emoji: '🍮', text: 'Dessert & Chaat Live Station', color: '#C9A84C' },
    { emoji: '🥤', text: 'Premium Mocktail Bar', color: '#5BBFFF' },
  ]

  return (
    <div
      style={{
        opacity,
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        padding: '0 4%',
        pointerEvents: 'none',
      }}
    >
      <GlassPanel style={{ maxWidth: 470 }}>
        <Eyebrow text="✦  Live Catering  ✦" delay={0.1} color="#FF8844" />

        <h2 style={{ ...DISPLAY, fontSize: 'clamp(2.5rem, 7vw, 5.8rem)', color: '#E8D5A3' }}>
          <Words text="A Feast" delay={0.22} />
          <br />
          <Words text="for Every" delay={0.38} style={{ color: '#FF8844', fontStyle: 'italic' }} />
          <br />
          <Words text="Sense." delay={0.54} />
        </h2>

        <GoldLine delay={0.86} />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.96, duration: 0.52 }}
          style={{ ...BODY_TEXT, marginBottom: '1.8rem' }}
        >
          Our master chefs perform live — tandoor flames dance, woks ignite, desserts crafted
          before your eyes. A culinary theatre unlike any other.
        </motion.p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.78rem' }}>
          {stations.map((s, i) => (
            <ListItem key={i} icon={s.emoji} text={s.text} delay={1.08 + i * 0.1} color={s.color} />
          ))}
        </div>
      </GlassPanel>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// ACT 7 — Aerial / Stats   (scroll 0.80 → 0.94)
// ─────────────────────────────────────────────────────────
export function Overlay7({ scrollProgress }: OverlayProps) {
  const opacity = getOpacity(scrollProgress, 0.80, 0.94)
  if (opacity === 0) return null

  const stats = [
    { to: STATS.events,  suffix: '+',  label: 'Events Hosted' },
    { to: STATS.years,   suffix: '+',  label: 'Years of Excellence' },
    { to: STATS.clients, suffix: '+',  label: 'Happy Clients' },
    { to: STATS.rating,  suffix: ' ★', label: 'Always & Forever' },
  ]

  return (
    <div
      style={{
        opacity,
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '6%',
        pointerEvents: 'none',
      }}
    >
      <GlassPanel style={{ maxWidth: 720, width: '90%' }} center>
        <Eyebrow text="✦  The View From Above  ✦" delay={0.18} />

        <h2 style={{ ...DISPLAY, fontSize: 'clamp(2.2rem, 5.5vw, 4.6rem)', color: '#E8D5A3' }}>
          <Words text="Every celebration," delay={0.32} />
          <br />
          <Words text="a city of lights." delay={0.56} style={{ color: '#C9A84C', fontStyle: 'italic' }} />
        </h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.95, duration: 0.78 }}
          style={{
            width: 96, height: 1, margin: '2.1rem auto',
            background: 'linear-gradient(90deg, transparent, #C9A84C, #F5E07A, #C9A84C, transparent)',
            transformOrigin: 'center',
          }}
        />

        {/* Stat cards */}
        <div style={{ display: 'flex', gap: 'clamp(2rem, 4.5vw, 4.2rem)', justifyContent: 'center', flexWrap: 'wrap' }}>
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24, scale: 0.86 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.12 + i * 0.13, duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
              style={{ textAlign: 'center', minWidth: 88 }}
            >
              <div style={{ ...DISPLAY, fontSize: 'clamp(2.1rem, 4vw, 3.4rem)', color: '#C9A84C' }}>
                <Counter to={s.to} suffix={s.suffix} delay={1.28 + i * 0.13} />
              </div>
              <div style={{ ...MONO, fontSize: '0.54rem', color: 'rgba(201,168,76,0.58)', letterSpacing: '0.32em', textTransform: 'uppercase', marginTop: '0.42rem' }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </GlassPanel>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// ACT 6 — Services Stage   (scroll 0.65 → 0.78)
// ─────────────────────────────────────────────────────────
export function Overlay6({ scrollProgress }: OverlayProps) {
  const opacity = getOpacity(scrollProgress, 0.65, 0.78)
  if (opacity === 0) return null

  const items = [
    { emoji: '🎪', text: 'Theme & Concept Décor', color: '#C9A84C' },
    { emoji: '🎵', text: 'Live Entertainment & Sound', color: '#5BBFFF' },
    { emoji: '✨', text: 'Floral Artistry & Arches', color: '#FF8AC0' },
  ]

  return (
    <div
      style={{
        opacity,
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 4%',
        pointerEvents: 'none',
      }}
    >
      <GlassPanel style={{ maxWidth: 420, textAlign: 'right' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Eyebrow text="✦  Our Services  ✦" delay={0.1} color="#C9A84C" />
        </div>

        <h2 style={{ ...DISPLAY, fontSize: 'clamp(2.4rem, 6vw, 5rem)', color: '#E8D5A3', textAlign: 'right' }}>
          <Words text="Every Detail," delay={0.22} />
          <br />
          <Words text="Perfected." delay={0.38} />
        </h2>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <GoldLine delay={0.86} align="right" />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.96, duration: 0.52 }}
          style={{ ...BODY_TEXT, textAlign: 'right', marginBottom: '1.8rem' }}
        >
          We manage the entire celebration, ensuring seamless execution, gorgeous décor, and high-energy entertainment.
        </motion.p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', alignItems: 'flex-end' }}>
          {items.map((item, i) => (
            <ListItem key={i} icon={item.emoji} text={item.text} delay={1.05 + i * 0.1} color={item.color} fromRight />
          ))}
        </div>
      </GlassPanel>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// ACT 8 — Finale / Call to Action   (scroll 0.90 → 1.00)
// ─────────────────────────────────────────────────────────
export function Overlay8({ scrollProgress, onEnterSite }: OverlayProps & { onEnterSite?: () => void }) {
  const opacity = getOpacity(scrollProgress, 0.90, 1.0)
  if (opacity === 0) return null

  return (
    <div
      style={{
        opacity,
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        pointerEvents: 'none',
      }}
    >
      <GlassPanel style={{ maxWidth: 620, width: '100%' }} center>
        <Eyebrow text="✦  Let's Plan Your Day  ✦" delay={0.18} />

        <h2 style={{ ...DISPLAY, fontSize: 'clamp(2.2rem, 5.5vw, 4.6rem)', color: '#E8D5A3' }}>
          <Words text="Your Dream Celebration" delay={0.32} />
          <br />
          <Words text="Awaits." delay={0.56} style={{ color: '#C9A84C', fontStyle: 'italic' }} />
        </h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.95, duration: 0.78 }}
          style={{
            width: 96, height: 1, margin: '2.1rem auto',
            background: 'linear-gradient(90deg, transparent, #C9A84C, #F5E07A, #C9A84C, transparent)',
            transformOrigin: 'center',
          }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          style={{ ...BODY_TEXT, marginBottom: '2.2rem' }}
        >
          From opulent decor to custom menus, we curate the entire experience. Click below to explore our full menu, services, and check packages.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          style={{ pointerEvents: 'auto' }}
        >
          <button
            onClick={onEnterSite}
            style={{
              background: '#C9A84C',
              color: '#0A0A0A',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: '14px',
              letterSpacing: '2px',
              padding: '16px 36px',
              border: 'none',
              borderRadius: '999px',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(201,168,76,0.3)',
            }}
          >
            ENTER THE SITE
          </button>
        </motion.div>
      </GlassPanel>
    </div>
  )
}

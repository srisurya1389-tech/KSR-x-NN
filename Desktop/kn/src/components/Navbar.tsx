import { motion } from 'framer-motion'

interface NavbarProps {
  currentAct: number
  scrollProgress: number
}

const ACT_LABELS = [
  'Arrival', 'Entrance', 'Venue', 'Experience',
  'Catering', 'Services', 'Aerial', 'Finale'
]

export default function Navbar({ currentAct, scrollProgress }: NavbarProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 100, padding: '1.2rem 2.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'linear-gradient(to bottom, rgba(10,10,10,0.8), transparent)',
        backdropFilter: 'blur(4px)',
        pointerEvents: 'auto'
      }}
    >
      {/* Logo */}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.4rem',
        color: '#C9A84C',
        fontWeight: 300,
        letterSpacing: '0.2em',
        textTransform: 'uppercase'
      }}>
        KSR
        <span style={{
          display: 'block',
          fontFamily: 'var(--font-body)',
          fontSize: '0.45rem',
          letterSpacing: '0.4em',
          color: '#8B6914',
          marginTop: '-2px'
        }}>
          GRAND EVENTS & CATERING
        </span>
      </div>

      {/* Chapter dots */}
      <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
        {ACT_LABELS.map((label, i) => (
          <div
            key={i}
            title={label}
            style={{
              position: 'relative',
              width: i === currentAct ? 24 : 6,
              height: 6,
              borderRadius: 3,
              background: i === currentAct ? '#C9A84C' : '#333',
              border: i === currentAct ? 'none' : '1px solid #444',
              transition: 'all 0.4s ease',
              cursor: 'pointer',
              boxShadow: i === currentAct ? '0 0 8px #C9A84C' : 'none'
            }}
          />
        ))}
      </div>

      {/* Scroll progress bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '1px', background: '#111'
      }}>
        <motion.div style={{
          height: '100%',
          background: 'linear-gradient(90deg, #8B6914, #FFD700)',
          width: `${scrollProgress * 100}%`,
          boxShadow: '0 0 6px #FFD700'
        }} />
      </div>
    </motion.nav>
  )
}

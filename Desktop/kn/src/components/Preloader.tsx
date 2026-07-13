import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setVisible(false)
            setTimeout(onComplete, 800)
          }, 400)
          return 100
        }
        return p + 2
      })
    }, 50)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#0A0A0A',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '2rem'
          }}
        >
          {/* Outer ring */}
          <div style={{ position: 'relative', width: 120, height: 120 }}>
            <div style={{
              position: 'absolute', inset: 0,
              border: '1px solid #1a1a1a',
              borderRadius: '50%'
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              border: '2px solid transparent',
              borderTopColor: '#C9A84C',
              borderRightColor: '#C9A84C44',
              borderRadius: '50%',
              animation: 'spin 1.2s linear infinite'
            }} />
            <div style={{
              position: 'absolute', inset: 12,
              border: '1px solid #C9A84C22',
              borderRadius: '50%',
              animation: 'spin 2s linear infinite reverse'
            }} />
            {/* KSR center */}
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)',
              fontSize: '1.8rem',
              color: '#C9A84C',
              fontWeight: 300,
              letterSpacing: '0.1em'
            }}>
              KSR
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              color: '#E8D5A3',
              fontWeight: 300,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem'
            }}>
              Grand Events
            </div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              color: '#C9A84C',
              letterSpacing: '0.5em',
              textTransform: 'uppercase'
            }}>
              & Catering · Vijayawada
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ width: 200, height: 1, background: '#1a1a1a', position: 'relative', overflow: 'hidden' }}>
            <motion.div
              style={{
                position: 'absolute', left: 0, top: 0, height: '100%',
                background: 'linear-gradient(90deg, #8B6914, #FFD700, #C9A84C)',
                boxShadow: '0 0 10px #FFD700'
              }}
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'linear', duration: 0.05 }}
            />
          </div>

          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6rem',
            color: '#444',
            letterSpacing: '0.3em'
          }}>
            {progress < 100 ? 'PREPARING YOUR EXPERIENCE...' : 'WELCOME'}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

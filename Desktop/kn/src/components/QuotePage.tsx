import { useState, CSSProperties } from 'react'

const BG   = '#080A11'
const CARD  = '#0F1220'
const BORDER = 'rgba(255,255,255,0.08)'
const INPUT_BG = '#0C0F1A'
const PINK  = '#F72585'
const PINK2 = '#B5179E'
const LABEL: CSSProperties = { display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', marginBottom: 7 }
const INPUT_STYLE: CSSProperties = { width: '100%', background: INPUT_BG, border: '1.5px solid rgba(255,255,255,.1)', borderRadius: 10, padding: '13px 14px', fontSize: 14, color: '#fff', outline: 'none', boxSizing: 'border-box', appearance: 'none' as const }
const MONO: CSSProperties = { fontFamily: "'Montserrat', sans-serif" }

const EVENT_TYPES = ['Wedding', 'Reception', 'Engagement', 'Birthday', 'Housewarming / Pooja', 'Half-Saree Function', 'Sreemantham', 'Corporate Event', 'Social Gathering', 'Concept Décor']
const BUDGETS = ['Below ₹50,000', '₹50,000 – ₹1,00,000', '₹1,00,000 – ₹2,00,000', '₹2,00,000 – ₹5,00,000', '₹5,00,000+', 'Not decided yet']

interface Props { onBack: () => void }

export default function QuotePage({ onBack }: Props) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', eventType: '', date: '', guests: '', venue: '', budget: '', notes: '' })
  const [submitted, setSubmitted] = useState(false)

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 999, background: BG, overflowY: 'auto', ...MONO }}>
      <style>{`
        .qp-input:focus { border-color: ${PINK} !important; }
        .qp-input::placeholder { color: rgba(255,255,255,.22); }
        select.qp-input option { background: #0F1220; color: #fff; }
        @media (max-width: 640px) { .qp-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      {/* Ambient glow blobs */}
      <div style={{ position: 'fixed', top: '-20vh', left: '-10vw', width: '55vw', height: '55vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(180,10,130,.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', top: '10vh', right: '-15vw', width: '50vw', height: '50vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(20,60,160,.14) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 780, margin: '0 auto', padding: '40px 20px 80px', position: 'relative' }}>

        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 52, flexWrap: 'wrap', gap: 12 }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,.7)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, ...MONO }}>
            <span style={{ fontSize: 16 }}>←</span> BACK HOME
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.05)', border: `1px solid rgba(247,37,133,.3)`, borderRadius: 999, padding: '7px 14px' }}>
            <span style={{ fontSize: 13 }}>✦</span>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', color: PINK }}>FREE QUOTE · 24 HR REPLY</span>
          </div>
        </div>

        {/* Hero heading */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: 'clamp(38px, 8vw, 72px)', fontWeight: 900, color: '#fff', lineHeight: 1.05, margin: 0, letterSpacing: '-.02em' }}>
            TELL US ABOUT<br />
            <span style={{ background: `linear-gradient(135deg, ${PINK}, ${PINK2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>YOUR EVENT.</span>
          </h1>
          <p style={{ marginTop: 18, fontSize: 15, color: 'rgba(255,255,255,.45)', lineHeight: 1.7, maxWidth: 480 }}>
            The more details you share, the more precise your custom quote will be. All fields are private and we never share your info.
          </p>
        </div>

        {submitted ? (
          <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 20, padding: '60px 40px', textAlign: 'center' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: `linear-gradient(135deg, ${PINK}, ${PINK2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34, margin: '0 auto 24px' }}>✓</div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: '#fff', margin: '0 0 12px' }}>Enquiry received!</h2>
            <p style={{ color: 'rgba(255,255,255,.5)', fontSize: 15, lineHeight: 1.7, maxWidth: 400, margin: '0 auto 32px' }}>
              Thanks {form.name || 'there'} — our team will review your details and reply within 24 hours with a custom quote.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://wa.me/918978268489" target="_blank" rel="noreferrer" style={{ background: `linear-gradient(135deg, ${PINK}, ${PINK2})`, color: '#fff', fontWeight: 700, fontSize: 14, padding: '13px 24px', borderRadius: 999, textDecoration: 'none' }}>WhatsApp us now</a>
              <button onClick={onBack} style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.15)', color: '#fff', fontWeight: 700, fontSize: 14, padding: '13px 24px', borderRadius: 999, cursor: 'pointer' }}>Back to site</button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 20, padding: 'clamp(24px, 5vw, 40px)', display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Row 1 */}
              <div className="qp-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={LABEL}>Full Name</label>
                  <input className="qp-input" style={INPUT_STYLE} type="text" placeholder="Your full name" value={form.name} onChange={e => set('name', e.target.value)} required />
                </div>
                <div>
                  <label style={LABEL}>Email</label>
                  <input className="qp-input" style={INPUT_STYLE} type="email" placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} required />
                </div>
              </div>

              {/* Row 2 */}
              <div className="qp-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={LABEL}>Phone</label>
                  <input className="qp-input" style={INPUT_STYLE} type="tel" placeholder="+91 9XXXXXXXXX" value={form.phone} onChange={e => set('phone', e.target.value)} required />
                </div>
                <div>
                  <label style={LABEL}>Event Type</label>
                  <select className="qp-input" style={INPUT_STYLE} value={form.eventType} onChange={e => set('eventType', e.target.value)} required>
                    <option value="">Select...</option>
                    {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              {/* Row 3 */}
              <div className="qp-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={LABEL}>Event Date</label>
                  <input className="qp-input" style={INPUT_STYLE} type="date" value={form.date} onChange={e => set('date', e.target.value)} />
                </div>
                <div>
                  <label style={LABEL}>Number of Guests</label>
                  <input className="qp-input" style={INPUT_STYLE} type="number" placeholder="e.g. 300" min="1" value={form.guests} onChange={e => set('guests', e.target.value)} />
                </div>
              </div>

              {/* Venue */}
              <div>
                <label style={LABEL}>Venue or City</label>
                <input className="qp-input" style={INPUT_STYLE} type="text" placeholder="e.g. Grand Ballroom, Vijayawada" value={form.venue} onChange={e => set('venue', e.target.value)} />
              </div>

              {/* Budget */}
              <div>
                <label style={LABEL}>Budget Range</label>
                <select className="qp-input" style={INPUT_STYLE} value={form.budget} onChange={e => set('budget', e.target.value)}>
                  <option value="">Select...</option>
                  {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              {/* Notes */}
              <div>
                <label style={LABEL}>Tell Us More <span style={{ textTransform: 'none', fontWeight: 400, color: 'rgba(255,255,255,.3)' }}>(Optional)</span></label>
                <textarea className="qp-input" style={{ ...INPUT_STYLE, minHeight: 100, resize: 'vertical' }} placeholder="Theme, cuisine preferences, must-haves..." value={form.notes} onChange={e => set('notes', e.target.value)} />
              </div>

              {/* Submit */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, paddingTop: 4 }}>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,.3)', margin: 0 }}>By submitting you agree to be contacted about your enquiry.</p>
                <button type="submit" style={{ background: `linear-gradient(135deg, ${PINK}, ${PINK2})`, border: 'none', color: '#fff', fontWeight: 800, fontSize: 13, letterSpacing: '.12em', textTransform: 'uppercase', padding: '15px 32px', borderRadius: 999, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  Send Enquiry
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Footer */}
        <div style={{ marginTop: 80, borderTop: `1px solid ${BORDER}`, paddingTop: 40, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#fff', letterSpacing: '-.01em' }}>KSR<span style={{ color: PINK }}>.</span>EVENTS</div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.35)', lineHeight: 1.7, marginTop: 10 }}>Full-service planning and catering for every celebration that matters.</p>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.12em', color: 'rgba(255,255,255,.4)', marginBottom: 14 }}>CONTACT</div>
            {[['📧', 'ksrgrandevents@gmail.com'], ['📞', '+91 89782 68489'], ['🕐', 'Mon – Sat, 10am – 8pm']].map(([ic, t]) => (
              <div key={t} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8, fontSize: 13, color: 'rgba(255,255,255,.55)' }}>
                <span>{ic}</span><span>{t}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.12em', color: 'rgba(255,255,255,.4)', marginBottom: 14 }}>READY TO PLAN?</div>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ background: `linear-gradient(135deg, ${PINK}, ${PINK2})`, border: 'none', color: '#fff', fontWeight: 700, fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', padding: '12px 22px', borderRadius: 999, cursor: 'pointer' }}>
              Start Your Enquiry
            </button>
          </div>
        </div>
        <div style={{ marginTop: 32, borderTop: `1px solid ${BORDER}`, paddingTop: 20, textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,.2)' }}>
          © 2026 KSR Grand Events & Catering, Vijayawada. All rights reserved.
        </div>
      </div>
    </div>
  )
}

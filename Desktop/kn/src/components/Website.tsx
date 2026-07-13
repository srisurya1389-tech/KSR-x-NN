import { useState, useEffect, useRef, CSSProperties } from 'react'
import QuotePage from './QuotePage'

// ── India portfolio data ────────────────────────────────────────────────
const EVENT_ROW1 = [
  { name: 'Mehandiya', sub: 'EXQUISITE HENNA DESIGNS', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80' },
  { name: 'Haldi Ceremony', sub: 'GOLDEN TURMERIC GLOW', img: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?w=600&auto=format&fit=crop&q=80' },
  { name: 'Sangeet Night', sub: 'MUSIC, DANCE & BEATS', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80' },
  { name: 'Baraat Procession', sub: 'GRAND CELEBRATION', img: 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?w=600&auto=format&fit=crop&q=80' },
  { name: 'Muhurtham', sub: 'SACRED VOWS & RITUALS', img: 'https://images.unsplash.com/photo-1519225495810-7512c696505a?w=600&auto=format&fit=crop&q=80' },
  { name: 'Wedding Reception', sub: 'ROYAL FEAST & CELEBRATION', img: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&auto=format&fit=crop&q=80' },
  { name: 'Engagement', sub: 'RINGS & NEW BEGINNINGS', img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&auto=format&fit=crop&q=80' },
  { name: 'Sreemantham', sub: 'SHOWERING LOVE & BLESSINGS', img: 'https://images.unsplash.com/photo-1537655780520-1e392edd816a?w=600&auto=format&fit=crop&q=80' },
  { name: 'Half-Saree Function', sub: 'TRADITIONAL VIBRANCY', img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80' },
  { name: 'Naming Ceremony', sub: 'WELCOME LITTLE ONE', img: 'https://images.unsplash.com/photo-1505784045224-1247b2b29cf3?w=600&auto=format&fit=crop&q=80' }
]
const EVENT_ROW2 = [
  { name: 'Birthdays', sub: 'MILESTONE CELEBRATIONS', img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&auto=format&fit=crop&q=80' },
  { name: 'Anniversary Party', sub: 'YEARS OF TOGETHERNESS', img: 'https://images.unsplash.com/photo-1505232458627-539c9765e527?w=600&auto=format&fit=crop&q=80' },
  { name: 'Corporate Events', sub: 'PROFESSIONAL BANQUETS', img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=80' },
  { name: 'Housewarming', sub: 'GRAPRAVESHAM DECOR', img: 'https://images.unsplash.com/photo-1545128485-c400e7702796?w=600&auto=format&fit=crop&q=80' },
  { name: 'Kitty Parties', sub: 'ELEGANT SOIREES & FUN', img: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&auto=format&fit=crop&q=80' },
  { name: 'Graduation', sub: 'HONOURING SUCCESS', img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=80' },
  { name: 'Cocktail Night', sub: 'MIXOLOGY & LOUNGE BEATS', img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&auto=format&fit=crop&q=80' },
  { name: 'Pooja & Festivals', sub: 'SACRED DEVOTION & HARMONY', img: 'https://images.unsplash.com/photo-1609137144814-6fa6c52a0bc4?w=600&auto=format&fit=crop&q=80' },
  { name: 'Social Gathering', sub: 'COMMUNITY & FAMILY REUNIONS', img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&auto=format&fit=crop&q=80' },
  { name: 'Concept Decor', sub: 'BESPOKE DESIGN & STYLING', img: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&auto=format&fit=crop&q=80' }
]

const TICKER_ITEMS = [
  { icon: '🎁', label: 'Celebration'  },
  { icon: '✦',  label: 'Magic'        },
  { icon: '♥',  label: 'Love'         },
  { icon: '👑',  label: 'Royal'        },
  { icon: '♫',  label: 'Rhythm'       },
  { icon: '📷',  label: 'Memories'    },
  { icon: '🌸',  label: 'Elegance'    },
  { icon: '🥂',  label: 'Grandeur'    },
  { icon: '💍',  label: 'Weddings'    },
  { icon: '🎊',  label: 'Joy'         },
]

const HERO_SLIDES = [
  {
    badge:    '✦ Grand Weddings',
    line1:    'WE COOK THE FEAST.',
    line2:    'We Style the Day.',
    desc:     'From welcome drinks to the last grain of biryani — pure-veg & non-veg catering, stage & mandap décor, and full event planning under one roof.',
    tag:      'Veg & Non-Veg 🌶️',
    label:    'Grand wedding reception photo',
    img:      '/images/wedding_hero.png',
    accent:   '#C9A84C',
  },
  {
    badge:    '✦ Royal Receptions',
    line1:    'EVERY DETAIL,',
    line2:    'Perfectly Crafted.',
    desc:     'Opulent floral arrangements, bespoke stage designs and live counters that turn your reception into an unforgettable evening.',
    tag:      'Décor & Catering 🌸',
    label:    'Royal reception decor photo',
    img:      '/images/reception_decor_hero.png',
    accent:   '#E07050',
  },
  {
    badge:    '✦ Elegant Ceremonies',
    line1:    'YOUR STORY,',
    line2:    'Our Masterpiece.',
    desc:     'Mandap setups, custom floral work, lighting and themed décor — we bring your vision to life with artistry and precision.',
    tag:      'Stage & Mandap 🪔',
    label:    'Ceremony mandap setup photo',
    img:      '/images/mandap_setup_hero.png',
    accent:   '#7B8EC8',
  },
  {
    badge:    '✦ Private Celebrations',
    line1:    'MEMORIES MADE',
    line2:    'To Last Forever.',
    desc:     'Birthdays, half-saree functions, namings — every celebration handled with warmth, colour and delicious food.',
    tag:      'All Occasions 🎉',
    label:    'Birthday celebration photo',
    img:      '/images/birthday_hero.png',
    accent:   '#6BBF9A',
  },
]

type View = 'home' | 'menu' | 'services' | 'events' | 'gallery' | 'testimonials' | 'about' | 'contact'

// ── constants ──────────────────────────────────────────────────────────
const ACC = '#2563EB', INK = '#0F172A'
const BG = '#F0F5FF', BORDER = '#C7D7FD'

const BG_FONT: CSSProperties = { fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }
const DM: CSSProperties = { fontFamily: "'DM Sans', system-ui, sans-serif" }

const VEG_PLANS = [
  { name: 'MAGADHEERA', items: ['Sweet', 'Hot', 'Special Rice/Biryani', 'Raitha', 'South Indian Curry', 'Fry Item', 'Pappu', 'Sambar', 'Roti Pachadi', 'White Rice', 'Curd', 'Papad'] },
  { name: 'BAAHUBALI', items: ['Sweet', 'Hot', 'Roti (Min 100 Members)', 'Special Rice/Biryani', 'Raitha', 'South Indian Curry', 'North Indian Curry', 'Fry Item', 'Pappu', 'Sambar', 'Roti Pachadi', 'Pickle', 'White Rice', 'Curd', 'Papad'] },
  { name: 'RRR', items: ['Sweet', 'Hot', 'Roti (Min 100 Members)', 'Special Rice/Biryani', 'Raitha', 'South Indian Curry', 'North Indian Curry', 'Veg Fry Item', 'Veg Dry Item', 'Pappu', 'Sambar', 'Roti Pachadi', 'Pickle', 'White Rice', 'Curd', 'Papad'] },
  { name: 'KALKI 2898 AD', items: ['Welcome Drink', 'Veg Starter', 'Sweet', 'Hot', 'Roti (Min 100 Members)', 'Special Rice', 'Veg Biryani/Pulao', 'Raitha', 'South Indian Curry', 'North Indian Curry', 'Veg Fry Item', 'Veg Dry Item', 'Pappu', 'Sambar', 'Roti Pachadi', 'Pickle', 'White Rice', 'Curd', 'Papad'] },
]
const NONVEG_PLANS = [
  { name: 'MAGADHEERA', items: ['Sweet', 'Hot', 'Non-Veg Starter', 'Special Rice/Biryani', 'Raitha', 'Non-Veg Curry', 'Fry Item', 'Pappu', 'Sambar', 'Roti Pachadi', 'White Rice', 'Curd', 'Papad'] },
  { name: 'BAAHUBALI', items: ['Sweet', 'Hot', 'Roti (Min 100 Members)', 'Non-Veg Starter', 'Chicken Biryani', 'Raitha', 'South Indian Curry', 'Non-Veg Curry', 'Fry Item', 'Pappu', 'Sambar', 'Roti Pachadi', 'Pickle', 'White Rice', 'Curd', 'Papad'] },
  { name: 'RRR', items: ['Sweet', 'Hot', 'Roti (Min 100 Members)', 'Non-Veg Starter', 'Chicken / Mutton Biryani', 'Raitha', 'South Indian Curry', 'North Indian Curry', 'Non-Veg Curry', 'Non-Veg Fry', 'Pappu', 'Sambar', 'Roti Pachadi', 'Pickle', 'White Rice', 'Curd', 'Papad'] },
  { name: 'KALKI 2898 AD', items: ['Welcome Drink', 'Non-Veg Starter', 'Sweet', 'Hot', 'Roti (Min 100 Members)', 'Special Rice', 'Chicken / Mutton Biryani', 'Raitha', 'South Indian Curry', 'North Indian Curry', 'Non-Veg Curry', 'Non-Veg Fry', 'Fish Item', 'Pappu', 'Sambar', 'Roti Pachadi', 'Pickle', 'White Rice', 'Curd', 'Papad'] },
]

const VEG_SECTIONS = [
  { title: 'Refreshments (90 mins circulation)', items: ['Water Melon Juice', 'Fruit Punch'] },
  { title: 'Veg Appetizers (90 mins circulation)', items: ['VEG RR (ROYAL RECEPIE)', 'Baby Corn 65'] },
  { title: 'Salads Bar Station', items: ['Fresh Green Salad', 'Classic Veg Greek Salad', 'Mixed Sprouts'] },
  { title: 'Assorted Indian Breads', items: ['Butter Naan', 'Masala Kulcha'] },
  { title: 'Sweets - Live Station', items: ['Bobbatlu', 'Jilebi'] },
  { title: 'Hot Items', items: ['Mirchi Bajji', 'Sweet Corn Samosa'] },
  { title: 'Sweet Items', items: ['Dry Fruit Boorelu', 'Carrot Halwa'] },
  { title: 'Main Course', items: ['Jack Fruit Biryani', 'Karvepaku Rice', 'Paneer Butter Masala', 'Chole Masala', 'Mulakada Kaju Curry', 'Guttu Vankaya Curry', 'Gobi 65', 'Bendakaya Kaju Fry', 'Pappu Tomato / Mango', 'Sambar', 'Majjiga Pulusu'] },
  { title: 'Fresh Grinded Chutneys', items: ['Beerakaya Tomato Chutney', 'Coconut Mango Chutney', 'Gongura Chutney'] },
  { title: "Pickles", items: ['Fresh Mango Pickle', 'Dosakaya Avakaya', 'Pandu Mirchi Pickle'] },
  { title: "Podi's", items: ['Nalla Karam', 'Kobbari Karam', 'Putnala Podi'] },
  { title: 'Accompaniments', items: ['White Rice', 'Premium Fresh Curd', 'Curd Raitha', 'Pure Ghee', 'Plain South Indian Papad & Vadiyalu'] },
  { title: 'Ice Creams', items: ['French Vanilla', 'Butter Scotch'] },
  { title: 'Desserts', items: ['Mini Gulab Jamun'] },
  { title: 'Fruit Bar', items: ['Indian - 3 varieties', 'Exotic - 3 varieties'] },
  { title: 'Live Pan Station', items: ['Special Meetha Paan', 'Oreo Paan', 'Special Dates Paan'] },
  { title: 'Live Chat Station', items: ['Pani Poori', 'Aloo Tikka Chat', 'Vada Pav'] },
]
const NONVEG_SECTIONS = [
  { title: 'Refreshments (90 mins circulation)', items: ['Water Melon Juice', 'Fruit Punch'] },
  { title: 'Non-Veg Appetizers (90 mins circulation)', items: ['Chicken 65', 'Apollo Fish', 'Chicken Lollipop'] },
  { title: 'Salads Bar Station', items: ['Fresh Green Salad', 'Classic Veg Greek Salad', 'Mixed Sprouts'] },
  { title: 'Assorted Indian Breads', items: ['Butter Naan', 'Masala Kulcha'] },
  { title: 'Sweets - Live Station', items: ['Bobbatlu', 'Jilebi'] },
  { title: 'Hot Items', items: ['Mirchi Bajji', 'Sweet Corn Samosa'] },
  { title: 'Sweet Items', items: ['Dry Fruit Boorelu', 'Carrot Halwa'] },
  { title: 'Main Course (Non-Veg)', items: ['Chicken Dum Biryani', 'Mutton Kheema', 'Chicken Chettinad', 'Mutton Rogan Josh', 'Fish Pulusu', 'Prawn Masala', 'Egg Curry', 'Pappu', 'Sambar', 'Majjiga Pulusu'] },
  { title: 'Fresh Grinded Chutneys', items: ['Beerakaya Tomato Chutney', 'Coconut Mango Chutney', 'Gongura Chutney'] },
  { title: "Pickles", items: ['Fresh Mango Pickle', 'Chicken Pickle', 'Pandu Mirchi Pickle'] },
  { title: "Podi's", items: ['Nalla Karam', 'Kobbari Karam', 'Putnala Podi'] },
  { title: 'Accompaniments', items: ['White Rice', 'Premium Fresh Curd', 'Curd Raitha', 'Pure Ghee', 'Plain South Indian Papad & Vadiyalu'] },
  { title: 'Ice Creams', items: ['French Vanilla', 'Butter Scotch'] },
  { title: 'Desserts', items: ['Mini Gulab Jamun'] },
  { title: 'Fruit Bar', items: ['Indian - 3 varieties', 'Exotic - 3 varieties'] },
  { title: 'Live Pan Station', items: ['Special Meetha Paan', 'Oreo Paan', 'Special Dates Paan'] },
  { title: 'Live Chat Station', items: ['Pani Poori', 'Aloo Tikka Chat', 'Vada Pav'] },
]

const SERVICES_ALL = [
  { icon: '🍽️', title: 'Wedding Catering', desc: 'Full veg & non-veg meal service — welcome drinks to desserts, served fresh and on time.' },
  { icon: '🌸', title: 'Stage & Mandap Décor', desc: 'KSR Decorations: floral mandaps, drapes, backdrops and themed styling for every ritual.' },
  { icon: '📋', title: 'Full Event Planning', desc: 'End-to-end coordination — timeline, vendors, setup and smooth on-day execution.' },
  { icon: '🍹', title: 'Live Counters', desc: 'Dosa, chaat, juice and dessert counters that keep your guests delighted.' },
  { icon: '💡', title: 'Lighting & Ambience', desc: 'Warm lighting, draping and ambience design to set the mood of your venue.' },
  { icon: '🎉', title: 'Receptions & Birthdays', desc: 'Catering and décor packages for receptions, birthdays and housewarmings.' },
]
const PACKAGES = [
  { name: 'MAGADHEERA 🔥', tagline: 'Entry · Intimate gatherings', featured: false, cardBg: '#fff', cardFg: INK, border: '#e06020', btnBg: '#e06020', btnFg: '#fff', inclusions: ['Veg menu — 8 to 10 items', 'Buffet setup & serving staff', 'Welcome drink', 'Basic table décor'] },
  { name: 'BAAHUBALI ⚔️', tagline: 'Popular · Weddings & receptions', featured: true, cardBg: '#f0c040', cardFg: '#1a1a00', border: '#f0c040', btnBg: INK, btnFg: '#fff', inclusions: ['Veg + Non-Veg, 14+ items', '2 live counters', 'Stage & mandap floral décor', 'Dedicated coordinator'] },
  { name: 'KALKI 2898 AD ✨', tagline: 'Ultimate · Grand celebrations', featured: false, cardBg: '#fff', cardFg: INK, border: '#c060ff', btnBg: '#c060ff', btnFg: '#fff', inclusions: ['Custom multi-cuisine spread', '4+ live counters & dessert bar', 'Full venue décor & lighting', 'Complete event planning'] },
]
const PROCESS_STEPS = [
  { n: '1', title: 'Share your event', desc: 'Tell us the function type, date, location and guest count.' },
  { n: '2', title: 'Choose menu & décor', desc: 'Pick from customised veg & non-veg combos and décor themes.' },
  { n: '3', title: 'We finalise', desc: 'Menu, serving style, timing and decoration plan locked in.' },
  { n: '4', title: 'Fresh & on-time', desc: 'Freshly cooked food, neatly served, beautifully set up.' },
]
const TESTIMONIALS = [
  { name: 'Priya R.', role: 'Wedding Client', initials: 'PR', quote: 'The food was the talk of our wedding — fresh, hot and so flavourful. The mandap décor was stunning too.' },
  { name: 'Arun K.', role: 'Corporate Event Organizer', initials: 'AK', quote: 'Professional, punctual and spotless service. Handling 400+ guests felt effortless on their side.' },
  { name: 'Meena S.', role: 'Housewarming Function', initials: 'MS', quote: 'Authentic taste exactly like home cooking. Hygienic, well-organised and warm staff.' },
  { name: 'Karthik M.', role: 'Birthday Party Host', initials: 'KM', quote: 'Live counters were a huge hit with the kids and adults alike. Will book again for sure.' },
  { name: 'Lakshmi V.', role: 'Engagement Function', initials: 'LV', quote: 'From the welcome drinks to the dessert table, every detail was thoughtful and beautifully done.' },
]
const VALUES = [
  { icon: '🧼', title: 'Fresh, every time', desc: 'All dishes cooked fresh on-site using quality ingredients.' },
  { icon: '✨', title: 'Hygienic & safe', desc: 'Clean preparation and safe serving standards, always followed.' },
  { icon: '⏱', title: 'On-time service', desc: 'Timely setup and smooth food service for your function.' },
]
const GALLERY_DATA = [
  { cat: 'Weddings', icon: '🍛', label: 'wedding lunch buffet' },
  { cat: 'Décor & Stage', icon: '🌸', label: 'floral mandap stage' },
  { cat: 'Food & Counters', icon: '🍽️', label: 'live dosa counter' },
  { cat: 'Receptions', icon: '✨', label: 'reception stage décor' },
  { cat: 'Weddings', icon: '🍌', label: 'banana-leaf sadhya' },
  { cat: 'Food & Counters', icon: '🍹', label: 'welcome drink station' },
  { cat: 'Décor & Stage', icon: '💡', label: 'lighting & ambience' },
  { cat: 'Receptions', icon: '🎂', label: 'dessert & sweets table' },
  { cat: 'Weddings', icon: '🍲', label: 'biryani service' },
]
const EVENTS_DATA: Record<string, { title: string; desc: string; cards: { title: string; tags: string; icon: string }[] }> = {
  'Wedding': { title: 'Wedding Events', desc: 'Comprehensive planning for every milestone of your union, curated with timeless elegance and cultural precision.', cards: [{ title: 'Pre-Wedding', tags: 'ENGAGEMENTS • HALDI • MEHENDI', icon: '💐' }, { title: 'Wedding Day', tags: 'CEREMONY • MUHURTHAM • VIDAI', icon: '✨' }, { title: 'Post-Wedding', tags: 'RECEPTION • DINNER • COCKTAILS', icon: '📸' }] },
  'Half-Saree': { title: 'Half-Saree Ceremonies', desc: 'A beautiful coming-of-age celebration planned with love and tradition — a milestone your daughter will always cherish.', cards: [{ title: 'Traditional Ritual', tags: 'POOJA • SAREE DRAPING • BLESSINGS', icon: '🌸' }, { title: 'Décor & Stage', tags: 'FLORAL STAGE • BACKDROP • LIGHTING', icon: '💡' }, { title: 'Feast & Catering', tags: 'FULL MEAL • SWEETS • LIVE COUNTERS', icon: '🍽️' }] },
  'Sreemantham': { title: 'Sreemantham Celebrations', desc: 'Welcoming the new life with joy, culture and a heartfelt celebration surrounded by family and love.', cards: [{ title: 'Ritual Setup', tags: 'POOJA • SAREE EXCHANGE • BLESSINGS', icon: '🌿' }, { title: 'Décor & Ambience', tags: 'FLORAL • BABY SHOWER THEME', icon: '🌸' }, { title: 'Feast & Catering', tags: 'TRADITIONAL MEAL • SWEETS', icon: '🍲' }] },
  'Naming Ceremony': { title: 'Naming Ceremonies', desc: 'A joyful introduction of your little one — planned with warmth, tradition and beautiful décor for a day to remember.', cards: [{ title: 'Ritual & Pooja', tags: 'NAAMKARAN • BLESSINGS • ELDERS', icon: '🪔' }, { title: 'Baby Décor', tags: 'CRADLE SETUP • FLORAL • PHOTO CORNER', icon: '🌸' }, { title: 'Catering', tags: 'FAMILY FEAST • SWEETS • SNACKS', icon: '🍽️' }] },
  'Birthdays': { title: 'Birthday Parties', desc: 'From first birthdays to milestone celebrations — every theme, every age, every joyful moment made unforgettable.', cards: [{ title: 'Theme Décor', tags: 'CUSTOM THEME • BALLOONS • STAGE', icon: '🎉' }, { title: 'Cake & Catering', tags: 'CUSTOM CAKE • SNACKS • FULL MEAL', icon: '🎂' }, { title: 'Entertainment', tags: 'DJ • GAMES • EMCEE', icon: '✨' }] },
  'Corporate': { title: 'Corporate Events', desc: 'Professional event management for corporate gatherings, conferences, award nights and team dinners of all scales.', cards: [{ title: 'Conferences', tags: 'AV SETUP • SEATING • BRANDING', icon: '🏢' }, { title: 'Team Dinners', tags: 'BUFFET • LIVE SERVICE • AMBIENCE', icon: '🍽️' }, { title: 'Award Nights', tags: 'STAGE • DÉCOR • F&B SERVICE', icon: '💡' }] },
  'Social Events': { title: 'Social Events', desc: 'Creating joyful moments for kitty parties, get-togethers, community feasts and every social gathering.', cards: [{ title: 'Kitty Parties', tags: 'THEME • CATERING • GAMES', icon: '🌸' }, { title: 'Get-togethers', tags: 'BARBECUE • BUFFET • DÉCOR', icon: '🍹' }, { title: 'Community Feasts', tags: 'LARGE SCALE • TRADITIONAL SERVE', icon: '🍲' }] },
  'Graduation': { title: 'Graduation Parties', desc: 'Celebrate academic achievements in style — elegant décor, great food and memories that last a lifetime.', cards: [{ title: 'Venue Décor', tags: 'STAGE • BACKDROP • LIGHTING', icon: '💡' }, { title: 'Catering', tags: 'BUFFET • CAKE • MOCKTAILS', icon: '🍽️' }, { title: 'Photo Moments', tags: 'PHOTO BOOTH • SIGNAGE • PROPS', icon: '✨' }] },
  'Concept Décor': { title: 'Concept Décor', desc: 'Transforming spaces into extraordinary experiences with themed design, floral artistry and ambient lighting.', cards: [{ title: 'Theme Design', tags: 'CUSTOM CONCEPT • MOOD BOARD', icon: '✨' }, { title: 'Floral Art', tags: 'FLOWER WALLS • CENTREPIECES • ARCHES', icon: '🌸' }, { title: 'Lighting', tags: 'LED • DRAPING • FAIRY LIGHTS', icon: '💡' }] },
  'Entertainment': { title: 'Entertainment Services', desc: 'Adding the perfect entertainment layer to elevate your event experience and keep every guest engaged.', cards: [{ title: 'Live Music', tags: 'BAND • VOCALIST • INSTRUMENTS', icon: '🎵' }, { title: 'DJ & Sound', tags: 'DJ CONSOLE • PA SYSTEM • LIGHTING', icon: '💡' }, { title: 'Cultural Acts', tags: 'CLASSICAL DANCE • FOLK • DRAMA', icon: '✨' }] },
  'F&B Services': { title: 'F&B Services', desc: 'Premium food & beverage services — live counters, buffet setups and welcoming drink stations for every function.', cards: [{ title: 'Live Counters', tags: 'DOSA • CHAAT • JUICE • DESSERT', icon: '🍹' }, { title: 'Buffet Setup', tags: 'VEG & NON-VEG • FULL COURSE', icon: '🍽️' }, { title: 'Welcome Drinks', tags: 'MOCKTAILS • JUICES • SHERBETS', icon: '🍹' }] },
}
const ALL_CATS = ['Wedding', 'Half-Saree', 'Sreemantham', 'Naming Ceremony', 'Birthdays', 'Corporate', 'Social Events', 'Graduation', 'Concept Décor', 'Entertainment', 'F&B Services']
const EVENT_TYPES = [['Wedding', '💍'], ['Reception', '✨'], ['Engagement', '💐'], ['Birthday', '🎉'], ['Housewarming / Pooja', '🪔'], ['Corporate', '🏢']]
const SERVICE_OPTIONS = ['Veg Catering', 'Non-Veg Catering', 'Stage & Mandap Décor', 'Floral Decoration', 'Lighting & Ambience', 'Live Counters', 'Full Event Planning']
const PLAN_THEME: Record<string, { headerBg: string; titleColor: string; icon: string; badge?: string }> = {
  'MAGADHEERA':   { headerBg: '#e06020', titleColor: '#fff', icon: '🔥' },
  'BAAHUBALI':    { headerBg: '#f0c040', titleColor: '#1a1a00', icon: '⚔️', badge: 'Most Chosen' },
  'RRR':          { headerBg: '#40b0ff', titleColor: '#fff', icon: '🌊' },
  'KALKI 2898 AD':{ headerBg: '#c060ff', titleColor: '#fff', icon: '✨' },
}

// ── main component ─────────────────────────────────────────────────────
export default function Website({ onBackTo3D }: { onBackTo3D?: () => void }) {
  const [view, setView] = useState<View>('home')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [vegMode, setVegMode] = useState<'Veg' | 'Non-Veg'>('Veg')
  const [selectedPlan, setSelectedPlan] = useState('')
  const [addedItems, setAddedItems] = useState<string[]>([])
  const [galleryTab, setGalleryTab] = useState('All')
  const [eventsCategory, setEventsCategory] = useState('Wedding')
  const [showBooking, setShowBooking] = useState(false)
  const [step, setStep] = useState(1)
  const [triedNext, setTriedNext] = useState(false)
  const [bookingSubmitted, setBookingSubmitted] = useState(false)
  const [booking, setBooking] = useState({ eventType: '', date: '', guests: '', venue: '', services: [] as string[], name: '', phone: '', email: '', notes: '' })
  const [contact, setContact] = useState({ name: '', phone: '', message: '' })
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [contactTried, setContactTried] = useState(false)

  // ── hero slider ──
  const [heroIdx, setHeroIdx] = useState(0)
  const heroIdxRef = useRef(0)
  const goSlide = (i: number) => { heroIdxRef.current = i; setHeroIdx(i) }

  useEffect(() => {
    const id = setInterval(() => {
      const next = (heroIdxRef.current + 1) % HERO_SLIDES.length
      heroIdxRef.current = next
      setHeroIdx(next)
    }, 5200)
    return () => clearInterval(id)
  }, [])

  const nav = (v: View) => { setView(v); setMobileOpen(false); setMoreOpen(false); try { document.getElementById('website-top')?.scrollIntoView({ behavior: 'smooth' }) } catch (_) {} }
  const setBF = (k: string, v: string) => setBooking(b => ({ ...b, [k]: v }))
  const toggleService = (label: string) => setBooking(b => ({ ...b, services: b.services.includes(label) ? b.services.filter(x => x !== label) : [...b.services, label] }))
  const toggleAdd = (name: string) => setAddedItems(prev => prev.includes(name) ? prev.filter(x => x !== name) : [...prev, name])

  const canProceed = () => {
    switch (step) {
      case 1: return !!booking.eventType
      case 2: return !!booking.date && +booking.guests > 0
      case 3: return booking.services.length > 0
      case 4: return booking.name.trim().length > 1 && /^\d{10}$/.test(booking.phone.trim()) && /\S+@\S+\.\S+/.test(booking.email.trim())
      default: return true
    }
  }
  const stepError = () => {
    switch (step) {
      case 1: return 'Please pick an event type.'
      case 2: return 'Add a date and a guest count to continue.'
      case 3: return 'Select at least one service.'
      case 4: return booking.name.trim().length <= 1 ? 'Please enter your name.' : !/^\d{10}$/.test(booking.phone.trim()) ? 'Enter a valid 10-digit phone number.' : 'Enter a valid email address.'
      default: return ''
    }
  }
  const nextStep = () => { if (canProceed()) { setStep(s => Math.min(5, s + 1)); setTriedNext(false) } else setTriedNext(true) }
  const prevStep = () => { if (step > 1) { setStep(s => s - 1); setTriedNext(false) } }
  const openBooking = () => { setShowBooking(true); setStep(1); setTriedNext(false); setBookingSubmitted(false) }

  const plans = (vegMode === 'Veg' ? VEG_PLANS : NONVEG_PLANS)
  const sections = vegMode === 'Veg' ? VEG_SECTIONS : NONVEG_SECTIONS
  const selectedObj = plans.find(p => p.name === selectedPlan)
  const galleryItems = galleryTab === 'All' ? GALLERY_DATA : GALLERY_DATA.filter(g => g.cat === galleryTab)
  const eventsPanel = EVENTS_DATA[eventsCategory] || EVENTS_DATA['Wedding']

  // ── nav links ──
  const navDefs: [View, string][] = [['home', 'Home'], ['menu', 'Menu'], ['services', 'Services'], ['events', 'Events'], ['gallery', 'Gallery'], ['testimonials', 'Reviews'], ['about', 'About'], ['contact', 'Contact']]

  const stepNames: Record<number, string> = { 1: 'Occasion', 2: 'Details', 3: 'Services', 4: 'Contact', 5: 'Review' }

  const s = (extra?: CSSProperties): CSSProperties => ({ ...DM, ...extra })

  return (
    <div id="website-top" style={{ ...DM, background: BG, color: INK, minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 20 }}>
      <style>{`
        @keyframes heroTxtIn { from { opacity:0; transform:translateX(48px) } to { opacity:1; transform:translateX(0) } }
        @keyframes heroImgIn { from { opacity:0; transform:translateX(56px) scale(1.04) } to { opacity:1; transform:translateX(0) scale(1) } }
        .hero-txt { animation: heroTxtIn 0.56s cubic-bezier(.22,1,.36,1) both; }
        .hero-img { animation: heroImgIn 0.62s cubic-bezier(.22,1,.36,1) both; }

        @keyframes marq     { from { transform: translateX(0)    } to { transform: translateX(-50%) } }
        @keyframes evtFwd   { from { transform: translateX(-50%) } to { transform: translateX(0)    } }
        @keyframes evtRev   { from { transform: translateX(0)    } to { transform: translateX(-50%) } }
        .w-marq        { animation: marq 26s linear infinite; }
        .evt-fwd       { animation: evtFwd 45s linear infinite; display:flex; width:max-content; gap:14px; }
        .evt-rev       { animation: evtRev 45s linear infinite; display:flex; width:max-content; gap:14px; }
        .evt-fwd:hover, .evt-rev:hover { animation-play-state: paused; }

        @keyframes goldDrop {
          0% { transform: translateY(-50px) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(750px) rotate(360deg); opacity: 0; }
        }
        .gold-drop-container {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 1;
        }
        .gold-drop {
          position: absolute;
          width: 5px;
          height: 12px;
          background: linear-gradient(180deg, #D4AF37 0%, #FFDF73 50%, #AA7C11 100%);
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          animation: goldDrop 12s linear infinite;
          filter: drop-shadow(0 0 4px rgba(212,175,55,0.6));
        }
        @keyframes goldSparkle {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.1; }
          50% { transform: translateY(-30px) scale(1.3); opacity: 0.4; }
        }
        .gold-sparkle {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #FFD700;
          box-shadow: 0 0 10px #FFD700, 0 0 20px #D4AF37;
          animation: goldSparkle 7s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .evt-ticker { animation: ticker 28s linear infinite; display:flex; width:max-content; gap:0; }
        .evt-ticker:hover { animation-play-state: paused; }
        .w-nav-btn:hover { background: #EFF6FF !important; }
        .w-card:hover { box-shadow: 0 8px 24px rgba(37,99,235,.1); transform: translateY(-2px); transition: all .2s; }
        @media (max-width:768px) {
          .w-hero-grid { grid-template-columns: 1fr !important; }
          .w-grid3 { grid-template-columns: 1fr !important; }
          .w-grid4 { grid-template-columns: 1fr 1fr !important; }
          .w-grid2 { grid-template-columns: 1fr !important; }
          .w-events-layout { grid-template-columns: 1fr !important; }
          .w-pkg-grid { grid-template-columns: 1fr !important; }
          .w-plan-grid { grid-template-columns: 1fr 1fr !important; }
          .w-cta-desktop { display: none !important; }
          .w-burger { display: flex !important; }
          .w-navlinks { display: none !important; }
        }
      `}</style>

      {/* ── HEADER ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(240,245,255,.95)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 24 }}>
          <button onClick={() => nav('home')} style={{ display: 'flex', alignItems: 'center', gap: 11, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <span style={{ width: 42, height: 42, borderRadius: 12, background: ACC, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', ...BG_FONT, fontWeight: 800, fontSize: 20, flexShrink: 0 }}>M</span>
            <span style={{ lineHeight: 1.05, textAlign: 'left' }}>
              <span style={{ display: 'block', ...BG_FONT, fontWeight: 800, fontSize: 17, letterSpacing: '-.02em', color: INK }}>Meenakshi Caterings</span>
              <span style={{ display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: ACC }}>N&N Events · KSR Decorations</span>
            </span>
          </button>

          <nav className="w-navlinks" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
            {onBackTo3D && (
              <button className="w-nav-btn" onClick={onBackTo3D} style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 750, fontSize: 15, color: '#C9A84C', padding: '8px 13px', borderRadius: 8, ...DM }}>✦ 3D Experience</button>
            )}
            {navDefs.slice(0, 4).map(([key, label]) => (
              <button key={key} className="w-nav-btn" onClick={() => nav(key)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 15, color: view === key ? ACC : INK, padding: '8px 13px', borderRadius: 8, ...DM }}>{label}</button>
            ))}
            <div style={{ position: 'relative' }}>
              <button onClick={() => setMoreOpen(x => !x)} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'none', border: `1px solid ${BORDER}`, borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 15, color: INK, padding: '8px 13px', ...DM }}>More ▾</button>
              {moreOpen && (
                <div style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, background: '#fff', border: `1px solid #DBEAFE`, borderRadius: 16, boxShadow: '0 8px 32px rgba(15,23,42,.12)', minWidth: 190, overflow: 'hidden', zIndex: 50 }}>
                  {navDefs.slice(4).map(([key, label]) => (
                    <button key={key} onClick={() => nav(key)} style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', borderBottom: '1px solid #EFF6FF', cursor: 'pointer', fontWeight: 600, fontSize: 15, color: view === key ? ACC : INK, padding: '13px 18px', ...DM }}>{label}</button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <button onClick={openBooking} className="w-cta-desktop" style={{ marginLeft: 6, display: 'inline-flex', alignItems: 'center', gap: 8, background: INK, color: '#fff', ...BG_FONT, fontWeight: 700, fontSize: 15, padding: '11px 20px', border: 'none', borderRadius: 999, cursor: 'pointer', flexShrink: 0 }}>Get a Quote</button>
          <button onClick={() => setMobileOpen(x => !x)} className="w-burger" style={{ display: 'none', background: 'none', border: `1px solid ${INK}`, borderRadius: 9, width: 42, height: 42, cursor: 'pointer', fontSize: 20, alignItems: 'center', justifyContent: 'center' }}>☰</button>
        </div>
        {mobileOpen && (
          <div style={{ borderTop: `1px solid ${BORDER}`, background: BG, padding: '10px 24px 18px' }}>
            {onBackTo3D && (
              <button onClick={onBackTo3D} style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', borderBottom: '1px solid #E0EAFF', cursor: 'pointer', fontWeight: 750, fontSize: 16, color: '#C9A84C', padding: '13px 4px', ...DM }}>✦ 3D Experience</button>
            )}
            {navDefs.map(([key, label]) => (
              <button key={key} onClick={() => nav(key)} style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', borderBottom: '1px solid #E0EAFF', cursor: 'pointer', fontWeight: 600, fontSize: 16, color: INK, padding: '13px 4px', ...DM }}>{label}</button>
            ))}
            <button onClick={openBooking} style={{ marginTop: 14, width: '100%', background: ACC, color: '#fff', ...BG_FONT, fontWeight: 700, fontSize: 16, padding: 13, border: 'none', borderRadius: 999, cursor: 'pointer' }}>Get a Quote</button>
          </div>
        )}
      </header>

      <main style={{ flex: 1 }}>

        {/* ── HOME ── */}
        {view === 'home' && (
          <div>
            {/* ── HERO SLIDER ── */}
            <section style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px 48px', overflow: 'hidden' }}>
              <div className="w-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: 48, alignItems: 'center' }}>

                {/* LEFT — dynamic slide image, key forces remount → animation replays */}
                <div key={`img-${heroIdx}`} className="hero-img" style={{ position: 'relative' }}>
                  <img
                    src={HERO_SLIDES[heroIdx].img}
                    alt={HERO_SLIDES[heroIdx].label}
                    style={{
                      width: '100%',
                      aspectRatio: '4/5',
                      borderRadius: 22,
                      objectFit: 'cover',
                      border: '1px solid #BFDBFE',
                      boxShadow: '0 24px 64px rgba(15,23,42,.13)',
                      display: 'block'
                    }}
                  />
                  {/* Floating badge */}
                  <div style={{
                    position: 'absolute', bottom: 22, right: -10,
                    background: HERO_SLIDES[heroIdx].accent, color: '#fff',
                    ...BG_FONT, fontWeight: 700, fontSize: 13,
                    padding: '10px 18px', borderRadius: 12,
                    transform: 'rotate(4deg)', boxShadow: '0 8px 24px rgba(0,0,0,.18)', zIndex: 2,
                  }}>
                    {HERO_SLIDES[heroIdx].tag}
                  </div>
                </div>

                {/* RIGHT — text content, key forces remount → animation replays */}
                <div key={`txt-${heroIdx}`} className="hero-txt">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#DBEAFE', color: '#1D4ED8', fontWeight: 700, fontSize: 13, padding: '7px 16px', borderRadius: 999, letterSpacing: '.04em' }}>
                    {HERO_SLIDES[heroIdx].badge}
                  </span>

                  <h1 style={{ ...BG_FONT, fontWeight: 800, fontSize: 'clamp(42px,5.5vw,80px)', lineHeight: .96, letterSpacing: '-.03em', margin: '22px 0 0', color: INK }}>
                    {HERO_SLIDES[heroIdx].line1}<br />
                    <span style={{ color: HERO_SLIDES[heroIdx].accent, fontStyle: 'italic' }}>{HERO_SLIDES[heroIdx].line2}</span>
                  </h1>

                  <p style={{ fontSize: 18, lineHeight: 1.6, color: '#334155', maxWidth: 520, margin: '22px 0 0' }}>
                    {HERO_SLIDES[heroIdx].desc}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 32 }}>
                    <button onClick={openBooking} style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: INK, color: '#fff', ...BG_FONT, fontWeight: 700, fontSize: 16, padding: '15px 28px', border: 'none', borderRadius: 999, cursor: 'pointer', boxShadow: '0 8px 24px rgba(15,23,42,.22)' }}>Plan my event →</button>
                    <button onClick={() => nav('menu')} style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: 'transparent', color: INK, ...BG_FONT, fontWeight: 700, fontSize: 16, padding: '15px 26px', border: `2px solid ${INK}`, borderRadius: 999, cursor: 'pointer' }}>View the menu</button>
                  </div>

                  <div style={{ display: 'flex', gap: 34, marginTop: 38 }}>
                    {[['1000+', 'events served'], ['150+', 'menu dishes'], ['5★', 'guest rating']].map(([n, l]) => (
                      <div key={l}>
                        <div style={{ ...BG_FONT, fontWeight: 800, fontSize: 32, color: INK }}>{n}</div>
                        <div style={{ fontSize: 12, color: '#5B76A8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em' }}>{l}</div>
                      </div>
                    ))}
                  </div>

                  {/* Slide dots */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 36 }}>
                    {HERO_SLIDES.map((_, i) => (
                      <button key={i} onClick={() => goSlide(i)} style={{
                        width: i === heroIdx ? 28 : 9, height: 9, borderRadius: 999,
                        background: i === heroIdx ? HERO_SLIDES[heroIdx].accent : '#CBD5E1',
                        border: 'none', cursor: 'pointer', padding: 0, transition: 'all .35s ease',
                      }} />
                    ))}
                  </div>
                </div>

              </div>
            </section>

            {/* Marquee */}
            <section style={{ background: INK, color: BG, padding: '18px 0', overflow: 'hidden', whiteSpace: 'nowrap', marginTop: 24 }}>
              <div className="w-marq" style={{ display: 'inline-flex' }}>
                {[...Array(2)].map((_, ri) =>
                  ['Weddings', 'Receptions', 'Veg & Non-Veg', 'Stage & Mandap', 'Live Counters', 'Event Planning', 'Floral Décor'].map((text, i) => (
                    <span key={`${ri}-${i}`} style={{ ...BG_FONT, fontWeight: 700, fontSize: 24, padding: '0 26px', color: i % 2 ? '#F59E0B' : BG }}>{text}  •</span>
                  ))
                )}
              </div>
            </section>

            {/* Services Preview */}
            <section style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 24px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', marginBottom: 34 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: '.16em', textTransform: 'uppercase', color: ACC }}>What we do</div>
                  <h2 style={{ ...BG_FONT, fontWeight: 800, fontSize: 'clamp(32px,4vw,48px)', letterSpacing: '-.02em', marginTop: 8 }}>One team. The whole celebration.</h2>
                </div>
                <button onClick={() => nav('services')} style={{ background: 'none', border: 'none', color: INK, fontWeight: 700, fontSize: 16, cursor: 'pointer', textDecoration: 'underline', textDecorationColor: ACC, textDecorationThickness: 2, textUnderlineOffset: 5, ...DM }}>All services →</button>
              </div>
              <div className="w-grid3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
                {SERVICES_ALL.slice(0, 3).map(s => (
                  <div key={s.title} className="w-card" style={{ background: '#fff', border: '1px solid #DBEAFE', borderRadius: 18, padding: 26 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 13, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>{s.icon}</div>
                    <h3 style={{ ...BG_FONT, fontWeight: 700, fontSize: 22, margin: '18px 0 8px' }}>{s.title}</h3>
                    <p style={{ fontSize: 15, lineHeight: 1.55, color: '#475569' }}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Process */}
            <section style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 24px' }}>
              <div style={{ background: INK, color: BG, borderRadius: 26, padding: 48 }}>
                <h2 style={{ ...BG_FONT, fontWeight: 800, fontSize: 'clamp(28px,3.4vw,40px)', letterSpacing: '-.02em' }}>Stress-free, in four steps.</h2>
                <div className="w-grid4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 26, marginTop: 34 }}>
                  {PROCESS_STEPS.map(p => (
                    <div key={p.n}>
                      <div style={{ ...BG_FONT, fontWeight: 800, fontSize: 46, color: ACC, lineHeight: 1 }}>{p.n}</div>
                      <h3 style={{ ...BG_FONT, fontWeight: 700, fontSize: 18, margin: '12px 0 7px' }}>{p.title}</h3>
                      <p style={{ fontSize: 14, lineHeight: 1.55, color: '#94A3B8' }}>{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Menu Teaser */}
            <section style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 24px 30px' }}>
              <div className="w-grid2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'stretch' }}>
                <div style={{ background: '#F59E0B', borderRadius: 22, padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 280 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: '.14em', textTransform: 'uppercase', color: '#1E3A8A' }}>The menu</div>
                    <h2 style={{ ...BG_FONT, fontWeight: 800, fontSize: 38, letterSpacing: '-.02em', marginTop: 10, color: INK }}>150+ dishes, freshly cooked on-site.</h2>
                    <p style={{ fontSize: 16, lineHeight: 1.55, color: '#1E3A8A', marginTop: 12, maxWidth: 420 }}>Authentic South Indian veg &amp; non-veg, live counters, sweets and savouries — planned around your function and guest count.</p>
                  </div>
                  <button onClick={() => nav('menu')} style={{ alignSelf: 'flex-start', marginTop: 24, background: INK, color: '#fff', ...BG_FONT, fontWeight: 700, fontSize: 16, padding: '13px 24px', border: 'none', borderRadius: 999, cursor: 'pointer' }}>Explore full menu →</button>
                </div>
                <div style={{ borderRadius: 22, overflow: 'hidden', border: '1px solid #BFDBFE', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 280 }}>
                  <img src="/images/sadhya_spread.png" alt="Banana leaf sadhya spread" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              </div>
            </section>

            {/* ── EVENT PORTFOLIO ── */}
            <section style={{ background: '#0A0A0A', padding: '80px 0 72px', overflow: 'hidden', position: 'relative' }}>
              {/* Golden drops in the background */}
              <div className="gold-drop-container">
                <div className="gold-drop" style={{ left: '5%', top: '-20px', animationDelay: '0s', animationDuration: '9s' }} />
                <div className="gold-drop" style={{ left: '12%', top: '-20px', animationDelay: '3s', animationDuration: '12s' }} />
                <div className="gold-drop" style={{ left: '20%', top: '-20px', animationDelay: '1.5s', animationDuration: '8s' }} />
                <div className="gold-drop" style={{ left: '28%', top: '-20px', animationDelay: '5s', animationDuration: '14s' }} />
                <div className="gold-drop" style={{ left: '35%', top: '-20px', animationDelay: '0.5s', animationDuration: '10s' }} />
                <div className="gold-drop" style={{ left: '42%', top: '-20px', animationDelay: '4s', animationDuration: '11s' }} />
                <div className="gold-drop" style={{ left: '50%', top: '-20px', animationDelay: '2s', animationDuration: '9s' }} />
                <div className="gold-drop" style={{ left: '58%', top: '-20px', animationDelay: '6s', animationDuration: '13s' }} />
                <div className="gold-drop" style={{ left: '68%', top: '-20px', animationDelay: '1s', animationDuration: '10s' }} />
                <div className="gold-drop" style={{ left: '75%', top: '-20px', animationDelay: '3.5s', animationDuration: '8s' }} />
                <div className="gold-drop" style={{ left: '82%', top: '-20px', animationDelay: '5.5s', animationDuration: '12s' }} />
                <div className="gold-drop" style={{ left: '90%', top: '-20px', animationDelay: '2.5s', animationDuration: '11s' }} />
                <div className="gold-drop" style={{ left: '95%', top: '-20px', animationDelay: '0s', animationDuration: '13s' }} />

                <div className="gold-sparkle" style={{ left: '15%', top: '25%', animationDelay: '0s' }} />
                <div className="gold-sparkle" style={{ left: '45%', top: '65%', animationDelay: '2s' }} />
                <div className="gold-sparkle" style={{ left: '75%', top: '15%', animationDelay: '4s' }} />
                <div className="gold-sparkle" style={{ left: '85%', top: '80%', animationDelay: '1s' }} />
                <div className="gold-sparkle" style={{ left: '30%', top: '40%', animationDelay: '3s' }} />
              </div>

              {/* Glowing golden light orbs for depth */}
              <div style={{ position: 'absolute', top: '10%', left: '5%', width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none', zIndex: 2 }} />
              <div style={{ position: 'absolute', bottom: '15%', right: '8%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none', zIndex: 2 }} />

              {/* Header */}
              <div style={{ textAlign: 'center', marginBottom: 56, padding: '0 24px', position: 'relative', zIndex: 5 }}>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, letterSpacing: 7, color: '#C9A84C', textTransform: 'uppercase', marginBottom: 20 }}>EVENT PORTFOLIO</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(64px, 10vw, 130px)', lineHeight: 1, letterSpacing: -2 }}>
                  <span style={{ color: 'rgba(232,213,163,0.22)', fontWeight: 300 }}>AROUND EVERY </span>
                  <span style={{ color: '#E8D5A3', fontStyle: 'italic', fontWeight: 700 }}>EVENT</span>
                </div>
              </div>

              {/* Row 1 — scrolls left → right */}
              <div style={{ overflow: 'hidden', marginBottom: 14, position: 'relative', zIndex: 5 }}>
                <div className="evt-fwd">
                  {[...EVENT_ROW1, ...EVENT_ROW1].map((c, i) => (
                    <div key={i} style={{ flexShrink: 0, width: 310, height: 220, borderRadius: 10, overflow: 'hidden', position: 'relative', cursor: 'pointer' }}>
                      <img src={c.img} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.75) saturate(1.15)', transition: 'transform .55s ease' }}
                        onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                        onMouseOut={e  => (e.currentTarget.style.transform = 'scale(1)')} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.08) 52%, transparent 100%)' }} />
                      <div style={{ position: 'absolute', bottom: 18, left: 20 }}>
                        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 27, fontWeight: 400, color: '#fff', lineHeight: 1, marginBottom: 6 }}>{c.name}</div>
                        <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 8, letterSpacing: 3, color: '#C9A84C', textTransform: 'uppercase' }}>{c.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 2 — scrolls right → left */}
              <div style={{ overflow: 'hidden', position: 'relative', zIndex: 5 }}>
                <div className="evt-rev">
                  {[...EVENT_ROW2, ...EVENT_ROW2].map((c, i) => (
                    <div key={i} style={{ flexShrink: 0, width: 310, height: 220, borderRadius: 10, overflow: 'hidden', position: 'relative', cursor: 'pointer' }}>
                      <img src={c.img} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.75) saturate(1.15)', transition: 'transform .55s ease' }}
                        onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                        onMouseOut={e  => (e.currentTarget.style.transform = 'scale(1)')} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.08) 52%, transparent 100%)' }} />
                      <div style={{ position: 'absolute', bottom: 18, left: 20 }}>
                        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 27, fontWeight: 400, color: '#fff', lineHeight: 1, marginBottom: 6 }}>{c.name}</div>
                        <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 8, letterSpacing: 3, color: '#C9A84C', textTransform: 'uppercase' }}>{c.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── PREMIER EVENT PLANNER ── */}
            <section style={{ background: '#F5F0E8', padding: '0 0 0' }}>

              {/* Split hero */}
              <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, minHeight: 520, alignItems: 'center', padding: '72px 56px 60px' }}>

                {/* Left — dynamic event planner image */}
                <div style={{ position: 'relative', paddingRight: 48 }}>
                  <img
                    src="/images/event_planner_hero.png"
                    alt="Premier Event Planner"
                    style={{
                      width: '100%',
                      aspectRatio: '4/3',
                      borderRadius: 20,
                      objectFit: 'cover',
                      border: '1px solid rgba(201,168,76,0.18)',
                      boxShadow: '0 24px 80px rgba(0,0,0,0.12)',
                      display: 'block'
                    }}
                  />
                </div>

                {/* Right — content */}
                <div style={{ paddingLeft: 24 }}>
                  {/* Badge */}
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    border: '1px solid #C9A84C', borderRadius: 999,
                    padding: '7px 18px', marginBottom: 32,
                  }}>
                    <span style={{ color: '#C9A84C', fontSize: 13 }}>✦</span>
                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, letterSpacing: 5, color: '#8B6914', textTransform: 'uppercase' }}>Luxury Event Experiences</span>
                  </div>

                  {/* Heading */}
                  <h2 style={{ margin: '0 0 24px', lineHeight: 1.05 }}>
                    <span style={{ display: 'block', fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 'clamp(44px,5.5vw,78px)', color: '#1A1208', letterSpacing: -1 }}>THE PREMIER</span>
                    <span style={{ display: 'block', fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontStyle: 'italic', fontSize: 'clamp(44px,5.5vw,78px)', color: '#C9A84C', letterSpacing: -1 }}>EVENT PLANNER</span>
                  </h2>

                  {/* Description */}
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, lineHeight: 1.7, color: '#4A3E2C', margin: '0 0 24px', maxWidth: 480 }}>
                    As luxury event planners, we specialise in discovering the finest venues and curating bespoke experiences for discerning private clients and prestigious brands.
                  </p>

                  {/* Blockquote */}
                  <blockquote style={{
                    margin: '0 0 36px', padding: '14px 22px',
                    borderLeft: '3px solid #C9A84C',
                    background: 'rgba(201,168,76,0.06)',
                    borderRadius: '0 8px 8px 0',
                  }}>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, lineHeight: 1.65, color: '#3A3020', margin: 0, fontStyle: 'italic' }}>
                      Redefining sophistication and elegance, we create bespoke events to elevate your experience to new heights. Our philosophy blends stylish design with flawless logistics.
                    </p>
                  </blockquote>

                  {/* CTA */}
                  <button
                    onClick={() => nav('contact')}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 12,
                      background: '#1A1208', color: '#fff',
                      fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 13,
                      letterSpacing: 3, textTransform: 'uppercase',
                      padding: '16px 34px', border: 'none', borderRadius: 999,
                      cursor: 'pointer', transition: 'background .25s, transform .2s',
                    }}
                    onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.background = '#C9A84C' }}
                    onMouseOut={e  => { (e.currentTarget as HTMLButtonElement).style.background = '#1A1208' }}
                  >
                    ENQUIRE NOW <span style={{ fontSize: 18 }}>→</span>
                  </button>

                  {/* Dot indicators */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 40 }}>
                    <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, #C9A84C)' }} />
                    {[0,1,2].map(i => (
                      <div key={i} style={{ width: i === 1 ? 10 : 7, height: i === 1 ? 10 : 7, borderRadius: '50%', background: i === 1 ? '#C9A84C' : 'rgba(201,168,76,0.35)' }} />
                    ))}
                    <div style={{ flex: 1, height: 1, background: 'linear-gradient(to left, transparent, #C9A84C)' }} />
                  </div>
                </div>
              </div>

              {/* ── TICKER STRIP ── */}
              <div style={{ background: '#1A1208', overflow: 'hidden', padding: '20px 0', borderTop: '1px solid rgba(201,168,76,0.2)' }}>
                <div className="evt-ticker">
                  {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '0 36px', borderRight: '1px solid rgba(201,168,76,0.18)', flexShrink: 0 }}>
                      <span style={{ fontSize: 22, color: '#C9A84C' }}>{item.icon}</span>
                      <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: 4, color: '#C9A84C', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Testimonials */}
            <section style={{ maxWidth: 1200, margin: '0 auto', padding: '52px 24px' }}>
              <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: '.16em', textTransform: 'uppercase', color: ACC }}>Happy clients</div>
              <h2 style={{ ...BG_FONT, fontWeight: 800, fontSize: 'clamp(32px,4vw,48px)', letterSpacing: '-.02em', margin: '8px 0 32px' }}>Loved on the big day.</h2>
              <div className="w-grid3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
                {TESTIMONIALS.slice(0, 3).map(t => (
                  <div key={t.name} className="w-card" style={{ background: '#fff', border: '1px solid #DBEAFE', borderRadius: 18, padding: 26 }}>
                    <div style={{ color: ACC, fontSize: 16, letterSpacing: 2 }}>★★★★★</div>
                    <p style={{ fontSize: 16, lineHeight: 1.6, color: '#1E293B', margin: '14px 0 20px' }}>"{t.quote}"</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ width: 42, height: 42, borderRadius: '50%', background: INK, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15 }}>{t.initials}</span>
                      <span><span style={{ display: 'block', fontWeight: 700, fontSize: 15 }}>{t.name}</span><span style={{ display: 'block', fontSize: 13, color: '#5B76A8' }}>{t.role}</span></span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA Band */}
            <section style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 24px 72px' }}>
              <div style={{ background: ACC, borderRadius: 26, padding: '56px 48px', textAlign: 'center', color: '#fff' }}>
                <h2 style={{ ...BG_FONT, fontWeight: 800, fontSize: 'clamp(32px,4.5vw,54px)', letterSpacing: '-.02em', lineHeight: 1 }}>Let's plan something delicious.</h2>
                <p style={{ fontSize: 18, opacity: .92, margin: '16px auto 28px', maxWidth: 520 }}>Tell us your date and guest count — we'll send a custom menu &amp; décor quote.</p>
                <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button onClick={openBooking} style={{ background: INK, color: '#fff', ...BG_FONT, fontWeight: 700, fontSize: 17, padding: '16px 32px', border: 'none', borderRadius: 999, cursor: 'pointer' }}>Get my free quote</button>
                  <a href="https://wa.me/918978268489" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#fff', color: INK, ...BG_FONT, fontWeight: 700, fontSize: 17, padding: '16px 30px', borderRadius: 999, textDecoration: 'none' }}>WhatsApp us</a>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ── MENU ── */}
        {view === 'menu' && (
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 24px 80px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: '.16em', textTransform: 'uppercase', color: ACC }}>The menu</div>
              <h1 style={{ ...BG_FONT, fontWeight: 800, fontSize: 'clamp(38px,5vw,62px)', letterSpacing: '-.03em', margin: '8px 0 6px' }}>Build your feast.</h1>
              <p style={{ fontSize: 17, color: '#475569', maxWidth: 620, margin: '0 auto' }}>Pick a plan, then add dishes from the stations below — they drop straight into your selected menu.</p>
            </div>

            {/* Veg/Non-Veg toggle */}
            <div style={{ display: 'flex', justifyContent: 'center', margin: '30px 0 36px' }}>
              <div style={{ display: 'inline-flex', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 999, padding: 6, gap: 4, boxShadow: '0 4px 14px rgba(0,0,0,.05)' }}>
                {[{ label: 'Vegetarian', key: 'Veg' as const, dot: '#2FA84A' }, { label: 'Non-Vegetarian', key: 'Non-Veg' as const, dot: ACC }].map(t => {
                  const on = vegMode === t.key
                  return (
                    <button key={t.key} onClick={() => { setVegMode(t.key); setAddedItems([]) }} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, ...BG_FONT, fontWeight: 700, fontSize: 16, padding: '11px 26px', borderRadius: 999, border: 'none', cursor: 'pointer', background: on ? INK : 'transparent', color: on ? '#fff' : '#475569' }}>
                      <span style={{ width: 14, height: 14, border: `2px solid ${on ? '#fff' : t.dot}`, borderRadius: 3, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: on ? '#fff' : t.dot }} />
                      </span>
                      {t.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Plans */}
            <div className="w-plan-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18, alignItems: 'start' }}>
              {plans.map(p => {
                const th = PLAN_THEME[p.name]
                const chosen = selectedPlan === p.name
                return (
                  <div key={p.name} style={{ position: 'relative', borderRadius: 20, overflow: 'visible', border: `3px solid ${chosen ? '#fff' : 'transparent'}`, boxShadow: chosen ? `0 0 0 3px ${th.headerBg}, 0 8px 28px rgba(0,0,0,.18)` : '0 6px 20px rgba(0,0,0,.08)' }}>
                    {/* Badge */}
                    {th.badge && (
                      <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', ...BG_FONT, fontWeight: 800, fontSize: 11, padding: '5px 14px', borderRadius: 999, whiteSpace: 'nowrap', letterSpacing: '.06em', zIndex: 2 }}>
                        ⭐ {th.badge}
                      </div>
                    )}
                    {/* Header */}
                    <div style={{ background: th.headerBg, borderRadius: '17px 17px 0 0', padding: '28px 22px 20px', textAlign: 'center' }}>
                      <div style={{ width: 62, height: 62, borderRadius: '50%', background: 'rgba(255,255,255,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto' }}>{th.icon}</div>
                      <h3 style={{ ...BG_FONT, fontWeight: 900, fontSize: p.name === 'KALKI 2898 AD' ? 18 : 22, marginTop: 12, color: th.titleColor, letterSpacing: '-.01em' }}>{p.name}</h3>
                    </div>
                    {/* Items */}
                    <div style={{ background: '#fff', padding: '14px 22px 16px', borderRadius: '0 0 17px 17px' }}>
                      {p.items.map(it => (
                        <div key={it} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, padding: '5px 0', borderBottom: '1px solid #f0f4ff' }}>
                          <span style={{ color: th.headerBg, fontWeight: 900, fontSize: 14, marginTop: 1, flexShrink: 0 }}>✓</span>
                          <span style={{ fontSize: 13.5, color: INK, fontWeight: 500 }}>{it}</span>
                        </div>
                      ))}
                      <button onClick={() => setSelectedPlan(p.name)} style={{ marginTop: 16, width: '100%', background: chosen ? th.headerBg : INK, color: chosen ? th.titleColor : '#fff', ...BG_FONT, fontWeight: 700, fontSize: 15, padding: 13, border: 'none', borderRadius: 12, cursor: 'pointer', transition: 'all .2s' }}>
                        {chosen ? `✓ ${p.name} Selected` : 'Choose Plan'}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Selected plan summary */}
            {selectedObj ? (
              <>
                <div style={{ marginTop: 44, background: INK, borderRadius: 22, padding: '28px 30px', color: '#fff' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: '#F59E0B' }}>Your selected menu</div>
                      <h2 style={{ ...BG_FONT, fontWeight: 800, fontSize: 30, marginTop: 4 }}>{selectedObj.name} · {vegMode}</h2>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ ...BG_FONT, fontWeight: 800, fontSize: 30, color: ACC }}>{selectedObj.items.length + addedItems.length}</div>
                      <div style={{ fontSize: 12, color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em' }}>total items</div>
                    </div>
                  </div>

                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#5B76A8', margin: '20px 0 10px' }}>Included in plan</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {selectedObj.items.map(b => (
                      <span key={b} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#172554', borderRadius: 999, padding: '7px 14px', fontSize: 13.5, fontWeight: 600 }}><span style={{ color: '#2FA84A' }}>✓</span>{b}</span>
                    ))}
                  </div>

                  {addedItems.length > 0 && (
                    <>
                      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#F59E0B', margin: '20px 0 10px' }}>Your add-ons</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {addedItems.map(a => (
                          <span key={a} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: ACC, borderRadius: 999, padding: '7px 10px 7px 14px', fontSize: 13.5, fontWeight: 700 }}>
                            {a}
                            <button onClick={() => toggleAdd(a)} style={{ background: 'rgba(0,0,0,.25)', border: 'none', color: '#fff', width: 20, height: 20, borderRadius: '50%', cursor: 'pointer', fontSize: 12, lineHeight: 1 }}>×</button>
                          </span>
                        ))}
                      </div>
                    </>
                  )}

                  <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <button onClick={openBooking} style={{ background: ACC, color: '#fff', ...BG_FONT, fontWeight: 700, fontSize: 15, padding: '13px 26px', border: 'none', borderRadius: 999, cursor: 'pointer' }}>Request a quote for this menu →</button>
                    <button onClick={() => { setSelectedPlan(''); setAddedItems([]) }} style={{ background: 'transparent', color: '#A0B4D8', border: '2px solid #172554', ...BG_FONT, fontWeight: 700, fontSize: 15, padding: '13px 24px', borderRadius: 999, cursor: 'pointer' }}>Change plan</button>
                  </div>
                </div>

                <h2 style={{ ...BG_FONT, fontWeight: 800, fontSize: 'clamp(26px,3vw,38px)', letterSpacing: '-.02em', margin: '44px 0 8px' }}>Add more to your {selectedObj.name} menu</h2>
                <p style={{ fontSize: 15, color: '#475569', marginBottom: 24 }}>Tap <strong>Add</strong> on any dish to include it in your selected menu above.</p>
                <div className="w-grid2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  {sections.map(sec => (
                    <div key={sec.title} style={{ background: '#fff', border: '1px solid #DBEAFE', borderRadius: 18, padding: '24px 26px', boxShadow: '0 4px 14px rgba(0,0,0,.04)' }}>
                      <h3 style={{ ...BG_FONT, fontWeight: 800, fontSize: 21, color: '#1D4ED8', marginBottom: 14 }}>{sec.title}</h3>
                      {sec.items.map(it => {
                        const on = addedItems.includes(it)
                        return (
                          <div key={it} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '9px 0', borderBottom: '1px solid #EFF6FF' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: '#1E293B' }}><span style={{ color: '#60A5FA', fontSize: 13 }}>🍴</span>{it}</span>
                            <button onClick={() => toggleAdd(it)} style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: 5, background: on ? ACC : '#EFF6FF', color: on ? '#fff' : ACC, border: `1.5px solid ${on ? ACC : '#BFDBFE'}`, fontWeight: 700, fontSize: 13, padding: '6px 14px', borderRadius: 999, cursor: 'pointer', ...DM }}>
                              {on ? '✓ Added' : '+ Add'}
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div style={{ marginTop: 36, textAlign: 'center', background: '#EFF6FF', border: '1px dashed #93C5FD', borderRadius: 16, padding: 26 }}>
                <div style={{ fontSize: 16, color: '#1E40AF', fontWeight: 600 }}>↑ Choose a plan above to start adding dishes from our stations.</div>
              </div>
            )}
          </div>
        )}

        {/* ── SERVICES ── */}
        {view === 'services' && (
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 24px 80px' }}>
            <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: '.16em', textTransform: 'uppercase', color: ACC }}>Services</div>
            <h1 style={{ ...BG_FONT, fontWeight: 800, fontSize: 'clamp(38px,5vw,62px)', letterSpacing: '-.03em', margin: '8px 0 28px' }}>Everything your day needs.</h1>
            <div className="w-grid3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
              {SERVICES_ALL.map(s => (
                <div key={s.title} className="w-card" style={{ background: '#fff', border: '1px solid #DBEAFE', borderRadius: 18, padding: 28 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 13, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>{s.icon}</div>
                  <h3 style={{ ...BG_FONT, fontWeight: 700, fontSize: 21, margin: '18px 0 8px' }}>{s.title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.55, color: '#475569' }}>{s.desc}</p>
                </div>
              ))}
            </div>

            <h2 style={{ ...BG_FONT, fontWeight: 800, fontSize: 'clamp(28px,3.4vw,42px)', letterSpacing: '-.02em', margin: '56px 0 24px' }}>Popular packages</h2>
            <div className="w-pkg-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
              {PACKAGES.map(p => (
                <div key={p.name} style={{ background: p.cardBg, color: p.cardFg, border: `2px solid ${p.border}`, borderRadius: 20, padding: 30, position: 'relative' }}>
                  {p.featured && <span style={{ position: 'absolute', top: -12, right: 22, background: INK, color: '#f0c040', ...BG_FONT, fontWeight: 800, fontSize: 12, padding: '5px 12px', borderRadius: 999, letterSpacing: '.04em' }}>⭐ MOST CHOSEN</span>}
                  <div style={{ ...BG_FONT, fontWeight: 800, fontSize: 24 }}>{p.name}</div>
                  <div style={{ fontSize: 14, opacity: .8, margin: '4px 0 18px' }}>{p.tagline}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 22 }}>
                    {p.inclusions.map(inc => (
                      <div key={inc} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: 14, lineHeight: 1.4 }}><span style={{ color: ACC, fontWeight: 800 }}>✓</span>{inc}</div>
                    ))}
                  </div>
                  <button onClick={openBooking} style={{ width: '100%', background: p.btnBg, color: p.btnFg, ...BG_FONT, fontWeight: 700, fontSize: 15, padding: 13, border: 'none', borderRadius: 999, cursor: 'pointer' }}>Request quote</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── EVENTS ── */}
        {view === 'events' && (
          <div>
            <div style={{ textAlign: 'center', padding: '60px 24px 44px', background: '#EFF6FF', borderBottom: '1px solid #DBEAFE' }}>
              <h1 style={{ ...BG_FONT, fontWeight: 800, fontSize: 'clamp(34px,5vw,56px)', letterSpacing: '-.03em', color: INK, fontStyle: 'italic' }}>All Our Event Services</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center', marginTop: 14 }}>
                <div style={{ height: 1.5, width: 80, background: '#F59E0B' }} />
                <span style={{ fontWeight: 700, fontSize: 11, letterSpacing: '.26em', textTransform: 'uppercase', color: '#F59E0B' }}>Excellence in Planning</span>
                <div style={{ height: 1.5, width: 80, background: '#F59E0B' }} />
              </div>
            </div>
            <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: 600 }} className="w-events-layout">
              <div style={{ padding: '28px 0', borderRight: '1px solid #DBEAFE', background: '#F8FBFF' }}>
                {ALL_CATS.map(cat => {
                  const on = eventsCategory === cat
                  return <button key={cat} onClick={() => setEventsCategory(cat)} style={{ display: 'flex', alignItems: 'center', width: '100%', textAlign: 'left', background: 'none', border: 'none', borderLeft: `4px solid ${on ? ACC : 'transparent'}`, cursor: 'pointer', ...DM, fontWeight: on ? 700 : 500, fontSize: 16, color: on ? ACC : '#475569', padding: '13px 24px' }}>{cat}</button>
                })}
              </div>
              <div style={{ padding: '38px 48px', background: '#fff' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', color: ACC, marginBottom: 12 }}>Featured Category</div>
                <h2 style={{ ...BG_FONT, fontWeight: 800, fontSize: 32, letterSpacing: '-.02em', color: INK, paddingBottom: 16, borderBottom: '1px solid #DBEAFE', marginBottom: 26 }}>{eventsPanel.title}</h2>
                <div className="w-grid3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginBottom: 30 }}>
                  {eventsPanel.cards.map(card => (
                    <div key={card.title}>
                      <div style={{ aspectRatio: '4/5', borderRadius: 10, background: 'repeating-linear-gradient(135deg,#DBEAFE,#DBEAFE 11px,#BFDBFE 11px,#BFDBFE 22px)', border: '1px solid #93C5FD', marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>{card.icon}</div>
                      <h4 style={{ ...BG_FONT, fontWeight: 700, fontSize: 17, color: INK, marginBottom: 6 }}>{card.title}</h4>
                      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', color: '#5B76A8', textTransform: 'uppercase', lineHeight: 1.6 }}>{card.tags}</p>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', paddingTop: 18, borderTop: '1px solid #EFF6FF' }}>
                  <p style={{ fontSize: 15, lineHeight: 1.65, color: '#475569', maxWidth: 500 }}>{eventsPanel.desc}</p>
                  <button onClick={openBooking} style={{ flexShrink: 0, background: INK, color: '#fff', ...BG_FONT, fontWeight: 700, fontSize: 13, padding: '14px 30px', border: 'none', borderRadius: 6, cursor: 'pointer', letterSpacing: '.1em', textTransform: 'uppercase' }}>Enquire Now</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── GALLERY ── */}
        {view === 'gallery' && (
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 24px 80px' }}>
            <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: '.16em', textTransform: 'uppercase', color: ACC }}>Gallery</div>
            <h1 style={{ ...BG_FONT, fontWeight: 800, fontSize: 'clamp(38px,5vw,62px)', letterSpacing: '-.03em', margin: '8px 0 24px' }}>Feasts &amp; settings we've created.</h1>
            <div style={{ display: 'flex', gap: 10, marginBottom: 28, flexWrap: 'wrap' }}>
              {['All', 'Weddings', 'Décor & Stage', 'Food & Counters', 'Receptions'].map(tab => (
                <button key={tab} onClick={() => setGalleryTab(tab)} style={{ fontWeight: 700, fontSize: 14, padding: '9px 18px', borderRadius: 999, cursor: 'pointer', border: `1.5px solid ${INK}`, background: galleryTab === tab ? INK : 'transparent', color: galleryTab === tab ? '#fff' : INK, ...DM }}>
                  {tab}
                </button>
              ))}
            </div>
            <div className="w-grid3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
              {galleryItems.map((g, i) => (
                <div key={i} style={{ aspectRatio: '1', borderRadius: 16, overflow: 'hidden', background: 'repeating-linear-gradient(135deg,#DBEAFE,#DBEAFE 10px,#BFDBFE 10px,#BFDBFE 20px)', border: '1px solid #BFDBFE', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <span style={{ fontSize: 24 }}>{g.icon}</span>
                  <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#6B87B8', letterSpacing: '.05em', textTransform: 'uppercase', textAlign: 'center', padding: '0 10px' }}>{g.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TESTIMONIALS ── */}
        {view === 'testimonials' && (
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 24px 80px' }}>
            <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: '.16em', textTransform: 'uppercase', color: ACC }}>Testimonials</div>
            <h1 style={{ ...BG_FONT, fontWeight: 800, fontSize: 'clamp(38px,5vw,62px)', letterSpacing: '-.03em', margin: '8px 0 32px' }}>Words from our clients.</h1>
            <div style={{ columns: 2, columnGap: 20 }}>
              {TESTIMONIALS.map(t => (
                <div key={t.name} style={{ breakInside: 'avoid', background: '#fff', border: '1px solid #DBEAFE', borderRadius: 18, padding: 26, marginBottom: 20 }}>
                  <div style={{ color: ACC, fontSize: 16, letterSpacing: 2 }}>★★★★★</div>
                  <p style={{ fontSize: 16, lineHeight: 1.6, color: '#1E293B', margin: '14px 0 20px' }}>"{t.quote}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ width: 44, height: 44, borderRadius: '50%', background: INK, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15 }}>{t.initials}</span>
                    <span><span style={{ display: 'block', fontWeight: 700, fontSize: 15 }}>{t.name}</span><span style={{ display: 'block', fontSize: 13, color: '#5B76A8' }}>{t.role}</span></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ABOUT ── */}
        {view === 'about' && (
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 24px 80px' }}>
            <div className="w-grid2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: '.16em', textTransform: 'uppercase', color: ACC }}>About us</div>
                <h1 style={{ ...BG_FONT, fontWeight: 800, fontSize: 'clamp(36px,4.6vw,56px)', letterSpacing: '-.03em', margin: '8px 0 18px' }}>Taste, hygiene &amp; heart — at every function.</h1>
                <p style={{ fontSize: 17, lineHeight: 1.6, color: '#334155', marginBottom: 16 }}>Meenakshi Caterings, together with N&amp;N Events &amp; KSR Decorations, is a complete catering and event solution for weddings, receptions, housewarmings and corporate functions.</p>
                <p style={{ fontSize: 17, lineHeight: 1.6, color: '#334155' }}>Every dish is freshly cooked with quality ingredients, menus are planned around your event and guest needs, and we follow clean preparation and safe serving standards — with timely setup and smooth service, every time.</p>
                <div style={{ display: 'flex', gap: 30, marginTop: 30 }}>
                  <div><div style={{ ...BG_FONT, fontWeight: 800, fontSize: 34 }}>100%</div><div style={{ fontSize: 13, color: '#5B76A8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em' }}>fresh, on-site</div></div>
                  <div><div style={{ ...BG_FONT, fontWeight: 800, fontSize: 34 }}>Veg &amp; Non-Veg</div><div style={{ fontSize: 13, color: '#5B76A8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em' }}>full kitchen</div></div>
                </div>
              </div>
              <div style={{ aspectRatio: '4/5', borderRadius: 20, overflow: 'hidden', border: '1px solid #BFDBFE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="/images/team_kitchen.png" alt="Team and kitchen" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>
            <div className="w-grid3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginTop: 48 }}>
              {VALUES.map(v => (
                <div key={v.title} style={{ background: '#fff', border: '1px solid #DBEAFE', borderRadius: 18, padding: 26 }}>
                  <div style={{ fontSize: 28 }}>{v.icon}</div>
                  <h3 style={{ ...BG_FONT, fontWeight: 700, fontSize: 19, margin: '12px 0 7px' }}>{v.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.55, color: '#475569' }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── CONTACT ── */}
        {view === 'contact' && (
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 24px 80px' }}>
            <div className="w-grid2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: '.16em', textTransform: 'uppercase', color: ACC }}>Contact</div>
                <h1 style={{ ...BG_FONT, fontWeight: 800, fontSize: 'clamp(36px,4.6vw,56px)', letterSpacing: '-.03em', margin: '8px 0 22px' }}>Let's talk about your event.</h1>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <a href="tel:8978268489" style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none', color: INK }}>
                    <span style={{ width: 46, height: 46, borderRadius: 12, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>📞</span>
                    <span><span style={{ display: 'block', fontSize: 13, color: '#5B76A8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em' }}>Call us</span><span style={{ display: 'block', ...BG_FONT, fontWeight: 700, fontSize: 19 }}>8978 268 489</span></span>
                  </a>
                  <a href="https://wa.me/918978268489" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none', color: INK }}>
                    <span style={{ width: 46, height: 46, borderRadius: 12, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>💬</span>
                    <span><span style={{ display: 'block', fontSize: 13, color: '#5B76A8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em' }}>WhatsApp</span><span style={{ display: 'block', ...BG_FONT, fontWeight: 700, fontSize: 19 }}>Message us anytime</span></span>
                  </a>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <span style={{ width: 46, height: 46, borderRadius: 12, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>📍</span>
                    <span><span style={{ display: 'block', fontSize: 13, color: '#5B76A8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em' }}>Address</span><span style={{ display: 'block', ...BG_FONT, fontWeight: 700, fontSize: 19 }}>[ Add your address ]</span></span>
                  </div>
                </div>
                <div style={{ marginTop: 24, aspectRatio: '16/9', borderRadius: 16, background: 'repeating-linear-gradient(135deg,#DBEAFE,#DBEAFE 10px,#BFDBFE 10px,#BFDBFE 20px)', border: '1px solid #BFDBFE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#6B87B8', letterSpacing: '.05em', textTransform: 'uppercase' }}>map embed</span>
                </div>
              </div>
              <div style={{ background: '#fff', border: '1px solid #DBEAFE', borderRadius: 20, padding: 30 }}>
                {contactSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '40px 10px' }}>
                    <div style={{ width: 64, height: 64, borderRadius: '50%', background: ACC, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto' }}>✓</div>
                    <h3 style={{ ...BG_FONT, fontWeight: 800, fontSize: 24, margin: '18px 0 8px' }}>Message sent!</h3>
                    <p style={{ fontSize: 15, color: '#475569' }}>We'll get back to you shortly. For anything urgent, WhatsApp us.</p>
                  </div>
                ) : (
                  <>
                    <h3 style={{ ...BG_FONT, fontWeight: 800, fontSize: 22, marginBottom: 18 }}>Send an enquiry</h3>
                    {(['name', 'phone', 'message'] as const).map(field => (
                      <div key={field}>
                        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 6 }}>{field === 'name' ? 'Your name' : field === 'phone' ? 'Phone' : 'Message'}</label>
                        {field === 'message' ? (
                          <textarea value={contact[field]} onChange={e => setContact(c => ({ ...c, message: e.target.value }))} placeholder="Tell us about your event..." rows={4} style={{ width: '100%', padding: '13px 14px', border: '1.5px solid #BFDBFE', borderRadius: 11, fontSize: 15, background: BG, marginBottom: 8, resize: 'vertical', ...DM }} />
                        ) : (
                          <input value={contact[field]} onChange={e => setContact(c => ({ ...c, [field]: e.target.value }))} placeholder={field === 'name' ? 'e.g. Priya' : '10-digit mobile'} style={{ width: '100%', padding: '13px 14px', border: '1.5px solid #BFDBFE', borderRadius: 11, fontSize: 15, background: '#fff', marginBottom: 16, ...DM }} />
                        )}
                      </div>
                    ))}
                    {contactTried && !(contact.name.trim().length > 1 && /^\d{10}$/.test(contact.phone.trim())) && (
                      <div style={{ color: '#D6321A', fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Please add your name and a valid 10-digit phone.</div>
                    )}
                    <button onClick={() => {
                      if (contact.name.trim().length > 1 && /^\d{10}$/.test(contact.phone.trim())) setContactSubmitted(true)
                      else setContactTried(true)
                    }} style={{ width: '100%', background: ACC, color: '#fff', ...BG_FONT, fontWeight: 700, fontSize: 16, padding: 14, border: 'none', borderRadius: 999, cursor: 'pointer', marginTop: 8 }}>Send enquiry</button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ background: INK, color: '#A0B4D8', padding: '56px 24px 30px' }}>
        <div className="w-grid3" style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: 40 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 14 }}>
              <span style={{ width: 42, height: 42, borderRadius: 12, background: ACC, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', ...BG_FONT, fontWeight: 800, fontSize: 20 }}>M</span>
              <span style={{ ...BG_FONT, fontWeight: 800, fontSize: 18, color: '#fff' }}>Meenakshi Caterings</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.6, maxWidth: 340 }}>Catering, décor &amp; full event planning for weddings and private celebrations. Fresh food, beautiful settings, on-time service.</p>
          </div>
          <div>
            <div style={{ ...BG_FONT, fontWeight: 700, fontSize: 15, color: '#fff', marginBottom: 14 }}>Quick links</div>
            {navDefs.map(([key, label]) => (
              <button key={key} onClick={() => nav(key)} style={{ display: 'block', background: 'none', border: 'none', color: '#A0B4D8', fontSize: 14, padding: '6px 0', cursor: 'pointer', textAlign: 'left', ...DM }}>{label}</button>
            ))}
          </div>
          <div>
            <div style={{ ...BG_FONT, fontWeight: 700, fontSize: 15, color: '#fff', marginBottom: 14 }}>Reach us</div>
            <a href="tel:8978268489" style={{ display: 'block', color: '#A0B4D8', fontSize: 14, padding: '6px 0', textDecoration: 'none' }}>📞 8978 268 489</a>
            <a href="https://wa.me/918978268489" target="_blank" rel="noreferrer" style={{ display: 'block', color: '#A0B4D8', fontSize: 14, padding: '6px 0', textDecoration: 'none' }}>💬 WhatsApp</a>
            <button onClick={openBooking} style={{ marginTop: 12, background: ACC, color: '#fff', ...BG_FONT, fontWeight: 700, fontSize: 14, padding: '11px 20px', border: 'none', borderRadius: 999, cursor: 'pointer' }}>Get a Quote</button>
          </div>
        </div>
        <div style={{ maxWidth: 1200, margin: '36px auto 0', paddingTop: 20, borderTop: '1px solid #172554', fontSize: 13, color: '#5B76A8' }}>
          © {new Date().getFullYear()} Meenakshi Caterings · N&amp;N Events · KSR Decorations. All rights reserved.
        </div>
      </footer>

      {/* ── QUOTE FULL PAGE ── */}
      {showBooking && <QuotePage onBack={() => setShowBooking(false)} />}
    </div>
  )
}

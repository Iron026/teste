import type { Product } from './data'

/**
 * Ilustrações vetoriais dos produtos (autorais).
 * Em uma loja real, seriam substituídas pelas fotos dos produtos.
 */
export function ProductArt({ product, className }: { product: Product; className?: string }) {
  const { kind, main, accent, bg } = product.art
  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className={className}>
      <rect width="400" height="400" fill={bg} />
      <circle cx="200" cy="205" r="140" fill="#fff" opacity="0.55" />
      <ellipse cx="200" cy="335" rx="120" ry="12" fill="#0f172a" opacity="0.08" />
      {kind === 'shoe' && <Shoe main={main} accent={accent} />}
      {kind === 'cleat' && <Shoe main={main} accent={accent} cleats />}
      {kind === 'shirt' && <Shirt main={main} accent={accent} />}
      {kind === 'shorts' && <Shorts main={main} accent={accent} />}
      {kind === 'leggings' && <Leggings main={main} accent={accent} />}
      {kind === 'soccerball' && <SoccerBall main={main} accent={accent} />}
      {kind === 'basketball' && <Basketball main={main} accent={accent} />}
      {kind === 'volleyball' && <Volleyball main={main} accent={accent} />}
      {kind === 'backpack' && <Backpack main={main} accent={accent} />}
      {kind === 'bottle' && <Bottle main={main} accent={accent} />}
    </svg>
  )
}

type C = { main: string; accent: string }

function Shoe({ main, accent, cleats = false }: C & { cleats?: boolean }) {
  return (
    <g transform="translate(0 10)">
      {/* solado */}
      <path d="M60 268 Q60 300 100 302 L330 302 Q356 300 352 276 L60 268 Z" fill={cleats ? '#e5e7eb' : '#f8fafc'} />
      <path d="M62 280 L350 286" stroke="#cbd5e1" strokeWidth="3" />
      {cleats &&
        [90, 130, 170, 250, 290, 325].map((x) => <rect key={x} x={x - 7} y="300" width="14" height="14" rx="3" fill="#6b7280" />)}
      {/* cabedal */}
      <path
        d="M66 268 Q58 228 92 214 L150 196 Q176 150 214 140 Q232 136 240 150 L262 196 Q300 210 340 232 Q360 246 352 272 Z"
        fill={main}
      />
      {/* faixa */}
      <path d="M150 262 Q190 200 262 196 L280 206 Q210 214 176 266 Z" fill={accent} />
      {/* gola */}
      <path d="M214 140 Q232 136 240 150 L250 172 Q226 160 206 166 Z" fill="#0f172a" opacity="0.35" />
      {/* cadarços */}
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={170 + i * 16} y1={196 - i * 10} x2={196 + i * 16} y2={204 - i * 8} stroke="#fff" strokeWidth="5" strokeLinecap="round" />
      ))}
      <path d="M300 230 Q330 236 346 258" stroke="#fff" strokeWidth="4" opacity="0.4" fill="none" />
    </g>
  )
}

function Shirt({ main, accent }: C) {
  return (
    <g>
      <path d="M140 92 L110 104 L56 150 L90 196 L120 176 L120 320 L280 320 L280 176 L310 196 L344 150 L290 104 L260 92 Q200 130 140 92 Z" fill={main} />
      <path d="M140 92 Q200 130 260 92 L248 88 Q200 116 152 88 Z" fill="#0f172a" opacity="0.25" />
      <path d="M120 230 L280 210 L280 226 L120 246 Z" fill={accent} opacity="0.85" />
      <path d="M90 196 L120 176 L120 186 L96 204 Z" fill={accent} opacity="0.85" />
      <path d="M310 196 L280 176 L280 186 L304 204 Z" fill={accent} opacity="0.85" />
    </g>
  )
}

function Shorts({ main, accent }: C) {
  return (
    <g>
      <rect x="112" y="96" width="176" height="30" rx="8" fill={accent} />
      <path d="M112 122 L288 122 L312 296 L218 306 L200 188 L182 306 L88 296 Z" fill={main} />
      <path d="M100 286 L182 294" stroke={accent} strokeWidth="6" />
      <path d="M218 294 L300 286" stroke={accent} strokeWidth="6" />
      <path d="M190 126 L196 150 M210 126 L204 150" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
    </g>
  )
}

function Leggings({ main, accent }: C) {
  return (
    <g>
      <rect x="128" y="64" width="144" height="34" rx="10" fill={accent} />
      <path d="M128 94 L272 94 L262 344 L222 344 L204 170 L196 170 L178 344 L138 344 Z" fill={main} />
      <path d="M140 140 L152 330 M260 140 L248 330" stroke={accent} strokeWidth="5" opacity="0.7" />
    </g>
  )
}

function SoccerBall({ main, accent }: C) {
  const pent = (cx: number, cy: number, r: number, rot = 0) =>
    Array.from({ length: 5 })
      .map((_, i) => {
        const a = ((Math.PI * 2) / 5) * i - Math.PI / 2 + rot
        return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`
      })
      .join(' ')
  return (
    <g>
      <circle cx="200" cy="200" r="120" fill={main} stroke="#d1d5db" strokeWidth="3" />
      <polygon points={pent(200, 200, 38)} fill={accent} />
      {[0, 1, 2, 3, 4].map((i) => {
        const a = ((Math.PI * 2) / 5) * i - Math.PI / 2
        return <polygon key={i} points={pent(200 + 92 * Math.cos(a), 200 + 92 * Math.sin(a), 30, Math.PI)} fill={accent} />
      })}
      {[0, 1, 2, 3, 4].map((i) => {
        const a = ((Math.PI * 2) / 5) * i - Math.PI / 2
        return <line key={i} x1={200 + 38 * Math.cos(a)} y1={200 + 38 * Math.sin(a)} x2={200 + 66 * Math.cos(a)} y2={200 + 66 * Math.sin(a)} stroke={accent} strokeWidth="4" />
      })}
      <circle cx="160" cy="150" r="30" fill="#fff" opacity="0.35" />
    </g>
  )
}

function Basketball({ main, accent }: C) {
  return (
    <g>
      <circle cx="200" cy="200" r="120" fill={main} />
      <g stroke={accent} strokeWidth="5" fill="none">
        <line x1="80" y1="200" x2="320" y2="200" />
        <line x1="200" y1="80" x2="200" y2="320" />
        <path d="M115 115 Q170 200 115 285" />
        <path d="M285 115 Q230 200 285 285" />
      </g>
      <circle cx="160" cy="150" r="28" fill="#fff" opacity="0.2" />
    </g>
  )
}

function Volleyball({ main, accent }: C) {
  return (
    <g>
      <circle cx="200" cy="200" r="120" fill="#fff" stroke="#e5e7eb" strokeWidth="3" />
      <path d="M200 80 Q130 160 150 300 Q110 270 88 230 Q100 140 200 80 Z" fill={main} />
      <path d="M318 220 Q230 210 160 312 Q210 324 250 308 Q300 280 318 220 Z" fill={accent} />
      <path d="M200 80 Q290 110 312 180 Q260 160 210 180 Q200 130 200 80 Z" fill={main} opacity="0.75" />
      <circle cx="200" cy="200" r="120" fill="none" stroke="#cbd5e1" strokeWidth="2" />
    </g>
  )
}

function Backpack({ main, accent }: C) {
  return (
    <g>
      <path d="M160 92 Q200 56 240 92" stroke={main} strokeWidth="12" fill="none" />
      <rect x="110" y="96" width="180" height="230" rx="42" fill={main} />
      <rect x="138" y="204" width="124" height="96" rx="20" fill="#0f172a" opacity="0.2" />
      <rect x="138" y="204" width="124" height="14" rx="7" fill={accent} />
      <rect x="150" y="120" width="100" height="10" rx="5" fill={accent} opacity="0.9" />
      <circle cx="200" cy="254" r="10" fill={accent} />
    </g>
  )
}

function Bottle({ main, accent }: C) {
  return (
    <g>
      <rect x="168" y="62" width="64" height="40" rx="10" fill="#334155" />
      <path d="M180 62 Q200 34 220 62" stroke="#334155" strokeWidth="8" fill="none" />
      <path d="M160 108 Q160 100 172 100 L228 100 Q240 100 240 108 L248 140 L248 330 Q248 346 232 346 L168 346 Q152 346 152 330 L152 140 Z" fill={main} />
      <rect x="152" y="196" width="96" height="70" fill={accent} />
      <text x="200" y="240" textAnchor="middle" fontFamily="Manrope Variable, sans-serif" fontWeight="800" fontSize="20" fill={main}>
        750
      </text>
      <rect x="166" y="120" width="10" height="200" rx="5" fill="#fff" opacity="0.3" />
    </g>
  )
}

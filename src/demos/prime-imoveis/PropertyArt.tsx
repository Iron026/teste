import type { Palette, Scene } from './data'

/**
 * Ilustrações vetoriais dos imóveis (autorais, geradas em SVG).
 * Leves, nítidas em qualquer tela e sem problemas de direitos de imagem.
 * Em um site real, seriam substituídas por fotografias dos imóveis.
 */

interface Props {
  scene: Scene
  palette: Palette
  /** Varia pequenos detalhes entre imóveis com a mesma cena */
  variant?: number
  className?: string
  title?: string
}

export function PropertyArt({ scene, palette, variant = 0, className, title }: Props) {
  const uid = `${scene}-${variant}-${palette.wall.slice(1)}`
  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className={className}
    >
      <defs>
        <linearGradient id={`sky-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={palette.sky} />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
        <linearGradient id={`glass-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#bfe0f5" />
          <stop offset="1" stopColor="#7fb3d6" />
        </linearGradient>
        <linearGradient id={`floor-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9c3a3" />
          <stop offset="1" stopColor="#c4a982" />
        </linearGradient>
      </defs>
      {scene === 'house' && <House p={palette} uid={uid} v={variant} />}
      {scene === 'building' && <Building p={palette} uid={uid} v={variant} />}
      {scene === 'living' && <Living p={palette} uid={uid} v={variant} />}
      {scene === 'kitchen' && <Kitchen p={palette} uid={uid} />}
      {scene === 'bedroom' && <Bedroom p={palette} uid={uid} v={variant} />}
      {scene === 'office' && <Office p={palette} uid={uid} />}
    </svg>
  )
}

type SceneProps = { p: Palette; uid: string; v?: number }

function Tree({ x, y, s = 1, color = '#5f8f5a' }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-5" y="-10" width="10" height="70" fill="#7a6352" />
      <circle cx="0" cy="-40" r="42" fill={color} />
      <circle cx="-26" cy="-18" r="28" fill={color} opacity="0.9" />
      <circle cx="26" cy="-20" r="30" fill={color} opacity="0.85" />
    </g>
  )
}

function House({ p, uid, v = 0 }: SceneProps) {
  const modern = v % 2 === 1
  return (
    <g>
      <rect width="800" height="500" fill={`url(#sky-${uid})`} />
      <circle cx="660" cy="90" r="38" fill="#fff4d6" />
      <ellipse cx="200" cy="110" rx="70" ry="16" fill="#fff" opacity="0.7" />
      <ellipse cx="520" cy="70" rx="90" ry="14" fill="#fff" opacity="0.55" />
      <rect y="380" width="800" height="120" fill="#a9cf8f" />
      <rect y="380" width="800" height="10" fill="#93bd78" />
      <Tree x={100} y={330} s={1.1} />
      <Tree x={705} y={340} s={0.9} color="#6d9e64" />
      {modern ? (
        <g>
          <rect x="200" y="170" width="420" height="215" fill={p.wall} />
          <rect x="200" y="160" width="430" height="16" fill={p.roof} />
          <rect x="420" y="90" width="210" height="80" fill={p.wall} />
          <rect x="415" y="82" width="222" height="12" fill={p.roof} />
          <rect x="440" y="105" width="170" height="50" fill={`url(#glass-${uid})`} />
          <rect x="230" y="210" width="160" height="110" fill={`url(#glass-${uid})`} />
          <line x1="310" y1="210" x2="310" y2="320" stroke="#fff" strokeWidth="4" />
          <rect x="430" y="240" width="70" height="145" fill={p.accent} />
          <rect x="520" y="210" width="80" height="80" fill={`url(#glass-${uid})`} />
          <rect x="200" y="320" width="200" height="65" fill={p.roof} opacity="0.12" />
        </g>
      ) : (
        <g>
          <rect x="210" y="200" width="380" height="185" fill={p.wall} />
          <path d="M190 210 L400 92 L610 210 Z" fill={p.roof} />
          <rect x="250" y="240" width="90" height="70" fill={`url(#glass-${uid})`} stroke="#fff" strokeWidth="6" />
          <line x1="295" y1="240" x2="295" y2="310" stroke="#fff" strokeWidth="4" />
          <rect x="460" y="240" width="90" height="70" fill={`url(#glass-${uid})`} stroke="#fff" strokeWidth="6" />
          <line x1="505" y1="240" x2="505" y2="310" stroke="#fff" strokeWidth="4" />
          <rect x="370" y="270" width="60" height="115" fill={p.accent} rx="2" />
          <circle cx="418" cy="330" r="4" fill="#f1d9a7" />
          <circle cx="400" cy="160" r="20" fill={`url(#glass-${uid})`} stroke="#fff" strokeWidth="5" />
        </g>
      )}
      {/* cerca */}
      {Array.from({ length: 16 }).map((_, i) => (
        <rect key={i} x={i * 52 + 4} y="395" width="8" height="44" fill="#fff" opacity="0.85" />
      ))}
      <rect y="408" width="800" height="6" fill="#fff" opacity="0.85" />
      <path d="M370 500 L392 385 L408 385 L430 500 Z" fill="#e7dfcf" />
    </g>
  )
}

function Building({ p, uid, v = 0 }: SceneProps) {
  const floors = 9
  const cols = 4
  return (
    <g>
      <rect width="800" height="500" fill={`url(#sky-${uid})`} />
      <circle cx={120 + (v % 3) * 40} cy="90" r="34" fill="#fff4d6" />
      <rect x="40" y="200" width="150" height="300" fill={p.roof} opacity="0.18" />
      <rect x="610" y="150" width="160" height="350" fill={p.roof} opacity="0.15" />
      <rect x="250" y="40" width="300" height="460" fill={p.wall} />
      <rect x="240" y="30" width="320" height="16" fill={p.roof} />
      {Array.from({ length: floors }).map((_, f) =>
        Array.from({ length: cols }).map((_, c) => (
          <rect
            key={`${f}-${c}`}
            x={270 + c * 70}
            y={62 + f * 44}
            width="52"
            height="30"
            fill={`url(#glass-${uid})`}
            opacity={(f + c + v) % 5 === 0 ? 0.65 : 1}
          />
        )),
      )}
      {Array.from({ length: floors }).map((_, f) => (
        <rect key={f} x="250" y={94 + f * 44} width="300" height="5" fill={p.accent} opacity="0.55" />
      ))}
      <rect x="360" y="440" width="80" height="60" fill={p.accent} />
      <rect y="470" width="800" height="30" fill="#b9c2c9" />
      <Tree x={160} y={420} s={0.9} />
      <Tree x={650} y={425} s={1} color="#6d9e64" />
    </g>
  )
}

function Living({ p, uid, v = 0 }: SceneProps) {
  return (
    <g>
      <rect width="800" height="500" fill={p.wall} />
      <rect y="360" width="800" height="140" fill={`url(#floor-${uid})`} />
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={i} x1={i * 100} y1="360" x2={i * 100 - 60} y2="500" stroke="#b8996f" strokeWidth="2" opacity="0.5" />
      ))}
      {/* janela */}
      <rect x="470" y="70" width="240" height="220" fill={`url(#sky-${uid})`} stroke="#fff" strokeWidth="10" />
      <line x1="590" y1="70" x2="590" y2="290" stroke="#fff" strokeWidth="6" />
      <Tree x={540} y={260} s={0.6} />
      <rect x="455" y="60" width="18" height="250" fill={p.accent} opacity="0.35" />
      <rect x="707" y="60" width="18" height="250" fill={p.accent} opacity="0.35" />
      {/* quadro */}
      <rect x="110" y="110" width="150" height="100" fill="#fff" />
      <rect x="120" y="120" width="130" height="80" fill={p.sky} />
      <path d="M120 200 L170 150 L210 185 L230 165 L250 200 Z" fill={p.accent} opacity="0.7" />
      {/* tapete */}
      <ellipse cx="320" cy="440" rx="230" ry="38" fill={p.accent} opacity="0.18" />
      {/* sofá */}
      <rect x="70" y="285" width="380" height="95" rx="22" fill={p.accent} />
      <rect x="90" y="250" width="340" height="70" rx="20" fill={p.accent} />
      <rect x="95" y="300" width="160" height="40" rx="12" fill="#fff" opacity="0.18" />
      <rect x="265" y="300" width="160" height="40" rx="12" fill="#fff" opacity="0.18" />
      <rect x="85" y="380" width="12" height="22" fill="#4a3b2f" />
      <rect x="423" y="380" width="12" height="22" fill="#4a3b2f" />
      {/* mesa de centro */}
      <ellipse cx="300" cy="425" rx="80" ry="16" fill="#6b5442" />
      <rect x="282" y="400" width="36" height="16" rx="4" fill="#fff" opacity="0.85" />
      {/* luminária */}
      <rect x={v % 2 ? 735 : 755} y="220" width="4" height="170" fill="#3c3c3c" />
      <path d={v % 2 ? 'M712 220 L762 220 L748 180 L726 180 Z' : 'M732 220 L782 220 L768 180 L746 180 Z'} fill="#f3d48c" />
      {/* planta */}
      <rect x="610" y="340" width="50" height="50" rx="6" fill="#d8cbb7" />
      <ellipse cx="635" cy="320" rx="34" ry="40" fill="#5f8f5a" />
    </g>
  )
}

function Kitchen({ p, uid }: SceneProps) {
  return (
    <g>
      <rect width="800" height="500" fill={p.wall} />
      <rect y="400" width="800" height="100" fill={`url(#floor-${uid})`} />
      {/* armários superiores */}
      <rect x="60" y="60" width="420" height="110" fill={p.accent} />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={70 + i * 103} y="70" width="93" height="90" fill="#fff" opacity="0.1" />
      ))}
      {/* revestimento */}
      {Array.from({ length: 7 }).map((_, r) =>
        Array.from({ length: 14 }).map((_, c) => (
          <rect key={`${r}-${c}`} x={60 + c * 30 + (r % 2) * 15} y={180 + r * 15} width="28" height="13" fill="#fff" opacity="0.45" />
        )),
      )}
      {/* bancada inferior */}
      <rect x="50" y="285" width="440" height="16" fill="#e8e4dc" />
      <rect x="60" y="301" width="420" height="99" fill={p.accent} />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={68 + i * 104} y="310" width="96" height="82" fill="#fff" opacity="0.1" />
      ))}
      <rect x="170" y="265" width="90" height="20" rx="4" fill="#3d3d3d" />
      {/* janela */}
      <rect x="560" y="70" width="180" height="150" fill={`url(#sky-${uid})`} stroke="#fff" strokeWidth="8" />
      <line x1="650" y1="70" x2="650" y2="220" stroke="#fff" strokeWidth="5" />
      {/* ilha */}
      <rect x="520" y="300" width="250" height="18" fill="#e8e4dc" />
      <rect x="530" y="318" width="230" height="90" fill={p.roof} />
      {[560, 640, 720].map((x) => (
        <g key={x}>
          <rect x={x - 22} y="340" width="44" height="12" rx="4" fill="#4a3b2f" />
          <rect x={x - 3} y="352" width="6" height="70" fill="#4a3b2f" />
        </g>
      ))}
      {/* pendentes */}
      {[580, 645, 710].map((x) => (
        <g key={x}>
          <line x1={x} y1="0" x2={x} y2="230" stroke="#3c3c3c" strokeWidth="2" />
          <path d={`M${x - 18} 252 L${x + 18} 252 L${x + 10} 230 L${x - 10} 230 Z`} fill="#f3d48c" />
        </g>
      ))}
      <ellipse cx="610" cy="295" rx="26" ry="7" fill="#e9b949" />
    </g>
  )
}

function Bedroom({ p, uid, v = 0 }: SceneProps) {
  return (
    <g>
      <rect width="800" height="500" fill={p.wall} />
      <rect y="380" width="800" height="120" fill={`url(#floor-${uid})`} />
      {/* janela com cortina */}
      <rect x={v % 2 ? 80 : 560} y="70" width="170" height="190" fill={`url(#sky-${uid})`} stroke="#fff" strokeWidth="8" />
      <rect x={v % 2 ? 70 : 550} y="60" width="40" height="230" fill="#fff" opacity="0.75" />
      {/* cabeceira */}
      <rect x="250" y="150" width="300" height="190" rx="14" fill={p.accent} />
      {/* cama */}
      <rect x="230" y="290" width="340" height="120" rx="12" fill="#f7f4ee" />
      <rect x="230" y="330" width="340" height="80" rx="10" fill={p.sky} />
      <rect x="230" y="330" width="340" height="16" fill="#fff" opacity="0.5" />
      <rect x="270" y="262" width="110" height="46" rx="16" fill="#fff" />
      <rect x="420" y="262" width="110" height="46" rx="16" fill="#fff" />
      <rect x="240" y="410" width="12" height="20" fill="#4a3b2f" />
      <rect x="548" y="410" width="12" height="20" fill="#4a3b2f" />
      {/* criados-mudos */}
      {[150, 600].map((x) => (
        <g key={x}>
          <rect x={x} y="320" width="70" height="80" rx="6" fill="#8a6d55" />
          <rect x={x + 8} y="345" width="54" height="3" fill="#6b5442" />
          <rect x={x + 30} y="290" width="10" height="30" fill="#3c3c3c" />
          <path d={`M${x + 12} 292 L${x + 58} 292 L${x + 50} 262 L${x + 20} 262 Z`} fill="#f3d48c" />
        </g>
      ))}
      <ellipse cx="400" cy="460" rx="240" ry="26" fill={p.accent} opacity="0.15" />
    </g>
  )
}

function Office({ p, uid }: SceneProps) {
  return (
    <g>
      <rect width="800" height="500" fill="#eef1f4" />
      <rect y="390" width="800" height="110" fill="#c9cfd6" />
      {/* parede de vidro */}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={60 + i * 140} y="50" width="128" height="260" fill={`url(#sky-${uid})`} stroke="#fff" strokeWidth="6" />
      ))}
      <rect x="60" y="230" width="690" height="80" fill={p.roof} opacity="0.12" />
      {/* mesas */}
      {[120, 440].map((x) => (
        <g key={x}>
          <rect x={x} y="320" width="250" height="14" fill="#f7f7f7" />
          <rect x={x + 10} y="334" width="8" height="70" fill="#444" />
          <rect x={x + 232} y="334" width="8" height="70" fill="#444" />
          <rect x={x + 90} y="250" width="80" height="55" rx="4" fill="#2b3340" />
          <rect x={x + 125} y="305" width="10" height="15" fill="#2b3340" />
          <rect x={x + 100} y="350" width="60" height="50" rx="10" fill={p.accent} />
          <rect x={x + 126} y="400" width="8" height="20" fill="#444" />
        </g>
      ))}
      <rect x="720" y="330" width="50" height="60" rx="6" fill="#d8cbb7" />
      <ellipse cx="745" cy="310" rx="32" ry="40" fill="#5f8f5a" />
    </g>
  )
}

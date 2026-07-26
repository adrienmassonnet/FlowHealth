import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Flow Health: Stable Energy for Deep Focus'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#1E1854',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 28,
        }}
      >
        {/* Favicon mark */}
        <svg width="100" height="100" viewBox="0 0 320 320" fill="none">
          <path
            d="M320 138.76V160H160V0H181.24C190.26 72.36 247.64 129.74 320 138.76Z"
            fill="white"
          />
          <path
            d="M160 160V320H138.76C129.74 247.64 72.36 190.26 0 181.24V160H160Z"
            fill="white"
          />
        </svg>

        <div
          style={{
            color: 'white',
            fontSize: 52,
            fontWeight: 600,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          Flow Health
        </div>

        <div
          style={{
            color: 'rgba(255,255,255,0.55)',
            fontSize: 22,
            letterSpacing: '0.01em',
            textAlign: 'center',
            maxWidth: 560,
            lineHeight: 1.5,
          }}
        >
          Stable Energy for Deep Focus
        </div>

        <div
          style={{
            marginTop: 12,
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 100,
            padding: '10px 24px',
            color: 'rgba(255,255,255,0.7)',
            fontSize: 15,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          flow-health.ch
        </div>
      </div>
    ),
    { ...size },
  )
}
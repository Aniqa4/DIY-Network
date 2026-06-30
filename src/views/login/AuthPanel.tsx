import Link from 'next/link'
import { ReactNode } from 'react'

interface AuthPanelProps {
  heading: string
  subheading: string
  children: ReactNode
  footer: ReactNode
}

function AuthPanel({ heading, subheading, children, footer }: AuthPanelProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-[42%] bg-phthalo flex-col justify-between p-12 relative overflow-hidden">
        {/* Background pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.07]"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern id="craft-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              {/* Scissors */}
              <g transform="translate(12,12) scale(0.9)" fill="#F7F4EE">
                <path d="M6 9C7.66 9 9 7.66 9 6S7.66 3 6 3 3 4.34 3 6s1.34 3 3 3zm0-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm6 10c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm.71-7.29l-8.42-8.42C3.9 2.9 3.2 2.62 2.5 2.62c-1.38 0-2.5 1.12-2.5 2.5 0 .7.28 1.4.79 1.89l4.3 4.31-4.3 4.3c-.51.49-.79 1.19-.79 1.89C0 18.88 1.12 20 2.5 20c.7 0 1.4-.28 1.79-.71L12 11.41l1.59 1.59c.2.2.51.2.71 0 .2-.2.2-.51 0-.71l-1.59-1.58z" />
              </g>
              {/* Paintbrush */}
              <g transform="translate(52,52) scale(0.85)" fill="#F7F4EE">
                <path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34a1 1 0 0 0-1.41 0L9 12.25 11.75 15l8.96-8.96a1 1 0 0 0 0-1.41z" />
              </g>
              {/* Hammer */}
              <g transform="translate(52,12) scale(0.85)" fill="#F7F4EE">
                <path d="M15.5 2.1L13.4 0 6.1 7.3 4 5.1 2.9 6.2l1 1-4.9 4.9 3.8 3.8 4.9-4.9 1 1L9.8 11l-1-1 7.3-7.3-1-1 .4-.6zM4.9 13.1l-2-2 4.2-4.2.9.9.9.9-4 4.4z" />
              </g>
              {/* Leaf */}
              <g transform="translate(12,52) scale(0.85)" fill="#F7F4EE">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 4-8 4s-2-1 3-5z" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#craft-grid)" />
        </svg>

        {/* Top: logo */}
        <Link
          href="/"
          className="relative z-10 font-ProtestStrike text-3xl text-canvas-light tracking-tight hover:text-canvas-light/80 transition-colors duration-200"
        >
          DIY Network
        </Link>

        {/* Center: decorative craft icons row + quote */}
        <div className="relative z-10 space-y-10">
          <div className="flex gap-6 text-canvas-light/25" aria-hidden="true">
            {/* Scissors */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 9C7.66 9 9 7.66 9 6S7.66 3 6 3 3 4.34 3 6s1.34 3 3 3zm0-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm6 10c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm.71-7.29l-8.42-8.42C3.9 2.9 3.2 2.62 2.5 2.62c-1.38 0-2.5 1.12-2.5 2.5 0 .7.28 1.4.79 1.89l4.3 4.31-4.3 4.3c-.51.49-.79 1.19-.79 1.89C0 18.88 1.12 20 2.5 20c.7 0 1.4-.28 1.79-.71L12 11.41l1.59 1.59c.2.2.51.2.71 0 .2-.2.2-.51 0-.71l-1.59-1.58z" />
            </svg>
            {/* Paintbrush */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34a1 1 0 0 0-1.41 0L9 12.25 11.75 15l8.96-8.96a1 1 0 0 0 0-1.41z" />
            </svg>
            {/* Leaf */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 4-8 4s-2-1 3-5z" />
            </svg>
            {/* Soup/chef */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26 1.44 1.42 2.43 2.89 2.43 5.29v8.05zM1 21.99V21h15.03v.99c0 .55-.45 1-1.01 1H2.01c-.56 0-1.01-.45-1.01-1zm15.03-7c0-8.17-15.03-8.17-15.03 0h15.03zM1.02 17h15v2h-15z" />
            </svg>
            {/* Hammer */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 2.1L13.4 0 6.1 7.3 4 5.1 2.9 6.2l1 1-4.9 4.9 3.8 3.8 4.9-4.9 1 1L9.8 11l-1-1 7.3-7.3-1-1 .4-.6z" />
            </svg>
          </div>

          <blockquote className="text-canvas-light/75 text-xl font-light leading-relaxed italic">
            &ldquo;A home for makers — where ideas become things you can touch.&rdquo;
          </blockquote>
        </div>

        {/* Bottom: copyright */}
        <p className="relative z-10 text-canvas-light/35 text-xs tracking-wide">
          © 2026 DIY Network
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-16 bg-canvas-light">
        <div className="w-full max-w-[360px]">
          {/* Mobile-only logo */}
          <Link
            href="/"
            className="lg:hidden block mb-10 font-ProtestStrike text-2xl text-ink tracking-tight"
          >
            DIY Network
          </Link>

          {/* Heading */}
          <div className="mb-10">
            <h1 className="font-ProtestStrike text-[2rem] text-ink leading-tight">{heading}</h1>
            <div className="flex items-center gap-2 mt-2 mb-3">
              <div className="w-8 h-0.5 bg-phthalo" />
              <div className="w-2 h-0.5 bg-sienna" />
            </div>
            <p className="text-sm text-ink/50">{subheading}</p>
          </div>

          {/* Form slot */}
          {children}

          {/* Footer slot */}
          <div className="mt-8">{footer}</div>
        </div>
      </div>
    </div>
  )
}

export default AuthPanel

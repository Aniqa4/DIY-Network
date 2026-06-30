'use client'
import { useState } from 'react'
import { ReactNode } from 'react'

interface PasswordInputProps {
  label: string
  placeholder?: string
  labelExtra?: ReactNode
}

function PasswordInput({ label, placeholder = '••••••••', labelExtra }: PasswordInputProps) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-[11px] font-semibold uppercase tracking-widest text-ink/50">
          {label}
        </label>
        {labelExtra}
      </div>
      <div className="relative">
        <input
          type={visible ? 'text' : 'password'}
          placeholder={placeholder}
          className="w-full border-b border-canvas-dark bg-transparent pb-2.5 pt-1 pr-8 text-sm text-ink placeholder:text-ink/30 outline-none focus:border-phthalo transition-colors duration-200"
        />
        <button
          type="button"
          onClick={() => setVisible(v => !v)}
          className="absolute right-0 bottom-2 text-ink/35 hover:text-ink/70 transition-colors duration-200"
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
              <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}

export default PasswordInput

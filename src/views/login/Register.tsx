'use client'
import Link from 'next/link'
import AuthPanel from './AuthPanel'
import PasswordInput from './PasswordInput'

function Register() {
  return (
    <AuthPanel
      heading="Create account"
      subheading="Join a community of makers and share your projects"
      footer={
        <p className="text-center text-sm text-ink/55">
          Already have an account?{' '}
          <Link href="/login" className="text-phthalo font-medium hover:underline">
            Sign in
          </Link>
        </p>
      }
    >
      <form className="space-y-7">
        <div className="space-y-1.5">
          <label className="block text-[11px] font-semibold uppercase tracking-widest text-ink/50">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Jane Smith"
            className="w-full border-b border-canvas-dark bg-transparent pb-2.5 pt-1 text-sm text-ink placeholder:text-ink/30 outline-none focus:border-phthalo transition-colors duration-200"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-[11px] font-semibold uppercase tracking-widest text-ink/50">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full border-b border-canvas-dark bg-transparent pb-2.5 pt-1 text-sm text-ink placeholder:text-ink/30 outline-none focus:border-phthalo transition-colors duration-200"
          />
        </div>

        <PasswordInput label="Password" />

        <PasswordInput label="Confirm Password" />

        <button
          type="submit"
          className="w-full bg-phthalo text-canvas-light py-3.5 text-sm font-semibold tracking-widest uppercase hover:bg-phthalo/85 active:scale-[0.98] transition-all duration-200 mt-2"
        >
          Create Account
        </button>
      </form>
    </AuthPanel>
  )
}

export default Register

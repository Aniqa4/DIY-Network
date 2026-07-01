'use client'
import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AuthPanel from './AuthPanel'
import PasswordInput from './PasswordInput'
import { useAppDispatch } from '../../redux/hooks'
import { login } from '../../redux/features/auth/authSlice'
import { useToast } from '../../context/ToastContext'

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const dispatch = useAppDispatch()
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !password.trim() || !confirm.trim()) {
      setError("Please fill in all fields.")
      return
    }
    if (password !== confirm) {
      setError("Passwords don't match.")
      return
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.")
      return
    }
    setLoading(true)
    // TODO: replace with real API call → dispatch(registerThunk({ name, email, password }))
    setTimeout(() => {
      dispatch(login({ name, email }))
      toast("Account created! Welcome to DIY Network.")
      router.push("/")
    }, 600)
  }

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
      <form onSubmit={handleSubmit} className="space-y-7">
        <div className="space-y-1.5">
          <label className="block text-[11px] font-semibold uppercase tracking-widest text-ink/50">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Jane Smith"
            value={name}
            onChange={e => { setName(e.target.value); setError("") }}
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
            value={email}
            onChange={e => { setEmail(e.target.value); setError("") }}
            className="w-full border-b border-canvas-dark bg-transparent pb-2.5 pt-1 text-sm text-ink placeholder:text-ink/30 outline-none focus:border-phthalo transition-colors duration-200"
          />
        </div>

        <PasswordInput
          label="Password"
          value={password}
          onChange={e => { setPassword(e.target.value); setError("") }}
        />

        <PasswordInput
          label="Confirm Password"
          value={confirm}
          onChange={e => { setConfirm(e.target.value); setError("") }}
        />

        {error && (
          <p className="text-xs text-red-500 -mt-3">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-phthalo text-canvas-light py-3.5 text-sm font-semibold tracking-widest uppercase hover:bg-phthalo/85 active:scale-[0.98] transition-all duration-200 mt-2 disabled:opacity-60"
        >
          {loading ? "Creating account…" : "Create Account"}
        </button>
      </form>
    </AuthPanel>
  )
}

export default Register

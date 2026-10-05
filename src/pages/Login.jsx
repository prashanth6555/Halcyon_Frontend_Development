import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import Logo from '../components/Logo'
import ThemeToggle from '../components/ThemeToggle'

function validate(values) {
  const errors = {}
  if (!values.email.trim()) errors.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Enter a valid email address.'

  if (!values.password) errors.password = 'Password is required.'
  else if (values.password.length < 8) errors.password = 'Use at least 8 characters.'
  else if (!/[A-Za-z]/.test(values.password) || !/\d/.test(values.password)) {
    errors.password = 'Include both a letter and a number.'
  }
  return errors
}

function strengthOf(password) {
  let score = 0
  if (password.length >= 8) score += 1
  if (password.length >= 12) score += 1
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1
  if (/\d/.test(password)) score += 1
  if (/[^A-Za-z0-9]/.test(password)) score += 1
  return score
}

export default function Login() {
  const navigate = useNavigate()
  const [values, setValues] = useState({ email: '', password: '', remember: true })
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [shake, setShake] = useState(false)

  const strength = strengthOf(values.password)
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'][strength]
  const visibleErrors = useMemo(() => {
    const next = {}
    if (touched.email) next.email = errors.email
    if (touched.password) next.password = errors.password
    return next
  }, [errors, touched])

  function update(field, value) {
    const next = { ...values, [field]: value }
    setValues(next)
    setErrors(validate(next))
  }

  function onSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    setTouched({ email: true, password: true })
    if (Object.keys(nextErrors).length) {
      setShake(true)
      window.setTimeout(() => setShake(false), 400)
      return
    }
    const name = values.email.split('@')[0].replace(/[._-]/g, ' ')
    const pretty = name.replace(/\b\w/g, (letter) => letter.toUpperCase())
    sessionStorage.setItem(
      'halcyon-user',
      JSON.stringify({ name: pretty, email: values.email, remember: values.remember }),
    )
    setSubmitting(true)
    window.setTimeout(() => navigate('/dashboard'), 700)
  }

  function fillDemo() {
    const next = { ...values, email: 'prashanth12@gmail.com', password: 'prashanth@12345' }
    setValues(next)
    setErrors(validate(next))
    setTouched({ email: true, password: true })
  }

  return (
    <div className="grid min-h-dvh w-full lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden bg-[#10211c] text-[#f6f1e8] lg:flex lg:flex-col lg:justify-between lg:p-10">
        <img
          src="/images/login-room.jpg"
          alt=""
          className="kenburns absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#10211c]/68" />
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <Logo light className="relative z-10" />
        <div className="relative z-10 max-w-lg">
          <p className="text-xs font-bold tracking-[0.16em] text-[#c9a15b] uppercase">Workspace</p>
          <h1 className="font-display mt-4 text-5xl leading-[1.05] tracking-tight">
            Come back to the numbers that already agree.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[#d9d0c3]">
            One login opens the board your studio used yesterday — cash, clients, and the few alerts that still need a person.
          </p>
        </div>
        <div className="relative z-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
          {[
            ['32', 'studios'],
            ['4 min', 'to first board'],
            ['99.9%', 'uptime'],
          ].map(([value, label]) => (
            <div key={label}>
              <p className="font-display text-3xl">{value}</p>
              <p className="text-sm text-[#d9d0c3]">{label}</p>
            </div>
          ))}
        </div>
      </aside>

      <main className="flex min-h-dvh w-full flex-col bg-[var(--bg)]">
        <div className="flex w-full items-center justify-between px-4 py-4 sm:px-8">
          <Logo className="lg:hidden" />
          <div className="ml-auto flex items-center gap-3">
            <Link to="/" className="text-sm font-semibold text-[var(--muted)] hover:text-[var(--ink)]">
              Back home
            </Link>
            <ThemeToggle />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-8 lg:px-16">
          <form
            onSubmit={onSubmit}
            noValidate
            className={`w-full max-w-md ${shake ? 'shake' : ''}`}
          >
            <p className="kicker lg:hidden">
              <span className="kicker-dot" />
              Welcome back
            </p>
            <h2 className="font-display mt-4 text-4xl tracking-tight">Log in</h2>
            <p className="mt-3 text-[var(--muted)]">Use your work email. The demo account is ready if you want the short path.</p>

            <div className="mt-8 space-y-5">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-bold">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onBlur={() => setTouched((current) => ({ ...current, email: true }))}
                  onChange={(event) => update('email', event.target.value)}
                  placeholder="you@studio.com"
                  aria-invalid={Boolean(visibleErrors.email)}
                  aria-describedby={visibleErrors.email ? 'email-error' : undefined}
                  className={`field ${visibleErrors.email ? 'field-error' : ''}`}
                />
                {visibleErrors.email && (
                  <p id="email-error" className="mt-2 text-sm text-[#d14343]">
                    {visibleErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-bold">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={values.password}
                    onBlur={() => setTouched((current) => ({ ...current, password: true }))}
                    onChange={(event) => update('password', event.target.value)}
                    placeholder="At least 8 characters"
                    aria-invalid={Boolean(visibleErrors.password)}
                    aria-describedby={visibleErrors.password ? 'password-error' : 'password-hint'}
                    className={`field pr-12 ${visibleErrors.password ? 'field-error' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--ink)]"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <Icon name={showPassword ? 'eyeOff' : 'eye'} />
                  </button>
                </div>
                <div className="mt-3 strength" aria-hidden="true">
                  <span
                    style={{
                      width: `${(strength / 5) * 100}%`,
                      background: strength < 3 ? '#d4652f' : strength < 4 ? '#c9a15b' : 'var(--accent)',
                    }}
                  />
                </div>
                <p id="password-hint" className="mt-2 text-xs text-[var(--muted)]">
                  {values.password ? `Strength: ${strengthLabel}` : 'Use a letter and a number.'}
                </p>
                {visibleErrors.password && (
                  <p id="password-error" className="mt-1 text-sm text-[#d14343]">
                    {visibleErrors.password}
                  </p>
                )}
              </div>

              <label className="flex items-center gap-3 text-sm font-semibold">
                <input
                  type="checkbox"
                  checked={values.remember}
                  onChange={(event) => update('remember', event.target.checked)}
                  className="h-4 w-4 accent-[var(--accent)]"
                />
                Remember this studio
              </label>
            </div>

            <button type="submit" className="btn btn-primary mt-8 w-full" disabled={submitting}>
              {submitting ? 'Signing you in…' : 'Enter workspace'}
              {!submitting && <Icon name="arrow" className="h-4 w-4" />}
            </button>
            <button type="button" onClick={fillDemo} className="btn btn-ghost mt-3 w-full">
              Use demo account
            </button>
            <p className="mt-6 text-center text-sm text-[var(--muted)]">
              New to Halcyon?{' '}
              <Link to="/" className="font-bold text-[var(--ink)] underline decoration-[var(--accent)] underline-offset-4">
                See the product
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  )
}

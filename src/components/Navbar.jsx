import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import Icon from './Icon'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'

const links = [
  { href: '#features', label: 'Features' },
  { href: '#method', label: 'Method' },
  { href: '#stories', label: 'Stories' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 w-full transition ${
        scrolled || open
          ? 'border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="flex w-full items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link text-sm">
              {link.label}
            </a>
          ))}
          <Link to="/dashboard" className="nav-link text-sm">
            Dashboard
          </Link>
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Link to="/login" className="hidden text-sm font-semibold sm:inline">
            Log in
          </Link>
          <Button to="/login" className="hidden !px-4 !py-2.5 sm:inline-flex">
            Get started
          </Button>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-[var(--line)] bg-[var(--surface)] lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
      {open && (
        <div className="menu-panel w-full border-t border-[var(--line)] bg-[var(--bg)] px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-3 py-3 text-lg font-semibold hover:bg-[var(--surface)]"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="rounded-2xl px-3 py-3 text-lg font-semibold hover:bg-[var(--surface)]"
            >
              Dashboard
            </Link>
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="rounded-2xl px-3 py-3 text-lg font-semibold hover:bg-[var(--surface)]"
            >
              Log in
            </Link>
            <Button to="/login" className="mt-2 w-full" onClick={() => setOpen(false)}>
              Get started
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}

import { Link } from 'react-router-dom'

export function Mark({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle className="logo-orbit" cx="20" cy="20" r="15" />
      <path className="logo-arc" d="M10.5 24.5c2.6-6 5.6-8.8 9.5-8.8s6.9 2.8 9.5 8.8" />
      <circle className="logo-sun" cx="20" cy="14" r="2.4" />
    </svg>
  )
}

export default function Logo({ to = '/', light = false, className = '' }) {
  return (
    <Link to={to} className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="Halcyon home">
      <span
        className={`logo-badge grid h-9 w-9 place-items-center rounded-xl ${
          light ? 'bg-[#f6f1e8] text-[#10211c]' : 'bg-[var(--ink)] text-[var(--bg)]'
        }`}
      >
        <Mark />
      </span>
      <span className={`font-display text-[1.35rem] leading-none tracking-tight ${light ? 'text-[#f6f1e8]' : ''}`}>
        Halcyon
      </span>
    </Link>
  )
}

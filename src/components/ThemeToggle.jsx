import Icon from './Icon'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle({ light = false }) {
  const { theme, toggle } = useTheme()
  const dark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`grid h-10 w-10 place-items-center rounded-full border transition hover:-translate-y-0.5 ${
        light
          ? 'border-white/20 bg-white/10 text-[#f6f1e8] hover:bg-white/15'
          : 'border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--accent)]'
      }`}
    >
      <Icon name={dark ? 'sun' : 'moon'} className="h-[1.15rem] w-[1.15rem]" />
    </button>
  )
}

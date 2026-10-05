import { Link } from 'react-router-dom'

const variants = {
  primary: 'btn-primary',
  ghost: 'btn-ghost',
  dark: 'btn-dark',
  light: 'btn-light',
}

export default function Button({ to, href, variant = 'primary', className = '', children, ...props }) {
  const cls = `btn ${variants[variant] || variants.primary} ${className}`
  if (to) {
    return (
      <Link to={to} className={cls} {...props}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={cls} {...props}>
        {children}
      </a>
    )
  }
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  )
}

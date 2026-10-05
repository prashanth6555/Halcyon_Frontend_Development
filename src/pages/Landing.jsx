import { useRef } from 'react'
import Button from '../components/Button'
import Footer from '../components/Footer'
import Icon from '../components/Icon'
import Navbar from '../components/Navbar'
import Reveal from '../components/Reveal'
import { features, steps, stories, studios } from '../data/content'

const bars = [42, 58, 49, 72, 66, 84, 77]

export default function Landing() {
  const scroller = useRef(null)

  function slide(direction) {
    const node = scroller.current
    if (!node) return
    node.scrollBy({ left: direction * Math.min(node.clientWidth * 0.86, 420), behavior: 'smooth' })
  }

  return (
    <div className="w-full overflow-x-clip bg-[var(--bg)] text-[var(--ink)]">
      <Navbar />
      <main className="w-full">
        <section className="hero-bg relative w-full overflow-hidden">
          <div className="orb orb-a" />
          <div className="orb orb-b" />
          <div className="relative grid w-full items-center gap-12 px-4 pt-28 pb-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:pt-32 lg:pb-24">
            <div className="rise">
              <p className="kicker">
                <span className="kicker-dot" />
                Public studio release
              </p>
              <h1 className="font-display mt-6 max-w-4xl text-[2.7rem] leading-[1.02] tracking-tight sm:text-6xl xl:text-7xl">
                The calm command center
                <span className="italic text-[var(--accent)]"> for ambitious teams.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
                Halcyon gathers revenue, clients, and delivery onto one live surface, so the week is readable before anyone opens a spreadsheet.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button to="/login">
                  Start free
                  <Icon name="arrow" className="h-4 w-4" />
                </Button>
                <Button to="/dashboard" variant="ghost">
                  View live dashboard
                </Button>
              </div>
              <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-[var(--line)] pt-6">
                {[
                  ['128k', 'tracked this month'],
                  ['18%', 'faster Friday close'],
                  ['4.9', 'studio rating'],
                ].map(([value, label]) => (
                  <div key={label}>
                    <dt className="font-display text-2xl sm:text-3xl">{value}</dt>
                    <dd className="mt-1 text-xs text-[var(--muted)] sm:text-sm">{label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative min-h-[520px] rise" style={{ animationDelay: '120ms' }}>
              <div className="photo-frame absolute inset-x-4 top-0 h-64 overflow-hidden rounded-[28px] sm:inset-x-8 sm:h-72">
                <img
                  src="/images/hero-studio.jpg"
                  alt="Sunlit studio table with notebooks and olive branches"
                  className="kenburns h-full w-full object-cover"
                />
              </div>
              <div className="float-a absolute top-6 left-0 z-10 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 shadow-[var(--shadow)]">
                <p className="text-xs font-bold tracking-wide text-[var(--muted)] uppercase">Retention</p>
                <p className="font-display text-2xl text-[var(--accent)]">+18%</p>
              </div>
              <div className="panel relative z-0 mx-3 mt-44 p-5 sm:mx-8 sm:mt-48 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[var(--muted)]">October cash</p>
                    <p className="font-display text-4xl tracking-tight">$128,430</p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-bold text-[var(--accent)]">
                    <span className="kicker-dot" />
                    Live
                  </span>
                </div>
                <svg viewBox="0 0 320 110" className="mt-6 h-28 w-full" role="img" aria-label="Revenue trend">
                  <defs>
                    <linearGradient id="heroFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 78 C 30 74, 40 60, 70 62 S 120 88, 150 70 S 200 30, 240 42 S 290 28, 320 22 L 320 110 L 0 110 Z"
                    fill="url(#heroFill)"
                  />
                  <path
                    d="M0 78 C 30 74, 40 60, 70 62 S 120 88, 150 70 S 200 30, 240 42 S 290 28, 320 22"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    ['Open work', '26'],
                    ['On track', '19'],
                    ['Alerts', '3'],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl bg-[var(--surface-2)] px-3 py-3">
                      <p className="text-xs text-[var(--muted)]">{label}</p>
                      <p className="mt-1 text-lg font-bold">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="float-b absolute right-0 bottom-2 z-10 rounded-2xl border border-[var(--line)] bg-[var(--ink)] px-4 py-3 text-[var(--bg)] shadow-[var(--shadow)]">
                <p className="text-xs font-bold tracking-wide uppercase opacity-70">Alerts cleared</p>
                <p className="font-display text-2xl">4 today</p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full border-y border-[var(--line)] bg-[var(--surface)] py-5" aria-label="Studios">
          <div className="marquee">
            <div className="marquee-track">
              {[...studios, ...studios].map((name, index) => (
                <span key={`${name}-${index}`} className="px-8 text-sm font-bold tracking-[0.18em] text-[var(--muted)] uppercase">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="w-full scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <Reveal>
            <div className="flex w-full flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div className="max-w-2xl">
                <p className="kicker">Services</p>
                <h2 className="font-display mt-4 text-4xl tracking-tight sm:text-5xl">Everything the week actually needs.</h2>
              </div>
              <p className="max-w-md text-[var(--muted)]">
                Six tools, one room. Halcyon keeps the operational surface small so the signal stays large.
              </p>
            </div>
          </Reveal>
          <div className="mt-10 grid w-full gap-4 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature, index) => (
              <Reveal key={feature.title} className={feature.span || ''} delay={index * 70}>
                <article className="lift panel flex h-full flex-col overflow-hidden p-6">
                  {feature.wide && (
                    <div className="photo-frame -mx-6 -mt-6 mb-5 h-48">
                      <img
                        src="/images/workshop-table.jpg"
                        alt="Workshop table with sketches, a brass ruler, and greenery"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                    <Icon name={index === 0 ? 'chart' : index % 2 ? 'spark' : 'users'} />
                  </span>
                  <h3 className="font-display mt-5 text-2xl tracking-tight">{feature.title}</h3>
                  <p className="mt-3 text-[var(--muted)] leading-relaxed">{feature.copy}</p>
                  {feature.wide && (
                    <div className="mt-8 flex flex-1 items-end gap-2">
                      {bars.map((height, barIndex) => (
                        <span
                          key={height}
                          className="bar-rise flex-1 rounded-t-lg bg-[var(--accent)]/80"
                          style={{
                            height: `${height}px`,
                            opacity: 0.45 + barIndex * 0.07,
                            animationDelay: `${barIndex * 70}ms`,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="method" className="band-ink w-full scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.16em] text-[#c9a15b] uppercase">Method</p>
            <h2 className="font-display mt-4 max-w-2xl text-4xl tracking-tight sm:text-5xl">Three moves. Then the board runs itself.</h2>
          </Reveal>
          <div className="mt-12 grid w-full gap-6 lg:grid-cols-3">
            {steps.map((step, index) => (
              <Reveal key={step.n} delay={index * 90}>
                <article className="h-full rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:bg-white/10">
                  <p className="font-display text-4xl text-[#3dceb0]">{step.n}</p>
                  <h3 className="mt-6 text-xl font-bold">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-[#d9d0c3]">{step.copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="stories" className="w-full scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="flex w-full items-end justify-between gap-4">
            <Reveal>
              <p className="kicker">Stories</p>
              <h2 className="font-display mt-4 text-4xl tracking-tight sm:text-5xl">Studios that closed the extra tabs.</h2>
            </Reveal>
            <div className="hidden gap-2 sm:flex">
              <button type="button" className="btn btn-ghost !px-3 !py-3" aria-label="Previous stories" onClick={() => slide(-1)}>
                <Icon name="chevron" className="h-4 w-4 rotate-180" />
              </button>
              <button type="button" className="btn btn-ghost !px-3 !py-3" aria-label="Next stories" onClick={() => slide(1)}>
                <Icon name="chevron" className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div
            ref={scroller}
            className="mt-10 flex w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
            style={{ scrollbarWidth: 'none' }}
          >
            {stories.map((story) => (
              <article
                key={story.name}
                className="lift panel w-[86%] shrink-0 snap-start p-6 sm:w-[48%] xl:w-[32%]"
              >
                <div className="flex gap-1 text-[var(--gold)]" aria-label="5 stars">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Icon key={index} name="spark" className="h-4 w-4" />
                  ))}
                </div>
                <p className="font-display mt-5 text-2xl leading-snug tracking-tight">“{story.quote}”</p>
                <div className="mt-6 flex items-center gap-3">
                  <img
                    src={story.photo}
                    alt=""
                    className="avatar-photo h-12 w-12 rounded-full object-cover ring-2 ring-[var(--line)]"
                  />
                  <div>
                    <p className="font-bold">{story.name}</p>
                    <p className="text-sm text-[var(--muted)]">{story.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="w-full px-4 pb-20 sm:px-6 lg:px-8 lg:pb-24">
          <Reveal>
            <div className="band-ink relative w-full overflow-hidden rounded-[28px] px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
              <img
                src="/images/hero-studio.jpg"
                alt=""
                className="kenburns pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35"
              />
              <div className="absolute inset-0 bg-[#10211c]/72" />
              <div className="orb orb-a" />
              <div className="relative z-10 max-w-3xl">
                <p className="text-xs font-bold tracking-[0.16em] text-[#c9a15b] uppercase">Open the room</p>
                <h2 className="font-display mt-4 text-4xl tracking-tight sm:text-6xl">
                  Bring the week into one place before Monday.
                </h2>
                <p className="mt-4 max-w-xl text-[#d9d0c3]">
                  Create a workspace, invite the people who already know the numbers, and keep the rest of the stack for the work it is good at.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button to="/login" variant="light">
                    Create your workspace
                    <Icon name="arrow" className="h-4 w-4" />
                  </Button>
                  <Button to="/dashboard" className="!border-white/20 !bg-transparent !text-[#f6f1e8] hover:!bg-white/10">
                    Preview the dashboard
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </div>
  )
}

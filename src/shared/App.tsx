import { advancedLabs, labs } from './catalog'
import { NetworkWaterfall } from '../labs/NetworkWaterfall'
import { LayoutShift } from '../labs/LayoutShift'
import { ReactRenders } from '../labs/ReactRenders'
import { MemoryLeak } from '../labs/MemoryLeak'
import { LighthouseLongTask } from '../labs/LighthouseLongTask'
import { InpInteraction, LcpDiscovery, RenderingCosts, RequestRaces, ProductionProfile, RumFieldData, MixedCapstone } from '../labs/AdvancedLabs'

const pages = {
  'network-waterfall': NetworkWaterfall,
  'layout-shift': LayoutShift,
  'react-renders': ReactRenders,
  'memory-leak': MemoryLeak,
  'lighthouse-long-task': LighthouseLongTask,
  'inp-interaction': InpInteraction,
  'lcp-discovery': LcpDiscovery,
  'rendering-costs': RenderingCosts,
  'request-races': RequestRaces,
  'production-profile': ProductionProfile,
  'rum-field-data': RumFieldData,
  'mixed-capstone': MixedCapstone,
} as const

export function App() {
  const slug = window.location.pathname.split('/').filter(Boolean).at(-1)
  const active = [...labs, ...advancedLabs].find((lab) => lab.slug === slug)
  const Page = active ? pages[active.slug as keyof typeof pages] : undefined

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="/" aria-label="Browser Debugging Lab home">
          <span className="brand-mark">⌘</span>
          <span>DevTools<span className="brand-light">Gym</span></span>
        </a>
        <p className="nav-caption">THE COURSE</p>
        <nav aria-label="Lessons">
          <a className={`nav-link ${!active ? 'selected' : ''}`} href="/">
            <span className="nav-icon">⌂</span><span>Overview</span>
          </a>
          {labs.map((lab) => (
            <a key={lab.slug} className={`nav-link ${active?.slug === lab.slug ? 'selected' : ''}`} href={`/labs/${lab.slug}`}>
              <span className="nav-number">{lab.number}</span><span className="nav-title">{lab.title}</span>
            </a>
          ))}
          <a className="nav-link advanced-nav-link" href="/#advanced"><span className="nav-number">↗</span><span className="nav-title">Advanced track</span></a>
        </nav>
        <div className="sidebar-note">
          <span className="status-dot" />
          <div><strong>5 core lessons</strong><small>Advanced investigations are optional</small></div>
        </div>
      </aside>
      <main className="main-area">
        <header className="topbar"><span>LEARNING PATH <span className="crumb">/</span> {active?.track === 'advanced' ? 'ADVANCED' : 'CORE'}</span><span className="topbar-right">A hands-on Chrome DevTools course</span></header>
        {Page && active ? <Page /> : <Home />}
      </main>
    </div>
  )
}

function Home() {
  return (
    <div className="content home-content">
      <div className="eyebrow"><span className="eyebrow-line" /> THE PRACTICE ENVIRONMENT</div>
      <h1>Debug the browser.<br /><span>Trust the evidence.</span></h1>
      <p className="lede">Five practical investigations to help you find the cause, choose the right tool, and prove the fix.</p>
      <div className="principle-row">
        <div><span className="principle-icon">◉</span><span><strong>Observe</strong><small>Describe the symptom first</small></span></div>
        <span className="principle-arrow">→</span>
        <div><span className="principle-icon">⌕</span><span><strong>Investigate</strong><small>Find a concrete signal</small></span></div>
        <span className="principle-arrow">→</span>
        <div><span className="principle-icon">↗</span><span><strong>Verify</strong><small>Repeat and compare</small></span></div>
      </div>
      <div className="section-heading"><div><span className="section-kicker">START HERE</span><h2>Core investigations</h2></div><span className="lesson-count">05 LESSONS</span></div>
      <div className="lesson-grid">
        {labs.map((lab) => <a className="lesson-card" href={`/labs/${lab.slug}`} key={lab.slug}>
          <div className="card-top"><span className="card-number">{lab.number}</span><span className="tool-pill">{lab.tool}</span></div>
          <h3>{lab.title}</h3><p>{lab.summary}</p>
          <div className="card-bottom"><span>{lab.minutes}</span><span className="card-arrow">↗</span></div>
        </a>)}
      </div>
      <details className="advanced-section" id="advanced">
      <summary><span><small>OPTIONAL · AFTER THE CORE COURSE</small><strong>Advanced investigations</strong></span><span className="lesson-count">09 LESSONS　＋</span></summary>
      <p className="advanced-intro">Go deeper without changing the short core route. Advanced variants for layout shifts and memory reuse their original lab pages.</p>
      <div className="lesson-grid">
        {advancedLabs.map((lab) => <a className="lesson-card" href={`/labs/${lab.slug}`} key={lab.slug}>
          <div className="card-top"><span className="card-number">{lab.number}</span><span className="tool-pill">{lab.tool}</span></div>
          <h3>{lab.title}</h3><p>{lab.summary}</p>
          <div className="card-bottom"><span>{lab.minutes}</span><span className="card-arrow">↗</span></div>
        </a>)}
        <a className="lesson-card reuse-card" href="/labs/layout-shift?track=advanced"><div className="card-top"><span className="card-number">02+</span><span className="tool-pill">Reuse core route</span></div><h3>More causes of layout shift</h3><p>Fonts, banners, and dynamic content.</p><div className="card-bottom"><span>15–20 min</span><span className="card-arrow">↗</span></div></a>
        <a className="lesson-card reuse-card" href="/labs/memory-leak?track=advanced"><div className="card-top"><span className="card-number">04+</span><span className="tool-pill">Reuse core route</span></div><h3>Deeper memory profiling</h3><p>Compare repeated allocations and retained objects.</p><div className="card-bottom"><span>20–25 min</span><span className="card-arrow">↗</span></div></a>
      </div>
      </details>
      <div className="course-footnote"><span>✳</span><p><strong>Your tutor will guide the investigation one step at a time.</strong> Start with what you observe. Ask for a hint whenever you need one.</p></div>
    </div>
  )
}

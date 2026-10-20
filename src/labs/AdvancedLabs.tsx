import { useEffect, useRef, useState, type ReactNode } from 'react'
import { advancedLabs } from '../shared/catalog'
import { LabFrame } from '../shared/LabFrame'

function AdvancedFrame({ index, children, reset }: { index: number; children: ReactNode; reset?: () => void }) {
  return <LabFrame lab={advancedLabs[index]} reset={reset}>{children}</LabFrame>
}

function DemoCard({ title, children }: { title: string; children: ReactNode }) {
  return <div className="advanced-demo"><span className="dash-kicker">PRACTICE SCENARIO</span><h2>{title}</h2>{children}</div>
}

function busyWork(duration: number) {
  const end = performance.now() + duration
  let n = 0
  while (performance.now() < end) n += Math.sqrt(Math.random() * 500)
  return n
}

export function InpInteraction() {
  const [count, setCount] = useState(0)
  const [mode, setMode] = useState<'busy' | 'light'>('busy')
  function respond() {
    if (mode === 'busy') busyWork(380)
    setCount((value) => value + 1)
  }
  return <AdvancedFrame index={0} reset={() => { setCount(0); setMode('busy') }}><DemoCard title="A control panel that sometimes feels sluggish"><p className="advanced-copy">Use the control, then describe the delay you notice and when it occurs.</p><div className="interaction-widget"><button className="primary-button" onClick={respond}>Apply setting</button><span>Applied {count} times</span></div><button className="text-button" onClick={() => setMode(mode === 'busy' ? 'light' : 'busy')}>Switch scenario ({mode === 'busy' ? 'busy work' : 'light work'})</button></DemoCard></AdvancedFrame>
}

export function LcpDiscovery() {
  const scenario = new URLSearchParams(window.location.search).get('scenario') === 'eager' ? 'eager' : 'late'
  const [visible, setVisible] = useState(scenario === 'eager')
  useEffect(() => {
    if (scenario === 'eager') { setVisible(true); return }
    setVisible(false)
    const timer = window.setTimeout(() => setVisible(true), 1800)
    return () => window.clearTimeout(timer)
  }, [scenario])
  return <AdvancedFrame index={1} reset={() => window.location.assign('/labs/lcp-discovery?scenario=late')}><DemoCard title="A landing page with a late-arriving hero"><p className="advanced-copy">Each scenario link starts a clean navigation. Record both under the same conditions, then compare the LCP element and its delay.</p><div className="scenario-controls"><a className="text-button" href="/labs/lcp-discovery?scenario=late">Reload · late discovery</a><a className="text-button" href="/labs/lcp-discovery?scenario=eager">Reload · eagerly available</a><span>Current · {scenario}</span></div>{visible ? <img className="lcp-art" src="/images/fieldnote-cover.svg" alt="Fieldnote editorial cover" /> : <div className="lcp-placeholder">The lead story is on its way…</div>}<h3>Stories for curious people</h3></DemoCard></AdvancedFrame>
}

export function RenderingCosts() {
  const [mode, setMode] = useState<'layout' | 'paint'>('layout')
  const [run, setRun] = useState(0)
  const [value, setValue] = useState(0)
  function exercise() {
    setRun((n) => n + 1)
    if (mode === 'layout') {
      const cards = Array.from(document.querySelectorAll<HTMLElement>('.layout-card'))
      for (const card of cards) { card.style.width = `${card.offsetWidth + 1}px`; void card.offsetHeight }
    } else busyWork(80)
    setValue((n) => n + 1)
  }
  return <AdvancedFrame index={2} reset={() => { setRun(0); setValue(0); setMode('layout') }}><DemoCard title="A dashboard interaction feels rough"><p className="advanced-copy">Two cases share one route. Record each separately and compare Main, Layout, and paint activity.</p><div className="scenario-controls"><button className="text-button" onClick={() => setMode('layout')}>Case A · layout</button><button className="text-button" onClick={() => setMode('paint')}>Case B · paint</button><span>{mode === 'layout' ? 'Layout reads/writes' : 'Large blurred surface'}</span></div><button className="primary-button" onClick={exercise}>Recalculate dashboard</button><span className="scenario-count">Runs {run} · state {value}</span><div className={`render-surface ${mode === 'paint' ? 'paint-heavy' : ''}`}>{Array.from({ length: 24 }, (_, i) => <div className="layout-card" key={i}>Metric {i + 1}</div>)}</div></DemoCard></AdvancedFrame>
}

type RaceResult = { query: string; results: string[]; delay: number }
export function RequestRaces() {
  const [result, setResult] = useState<RaceResult | null>(null)
  const [pending, setPending] = useState(0)
  async function search(query: 'slow' | 'fast') {
    setPending((n) => n + 1)
    const response = await fetch(`/api/race?query=${query}`)
    const data = await response.json() as RaceResult
    setResult(data)
    setPending((n) => n - 1)
  }
  return <AdvancedFrame index={3} reset={() => { setResult(null); setPending(0) }}><DemoCard title="Search results that can arrive out of order"><p className="advanced-copy">Click Slow search, then quickly click Fast search. Network contains real delayed requests.</p><div className="interaction-widget"><button className="primary-button" onClick={() => void search('slow')}>Slow search</button><button className="primary-button" onClick={() => void search('fast')}>Fast search</button></div><p className="race-status">{pending ? `${pending} request(s) in flight` : 'No requests in flight'}{result ? ` · Showing ${result.query} response (${result.delay} ms)` : ''}</p><div className="race-results">{result?.results.map((item) => <div key={item}>{item}</div>) ?? 'Search results will appear here.'}</div></DemoCard></AdvancedFrame>
}

export function ProductionProfile() {
  const [count, setCount] = useState(0)
  return <AdvancedFrame index={4} reset={() => setCount(0)}><DemoCard title="The same interaction, two different builds"><p className="advanced-copy">Profile this control in dev and production. Compare the trace shape, not just a single duration.</p><button className="primary-button" onClick={() => { busyWork(90); setCount((n) => n + 1) }}>Rebuild preview ({count})</button><div className="production-note"><strong>Production preview</strong><code>npm run build &amp;&amp; npm run preview</code><span>Use source maps only when available; dev-only instrumentation and Strict Mode can change traces.</span></div></DemoCard></AdvancedFrame>
}

const sessions = [
  { release: '2.4.0', device: 'Mobile', route: '/search', inp: 310, lcp: 3.2 }, { release: '2.4.0', device: 'Mobile', route: '/search', inp: 285, lcp: 2.9 },
  { release: '2.4.0', device: 'Desktop', route: '/search', inp: 105, lcp: 1.5 }, { release: '2.4.1', device: 'Mobile', route: '/search', inp: 175, lcp: 2.3 },
  { release: '2.4.1', device: 'Mobile', route: '/search', inp: 190, lcp: 2.5 }, { release: '2.4.1', device: 'Desktop', route: '/search', inp: 85, lcp: 1.4 },
  { release: '2.4.1', device: 'Mobile', route: '/article', inp: 120, lcp: 2.1 }, { release: '2.4.0', device: 'Mobile', route: '/article', inp: 110, lcp: 1.9 },
]
function percentile(values: number[], p: number) { const sorted = [...values].sort((a, b) => a - b); return sorted[Math.ceil(p * sorted.length) - 1] }
export function RumFieldData() {
  const mobile = sessions.filter((row) => row.device === 'Mobile')
  const searchRows = mobile.filter((row) => row.route === '/search')
  const v240 = searchRows.filter((row) => row.release === '2.4.0')
  const v241 = searchRows.filter((row) => row.release === '2.4.1')
  return <AdvancedFrame index={5}><DemoCard title="A release changed the field experience"><p className="advanced-copy">This small dataset is simulated for practice. Compare the same device and route cohort; p75 is not the average.</p><div className="rum-summary"><div><small>2.4.0 · mobile /search INP p75</small><strong>{percentile(v240.map((r) => r.inp), .75)} ms</strong></div><div><small>2.4.1 · mobile /search INP p75</small><strong>{percentile(v241.map((r) => r.inp), .75)} ms</strong></div><div><small>2.4.0 · mobile /search LCP p75</small><strong>{percentile(v240.map((r) => r.lcp), .75)} s</strong></div><div><small>2.4.1 · mobile /search LCP p75</small><strong>{percentile(v241.map((r) => r.lcp), .75)} s</strong></div></div><div className="rum-table"><div className="rum-row rum-head"><span>Release</span><span>Device / route</span><span>INP</span><span>LCP</span></div>{sessions.map((row, i) => <div className="rum-row" key={i}><span>{row.release}</span><span>{row.device} · {row.route}</span><span>{row.inp} ms</span><span>{row.lcp} s</span></div>)}</div></DemoCard></AdvancedFrame>
}

declare global {
  interface Window { __capstoneRetainers?: number }
}

function CapstoneFilter() {
  const nodeRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const node = nodeRef.current
    if (!node) return
    const onResize = () => { node.dataset.width = String(window.innerWidth) }
    window.addEventListener('resize', onResize)
    window.__capstoneRetainers = (window.__capstoneRetainers ?? 0) + 1
    // Intentional capstone clue: the global listener retains this detached filter.
  }, [])
  return <div className="capstone-filter" ref={nodeRef}>Filter options · Updated just now</div>
}

export function MixedCapstone() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [result, setResult] = useState<RaceResult | null>(null)
  const [pending, setPending] = useState(0)
  async function runSearch(speed: 'slow' | 'fast') {
    setPending((n) => n + 1)
    const response = await fetch(`/api/race?query=${speed}`)
    const data = await response.json() as RaceResult
    setResult(data)
    setPending((n) => n - 1)
  }
  return <AdvancedFrame index={6} reset={() => { window.location.reload() }}><DemoCard title="The search page feels worse after a few minutes"><p className="advanced-copy">A support ticket mentions slow search, occasional stale results, and a tab that grows heavier. Choose what to reproduce first.</p><label className="field-label">Product search<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try 'notebook'" /></label><p className="capstone-suggestions">{Array.from({ length: 40 }, (_, i) => `${query || 'Popular item'} ${i + 1}`).join(' · ')}</p><div className="interaction-widget"><button className="primary-button" onClick={() => void runSearch('slow')}>Run slow request</button><button className="primary-button" onClick={() => void runSearch('fast')}>Run fast request</button></div><p className="race-status">{pending} request(s) in flight {result && `· showing ${result.query} response`}</p><div className="race-results">{result?.results.join(' · ') ?? 'Search results will appear here.'}</div><div className="capstone-controls"><button className="text-button" onClick={() => setOpen((v) => !v)}>{open ? 'Close filters' : 'Open filters'}</button>{open && <CapstoneFilter />}</div><p className="advanced-copy">Use Network, React Profiler, and Memory to decide which evidence explains user impact—and which may be a distraction.</p></DemoCard></AdvancedFrame>
}

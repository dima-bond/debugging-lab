import { useEffect, useState } from 'react'
import { LabFrame } from '../shared/LabFrame'
import { labs } from '../shared/catalog'

function runHeavyWork(durationMs: number) {
  const until = performance.now() + durationMs
  let value = 0
  while (performance.now() < until) value += Math.sqrt(Math.random() * 1000)
  return value
}

export function LighthouseLongTask() {
  const [completed, setCompleted] = useState(false)
  const [run, setRun] = useState(0)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      runHeavyWork(1050)
      setCompleted(true)
    })
    return () => window.cancelAnimationFrame(frame)
  }, [run])

  return <LabFrame lab={labs[4]} reset={() => { setCompleted(false); setRun((value) => value + 1) }}>
    <div className="report-demo"><div className="report-header"><div className="report-mark">◉</div><div><strong>FIELDNOTE</strong><small>Stories for curious people</small></div><button>Subscribe</button></div>
      <div className="report-story"><div className="report-copy"><span className="report-category">CULTURE &amp; CRAFT</span><h2>The art of taking your time</h2><p>On small rituals, thoughtful work, and the things worth doing slowly.</p><div className="report-author"><span className="author-avatar">EL</span><span><b>Emma Laurent</b><small>8 min read · June 16</small></span></div></div><img className="report-art" src="/images/fieldnote-cover.svg" alt="Illustrated Fieldnote magazine cover" /></div>
      <div className="report-bottom"><span>{completed ? 'PAGE READY' : 'LOADING PAGE'}</span><button onClick={() => { setCompleted(false); setRun((value) => value + 1) }}>Run the page again ↻</button></div>
    </div>
  </LabFrame>
}

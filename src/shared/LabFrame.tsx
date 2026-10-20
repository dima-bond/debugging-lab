import type { ReactNode } from 'react'
import type { Lab } from './catalog'

export function LabFrame({ lab, children, reset }: { lab: Lab; children: ReactNode; reset?: () => void }) {
  return <div className="content lab-content">
    <div className="lab-breadcrumb"><a href="/">Course</a><span>/</span><span>Lesson {lab.number}</span></div>
    <div className="lab-heading-row"><div><div className="eyebrow"><span className="eyebrow-line" /> INVESTIGATION {lab.number}</div><h1>{lab.title}</h1><p className="lede">{lab.summary}</p></div><span className="tool-pill large-pill">{lab.tool}</span></div>
    <div className="mission-banner"><span className="mission-icon">◎</span><div><strong>Your mission</strong><p>Explore the page and describe what you notice before opening the source code.</p></div><span className="mission-time">{lab.minutes}</span></div>
    <div className="lab-workspace"><section className="demo-panel"><div className="panel-title"><span><i className="live-dot" /> LIVE SCENARIO</span>{reset && <button className="text-button" onClick={reset}>↻ Reset scenario</button>}</div>{children}</section>
      <aside className="tutor-panel"><div className="tutor-heading"><span className="tutor-avatar">✳</span><div><strong>Investigation guide</strong><small>Work through the checkpoint</small></div></div><div className="tutor-copy"><p>Before you open DevTools:</p><p className="tutor-question">What do you observe? When does it happen, and what action reproduces it?</p><p>Tell your Codex tutor what you see. It will help you choose a tool and ask for evidence before suggesting a fix.</p></div><div className="tutor-hint"><span>TIP</span><p>Use the <kbd>hint ladder</kbd> in the checkpoint if you get stuck. Try each hint before asking for the answer.</p></div></aside></div>
    <div className="lab-footer"><a href="/">← All lessons</a><span>Keep a note of your evidence and before/after result.</span></div>
  </div>
}

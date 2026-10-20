import { useEffect, useRef, useState } from 'react'
import { LabFrame } from '../shared/LabFrame'
import { labs } from '../shared/catalog'

declare global {
  interface Window { __labListenerCount?: number }
}

function PreviewWidget({ id }: { id: number }) {
  const nodeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = nodeRef.current
    if (!node) return
    const onResize = () => { node.dataset.width = String(window.innerWidth) }
    window.addEventListener('resize', onResize)
    window.__labListenerCount = (window.__labListenerCount ?? 0) + 1
    // Intentional bug: the listener is never removed on unmount.
    // Its closure keeps this now-detached node alive.
  }, [])

  return <div className="retained-preview" ref={nodeRef}>Preview {id} · waiting for resize</div>
}

export function MemoryLeak() {
  const [mounted, setMounted] = useState(false)
  const [mountCount, setMountCount] = useState(0)
  function toggle() {
    if (mounted) {
      setMounted(false)
    } else {
      setMountCount((count) => count + 1)
      setMounted(true)
    }
  }

  return <LabFrame lab={labs[3]} reset={() => window.location.reload()}>
    <div className="memory-demo"><div className="memory-top"><span className="memory-icon">◌</span><div><span className="dash-kicker">WORKSPACE SETTINGS</span><h2>Live preview</h2></div><span className="memory-status">{mounted ? 'ACTIVE' : 'PAUSED'}</span></div>
      <p className="memory-copy">Mount and close this preview a few times. The workspace should release everything when it closes.</p>
      <div className="widget-area">{mounted ? <PreviewWidget id={mountCount} /> : <div className="widget-placeholder"><span>◌</span><small>Preview is closed</small></div>}</div>
      <div className="memory-controls"><button className="primary-button" onClick={toggle}>{mounted ? 'Close preview' : 'Open preview'} <span>{mounted ? '×' : '+'}</span></button><span>OPENED <strong>{mountCount}</strong> TIMES</span></div>
      <div className="memory-readout"><span><i className={`live-dot ${mounted ? '' : 'muted-dot'}`} /> LISTENERS AFTER CLOSE</span><strong>{window.__labListenerCount ?? 0}</strong></div>
      <p className="memory-footnote">For a clean comparison, record a baseline, open and close the widget several times, then take another heap snapshot.</p>
    </div>
  </LabFrame>
}

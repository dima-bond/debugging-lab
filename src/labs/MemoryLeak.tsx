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
  const advanced = new URLSearchParams(window.location.search).get('track') === 'advanced'
  const [mounted, setMounted] = useState(false)
  const [mountCount, setMountCount] = useState(0)
  const [allocations, setAllocations] = useState<string[][]>([])
  function toggle() {
    if (mounted) {
      setMounted(false)
    } else {
      setMountCount((count) => count + 1)
      setMounted(true)
    }
  }

  return <LabFrame lab={labs[3]} reset={() => window.location.reload()}>
    {advanced && <div className="advanced-mode-banner"><strong>Advanced · Allocation and retention</strong><span>Profile repeated actions in Memory; heap growth alone is not proof of a leak.</span><a href="/labs/memory-leak">Back to core</a></div>}
    <div className="memory-demo"><div className="memory-top"><span className="memory-icon">◌</span><div><span className="dash-kicker">WORKSPACE SETTINGS</span><h2>Live preview</h2></div><span className="memory-status">{mounted ? 'ACTIVE' : 'PAUSED'}</span></div>
      <p className="memory-copy">Mount and close this preview a few times. The workspace should release everything when it closes.</p>
      <div className="widget-area">{mounted ? <PreviewWidget id={mountCount} /> : <div className="widget-placeholder"><span>◌</span><small>Preview is closed</small></div>}</div>
      <div className="memory-controls"><button className="primary-button" onClick={toggle}>{mounted ? 'Close preview' : 'Open preview'} <span>{mounted ? '×' : '+'}</span></button><span>OPENED <strong>{mountCount}</strong> TIMES</span></div>
      <div className="memory-readout"><span><i className={`live-dot ${mounted ? '' : 'muted-dot'}`} /> LISTENERS AFTER CLOSE</span><strong>{window.__labListenerCount ?? 0}</strong></div>
      <p className="memory-footnote">For a clean comparison, record a baseline, open and close the widget several times, then take another heap snapshot.</p>
      {advanced && <div className="memory-advanced"><h3>Allocation timeline exercise</h3><p>Take a baseline, record allocations, then add and clear these batches. Compare live memory after garbage collection and inspect what remains reachable.</p><div className="interaction-widget"><button className="primary-button" onClick={() => setAllocations((current) => [...current, Array.from({ length: 12000 }, (_, i) => `record-${current.length}-${i}-${'x'.repeat(40)}`)])}>Allocate batch</button><button className="text-button" onClick={() => setAllocations([])}>Clear retained batches</button><span>{allocations.length} batch(es) retained by this page</span></div></div>}
    </div>
  </LabFrame>
}

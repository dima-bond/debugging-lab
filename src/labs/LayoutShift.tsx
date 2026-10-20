import { useEffect, useState } from 'react'
import { LabFrame } from '../shared/LabFrame'
import { labs } from '../shared/catalog'

export function LayoutShift() {
  const advanced = new URLSearchParams(window.location.search).get('track') === 'advanced'
  const [showArt, setShowArt] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const [advancedCase, setAdvancedCase] = useState<'font' | 'banner' | 'content'>('font')

  useEffect(() => {
    const timer = window.setTimeout(() => setShowArt(true), 850)
    return () => window.clearTimeout(timer)
  }, [attempt])

  function reset() {
    setShowArt(false)
    setAttempt((value) => value + 1)
  }

  return <LabFrame lab={labs[1]} reset={reset}>
    {advanced && <div className="advanced-mode-banner"><strong>Advanced · Layout shift variants</strong><span>The core scenario is unchanged unless you choose a case below.</span><a href="/labs/layout-shift">Back to core</a></div>}
    <div className="checkout"><div className="checkout-header"><span>ASTER &amp; ROW</span><span>01 — YOUR BAG</span></div><div className="checkout-body"><div><span className="checkout-step">CHECKOUT · STEP 1 OF 2</span><h2>Almost yours.</h2><p>Good things take a little care. Review your order before you continue.</p>
      {!advanced && showArt && <img className="checkout-art" src="/images/canvas-tote.svg" alt="Canvas tote bag in warm sand color" />}
      {advanced && <><div className="scenario-controls"><button className="text-button" onClick={() => setAdvancedCase('font')}>Font swap</button><button className="text-button" onClick={() => setAdvancedCase('banner')}>Late banner</button><button className="text-button" onClick={() => setAdvancedCase('content')}>Dynamic content</button><button className="text-button" onClick={reset}>Replay</button></div><div className={`shift-variant ${showArt ? `shift-${advancedCase}` : ''}`} key={advancedCase}>{showArt && (advancedCase === 'font' ? 'Thoughtful everyday essentials' : advancedCase === 'banner' ? <span className="late-banner">Free shipping on orders over €50</span> : <span>Delivery estimate: 2–3 business days · Gift wrap available</span>)}</div></>}
      <div className="checkout-item"><span>01</span><strong>Everyday canvas tote</strong><span>€28.00</span></div>
      <button className="checkout-button">Continue to delivery <span>→</span></button><small className="checkout-secure">✳ &nbsp; Secure checkout · Free returns</small>
    </div><div className="order-note"><span>PACKED WITH PURPOSE</span><p>Made slowly, made to stay. We use responsibly sourced canvas and ship in plastic-free packaging.</p><b>EST. 2021 · COPENHAGEN</b></div></div></div>
  </LabFrame>
}

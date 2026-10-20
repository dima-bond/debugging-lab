import { useEffect, useState } from 'react'
import { LabFrame } from '../shared/LabFrame'
import { labs } from '../shared/catalog'

export function LayoutShift() {
  const [showArt, setShowArt] = useState(false)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const timer = window.setTimeout(() => setShowArt(true), 850)
    return () => window.clearTimeout(timer)
  }, [attempt])

  function reset() {
    setShowArt(false)
    setAttempt((value) => value + 1)
  }

  return <LabFrame lab={labs[1]} reset={reset}>
    <div className="checkout"><div className="checkout-header"><span>ASTER &amp; ROW</span><span>01 — YOUR BAG</span></div><div className="checkout-body"><div><span className="checkout-step">CHECKOUT · STEP 1 OF 2</span><h2>Almost yours.</h2><p>Good things take a little care. Review your order before you continue.</p>
      {showArt && <img className="checkout-art" src="/images/canvas-tote.svg" alt="Canvas tote bag in warm sand color" />}
      <div className="checkout-item"><span>01</span><strong>Everyday canvas tote</strong><span>€28.00</span></div>
      <button className="checkout-button">Continue to delivery <span>→</span></button><small className="checkout-secure">✳ &nbsp; Secure checkout · Free returns</small>
    </div><div className="order-note"><span>PACKED WITH PURPOSE</span><p>Made slowly, made to stay. We use responsibly sourced canvas and ship in plastic-free packaging.</p><b>EST. 2021 · COPENHAGEN</b></div></div></div>
  </LabFrame>
}

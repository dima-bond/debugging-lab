import { useEffect, useState } from 'react'
import { LabFrame } from '../shared/LabFrame'
import { labs } from '../shared/catalog'

export function LayoutShift() {
  const advanced = new URLSearchParams(window.location.search).get('track') === 'advanced'
  const [showArt, setShowArt] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const [advancedCase, setAdvancedCase] = useState<'font' | 'banner' | 'content'>('font')
  const [loadedFontFamily, setLoadedFontFamily] = useState<string | null>(null)

  useEffect(() => {
    setShowArt(false)
    setLoadedFontFamily(null)

    if (advanced && advancedCase === 'font') {
      let cancelled = false
      let loadedFace: FontFace | undefined
      const family = `Lab Playfair ${attempt}`
      const face = new FontFace(
        family,
        `url(/fonts/slow-playfair-display.woff2?attempt=${attempt})`,
        { style: 'normal', weight: '400' },
      )

      void face.load().then((font) => {
        if (cancelled) return
        loadedFace = font
        document.fonts.add(font)
        setLoadedFontFamily(family)
      })

      return () => {
        cancelled = true
        if (loadedFace) document.fonts.delete(loadedFace)
      }
    }

    const timer = window.setTimeout(() => setShowArt(true), 850)
    return () => window.clearTimeout(timer)
  }, [advanced, advancedCase, attempt])

  function reset() {
    setShowArt(false)
    setAttempt((value) => value + 1)
  }

  function selectAdvancedCase(next: 'font' | 'banner' | 'content') {
    setAdvancedCase(next)
    setShowArt(false)
    setAttempt((value) => value + 1)
  }

  return <LabFrame lab={labs[1]} reset={reset}>
    {advanced && <div className="advanced-mode-banner"><strong>Advanced · Layout shift variants</strong><span>The core scenario is unchanged unless you choose a case below.</span><a href="/labs/layout-shift">Back to core</a></div>}
    <div className="checkout"><div className="checkout-header"><span>ASTER &amp; ROW</span><span>01 — YOUR BAG</span></div><div className="checkout-body"><div><span className="checkout-step">CHECKOUT · STEP 1 OF 2</span><h2>Almost yours.</h2><p>Good things take a little care. Review your order before you continue.</p>
      {!advanced && showArt && <img className="checkout-art" src="/images/canvas-tote.svg" alt="Canvas tote bag in warm sand color" />}
      {advanced && <><div className="scenario-controls"><button className="text-button" onClick={() => selectAdvancedCase('font')}>Font swap</button><button className="text-button" onClick={() => selectAdvancedCase('banner')}>Late banner</button><button className="text-button" onClick={() => selectAdvancedCase('content')}>Dynamic content</button><button className="text-button" onClick={reset}>Replay</button></div><div className={`shift-variant ${advancedCase !== 'font' && showArt ? `shift-${advancedCase}` : ''}`} key={advancedCase}>{advancedCase === 'font' ? <span className="font-swap-target" style={{ fontFamily: loadedFontFamily ? `"${loadedFontFamily}", Georgia, serif` : 'Arial, sans-serif' }}>Thoughtful everyday essentials</span> : showArt && (advancedCase === 'banner' ? <span className="late-banner">Free shipping on orders over €50</span> : <span>Delivery estimate: 2–3 business days · Gift wrap available</span>)}</div></>}
      <div className="checkout-item"><span>01</span><strong>Everyday canvas tote</strong><span>€28.00</span></div>
      <button className="checkout-button">Continue to delivery <span>→</span></button><small className="checkout-secure">✳ &nbsp; Secure checkout · Free returns</small>
    </div><div className="order-note"><span>PACKED WITH PURPOSE</span><p>Made slowly, made to stay. We use responsibly sourced canvas and ship in plastic-free packaging.</p><b>EST. 2021 · COPENHAGEN</b></div></div></div>
  </LabFrame>
}

import { useState } from 'react'
import { LabFrame } from '../shared/LabFrame'
import { labs } from '../shared/catalog'

type Item = { name: string; category: string; price: string }

async function loadCatalog<T>(resource: string): Promise<T> {
  const response = await fetch(`/api/catalog/${resource}`)
  if (!response.ok) throw new Error(`Request failed: ${response.status}`)
  return response.json() as Promise<T>
}

export function NetworkWaterfall() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [run, setRun] = useState(0)

  async function search() {
    setItems([])
    setLoading(true)
    setError('')
    setRun((value) => value + 1)
    try {
      const categories = await loadCatalog<{ id: string; label: string }[]>('categories')
      const products = await loadCatalog<{ name: string; category: string }[]>('products')
      const prices = await loadCatalog<{ price: string }[]>('prices')
      setItems(products.map((product, index) => ({ ...product, price: prices[index]?.price ?? '—' })))
      void categories
    } catch {
      setError('Could not load product results. Check the Network panel.')
    } finally {
      setLoading(false)
    }
  }

  return <LabFrame lab={labs[0]} reset={() => { setItems([]); setLoading(false); setError('') }}>
    <div className="storefront"><div className="store-brand"><span className="store-symbol">N</span><div><strong>Northstar Supply</strong><small>Tools for everyday work</small></div><span className="store-bag">♧</span></div>
      <div className="store-hero"><span className="store-kicker">THE FIELD COLLECTION</span><h2>Find your next<br />everyday essential.</h2><p>Thoughtful gear, built to last.</p><button className="primary-button" onClick={search} disabled={loading}>{loading ? 'Finding products…' : 'Browse the collection'} <span>→</span></button></div>
      <div className="results-bar"><span>COLLECTION RESULTS {run > 0 && <small>· SEARCH {run}</small>}</span><span>3 ITEMS</span></div>
      {error && <p className="error-message">{error}</p>}
      <div className="product-list">{items.map((item) => <div className="product-row" key={item.name}><span className="product-thumbnail">✳</span><span><strong>{item.name}</strong><small>{item.category}</small></span><b>{item.price}</b></div>)}{!items.length && <p className="empty-results">{loading ? 'Gathering the collection…' : 'Your collection will appear here.'}</p>}</div>
    </div>
  </LabFrame>
}

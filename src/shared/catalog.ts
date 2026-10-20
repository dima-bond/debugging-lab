export type Lab = {
  slug: string
  number: string
  title: string
  tool: string
  summary: string
  minutes: string
  track?: 'core' | 'advanced'
}

export const labs: Lab[] = [
  { slug: 'network-waterfall', number: '01', title: 'A slow product search', tool: 'Network', summary: 'Find why independent data waits in line.', minutes: '15–20 min' },
  { slug: 'layout-shift', number: '02', title: 'The moving checkout button', tool: 'Performance', summary: 'Track down a page that shifts after loading.', minutes: '15–20 min' },
  { slug: 'react-renders', number: '03', title: 'Why did this render?', tool: 'React Profiler', summary: 'Separate useful work from unnecessary updates.', minutes: '20–25 min' },
  { slug: 'memory-leak', number: '04', title: 'The tab gets slower over time', tool: 'Memory', summary: 'Find what stays alive after a component disappears.', minutes: '20–25 min' },
  { slug: 'lighthouse-long-task', number: '05', title: 'A poor Lighthouse report', tool: 'Lighthouse + Performance', summary: 'Turn an audit finding into a trace-backed cause.', minutes: '20–25 min' },
]

export const advancedLabs: Lab[] = [
  { slug: 'inp-interaction', number: 'A1', title: 'Why does this click feel slow?', tool: 'Performance', summary: 'Separate input delay, handler work, rendering, and paint.', minutes: '20–25 min', track: 'advanced' },
  { slug: 'lcp-discovery', number: 'A2', title: 'The hero arrives late', tool: 'Network + Performance', summary: 'Find where the LCP element loses time.', minutes: '20–25 min', track: 'advanced' },
  { slug: 'rendering-costs', number: 'A3', title: 'When rendering does the expensive work', tool: 'Performance', summary: 'Investigate forced layout and costly paint as separate cases.', minutes: '25–30 min', track: 'advanced' },
  { slug: 'request-races', number: 'A4', title: 'The results go backwards', tool: 'Network', summary: 'Trace stale responses and race-safe request behavior.', minutes: '20–25 min', track: 'advanced' },
  { slug: 'production-profile', number: 'A5', title: 'Does the slowdown survive production?', tool: 'Performance', summary: 'Compare development and production profiling carefully.', minutes: '20–25 min', track: 'advanced' },
  { slug: 'rum-field-data', number: 'A6', title: 'What do real users experience?', tool: 'RUM + Web Vitals', summary: 'Read field distributions, p75, and release/device segments.', minutes: '20–25 min', track: 'advanced' },
  { slug: 'mixed-capstone', number: 'A7', title: 'A production-style investigation', tool: 'Network + React + Memory', summary: 'Choose which overlapping signal best explains user impact.', minutes: '30–40 min', track: 'advanced' },
]

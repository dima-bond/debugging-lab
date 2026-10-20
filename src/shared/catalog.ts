export type Lab = {
  slug: string
  number: string
  title: string
  tool: string
  summary: string
  minutes: string
}

export const labs: Lab[] = [
  { slug: 'network-waterfall', number: '01', title: 'A slow product search', tool: 'Network', summary: 'Find why independent data waits in line.', minutes: '15–20 min' },
  { slug: 'layout-shift', number: '02', title: 'The moving checkout button', tool: 'Performance', summary: 'Track down a page that shifts after loading.', minutes: '15–20 min' },
  { slug: 'react-renders', number: '03', title: 'Why did this render?', tool: 'React Profiler', summary: 'Separate useful work from unnecessary updates.', minutes: '20–25 min' },
  { slug: 'memory-leak', number: '04', title: 'The tab gets slower over time', tool: 'Memory', summary: 'Find what stays alive after a component disappears.', minutes: '20–25 min' },
  { slug: 'lighthouse-long-task', number: '05', title: 'A poor Lighthouse report', tool: 'Lighthouse + Performance', summary: 'Turn an audit finding into a trace-backed cause.', minutes: '20–25 min' },
]

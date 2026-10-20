import { createContext, useContext, useState } from 'react'
import { LabFrame } from '../shared/LabFrame'
import { labs } from '../shared/catalog'

type WorkspaceContextValue = { team: string; activeProject: string }
const WorkspaceContext = createContext<WorkspaceContextValue>({ team: 'Studio North', activeProject: 'Spring launch' })

function ProjectRow({ index }: { index: number }) {
  const workspace = useContext(WorkspaceContext)
  return <div className="project-row"><span className={`project-dot dot-${index % 4}`} />
    <span><strong>{['Brand refresh', 'Landing page', 'Field notes', 'New collection'][index % 4]}</strong><small>{workspace.team} · {workspace.activeProject}</small></span>
    <span className="project-owner">{['AM', 'JL', 'SK', 'RT'][index % 4]}</span></div>
}

export function ReactRenders() {
  const [clock, setClock] = useState(9)
  const [refreshes, setRefreshes] = useState(0)
  return <LabFrame lab={labs[2]} reset={() => { setClock(9); setRefreshes(0) }}>
    <div className="dashboard"><div className="dash-top"><div><span className="dash-kicker">MONDAY, 16 JUNE</span><h2>Good morning, Alex.</h2></div><span className="avatar">AM</span></div>
      <div className="dash-stats"><div><small>MY FOCUS</small><strong>{clock}:00 <button aria-label="Increase focus time" onClick={() => setClock((value) => value + 1)}>＋</button></strong></div><div><small>OPEN PROJECTS</small><strong>12</strong></div><div><small>TEAM</small><strong>04</strong></div></div>
      <div className="dash-list-head"><strong>Recent projects</strong><button onClick={() => setRefreshes((value) => value + 1)}>Refresh ↻</button></div>
      <WorkspaceContext.Provider value={{ team: 'Studio North', activeProject: `Spring launch · refresh ${refreshes}` }}>
        <div className="project-list">{Array.from({ length: 12 }, (_, index) => <ProjectRow key={index} index={index} />)}</div>
      </WorkspaceContext.Provider>
      <p className="dash-footnote">Tip: record one interaction in React DevTools Profiler and compare commits.</p>
    </div>
  </LabFrame>
}

# Browser Debugging Lab

A small React app with five deliberately imperfect scenarios for learning to investigate browser behavior with Chrome DevTools.

## Start the app

Use Node.js `^20.19.0` or `>=22.12.0` (Vite 8 requirement), then:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite in Chrome. The Vite server also hosts the delayed mock API used by lesson 01, so frontend and API run together with this one command. Install the React Developer Tools extension before lesson 03. Lighthouse works best in a fresh Chrome tab with other heavy apps closed.

## How to take the course

Open this repository in Codex and ask the agent to start the next lesson. The tutor follows `AGENTS.md` and one file in `agent-guide/checkpoints/` at a time. Each lesson starts with observation, then asks for evidence in DevTools, a hypothesis, a learner-made fix, and a repeat measurement.

Do not inspect the implementation before trying to describe the symptom. Source inspection is part of the investigation only after the trace or panel has narrowed the cause.

## Core lessons

| Lesson | Route | Main tool |
|---|---|---|
| 01 · A slow product search | `/labs/network-waterfall` | Network |
| 02 · The moving checkout button | `/labs/layout-shift` | Performance |
| 03 · Why did this render? | `/labs/react-renders` | React DevTools Profiler |
| 04 · The tab gets slower over time | `/labs/memory-leak` | Memory |
| 05 · A poor Lighthouse report | `/labs/lighthouse-long-task` | Lighthouse + Performance |

These are intentionally flawed exercises. The agent guide contains answer keys so the tutor can assess evidence and guide you without revealing the cause at the start.

## After the five core lessons

Checkpoint 05 ends with a progress review and an invitation to continue into advanced investigations: INP and long tasks, LCP discovery/render-blocking, forced reflow and layout thrashing, font/image shifts, request races and stale responses, detached DOM and allocation profiling, production source maps, RUM and lab-vs-field comparisons, plus mixed production-style capstones.

## Build

```sh
npm run build
npm run preview
```

# Checkpoint 04 — The tab gets slower over time

## Tutor objective
Teach the learner to test lifecycle cleanup through repeated mount/unmount, compare heap snapshots, and find retained detached DOM.

## Route and setup
Open `/labs/memory-leak`. Open DevTools > Memory. Take a baseline heap snapshot. Open and close the preview 5–10 times, then capture another snapshot. The page includes a listener counter as a scenario clue; use the heap snapshot to identify what remains retained.

## Learner-facing opening
“This tab feels fine at first and becomes heavier after repeated use. What repeatable action could test whether closing the preview releases its resources?”

Do not initially say “event listener leak” or identify the retained node.

## Theory primer — deliver after the learner describes the repeated slowdown
Explain briefly: “A memory leak happens when the application keeps references to data it no longer needs, so the browser cannot reclaim it. As retained objects accumulate, memory pressure and garbage-collection work can grow, making a tab slower; an extreme case can make it crash. A high memory reading once is not enough to prove a leak, because browsers may keep memory available for reuse. The useful signal is what remains retained after the same action is repeated.”

Do not use this primer to name the listener, detached element, or Memory panel. After the learner describes the symptom, ask what should stop being reachable when the preview closes and how they could tell whether that happened.

## Hint ladder
1. “What should become unreachable when the preview closes?”
2. “Compare two heap snapshots after repeating the same open/close cycle.”
3. “Search for detached elements and inspect their retaining path. Which global object keeps the path alive?”

## Required evidence
- Show that the listener count grows after close/unmount.
- Compare snapshots and find retained detached preview nodes or their retaining path.
- Connect the retained callback to the component's lifecycle.

## Answer key
`PreviewWidget` registers a `resize` listener on `window` in an effect. The callback closes over the widget's DOM node. React removes the rendered node on unmount, but the global listener is never removed; `window` retains the callback, which retains the detached node. The displayed listener count is only a clue; the snapshot/retaining path is the stronger evidence.

## Fix direction
Return an effect cleanup that removes the exact `onResize` callback from `window`. Keep listener registration and removal paired in the same effect.

## Verification
Reload for a clean baseline, take a snapshot, repeat mount/unmount cycles, and capture another. Confirm the listener count stays stable and detached preview nodes are no longer retained by resize callbacks.

## Completion rubric
The learner distinguishes allocation from retention, identifies the retaining path, adds lifecycle cleanup, and compares snapshots after the same repeated actions.

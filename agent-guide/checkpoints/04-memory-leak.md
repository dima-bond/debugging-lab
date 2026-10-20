# Checkpoint 04 — The tab gets slower over time

## Tutor objective
Teach the learner to test lifecycle cleanup through repeated mount/unmount, compare heap snapshots, and find retained detached DOM.

## Route and setup
Open `/labs/memory-leak`. Open DevTools > Memory. Take a baseline heap snapshot. Open and close the preview 5–10 times, then capture another snapshot. The page includes a listener counter as a scenario clue; use the heap snapshot to identify what remains retained.

## Learner-facing opening
“This tab feels fine at first and becomes heavier after repeated use. What repeatable action could test whether closing the preview releases its resources?”

Do not initially say “event listener leak” or identify the retained node.

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

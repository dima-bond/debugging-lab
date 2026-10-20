# Checkpoint 03 — Why did this render?

## Tutor objective
Teach the learner to use React DevTools Profiler to distinguish context-driven updates from parent-driven renders and verify a complete render-boundary fix.

## Route and setup
Open `/labs/react-renders`. Install/enable React Developer Tools in Chrome. In the Profiler settings, enable `Record why each component rendered while profiling` before recording; without it the learner may only see `Rendered at`. Make a baseline recording, change “My focus” once, stop recording, and inspect a `ProjectRow` commit.

## Learner-facing opening
“Change the focus time by one hour. Which parts of the dashboard appear to respond to that action?”

Do not initially mention context identity or memoization.

## Hint ladder
1. “Is the changed value used by the list of recent projects?”
2. “With `Record why each component rendered while profiling` enabled, record one click in React DevTools Profiler and inspect the committed tree.”
3. “Select a `ProjectRow` commit and read `Why did this render?`. Which value or parent changed?”

## Required evidence
- In a baseline recording, identify project rows committed after changing only focus time and read `Why did this render?` for `ProjectRow`.
- Explain the recorded reason and connect it to the Provider being recreated by the parent render.
- After the complete fix, verify that changing focus does not render rows, while Refresh changes context and does render them.

## Answer key
The `WorkspaceContext.Provider` receives a new object literal every time `ReactRenders` renders. In the baseline recording, `ProjectRow` reports `Context changed`: changing unrelated `clock` state rerenders the parent, creates a different context value identity, and updates every context consumer.

The complete fix moves ownership of the list into a memoized `Rows` component. It receives `refreshes` as a prop, creates the `WorkspaceContext.Provider` value, and renders the project rows. A `clock` update leaves `refreshes` unchanged, so the memoized list boundary skips its work. A Refresh changes `refreshes`, so the boundary opens and the list and context consumers update.

## Fix direction
Extract the provider and full project list into `Rows({ refreshes })`, then memoize `Rows` (for example, `const Rows = memo(RowsView)`). Keep the changing `refreshes` value as its prop. Create the context value inside `Rows` from that prop; because `Rows` only renders when `refreshes` changes, a separate `useMemo` for this object is unnecessary. Remove the old provider value `useMemo` and its now-unused import if you tried that partial approach. Prefer this single boundary around the list over memoizing every `ProjectRow` individually.

## Verification
Keep the why-render setting enabled and make distinct Profiler recordings:

1. **Before the fix:** change My focus and inspect `ProjectRow` → `Context changed`.
2. **After the complete fix:** change My focus and confirm the `ProjectRow` items are absent from that clock-update commit because memoized `Rows` did not render.
3. In a separate recording, click Refresh and confirm `Rows` and its project rows render because the `refreshes` prop changed and the context value now updates.

Compare the same interactions in each recording. The two contracts are: focus changes do not enter the list; Refresh crosses the list boundary and updates its context consumers.

## Completion rubric
The learner reads `Why did this render?` in separate recordings, explains the baseline `Context changed` result, isolates the provider and list behind one memoized `Rows` boundary, and verifies that focus updates skip the list while Refresh still updates its context consumers.

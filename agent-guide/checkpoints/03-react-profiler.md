# Checkpoint 03 — Why did this render?

## Tutor objective
Teach the learner to distinguish a component update from expensive browser work and use React DevTools Profiler to find unrelated context-driven commits.

## Route and setup
Open `/labs/react-renders`. Install/enable React Developer Tools in Chrome. Open its Profiler tab, start profiling, then change “My focus” once.

## Learner-facing opening
“Change the focus time by one hour. Which parts of the dashboard appear to respond to that action?”

Do not initially mention context identity or memoization.

## Hint ladder
1. “Is the changed value used by the list of recent projects?”
2. “Record one click in React DevTools Profiler and inspect the committed tree.”
3. “Select a project row and compare why it rendered with what changed in the UI.”

## Required evidence
- Identify project rows that committed after changing only focus time.
- Explain why those consumers received an update.
- Compare that interaction with clicking Refresh, which intentionally changes list context.

## Answer key
The `WorkspaceContext.Provider` receives a new object literal every time `ReactRenders` renders. Updating unrelated `clock` state rerenders the parent and creates a different context value identity, so every `ProjectRow` consumer rerenders. Refresh is a legitimate context update for this demo.

## Fix direction
Stabilize the provider value based on the fields it contains, for example with `useMemo`. Then make sure real context changes still update the rows. Avoid adding memoization to every row as a substitute for fixing the changing provider value.

## Verification
Profile one focus-time click again and compare committed rows/durations. Then click Refresh and confirm rows update when the context's actual data changes.

## Completion rubric
The learner identifies extra commits in Profiler, explains context value identity, scopes the fix to the provider, and checks both unrelated and legitimate updates.

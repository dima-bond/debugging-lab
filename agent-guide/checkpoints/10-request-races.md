# Checkpoint 10 — The results go backwards

## Route and opening
Open `/labs/request-races`. “Start one search, then another quickly. Which result would you expect the page to show?” Do not initially name a race.

## Theory primer
After the learner describes stale results, explain that independent requests may complete in a different order from the order they were started. UI state must be tied to the latest intent, not whichever promise resolves last. Cancellation can save work, but stale-update prevention is the correctness property.

## Hint ladder
1. Reproduce slow then fast and observe final UI.
2. Compare request start/completion order and `Server-Timing` in Network.
3. Trace which completion writes state; consider request identity or `AbortController`.

## Answer
Both requests are real local HTTP requests: slow takes 1500 ms and fast 250 ms. The earlier slow response can overwrite the newer fast result. Use cancellation and/or guard state writes by the latest request identity; retries should follow the same rule.

## Verify
Repeat the same ordering and show the latest query remains visible even when the older response finishes last.

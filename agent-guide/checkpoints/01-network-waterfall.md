# Checkpoint 01 — A slow product search

## Tutor objective
Teach the learner to use the Network panel's waterfall and initiator information to find unnecessary serial work.

## Route and setup
Open `/labs/network-waterfall`. Click “Browse the collection”. Keep the Network panel open, enable Preserve log if useful, and disable cache while DevTools is open. The local Vite mock API delays each response, so the request itself stays pending long enough to inspect.

## Learner-facing opening
“The collection feels slow to appear. Click Browse the collection once. What do you notice, and what would you inspect first?”

Do not initially mention serial requests, the unused categories request, or `Promise.all`.

## Hint ladder
1. “Can we separate time spent waiting before a request from time spent transferring its response?”
2. “Look at the Network panel's Fetch/XHR rows and their start times.”
3. “Select the rows, inspect the Timing tab, then compare the waterfall and Initiator information. Which phase accounts for most of each request?”

## Required evidence
- Identify the three `/api/catalog/*` requests and their order/timing.
- Inspect `Waiting (TTFB)` in at least one request's Timing tab.
- Explain whether a later request depends on the earlier response.
- Point out that the category response does not contribute to the displayed data.

## Answer key
`NetworkWaterfall.search` awaits `categories`, then `products`, then `prices`. The Vite mock API holds each response for a controlled duration, so the wait appears in Network as request time / `Waiting (TTFB)`, and the waterfall shows requests starting one after another. The categories response is unused; product rows already contain category labels. The price response is independent of the product response by index for this exercise.

## Fix direction
Remove the unnecessary categories request and request products and prices concurrently with `Promise.all`. Keep the same loading and error behavior. Do not add another client-side timer: the response delay belongs to the mock server so DevTools can measure it as request time.

## Verification
Repeat the same click with cache disabled. Confirm that only the needed requests remain and overlap in the waterfall, and that total request waiting is now close to the slower of the two independent responses rather than their sum. The `Server-Timing` response header also labels the mock delay. Compare total scenario time qualitatively; local absolute timings vary.

## Completion rubric
The learner uses the waterfall/initiator as evidence, distinguishes actual dependency from accidental sequencing, removes only unnecessary waiting/work, and verifies the same interaction again.

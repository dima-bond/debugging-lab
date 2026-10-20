# Checkpoint 07 — The hero arrives late

## Route and opening
Open `/labs/lcp-discovery`. “Which part of this page seems to determine when the main content is ready?” Let the learner observe before naming LCP.

## Theory primer
After their description, explain that Largest Contentful Paint (LCP) measures when the largest visible text/image content is rendered. Its delay can come from server response, resource-load delay (including discovery/priority), resource duration, or render delay. Ask which phase the evidence should distinguish.

## Hint ladder
1. Compare the late-discovery and eager scenarios under the same conditions.
2. Find the LCP marker/element in Performance and inspect its phases.
3. Correlate the element's request and initiator with Network timing and priority.

## Answer
The late case inserts the hero image only after a timer, delaying discovery; the eager case makes it discoverable immediately. Do not assume every slow LCP is a slow server or large download.

## Verify
Record both cases and explain the change in discovery/render timing. The displayed image is a small local asset, so this lesson isolates discovery more than transfer duration.

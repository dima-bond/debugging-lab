# Checkpoint 07 — The hero arrives late

## Route and opening
Open `/labs/lcp-discovery?scenario=late`. “Which part of this page seems to determine when the main content is ready?” Let the learner observe before naming LCP.

The scenario controls navigate to separate URLs and reload the page. Record navigation traces at `/labs/lcp-discovery?scenario=late` and `/labs/lcp-discovery?scenario=eager`; do not switch variants during an active recording because user interaction ends LCP reporting for that page load.

## Theory primer
After their description, explain that Largest Contentful Paint (LCP) measures when the largest visible text/image content is rendered. Its delay can come from server response, resource-load delay (including discovery/priority), resource duration, or render delay. Ask which phase the evidence should distinguish.

## Hint ladder
1. Compare clean navigation recordings for the late-discovery and eager URLs under the same conditions.
2. Find the LCP marker/element in Performance and inspect its phases.
3. Correlate the element's request and initiator with Network timing and priority.

## Answer
The late case inserts the hero image only after a timer, delaying discovery; the eager case makes it discoverable immediately. The detailed raster hero is intentionally large enough to become the final image LCP candidate in both cases. Do not assume every slow LCP is a slow server or large download.

## Verify
Record a clean reload at each scenario URL and explain the change in discovery/render timing. Confirm the final LCP Related node is `img.lcp-art` in both traces and that its timestamp moves with the late discovery timer. Confirm the URL preserves the chosen variant across reloads. The displayed image is a local asset, so this lesson isolates discovery more than transfer duration.

# Checkpoint 02 — The moving checkout button

## Tutor objective
Teach the learner to observe CLS, locate an affected element in a layout-shift event, and tie the shift to late content without reserved space.

## Route and setup
Open `/labs/layout-shift`. Reload or use Reset scenario. In Performance, observe live metrics, then record a reload with screenshots/layout shifts available.

## Learner-facing opening
“Watch the checkout page from the moment it appears. Does any content move? Which part of the experience is affected?”

Do not initially name CLS or the image dimensions.

## Hint ladder
1. “Try repeating a clean page load. Does the change happen before or after the first paint?”
2. “The Performance panel can record layout shifts and show which elements moved.”
3. “Open the largest shift entry and inspect the affected node and the frames around it.”

## Required evidence
- Identify when the movement occurs relative to page load.
- Find the layout-shift event/cluster and the affected button or nearby content.
- Connect the late image request/decode to the newly occupied space.

## Answer key
The product image is inserted 850 ms after mount and rendered without a reserved aspect ratio or dimensions. Before its resource loads, the browser cannot reserve the correct space; when it appears, checkout content moves.

## Fix direction
Reserve the image's layout space before it loads, for example with width/height attributes or a stable aspect-ratio container. Preserve the intended crop and responsive layout.

## Verification
Reset and record the same reload. Confirm the content no longer moves when the image appears and the layout-shift track has no corresponding shift.

## Completion rubric
The learner names a measured shift and affected content, explains why late media changed layout, applies a space-reserving fix, and re-records the same load.

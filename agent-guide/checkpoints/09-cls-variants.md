# Checkpoint 09 — More causes of layout shift

## Route and setup
Open `/labs/layout-shift?track=advanced`. The Core route remains `/labs/layout-shift`. Ask the learner to choose one variant and describe what moves before mentioning CLS.

## Theory primer
After observation, explain that CLS summarizes unexpected layout movement over a page lifecycle. Images are only one cause: fallback-to-web-font metric changes, inserted banners, and dynamic content can also move visible content. The user impact is content moving under reading or interaction.

## Hint ladder
1. Replay the same selected variant from a clean state.
2. Record Performance and inspect layout-shift events, affected nodes, and timing.
3. Compare the event frames to the font/banner/content appearance.

## Answer
The font case renders its text from the first frame in fallback Arial, then a deliberately delayed local Playfair WOFF2 replaces it. The font metrics cross the container's wrapping boundary and move the content below. The banner and content cases separately insert new height without reserving space. Identify the affected node and event rather than merely naming the scenario label.

Self-hosting and preload can make the font arrive earlier, but they do not guarantee zero CLS on a slow connection. A metric-compatible fallback can preserve the delayed visual swap while preventing movement: define a local fallback face with `size-adjust` (and vertical metric overrides or an explicit stable `line-height` where needed). Another trade-off is `font-display: optional`, which may avoid the late swap entirely.

## Verify
For Font swap, use the filmstrip to confirm the text exists before the shift, Network to confirm the delayed WOFF2 request, and the shift event to correlate movement with the font metric change. Affected nodes below the text should move; do not accept a trace where the text itself is inserted late or where a geometric transition creates the movement. After a metric-compatible fallback fix, confirm the font still changes while the measured movement drops to zero. Learner may choose another variant after closing this checkpoint.

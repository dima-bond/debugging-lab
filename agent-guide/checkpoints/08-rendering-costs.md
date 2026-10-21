# Checkpoint 08 — Forced layout and expensive paint

## Route and opening
Open `/labs/rendering-costs`. “The dashboard interaction feels rough. What changes between the two cases?” Keep the two investigations distinct.

## Theory primer
After observation, explain that DOM writes can invalidate layout; reading geometry before the browser naturally recalculates can force synchronous layout. Repeating read/write alternation can cause layout thrashing. Separately, paint can be expensive even when JavaScript is short, especially when large or complex regions need repainting.

## Hint ladder
1. Record Case A and inspect Main and Layout tracks.
2. Look for repeated forced-reflow/layout work associated with the interaction.
3. Record Case B; compare scripting, paint, and affected area. Keep the Performance trace as the primary evidence, then use Paint flashing as a visual cross-check.

## Paint flashing cross-check
After inspecting the Case B trace, open Chrome DevTools Command Menu with `Cmd+Shift+P`, run `Show Rendering`, and enable `Paint flashing` in the Rendering panel. Repeat the interaction and observe which region flashes green. The flash identifies the area Chrome repainted; it does not merely mean that the page used the GPU. As a contrast, a transform-only change on an already composited layer can move the surface without a green flash because Chrome can composite the existing pixels without painting them again.

## Answer
Case A repeatedly interleaves a geometry write and synchronous geometry read over many elements, forcing layout instead of letting the browser batch it. Case B changes paint-only styles across a large, visually complex surface; its click handler contains no artificial CPU loop. Different traces imply different fixes: batch reads/writes for layout; simplify or limit the painted area and visual effects for paint.

## Verify
Record the click in each case separately. Case A must show repeated Layout/Recalculate Style work associated with the geometry read/write loop. Case B must keep scripting short while showing Paint activity for the changed surface. Then enable Paint flashing and confirm the Case B interaction flashes the repainted region; distinguish this from a transform-only composited-layer update that can move without a green flash. Learner describes each trace independently and proposes a corresponding targeted change; do not treat “less JavaScript” as a universal rendering fix.

# Checkpoint 08 — Forced layout and expensive paint

## Route and opening
Open `/labs/rendering-costs`. “The dashboard interaction feels rough. What changes between the two cases?” Keep the two investigations distinct.

## Theory primer
After observation, explain that DOM writes can invalidate layout; reading geometry before the browser naturally recalculates can force synchronous layout. Repeating read/write alternation can cause layout thrashing. Separately, paint can be expensive even when JavaScript is short, especially when large or complex regions need repainting.

## Hint ladder
1. Record Case A and inspect Main and Layout tracks.
2. Look for repeated forced-reflow/layout work associated with the interaction.
3. Record Case B; compare scripting, paint, and affected area. Use paint flashing/layers only if available in the learner's Chrome.

## Answer
Case A interleaves a width write and geometry reads over many elements, forcing layout repeatedly. Case B uses a large blurred surface and adds paint work. Different traces imply different fixes: batch reads/writes for layout; simplify/limit expensive visual effects for paint.

## Verify
Learner describes each trace independently and proposes a corresponding targeted change; do not treat “less JavaScript” as a universal rendering fix.

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
The font case renders its text from the first frame in a fallback font, then changes only the font family after the delay; the new font metrics change wrapping and move the content below. The banner and content cases separately insert new height without reserving space. Identify the affected node and event rather than merely naming the scenario label.

## Verify
For Font swap, use the filmstrip to confirm the text exists before the shift and inspect the shift event at the moment its font metrics change; affected nodes below the text should move. Do not accept a trace where the text itself is inserted late or where a geometric transition creates the movement. Learner proposes a reservation/stability fix appropriate to the chosen cause and repeats the same variant. They may choose another variant after closing this checkpoint.

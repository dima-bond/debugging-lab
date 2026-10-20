# Checkpoint 06 — Why does this click feel slow?

## Route and opening
Open `/labs/inp-interaction`. “Try applying the setting a few times. What do you notice about the response?” Do not initially name INP, the handler, or the DevTools panel.

## Theory primer
After the learner describes the delay, explain that Interaction to Next Paint (INP) summarizes responsiveness across interactions: a user input should lead to a visual update quickly. A slow interaction can spend time before JavaScript starts, inside its handler, or rendering/painting afterward. Then ask what evidence could separate those stages.

## Hint ladder
1. Compare a busy and a light interaction.
2. Record the click in Performance and inspect the interaction entry and its breakdown.
3. Follow the long task/call stack and compare input delay, processing, and presentation delay.

## Evidence and answer
Show a repeatable interaction trace and identify which stage dominates. The busy case synchronously occupies the main thread before the state update; the light case avoids that work. INP is a field metric; a single local interaction is an investigation sample, not a field INP claim.

## Verify
Learner proposes a targeted change and compares the same interaction and trace. Complete only when they explain the stage and its evidence.

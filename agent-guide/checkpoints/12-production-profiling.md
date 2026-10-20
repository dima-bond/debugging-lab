# Checkpoint 12 — Does the slowdown survive production?

## Route and setup
Run `npm run build && npm run preview`, open the printed URL, then visit `/labs/production-profile`. Keep dev and preview tabs/conditions comparable. Ask what differs before explaining dev overhead.

## Theory primer
Development builds can include diagnostics, extra checks, and development-only behavior; production changes the runtime and component names. A dev trace is useful for locating work but is not a production performance guarantee. Source maps can help map minified frames, but availability/configuration varies.

## Hint ladder
1. Record the same action in both builds.
2. Compare trace structure and repeated work before comparing absolute durations.
3. Inspect source-map availability and identify what can/cannot be mapped.

## Answer
The page offers the same synchronous work in both builds, but surrounding framework/dev overhead may differ. Profile the production build when making production claims; do not assume source maps exist or publish sensitive source maps without a deliberate decision.

## Verify
Learner reports build mode, conditions, comparable trace evidence, and limits of the conclusion.

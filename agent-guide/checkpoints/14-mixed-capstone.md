# Checkpoint 14 — A production-style investigation

## Route and opening
Open `/labs/mixed-capstone`. Read the support complaint exactly as written. Ask what the learner would reproduce first; do not imply all clues share one cause.

## Theory primer
Only after initial observations, remind the learner that a symptom report can combine distinct issues. Prefer evidence tied to user impact and a repeatable action over the most dramatic-looking metric.

## Hint ladder
1. Reproduce search and filter interactions separately.
2. Compare Network request order, React commits, and memory across repeated open/close cycles.
3. Rank evidence by causal connection to the complaint; state what remains uncertain.

## Answer
This page is a neutral integration exercise with search and filter interactions; use it to collect and weigh clues from Network, React Profiler, and Memory rather than assuming every reported issue is present or equally important. Learner should identify what evidence is absent and request a narrower reproduction if needed.

## Completion
Ask the learner to defend one prioritized hypothesis, cite concrete evidence, name a competing explanation, and propose the next experiment. Celebrate completion of the Advanced track and summarize progress, including topics to revisit.

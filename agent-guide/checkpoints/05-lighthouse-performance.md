# Checkpoint 05 — A poor Lighthouse report

## Tutor objective
Teach the learner to use Lighthouse as a diagnostic entry point, then confirm a reported responsiveness/main-thread problem in Performance.

## Route and setup
Open `/labs/lighthouse-long-task` in a fresh tab. Open Lighthouse in DevTools and run a Performance audit on mobile settings. Then open Performance and record a reload. Local audits vary by machine; use the finding and trace shape, not a target score.

## Learner-facing opening
“Run a Lighthouse Performance audit. Which finding seems most relevant to how quickly this page responds, and how would you check its cause?”

Do not initially say Total Blocking Time or point to `runHeavyWork`.

## Hint ladder
1. “Which audit result suggests the browser spent a long time unable to respond during load?”
2. “Use Performance to record a reload and inspect long tasks on the Main track.”
3. “Open the longest task and inspect Bottom-up/call stack. What application work occupies the time?”

## Required evidence
- Name a relevant Lighthouse finding (likely Total Blocking Time / long main-thread work).
- Find the corresponding long task in the Performance recording.
- Identify its call stack and connect it to the app's synchronous work.

## Answer key
After the first animation frame, the page runs a synchronous 1.05-second CPU loop before marking the report ready. It blocks the main thread and contributes a long task/Total Blocking Time. Lighthouse indicates the page has a main-thread problem; the Performance trace and call stack identify the cause.

## Fix direction
Remove the unnecessary synchronous workload. If it represented meaningful work, the product fix would be to move it off the main thread or split it into yielding chunks; simply scheduling it in a later animation frame does not make it non-blocking.

## Verification
Run the same Lighthouse mode again and record the same reload in Performance. Compare the long task and relevant audit finding. Explain any remaining score variation as environment noise rather than claiming a precise universal number.

## Graduation moment
Once the learner has completed the evidence and verification loop, congratulate them on completing the five core investigations and name the tools they have practiced: Network, Performance, React Profiler, Memory, and Lighthouse. Summarize any repeat topics from `progress.md`. Then offer the advanced investigations and a mixed production-style capstone below. Ask whether they want to continue; do not begin advanced lessons until they answer.

## Advanced investigations to offer
- INP and slow interactions (`06-inp.md`).
- LCP discovery and rendering (`07-lcp.md`).
- Forced layout and expensive paint (`08-rendering-costs.md`).
- Font, banner, and dynamic-content shifts on the existing CLS route (`09-cls-variants.md`).
- Request races and stale responses with real delayed local HTTP requests (`10-request-races.md`).
- Allocation timeline and retaining paths on the existing Memory route (`11-memory-profiling.md`).
- Development-versus-production profiling (`12-production-profiling.md`).
- RUM segmentation and field data using explicitly simulated data (`13-rum.md`).
- Mixed Network/React/Memory capstone (`14-mixed-capstone.md`).

## Completion rubric
The learner uses Lighthouse to choose a question, verifies it in a trace, explains lab score variability, makes a targeted fix, repeats the audit/trace, and can articulate why field data may differ. Graduation is based on all five rubric results, not just finishing the UI tour.

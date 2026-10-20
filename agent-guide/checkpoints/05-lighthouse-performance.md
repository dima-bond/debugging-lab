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
- INP, long tasks, event timing, and interaction breakdown.
- LCP discovery, image priority, and render-blocking resources.
- Forced reflow, layout thrashing, and expensive paint.
- Font swaps and several causes of layout shift.
- Request races, stale responses, retries, and cancellation.
- Detached DOM, allocation timelines, and heap retaining paths.
- Production source maps and profiling build caveats.
- RUM segmentation, lab-versus-field data, and post-release comparison.
- Mixed capstone: investigate a complaint with overlapping Network, React, and Memory symptoms, then defend which evidence explains the user impact.

## Completion rubric
The learner uses Lighthouse to choose a question, verifies it in a trace, explains lab score variability, makes a targeted fix, repeats the audit/trace, and can articulate why field data may differ. Graduation is based on all five rubric results, not just finishing the UI tour.

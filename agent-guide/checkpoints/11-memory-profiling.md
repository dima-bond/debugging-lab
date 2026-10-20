# Checkpoint 11 — Allocation timeline and retaining paths

## Route and setup
Open `/labs/memory-leak?track=advanced`. “How would you distinguish temporary allocation from memory that stays reachable?”

## Theory primer
After the learner's hypothesis, explain that allocation rate alone is not a leak. A leak is demonstrated by unwanted objects remaining reachable across repeated lifecycles; heap growth after repeated equivalent actions and a retaining path are stronger evidence.

## Hint ladder
1. Capture a baseline, record allocations, add several batches, then clear them.
2. Force GC only when the Memory tool offers it; compare live heap rather than total allocated bytes.
3. Use heap snapshots and retaining paths to find the owner keeping objects alive.

## Answer
The page's allocation exercise retains each batch in React state until cleared. The Core widget separately demonstrates detached DOM retained by a global listener. Distinguish these mechanisms; neither a high heap number nor one allocation sample proves a leak.

## Verify
Compare before/after snapshots after the same lifecycle and confirm that clearing removes the exercise-owned references. Do not claim browser memory must immediately return to the OS.

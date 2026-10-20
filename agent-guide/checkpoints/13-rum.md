# Checkpoint 13 — What do real users experience?

## Route and opening
Open `/labs/rum-field-data`. The table is explicitly simulated. Ask which segment/release the learner would compare and why.

## Theory primer
After their first read, explain that lab data is controlled and repeatable, while RUM observes real sessions across devices, routes, and conditions. Percentiles such as p75 describe a distribution and can hide differences between cohorts; field and lab results answer different questions.

## Hint ladder
1. Filter to the same route and device before comparing releases.
2. Calculate/inspect p75 rather than the mean or worst single row.
3. Check whether sample size and cohort composition support the conclusion.

## Answer
The included rows are synthetic teaching data, not production telemetry. For mobile `/search`, compare the same route/device cohort between releases: 2.4.0 is worse than 2.4.1 in the supplied values. The dataset is intentionally tiny and cannot establish statistical significance or a real release impact.

## Verify
Learner explains cohort, metric, percentile, and limitations; distinguish field data from Lighthouse/local traces.

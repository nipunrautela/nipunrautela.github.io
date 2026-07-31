---
title: "Cutting a nightly job from 5.5 hours to 3"
description: "What I learned parallelizing a pl/pgsql and C-shell batch pipeline that had quietly grown past its window."
pubDate: 2025-09-12
tags: ["PostgreSQL", "Performance", "Shell"]
draft: false
---

Every batch pipeline starts comfortably inside its window and then, slowly,
stops being comfortable. Ours ran overnight, took five and a half hours, and had
reached the point where a single bad night pushed completion into working hours.

This is a note on how that came down to three, and what I would look at first if
I had to do it again.

## Measure before you touch anything

The instinct is to look for the slow query. That was not where the time was.

Instrumenting each stage showed the pipeline was made of a dozen steps run
strictly in sequence by a C-shell driver, and roughly half of them had no data
dependency on the step before them at all. They ran in order because that is the
order somebody wrote them in, years earlier, and nothing had forced the question
since.

The lesson that generalises: **profile the pipeline before you profile the
queries**. A perfectly tuned query still costs you an hour if it is needlessly
waiting on an unrelated one.

## Find the actual dependency graph

Writing the real dependency graph down was most of the work. For each step I
needed to know which tables it read and which it wrote, which meant reading every
procedure rather than trusting the comments.

Two things fell out of that:

- Several "dependencies" were coincidental — step B read a table step A wrote,
  but only columns that step A never touched.
- One genuine dependency was undocumented and would have been a genuinely bad
  bug to discover in production.

That second one is the argument for doing this carefully rather than
optimistically. Parallelizing a pipeline is easy; parallelizing it *correctly*
requires knowing which edges are real.

## Parallelize the independent branches

With the graph in hand, the restructuring was mechanical. Independent branches
fan out, the driver waits on the whole set, then the next dependent stage begins.

```sh
# Fan out the independent stages, then join before the dependent one.
foreach stage ( load_accounts load_instruments load_reference )
    ./run_stage.csh $stage &
end
wait

./run_stage.csh reconcile
```

The `wait` is doing real work there. Without it the reconcile step starts against
half-loaded tables and produces results that are wrong in a way that looks
plausible — the worst failure mode available.

## What it did not fix

Runtime went from 5.5 hours to 3. The remaining three hours are dominated by one
genuinely serial stage that everything else depends on, and no amount of
scheduling changes that. Making *that* faster is a different problem — it needs
query-level work or a change to the data model, not concurrency.

Which is the honest summary: parallelization bought back the time that was being
wasted on false ordering, and nothing more. That happened to be a lot of time. It
usually is, in a pipeline nobody has questioned in a few years.

## Checklist

If you have a batch job that has outgrown its window:

1. Time every stage individually before forming any theory.
2. Derive the dependency graph from what the code reads and writes, not from the
   execution order.
3. Fan out the independent branches, and be rigorous about the join points.
4. Only then start tuning the individual queries.

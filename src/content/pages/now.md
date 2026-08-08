---
title: "Now"
description: "What I'm focused on at the moment."
updatedDate: 2026-08-08
---

This is a [now page](https://nownownow.com/about): a snapshot of what has my
attention at the moment, rather than a record of everything I have done.

## Building distributed systems

Most of my time goes into building distributed systems and taking a monolith
apart to get there. Since October 2025 I have been at Visa, working on an Ansible
automation orchestration platform that is being re-architected out of a large
Activiti BPMN and polling-based monolith into segregated event-driven processors,
on top of custom self-healing active-active Hazelcast queues.

The interesting part is never the new architecture. It is getting there without
an outage, by reconstructing the state of every in-flight execution and parking it
until the new processors are ready to pick it up, so the cutover is invisible to
everyone using the platform.

Adjacent to that: a token-bucket rate limiter that internal callers can no longer
accidentally take the platform down with, and a cross-region dual-DC scheduler
that replaced a Quartz setup which had been quietly misfiring.

## Still listening

I am happy where I am, but I keep the door open. If you are working on genuinely
distributed problems, the kind where failure modes matter more than benchmarks,
I am glad to talk. [Get in touch](/#contact).

## Sharpening the architecture side

The thing I am deliberately working on is the step up from building a component
that works to deciding where the boundaries go in the first place. That means
writing the design down before the code, being explicit about which consistency
and availability tradeoffs I am buying, and getting better at spotting the
decisions that will be expensive to reverse in two years.

## Reading and learning

Going deeper on distributed systems fundamentals: consensus, and the failure
modes you only meet at scale. The gap between "I have operated Kubernetes" and "I
understand why it makes the choices it does" is wider than it looks from the
operator's side, and I would like to close it.

Alongside that, keeping up with the newer and still-settling parts of the stack
rather than waiting for them to become obvious. Right now that is mostly agent
tooling: MCP, the LLM SDKs, and what A2A actually buys you once more than one
agent is involved.

## Writing

Slowly. There is a backlog of things I learned in the last two years that are
worth writing down before I forget the details that made them interesting. The
nightly job I parallelized and the parking-lot migration both deserve that
treatment.

---

*Last updated 8 August 2026.*

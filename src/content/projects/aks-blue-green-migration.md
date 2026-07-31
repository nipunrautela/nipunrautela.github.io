---
title: "Blue-Green Migration for AKS"
description: "Automating 90% of a blue-green Azure Kubernetes migration — resource moves, network redirection and access re-provisioning."
date: 2025-06-30
category: "Cloud"
tags: ["Azure", "AKS", "Kubernetes", "Automation", "Terraform"]
featured: true
status: "shipped"
---

Cluster upgrades in a regulated environment are not something you do in place.
The safe pattern is blue-green: stand up a parallel cluster, move workloads onto
it, redirect traffic, then retire the old one. The safe pattern is also
enormously repetitive, which is exactly the kind of work worth automating once.

## The problem

Each migration involved three separate categories of work, all of them manual:

- **Resource migration** — recreating workloads, config, secrets and storage
  claims on the green cluster with matching state.
- **Network redirection** — moving ingress, DNS records and certificates over
  without a window where requests resolved to nothing.
- **Access re-provisioning** — re-establishing RBAC bindings, service principals
  and Key Vault access policies against the new cluster identity.

Done by hand, a single migration ate days of engineer time and every step was a
chance to miss something that only showed up under load.

## What I built

I automated roughly 90% of that path. The scripted flow reads the blue cluster's
live state, projects it onto the green cluster, and reconciles the difference —
so the operator's job shrinks to reviewing a plan and approving the cutover
rather than executing sixty steps in order.

Network redirection was the part that needed the most care. Certificates and DNS
have propagation characteristics you cannot script your way around, so the
automation sequences those changes and waits on readiness signals instead of
assuming a fixed delay.

## Outcome

Migration efficiency improved roughly threefold. Just as valuable, the process
became repeatable: the same tooling ran across multiple applications, so the
second and third migrations did not rediscover the first one's mistakes.

This work sat alongside a wider push to move on-premise applications onto Azure —
AKS, Azure PostgreSQL, DNS, certificates and Key Vault — where the same
automation-first approach cut deployment effort by about 80%.

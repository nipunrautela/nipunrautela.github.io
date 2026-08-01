---
title: "Sparks Bank"
description: "A banking front-end with account management, transfers and a transaction ledger."
date: 2022-06-05
category: "Web"
tags: ["JavaScript", "Bootstrap", "Web"]
cover: "../../assets/projects/sparks-bank.png"
coverAlt: "Sparks Bank logo"
repo: "https://github.com/nipunrautela/sparks-bank"
status: "shipped"
---

A banking interface covering the core flows: opening an account, viewing a
balance, moving money between accounts, and reading back a transaction history
that reconciles with both.

## What it covers

The build focused on the parts of a banking UI that are easy to get subtly wrong.
Transfers validate against the source balance before they are recorded, and the
ledger is append-only, so a corrected transaction produces a reversing entry rather
than editing history, which is how it works in practice.

The transaction list is filterable by date range and account, because a ledger
you cannot query is not much of a ledger.

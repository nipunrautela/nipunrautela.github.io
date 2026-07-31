---
title: "KoDS Bot"
description: "A Discord bot running an RPG-style guild of 300+ members — profiles, inventory, reputation and moderation."
date: 2022-08-14
category: "Backend"
tags: ["Python", "discord.py", "MongoDB", "Bots"]
cover: "../../assets/projects/kods-bot.png"
coverAlt: "KoDS Bot logo"
repo: "https://github.com/nipunrautela/KoDS-Bot"
featured: true
status: "shipped"
---

KoDS is a Discord bot built for an RPG game-based guild of more than 300 members.
What started as a handful of utility commands turned into the guild's system of
record: who you are, what you own, and how much everyone else trusts you.

## What it does

**Profiles.** Every member gets a persistent profile — a bio, a status line, and
a set of stats that other systems read from and write to.

**Inventory.** Items can be granted, traded and consumed. The interesting part
was making transfers atomic: two members trading simultaneously should never be
able to duplicate an item, which meant pushing the read-modify-write into a
single database operation rather than doing it in application code.

**Reputation.** Members award reputation to each other, with cooldowns and
self-award guards so the numbers stay meaningful.

**Moderation and tags.** A tag system for canned responses the guild kept
retyping, plus the usual moderation surface so admins do not need a second bot.

## Notes

The command surface grew faster than the original single-file design could take,
so commands moved into cogs grouped by domain. That change made it possible to
reload one subsystem at a time during development instead of restarting the bot
and dropping every in-flight interaction.

Rate limits shaped more of the design than I expected. Anything that fanned out
across members had to be batched and backed off, or Discord would simply stop
answering.

---
title: "Uses"
description: "The hardware, editor setup and tools I reach for day to day."
updatedDate: 2026-07-31
---

A running list of what I actually use. Updated when something changes, not on a
schedule.

## Editor and terminal

- **VS Code** for most things, with Vim keybindings.
- **JetBrains IntelliJ IDEA** whenever I am deep in a Java or Spring codebase —
  the refactoring tools still have no real equivalent.
- **Windows Terminal** with PowerShell 7, plus WSL2 for anything that expects a
  POSIX environment.
- **JetBrains Mono** at 14px, which is also the monospace face on this site.

## Languages I reach for first

- **Java / Spring Boot** for services that need to be maintained by a team, with
  **Maven** and **JUnit 5** around them.
- **Python** for anything data-shaped, scripted, or that needs to exist by the
  end of the afternoon — **uv** for environments, these days.
- **TypeScript** everywhere on the front end. Untyped JavaScript at any real size
  is a false economy.
- **Bash / C-shell** for the glue, kept short enough to still be readable in a
  year.

## Infrastructure

- **Azure** — AKS, Azure PostgreSQL, Key Vault, Container Registry.
- **Kubernetes** and **Docker**, with **Harbor** for registry.
- **Hazelcast** when state has to be shared across nodes and survive losing one.
- **Ansible** (via AWX) for orchestration that has to be repeatable and auditable.
- **Jenkins** and **GitHub Actions** for pipelines. GitHub Actions when I get to
  choose.
- **Terraform** for anything I expect to build more than once.
- **Grafana** for the dashboards, because a system you cannot see is a system you
  are guessing about.

## Everything else

- **Git** from the command line, and `git add -p` more than any other command.
- **PostgreSQL** as the default database until something proves it should not be.
- **Obsidian** for notes, in plain markdown so they outlive the app.
- **Astro** for this site — the
  [source is on GitHub](https://github.com/nipunrautela/nipunrautela.github.io),
  README included.

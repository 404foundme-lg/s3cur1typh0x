---
title: "Tradeoffs: Stealth vs Speed"
date: "2025-12-30"
summary: "How detection capability and ROE constraints change what a red team should do—even when faster paths exist."
tags: ["tradecraft", "detection", "roe"]
---

In real engagements, the fastest path is rarely the best path.

## What actually drives the decision

- **Rules of engagement (ROE):** approved techniques, stop conditions, and what counts as unacceptable risk.
- **Defensive visibility:** whether identity, endpoint, and network telemetry can actually observe key steps.
- **Evidentiary value:** actions must be explainable to leadership and defenders, not just “it worked.”

## A practical mental model

- Prefer *high-signal, low-blast-radius* actions early.
- Treat “stealth” as *reducing unnecessary noise*, not as evading detection at all costs.
- If an action is hard to defend in a report, it’s usually the wrong action.

## Failure cases

- You optimize for stealth and lose reporting clarity.
- You optimize for speed and trigger guardrails that end the engagement early.

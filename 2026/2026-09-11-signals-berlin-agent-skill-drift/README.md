---
title: Your agent skill was right in March
event: Signals Berlin 2026
event_slug: signals-berlin-2026
date: 2026-09-11
location:
  city: Berlin
  country: Germany
  flag: 🇩🇪
tags:
  - opentelemetry
  - ai-agents
  - agent-skills
slides: slides.pdf
event_link: https://signalsconf.io/program
---

## Abstract

In March, directing an agent to the core OpenTelemetry semantic conventions repository for generative AI was correct. On June 12, v1.42.0 moved every `gen_ai.*`, OpenAI, and Model Context Protocol convention to a dedicated repository. A skill built against the March source tree would not crash. It would keep producing plausible, deprecated answers.

We maintain 17 open-source OpenTelemetry agent skills. In five minutes, I will use this change to show why domain knowledge expires silently, and how we contain the drift: reference upstream sources, reconcile fast-moving versions automatically, and require comparative evaluations for skill changes. Attendees leave with a rule for any agent skill: give it an authoritative source, a freshness signal, and a test. Treat skills as production dependencies, not static prompt files.

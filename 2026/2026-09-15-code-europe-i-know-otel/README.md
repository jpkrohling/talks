---
title: "I know OTel: giving your coding agents expert-level OpenTelemetry knowledge"
event: Code Europe 2026
event_slug: code-europe-2026
date: 2026-09-15
location:
  city: Warsaw
  country: Poland
  flag: 🇵🇱
tags:
  - opentelemetry
  - ai-agents
  - agent-skills
  - instrumentation
slides: slides.pdf
event_link: https://www.codeeurope.pl/speakers
---

## Abstract

Your coding agent writes most of your code now. It knows your language, your framework, and your build system. But does it know how to instrument what it builds? Large language models were trained on years of existing code, and most of that code is badly instrumented: personally identifiable information leaking into logs, outdated SDK versions pinned from stale training data, and semantic conventions that stopped being conventions three releases ago. Agents faithfully reproduce all of it. The OpenTelemetry ecosystem moves too fast for any base model to keep up; the Collector alone ships a release every one to two weeks.

This talk shows how to close that gap with agent skills: small, open source packages of expert knowledge that plug into coding agents and point them at upstream sources of truth instead of stale training data. We will look at real side-by-side comparisons of an agent instrumenting an application with and without skills, including the difference in correctness and in token cost. In live demos, I will instrument a Go application through a single prompt using compile-time instrumentation, fix context propagation so HTTP and database spans join one trace, and use the same skills to review existing instrumentation for leaked sensitive data.

As an OpenTelemetry maintainer and governance committee member, I will also cover what belongs in a skill and what does not: facts from the project's source code and documentation, not opinions, so the skills stay useful no matter which vendor or backend you use. Everything shown is free and open source. You will leave knowing how to give your own agents the OpenTelemetry knowledge they were never trained on, and how to judge whether the telemetry they produce is telemetry you can trust.

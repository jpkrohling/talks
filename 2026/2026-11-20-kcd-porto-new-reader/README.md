---
title: Your telemetry has a new reader
event: KCD Porto 2026
event_slug: kcd-porto-2026
date: 2026-11-20
location:
  city: Porto
  country: Portugal
  flag: 🇵🇹
tags:
  - opentelemetry
  - observability
  - ai-agents
  - keynote
slides: slides.pdf
event_link: https://community2.cncf.io/events/details/cncf-kcd-porto-presents-kcd-porto-2026-collab-with-devops-days-portugal/
---

## Abstract

For fifteen years, we designed telemetry for a human looking at a dashboard during an incident. That human skimmed past the noise, knew which error fires every night and means nothing, and filled the gaps with memory of how the system behaves. The reader has changed. Engineers now ask a coding agent for the 95th percentile latency broken down by endpoint instead of opening a dashboard. Site reliability engineering (SRE) agents connect to observability backends through the Model Context Protocol (MCP) and investigate incidents before anyone gets paged. Agents query more often and more broadly than people ever did, and they take every signal at face value.

That change exposes telemetry problems we learned to live with. Companies building AI SRE agents told me that poor telemetry is their biggest obstacle in customer trials, because it makes their agents hallucinate. A log line saying data cannot reach a vendor the company left years ago sends an agent after the wrong root cause. A tracing setup where almost every trace has a single span gives an agent nothing to follow. Noise that a human filters out in seconds becomes a confident, wrong conclusion.

Drawing on a year of conversations with platform teams at banks, retailers, and software companies, and on running a company where I explore production through agents far more often than through dashboards, this keynote looks at what changes when agents become the primary consumers of telemetry. We will cover what makes telemetry readable by a machine, why semantic conventions stop being a style preference and become the vocabulary an agent depends on, where dashboards and alerts still earn their place, and what platform teams can start doing now to make their signals trustworthy. If you cannot trust the telemetry, you cannot trust the agent.

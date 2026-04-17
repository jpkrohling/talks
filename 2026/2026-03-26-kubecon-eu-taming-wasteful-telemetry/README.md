---
title: "Day-2 Reality Check: Taming Wasteful Telemetry"
event: KubeCon + CloudNativeCon Europe 2026
event_slug: kubecon-and-cloudnativecon-europe-2026
date: 2026-03-26
location:
  city: Amsterdam
  country: Netherlands
  flag: 🇳🇱
tags: []
recording: https://youtu.be/cpB5NTtUdwQ
slides: slides.pdf
event_link: https://sched.co/2CW6M
co_speakers:
  - name: Elena Kovalenko
    company: Delivery Hero
---

## Abstract

Your observability pipeline is running and everything seems fine—until you notice the bill. High-cardinality metrics, duplicate attributes, and over-eager auto-instrumentation silently inflate costs. A developer adding user IDs as labels turned a 2k USD metric into 20k USD. .NET auto-instrumentation attaches all IPs and MACs to host attributes—data never queried. The Kubernetes processor duplicates information already captured.

This talk examines sources of telemetry waste: unbounded cardinality, redundant processor data, and auto-instrumentation defaults prioritizing completeness over practicality. We'll discuss pipeline fixes using the OpenTelemetry Collector to drop attributes and transform telemetry, plus Instrumentation Score for quality assessment. We'll explore proactive approaches reducing waste at the source through opinionated auto-instrumentation.

Attendees will learn to identify waste, assess cardinality, apply solutions, and reduce costs without sacrificing visibility.

---
title: "OpenTelemetry Gateways: Enforce, Transform, Route"
event: Observability Day Europe 2026
event_slug: observability-day-europe-2026
date: 2026-03-23
location:
  city: Amsterdam
  country: Netherlands
  flag: 🇳🇱
tags:
  - opentelemetry
  - collector
  - cost
featured: true
recording: https://youtu.be/S6z2gd666qg
slides: slides.pdf
event_link: https://sched.co/2DY7t
co_speakers:
  - name: Natalie Ujuk
    company: IG Group
---

## Abstract

Teaching every development team about telemetry best practices doesn't scale. When bad data flows through pipelines (PII leakage, misconfigured attributes, cost-inflating noise) you need a centralized control point. OpenTelemetry collector gateways provide that enforcement layer between applications and backends.

This talk presents proven gateway architectures from production environments managing cloud and on-premises telemetry. We'll demonstrate validation rules enforcing semantic conventions, transformation pipelines that enrich or redact data, and routing configurations enabling backend flexibility without developer refactoring. You'll see real configurations: blocking PII, enforcing mandatory attributes, and filtering high-cardinality data before it leaves your premises.

We'll cover performance at scale, security boundaries for multi-tenant environments, and managing configuration drift. Attendees leave with blueprints and configurations ready for deployment.

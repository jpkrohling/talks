---
title: The OpenTelemetry mistakes I keep seeing (and how to stop making them)
event: WeAreDevelopers World Congress Europe 2026
event_slug: wearedevelopers-world-congress-europe-2026
date: 2026-07-09
location:
  city: Berlin
  country: Germany
  flag: 🇩🇪
tags:
  - opentelemetry
  - observability
  - instrumentation
featured: true
recording: https://youtu.be/zpVC4O14DiA
slides: slides.pdf
event_link: https://www.wearedevelopers.com/world-congress/agenda/sessions/the-opentelemetry-mistakes-i-keep-seeing-and-how-to-stop-making-them-1145654
---

## Abstract

OpenTelemetry is becoming the standard for application telemetry, but bad telemetry is a natural part of the learning curve. Most teams start by turning on auto-instrumentation and figuring out what works as they go. That is fine. The problem is when the same mistakes persist: personally identifiable information leaking into traces, spans wrapping every function, happy paths instrumented in detail while errors get a single log line, and teams reaching for traces when a simple counter would do.

As a long-time OpenTelemetry maintainer and contributor, I have reviewed countless implementations where these four anti-patterns stuck around long after they should have been fixed. This talk walks through each one with real code examples, showing what goes wrong and why. Each pattern includes a before-and-after fix you can apply to your own codebase.

You will walk away knowing how to spot these mistakes sooner, choose the right signal type for each use case, and build telemetry that actually helps you debug problems.

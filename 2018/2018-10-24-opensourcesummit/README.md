---
title: What are My Microservices Doing?
event: Open Source Summit
event_slug: open-source-summit
date: 2018-10-24
location:
  city: Edinburgh
  country: ""
  flag: 🏴󠁧󠁢󠁳󠁣󠁴󠁿
tags:
  - tracing
  - jaeger
  - observability
  - open-source
slides: slides.pdf
event_link: https://sched.co/MPkv
---

## Abstract

Microservices have become the standard for new architectures. But the microservices architecture presents some new challenges. One of them is the so-called “Observability problem”, where it is hard to know which services exist, how they interrelate, and how important each one is. In this talk, we’ll look at an application that includes three Java microservices. We’ll use OpenTracing and Jaeger to help identify what they are doing and how they interrelate, following a “no instrumentation” approach, a “full instrumentation” approach, as well as “something in between” using service mesh instrumentation with Istio.

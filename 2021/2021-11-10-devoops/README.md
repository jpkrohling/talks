---
title: OpenTelemetry Collector deep dive
event: DevOops 2021
event_slug: devoops-2021
date: 2021-11-10
location:
  city: Virtual
  country: St. Petersburg
  flag: 🇷🇺
tags: []
recording: https://www.youtube.com/watch?v=ZAsyfivg4iA
slides: slides.pdf
event_link: https://devoops.ru/en/persons/XL9WCCXEaOVTG909shXQf/?version=2021
---

## Abstract

The OpenTelemetry Collector is a highly versatile software, able to process not only traces but also metrics and logs. It can be deployed in a variety of ways, with features like authentication, routing, load balancing, tail-based sampling, and so on. The tooling around the collector is also extensive, with extra modules and distributions as part of the “contrib” package as well as a CLI tool allowing you to build your own distribution, possibly with your custom components.

In this session, Juraci Paixão Kröhling will introduce you to the OpenTelemetry Collector showing how you can deploy it in a variety of scenarios, from the classic “agent/collector on Kubernetes” up to scalable tail-based sampling. In the second part, we’ll see how a component can be built from scratch and integrated into our own distribution. We’ll wrap it up with a Q&A.

At the end of the session, you’ll be able to navigate comfortably in the world of OpenTelemetry Collector, understanding all the moving pieces and being able to bring your own moving piece to the setup. You’ll get the most of this session if you have hands-on experience with observability tools and some experience with programming in Go.

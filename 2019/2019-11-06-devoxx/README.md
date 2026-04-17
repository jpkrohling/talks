---
title: "Observing chaos: how distributed tracing brings observability to a service mess"
event: Devoxx
event_slug: devoxx
date: 2019-11-06
location:
  city: Antwerp
  country: ""
  flag: 🇧🇪
tags: []
recording: https://www.youtube.com/watch?v=FJ_YuUgIt8E
---

## Abstract

Service mesh tools, such as Istio and Linkerd, are being used to remove some of the networking complexity from our microservices’ code. In exchange for that, we give up some of the ability to observe the networking decisions being made, turning our service mesh into an apparent chaos.

In this talk, we’ll demonstrate how distributed tracing can be applied to take back some of the information we lost when we delegated the networking decisions to the service mesh.

We’ll begin with a short introduction to service meshes and distributed tracing, followed by a quick overview of the tools we’ll use: Istio and Jaeger.

We’ll then deploy an application composed of a few microservices and explore what distributed tracing can tell us about the individual requests arriving at our application.

We’ll wrap up the session with a Q&A.

You’ll leave the session knowing the observability compromises you are making when adopting a service mesh tool and how to address some of them.

You’ll get the most of this session if you have some familiarity with Kubernetes already.

Juraci Paixão Kröhling is a software engineer at Red Hat working on the Kiali project, Distributed Tracing team. He's a maintainer on the Jaeger project and contributor to the OpenTracing project and has talked about distributed tracing at conferences like Open Source Summit, CloudNativeCon+KubeCon, JavaLand, and others.

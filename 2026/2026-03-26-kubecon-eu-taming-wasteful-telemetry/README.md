# Day-2 Reality Check: Taming Wasteful Telemetry

|           |                                                                  |
| --------- | -----------------------------------------------------------------|
| Event     | KubeCon + CloudNativeCon Europe 2026                             |
| Where     | Amsterdam, Netherlands 🇳🇱                                       |
| When      | March 26, 2026                                                   |
| Recording | [YouTube](https://youtu.be/cpB5NTtUdwQ)                         |
| Slides    | [PDF](slides.pdf)                                                |
| Link      | [Link](https://sched.co/2CW6M)                                  |

## Abstract

Your observability pipeline is running and everything seems fine—until you notice the bill. High-cardinality metrics, duplicate attributes, and over-eager auto-instrumentation silently inflate costs. A developer adding user IDs as labels turned a 2k USD metric into 20k USD. .NET auto-instrumentation attaches all IPs and MACs to host attributes—data never queried. The Kubernetes processor duplicates information already captured.

This talk examines sources of telemetry waste: unbounded cardinality, redundant processor data, and auto-instrumentation defaults prioritizing completeness over practicality. We'll discuss pipeline fixes using the OpenTelemetry Collector to drop attributes and transform telemetry, plus Instrumentation Score for quality assessment. We'll explore proactive approaches reducing waste at the source through opinionated auto-instrumentation.

Attendees will learn to identify waste, assess cardinality, apply solutions, and reduce costs without sacrificing visibility.

## Co-speakers
* Elena Kovalenko, Delivery Hero

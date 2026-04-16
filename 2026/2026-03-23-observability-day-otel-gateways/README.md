# OpenTelemetry Gateways: Enforce, Transform, Route

|           |                                                                  |
| --------- | -----------------------------------------------------------------|
| Event     | Observability Day Europe 2026                                    |
| Where     | Amsterdam, Netherlands 🇳🇱                                       |
| When      | March 23, 2026                                                   |
| Recording | [YouTube](https://youtu.be/S6z2gd666qg)                        |
| Slides    | [PDF](slides.pdf)                                                |
| Link      | [Link](https://sched.co/2DY7t)                                  |

## Abstract

Teaching every development team about telemetry best practices doesn't scale. When bad data flows through pipelines (PII leakage, misconfigured attributes, cost-inflating noise) you need a centralized control point. OpenTelemetry collector gateways provide that enforcement layer between applications and backends.

This talk presents proven gateway architectures from production environments managing cloud and on-premises telemetry. We'll demonstrate validation rules enforcing semantic conventions, transformation pipelines that enrich or redact data, and routing configurations enabling backend flexibility without developer refactoring. You'll see real configurations: blocking PII, enforcing mandatory attributes, and filtering high-cardinality data before it leaves your premises.

We'll cover performance at scale, security boundaries for multi-tenant environments, and managing configuration drift. Attendees leave with blueprints and configurations ready for deployment.

## Co-speakers
* Natalie Ujuk, IG Group

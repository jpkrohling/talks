# Real-World Sampling – Lessons Learned After Reducing ~80% of Our O11y Costs

|           |                                                        |
| --------- | -------------------------------------------------------|
| Event     | Observability Day                                      |
| Where     | Paris, 🇫🇷                                              |
| When      | March 19, 2024                                         |
| Recording | [YouTube](https://youtu.be/1mHlsWinfTE) |
| Slides    | [PDF](slides.pdf)                                      |

## Abstract

Application observability tools play a crucial role in the optimization of application performance. However, it can be costly when a good instrumentation strategy isn’t in place. Without carefully selecting which data to keep, it can become a financial problem. With this in mind, Pismo considered some types of sampling, from vendor-specific solutions to open-source ones, and ended up landing at OpenTelemetry's Tail Sampling processor due to the flexibility of the policies that can be used, as well as its performance, reliability, and vendor neutrality. In this presentation, Juraci will talk about strategies to achieve a highly available tail-sampling setup, while Alexandre will show what his team did at Pismo to reduce their application observability costs by about 80% while keeping enough data to observe their applications adequately. At the end of this session, you’ll learn why sampling is needed, what tail-sampling is, and the trade-offs to consider when planning its usage.


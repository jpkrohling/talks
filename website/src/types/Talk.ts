
export interface Talk {
  id: string;
  date: string;
  title: string;
  description: string;
  location: string;
  recording?: string;
  slides?: string;
}

export const featuredTalkIds = [
  "2026-03-26-kubecon-eu-taming-wasteful-telemetry",
  "2026-03-23-observability-day-otel-gateways",
  "2025-11-10-observability-day-bad-telemetry",
];

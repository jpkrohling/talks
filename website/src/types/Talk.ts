
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
  "2025-11-11-kubecon-na-instrumentation-score",
  "2025-11-10-observability-day-bad-telemetry",
  "2025-10-14-datadog-berlin",
];

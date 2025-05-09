
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
  "2025-05-06-gophercon", 
  "2025-04-03-kubecon-eu-otel-sucks",
  "2024-03-19-observability-day", 
];

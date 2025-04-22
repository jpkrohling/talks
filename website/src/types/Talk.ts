
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
  "2025-kubecon-eu-otel-sucks",
  "2024-kcd-austria", 
  "2024-observability-day", 
];

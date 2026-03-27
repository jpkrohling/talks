# talks.yaml Field Schema

## Required fields

| Field | Format | Example |
|-------|--------|---------|
| `id` | `YYYY-MM-DD-event-slug` | `2026-03-26-kubecon-eu-taming-wasteful-telemetry` |
| `date` | `'YYYY-MM-DD'` (quoted) | `'2026-03-26'` |
| `title` | String | `"Day-2 Reality Check: Taming Wasteful Telemetry"` |
| `location` | `"City, Country FLAG"` | `"Amsterdam, Netherlands 🇳🇱"` |

## Optional fields

| Field | Format | Notes |
|-------|--------|-------|
| `description` | YAML `>` block scalar | Multi-line, omit for short talks like opening remarks |
| `slides` | `/YYYY/YYYY-MM-DD-event-slug/slides.pdf` | Absolute path from repo root |
| `recording` | `https://youtu.be/VIDEO_ID` | Short YouTube URL only |
| `event_name` | String | `'KubeCon + CloudNativeCon Europe 2026'` |
| `event_link` | URL | `https://sched.co/2CW6M` — use sched.co short URL when available |
| `co_speakers` | YAML list of `"Name, Company"` | Exclude Juraci from this list |

## Conventions

- Entries sorted reverse chronologically (newest first)
- IDs are kebab-case, derived from date + event + topic
- Location always includes flag emoji at the end
- Descriptions use `>` folded block scalar for multi-line text
- No trailing blank lines between entries (single blank line separator)

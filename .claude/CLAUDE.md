# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This repository maintains a portfolio of conference talks given by Juraci Paixão Kröhling. It contains:
- A YAML database of all talks (`talks.yaml`)
- PDF slides organized by year and event
- Biographical information in multiple languages (English, German, Portuguese)
- Professional headshots

## Core Data Structure

### talks.yaml

The central data file listing all talks. Each talk entry follows this structure:

```yaml
- id: YYYY-MM-DD-event-name
  date: 'YYYY-MM-DD'
  title: "Talk Title"
  description: >
    Multi-line description (optional)
  location: "City, Country, Flag-Emoji"
  slides: /YYYY/YYYY-MM-DD-event-name/slides.pdf
  recording: https://youtu.be/... (optional)
  event_name: 'Event Name' (optional)
  event_link: https://... (optional)
  co_speakers: (optional)
    - Name, Company
```

**Important conventions:**
- IDs use the format: `YYYY-MM-DD-event-name-slug`
- Dates are in ISO format: `YYYY-MM-DD`
- Slides are stored in year-based directories: `YYYY/YYYY-MM-DD-event-name/slides.pdf`
- Entries are sorted in reverse chronological order (newest first)
- Location format includes city, country/state, and flag emoji
- YouTube recordings use the short `youtu.be` format

### Directory Structure

```
.
├── talks.yaml           # Main database of all talks
├── YYYY/               # Year-based directories
│   └── YYYY-MM-DD-event-name/
│       ├── slides.pdf
│       └── README.md
├── headshots/          # Professional photos
└── README.md           # Bio and contact info
```

## Adding New Talks

When adding new presentations:

1. Add the entry to `talks.yaml` in reverse chronological order (newest at top)
2. Create the year directory if needed: `mkdir -p YYYY/YYYY-MM-DD-event-name/`
3. Copy the PDF slides: `cp ~/path/to/slides.pdf YYYY/YYYY-MM-DD-event-name/slides.pdf`
4. Create a README.md file in the talk directory following the standard format (see below)
5. Include co-speakers if it's a panel or co-presented talk
6. Add `event_link` pointing to the sched.co or official event page
7. Add `recording` URL when YouTube video becomes available
8. Follow the location format with flag emoji

### Talk README.md Format

Each talk directory should contain a README.md file with this structure:

```markdown
# Talk Title

|           |                                                                  |
| --------- | -----------------------------------------------------------------|
| Event     | Event Name                                                       |
| Where     | City, Country, Flag-Emoji                                        |
| When      | Month DD, YYYY                                                   |
| Recording | [YouTube](https://youtu.be/...) or None                          |
| Slides    | [PDF](slides.pdf)                                                |
| Link      | [Link](https://sched.co/...)                                     |

## Abstract

[Full description from talks.yaml]

## Co-speakers (if applicable)
* Name, Company
* Name, Company
```

**Important notes:**
- The "When" field uses full month name (e.g., "November 11, 2025")
- Recording shows "None" if not yet available
- Co-speakers section is only included for panels or co-presented talks

## Content Languages

The README.md contains biographical information in three languages:
- English (🇺🇸)
- German (🇩🇪)
- Portuguese (🇧🇷)

When updating bio information, ensure all three language versions are updated consistently.

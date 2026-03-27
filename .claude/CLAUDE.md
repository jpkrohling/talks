# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This repository maintains a portfolio of conference talks given by Juraci Paixão Kröhling. It contains:
- A YAML database of all talks (`talks.yaml`)
- PDF slides organized by year and event
- A React/Vite-based portfolio website in the `website/` directory
- Biographical information in multiple languages (English, German, Portuguese)
- Professional headshots

## Core Data Structure

### talks.yaml

The central data file that powers the website. Each talk entry follows this structure:

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
├── website/            # React/TypeScript portfolio site
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md           # Bio and contact info
```

## Website Development

The website is a React + TypeScript + Vite application using:
- **UI Framework:** shadcn/ui (Radix UI components)
- **Styling:** Tailwind CSS with dark theme and yellow accents
- **Build Tool:** Vite
- **Package Manager:** Multiple lock files present (npm, pnpm, bun) - use npm by default

### Common Commands

All website commands must be run from the `website/` directory:

```bash
cd website/
npm run dev        # Start development server
npm run build      # Build for production
npm run build:dev  # Build in development mode
npm run lint       # Run ESLint
npm run preview    # Preview production build
```

### Design System

- **Theme:** Dark mode with yellow accent color
- **Typography:** Inter font family
- **Components:** Built with shadcn/ui and Radix UI primitives
- **Responsive:** Mobile-first design
- **Accessibility:** WCAG-compliant components

- **Path Alias:** `@/*` maps to `./src/*` in imports
- **Dev Server:** Runs on port 8080

**Data sync:** The website does NOT read `talks.yaml` at runtime. Instead, `website/src/data/talksData.ts` contains a hardcoded copy of the talks data. When `talks.yaml` is updated, `talksData.ts` must also be updated for changes to appear on the website. Featured talk IDs are defined in `website/src/types/Talk.ts`.

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

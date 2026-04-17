# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This repository maintains a portfolio of conference talks given by Juraci Paixão Kröhling. It contains:
- PDF slides and READMEs organized by year and event
- Biographical information in multiple languages (English, German, Portuguese)
- Professional headshots

## Directory Structure

```
.
├── YYYY/               # Year-based directories
│   └── YYYY-MM-DD-event-name/
│       ├── slides.pdf
│       └── README.md
├── headshots/          # Professional photos
└── README.md           # Bio and contact info
```

## Adding New Talks

When adding new presentations:

1. Create the year directory if needed: `mkdir -p YYYY/YYYY-MM-DD-event-name/`
2. Copy the PDF slides: `cp ~/path/to/slides.pdf YYYY/YYYY-MM-DD-event-name/slides.pdf`
3. Create a README.md file in the talk directory following the standard format (see below)
4. Include co-speakers if it's a panel or co-presented talk
5. Add `event_link` pointing to the sched.co or official event page
6. Add `recording` URL when YouTube video becomes available
7. Follow the location format with flag emoji

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

[Full description of the talk]

## Co-speakers (if applicable)
* Name, Company
* Name, Company
```

**Important notes:**
- The "When" field uses full month name (e.g., "November 11, 2025")
- Recording shows "None" if not yet available
- Co-speakers section is only included for panels or co-presented talks
- YouTube recording URLs use the short `youtu.be` format
- Location format always includes a flag emoji (e.g., "Amsterdam, Netherlands 🇳🇱")

## Content Languages

The README.md contains biographical information in three languages:
- English (🇺🇸)
- German (🇩🇪)
- Portuguese (🇧🇷)

When updating bio information, ensure all three language versions are updated consistently.

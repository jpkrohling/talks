---
name: add-talk
description: Add new conference talks to the talks portfolio repository. Handles fetching metadata from sched.co URLs or manual input, creating YAML entries in talks.yaml, generating talk directories with README.md files, fuzzy-matching slide PDFs from ~/Downloads/, and staging all changes. Use when user says "add talk", "new talk", "add these talks", provides sched.co URLs, or mentions adding a presentation or conference entry.
---

## Workflow

Determine the input path based on what the user provides:

- **sched.co URLs provided** → Follow "Fetch from sched.co" then continue to Step 2
- **No URLs / other source** → Ask user for: title, date, location (with flag emoji), event name, event link, co-speakers (if any), description. Then continue to Step 2

## Step 1: Fetch from sched.co

For each sched.co URL:

1. Fetch the URL with curl using a browser User-Agent header (sched.com blocks default agents and WebFetch):
   ```bash
   curl -sL -H "User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0" "URL"
   ```
2. sched.co short URLs redirect (302) to the full sched.com URL. Follow redirects with `-L`.
3. Extract the `<script type="application/ld+json">` block from the HTML. This contains structured metadata:
   - `name` → talk title (strip speaker names after the dash)
   - `startDate` → talk date (extract YYYY-MM-DD)
   - `description` → abstract (HTML, convert `<br><br>` to paragraph breaks)
   - `location.address.streetAddress` → city/country
   - `superEvent.name` → event name
4. Speaker names and companies are embedded in the `name` field after a dash. Parse them to populate `co_speakers` (exclude Juraci Paixao Krohling from the list).
5. The original sched.co short URL becomes the `event_link`.

Process all URLs in parallel when multiple are provided.

## Step 2: Update talks.yaml

For the field format and conventions, see [talks-yaml-schema.md](./references/talks-yaml-schema.md).

1. Read the top of `talks.yaml` to find the insertion point
2. Add new entries at the top, maintaining reverse chronological order (newest first)
3. If multiple talks are being added, sort them among themselves by date descending

## Step 3: Create directories and READMEs

For each talk:

1. Create the directory: `YYYY/YYYY-MM-DD-event-slug/`
2. Create a `README.md` following the template in [readme-template.md](./references/readme-template.md)

The event slug should be a short, descriptive kebab-case name derived from the event and talk topic (e.g., `kubecon-eu-taming-wasteful-telemetry`, `observability-day-otel-gateways`).

## Step 4: Find and copy slides

1. List PDF files in `~/Downloads/`:
   ```bash
   ls -la ~/Downloads/*.pdf
   ```
2. For each talk, tokenize the title into keywords and match against filenames (case-insensitive)
3. If a strong match is found, copy it:
   ```bash
   cp ~/Downloads/"matched-file.pdf" YYYY/YYYY-MM-DD-event-slug/slides.pdf
   ```
4. If no match is found, inform the user which talks are missing slides
5. Add the `slides` field to the talks.yaml entry for talks that have slides

## Step 5: Stage changes

Stage all new and modified files:

```bash
git add talks.yaml YYYY/
```

Never commit — only stage for review.

## Important notes

- Location format always includes a flag emoji (e.g., "Amsterdam, Netherlands :flag-nl:")
- YouTube recording URLs use the short `youtu.be` format
- When a talk has no description (e.g., welcome/opening remarks), omit the description field from talks.yaml and the Abstract section from the README

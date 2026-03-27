# Talk README.md Template

Use this exact structure for each talk's README.md file.

## Standard talk (with description and co-speakers)

```markdown
# {title}

|           |                                                                  |
| --------- | -----------------------------------------------------------------|
| Event     | {event_name}                                                     |
| Where     | {location}                                                       |
| When      | {month_name} {day}, {year}                                       |
| Recording | [YouTube](https://youtu.be/{id}) or None                         |
| Slides    | [PDF](slides.pdf)                                                |
| Link      | [Link]({event_link})                                             |

## Abstract

{description — split into paragraphs at natural breaks}

## Co-speakers
* {name}, {company}
```

## Minimal talk (no description, no co-speakers)

```markdown
# {title}

|           |                                                                  |
| --------- | -----------------------------------------------------------------|
| Event     | {event_name}                                                     |
| Where     | {location}                                                       |
| When      | {month_name} {day}, {year}                                       |
| Recording | None                                                             |
| Slides    | [PDF](slides.pdf)                                                |
| Link      | [Link]({event_link})                                             |
```

## Field notes

- **When**: Use full month name (e.g., "March 26, 2026"), not numeric
- **Recording**: Show `None` if not yet available; omit the row entirely only if slides are also missing
- **Slides**: Omit the row if no slides exist yet
- **Abstract**: Omit the section entirely if there is no description
- **Co-speakers**: Omit the section entirely for solo talks or talks where Juraci is the only speaker

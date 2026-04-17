import { describe, expect, test } from 'bun:test';
import { parseLegacyReadme } from '../migrate-talks';

const SAMPLE = `# Taming Wasteful Telemetry

|           |                                                                  |
| --------- | -----------------------------------------------------------------|
| Event     | KubeCon + CloudNativeCon Europe 2026                             |
| Where     | Amsterdam, Netherlands 🇳🇱                                       |
| When      | March 26, 2026                                                   |
| Recording | [YouTube](https://youtu.be/abc123)                               |
| Slides    | [PDF](slides.pdf)                                                |
| Link      | [Link](https://sched.co/2EF6i)                                   |

## Abstract

Telemetry bloat is quietly destroying your observability budget.

## Co-speakers
* Pablo Baeyens, Datadog
* Marylia Gutierrez, Grafana Labs
`;

describe('parseLegacyReadme', () => {
  test('extracts title from h1', () => {
    const r = parseLegacyReadme(SAMPLE, '2026-03-26-kubecon-eu-taming-wasteful-telemetry');
    expect(r.frontmatter.title).toBe('Taming Wasteful Telemetry');
  });

  test('extracts event, date, location', () => {
    const r = parseLegacyReadme(SAMPLE, '2026-03-26-kubecon-eu-taming-wasteful-telemetry');
    expect(r.frontmatter.event).toBe('KubeCon + CloudNativeCon Europe 2026');
    expect(r.frontmatter.date).toBe('2026-03-26');
    expect(r.frontmatter.location.city).toBe('Amsterdam');
    expect(r.frontmatter.location.country).toBe('Netherlands');
    expect(r.frontmatter.location.flag).toBe('🇳🇱');
  });

  test('extracts recording and slides and event_link', () => {
    const r = parseLegacyReadme(SAMPLE, '2026-03-26-kubecon-eu-taming-wasteful-telemetry');
    expect(r.frontmatter.recording).toBe('https://youtu.be/abc123');
    expect(r.frontmatter.slides).toBe('slides.pdf');
    expect(r.frontmatter.event_link).toBe('https://sched.co/2EF6i');
  });

  test('extracts co-speakers', () => {
    const r = parseLegacyReadme(SAMPLE, '2026-03-26-kubecon-eu-taming-wasteful-telemetry');
    expect(r.frontmatter.co_speakers).toEqual([
      { name: 'Pablo Baeyens', company: 'Datadog' },
      { name: 'Marylia Gutierrez', company: 'Grafana Labs' },
    ]);
  });

  test('body retains abstract content, strips legacy table and co-speakers section', () => {
    const r = parseLegacyReadme(SAMPLE, '2026-03-26-kubecon-eu-taming-wasteful-telemetry');
    expect(r.body).not.toContain('| Event');
    expect(r.body).not.toContain('## Co-speakers');
    expect(r.body).toContain('Telemetry bloat is quietly destroying');
    expect(r.body.startsWith('## Abstract')).toBe(true);
  });

  test('"None" for recording is treated as absent', () => {
    const noRecording = SAMPLE.replace('[YouTube](https://youtu.be/abc123)', 'None');
    const r = parseLegacyReadme(noRecording, 'slug');
    expect(r.frontmatter.recording).toBeUndefined();
  });

  test('skips file that already has frontmatter', async () => {
    const withFm = '---\ntitle: Foo\n---\n\nbody';
    const r = parseLegacyReadme(withFm, 'slug');
    expect(r.alreadyMigrated).toBe(true);
  });
});

describe('parseLegacyReadme – date variants', () => {
  test('abbreviated month: "Apr 18, 2023"', () => {
    const md = SAMPLE.replace('March 26, 2026', 'Apr 18, 2023');
    const r = parseLegacyReadme(md, 'slug');
    expect(r.frontmatter.date).toBe('2023-04-18');
  });

  test('double-letter abbreviation: "Sept 10, 2021"', () => {
    const md = SAMPLE.replace('March 26, 2026', 'Sept 10, 2021');
    const r = parseLegacyReadme(md, 'slug');
    expect(r.frontmatter.date).toBe('2021-09-10');
  });

  test('ordinal suffix: "February 1st, 2023"', () => {
    const md = SAMPLE.replace('March 26, 2026', 'February 1st, 2023');
    const r = parseLegacyReadme(md, 'slug');
    expect(r.frontmatter.date).toBe('2023-02-01');
  });

  test('zero-padded day: "June 06, 2024"', () => {
    const md = SAMPLE.replace('March 26, 2026', 'June 06, 2024');
    const r = parseLegacyReadme(md, 'slug');
    expect(r.frontmatter.date).toBe('2024-06-06');
  });
});

describe('parseLegacyReadme – recording field variants', () => {
  test('alternate "Video" field name populates recording', () => {
    const md = SAMPLE.replace('| Recording |', '| Video     |');
    const r = parseLegacyReadme(md, 'slug');
    expect(r.frontmatter.recording).toBe('https://youtu.be/abc123');
  });

  test('"Missing" sentinel is treated as absent', () => {
    const md = SAMPLE.replace('[YouTube](https://youtu.be/abc123)', 'Missing');
    const r = parseLegacyReadme(md, 'slug');
    expect(r.frontmatter.recording).toBeUndefined();
  });

  test('"N/A" sentinel is treated as absent', () => {
    const md = SAMPLE.replace('[YouTube](https://youtu.be/abc123)', 'N/A');
    const r = parseLegacyReadme(md, 'slug');
    expect(r.frontmatter.recording).toBeUndefined();
  });
});

describe('parseLegacyReadme – location variants', () => {
  test('Scotland tag-sequence flag is preserved as full sequence', () => {
    const md = SAMPLE.replace(
      'Amsterdam, Netherlands 🇳🇱',
      'Edinburgh, UK 🏴\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}',
    );
    const r = parseLegacyReadme(md, 'slug');
    expect(r.frontmatter.location.city).toBe('Edinburgh');
    expect(r.frontmatter.location.country).toBe('UK');
    expect(r.frontmatter.location.flag).toBe(
      '🏴\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}',
    );
  });

  test('city + flag only (no country) yields empty country', () => {
    const md = SAMPLE.replace('Amsterdam, Netherlands 🇳🇱', 'Berlin, 🇩🇪');
    const r = parseLegacyReadme(md, 'slug');
    expect(r.frontmatter.location.city).toBe('Berlin');
    expect(r.frontmatter.location.country).toBe('');
    expect(r.frontmatter.location.flag).toBe('🇩🇪');
  });

  test('trailing parenthetical before flag is stripped from city', () => {
    const md = SAMPLE.replace('Amsterdam, Netherlands 🇳🇱', 'Online (Virtual) 🌐');
    const r = parseLegacyReadme(md, 'slug');
    expect(r.frontmatter.location.city).toBe('Online');
    expect(r.frontmatter.location.flag).toBe('🌐');
  });

  test('city + state + country parses without throwing; state+country kept in country field', () => {
    const md = SAMPLE.replace('Amsterdam, Netherlands 🇳🇱', 'Atlanta, GA, United States 🇺🇸');
    const r = parseLegacyReadme(md, 'slug');
    expect(r.frontmatter.location.city).toBe('Atlanta');
    // Current implementation: everything between city and flag joins into country.
    expect(r.frontmatter.location.country).toBe('GA, United States');
    expect(r.frontmatter.location.flag).toBe('🇺🇸');
  });
});

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

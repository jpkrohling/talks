import { describe, expect, test } from 'bun:test';
import { type RawCredlyBadge, normalizeBadge } from '../fetch-credly';

const raw: RawCredlyBadge = {
  id: 'abc-123',
  issued_at_date: '2024-06-10',
  public_url: 'https://www.credly.com/badges/abc-123',
  badge_template: {
    name: 'Certified Kubernetes Administrator (CKA)',
    description: 'Earned by passing the CKA exam.',
    image_url: 'https://images.credly.com/abc.png',
    issuer: { entities: [{ entity: { name: 'The Linux Foundation' } }] },
  },
};

describe('normalizeBadge', () => {
  test('maps raw badge to normalized shape', () => {
    const b = normalizeBadge(raw);
    expect(b.id).toBe('abc-123');
    expect(b.name).toBe('Certified Kubernetes Administrator (CKA)');
    expect(b.issuer).toBe('The Linux Foundation');
    expect(b.image_url).toBe('https://images.credly.com/abc.png');
    expect(b.issued_at).toBe('2024-06-10');
    expect(b.public_url).toBe('https://www.credly.com/badges/abc-123');
    expect(b.description).toBe('Earned by passing the CKA exam.');
  });

  test('handles missing issuer entity gracefully', () => {
    const b = normalizeBadge({
      ...raw,
      badge_template: { ...raw.badge_template, issuer: { entities: [] } },
    });
    expect(b.issuer).toBe('Unknown issuer');
  });
});

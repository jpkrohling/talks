import type { Talk } from './talks';

export function personJsonLd(site: URL) {
  const origin = site.toString().replace(/\/$/, '');
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Juraci Paixão Kröhling',
    url: origin,
    jobTitle: 'Software Engineer',
    worksFor: { '@type': 'Organization', name: 'OllyGarden' },
    sameAs: [
      'https://linktr.ee/jpkroehling',
      'https://github.com/jpkrohling',
      'https://www.linkedin.com/in/jpkroehling',
      'https://speakerdeck.com/jpkroehling',
      'https://www.credly.com/users/juraci-paixao-krohling',
    ],
  };
}

export function talkJsonLd(talk: Talk, site: URL) {
  const origin = site.toString().replace(/\/$/, '');
  const url = `${origin}/talks/${talk.id}/`;
  return {
    '@context': 'https://schema.org',
    '@type': 'PresentationDigitalDocument',
    name: talk.data.title,
    url,
    author: { '@type': 'Person', name: 'Juraci Paixão Kröhling' },
    inLanguage: 'en',
    datePublished: talk.data.date.toISOString().slice(0, 10),
    keywords: talk.data.tags.join(', '),
    recordedAt: {
      '@type': 'Event',
      name: talk.data.event,
      startDate: talk.data.date.toISOString().slice(0, 10),
      location: {
        '@type': 'Place',
        name: `${talk.data.location.city}, ${talk.data.location.country}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: talk.data.location.city,
          addressCountry: talk.data.location.country,
        },
      },
      url: talk.data.event_link,
    },
    video: talk.data.recording
      ? {
          '@type': 'VideoObject',
          name: talk.data.title,
          embedUrl: talk.data.recording,
          uploadDate: talk.data.date.toISOString().slice(0, 10),
        }
      : undefined,
  };
}

export function talkListJsonLd(talks: Talk[], site: URL) {
  const origin = site.toString().replace(/\/$/, '');
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: talks.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${origin}/talks/${t.id}/`,
      name: t.data.title,
    })),
  };
}

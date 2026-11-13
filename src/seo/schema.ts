/**
 * Schema.org structured data (JSON-LD) builders.
 *
 * Everything is published as one @graph per page. Entities that repeat across
 * pages (organization, website, products) use stable @id values so search
 * engines and AI assistants merge them into one entity instead of many.
 */
import { PLANS } from '../content/plans';
import { CAPABILITIES, EINVOICING_PLANS } from '../content/eInvoicing';
import type { Faq } from '../content/pricingFaq';
import { SITE, absoluteUrl } from './site';

type Json = Record<string, unknown>;

export const ids = {
  organization: absoluteUrl('/#organization'),
  website: absoluteUrl('/#website'),
  subscriptionBilling: absoluteUrl('/subscription-billing/#product'),
  eInvoicing: absoluteUrl('/e-invoicing/#product'),
};

export function organization(): Json {
  const c = SITE.company;
  return {
    '@type': 'Organization',
    '@id': ids.organization,
    name: c.legalName,
    url: absoluteUrl('/'),
    logo: { '@type': 'ImageObject', url: absoluteUrl(SITE.logo) },
    // Contact is by the contact page only; the email address is deliberately
    // not published here so address harvesters cannot collect it.
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        url: absoluteUrl('/contact/'),
        availableLanguage: ['English', 'German'],
        areaServed: 'EU',
      },
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        url: absoluteUrl('/contact/'),
        availableLanguage: ['English', 'German'],
        areaServed: 'EU',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: c.street,
      postalCode: c.postalCode,
      addressLocality: c.city,
      addressCountry: c.country,
    },
    brand: [{ '@id': ids.subscriptionBilling }, { '@id': ids.eInvoicing }],
  };
}

export function eInvoicingProduct(): Json {
  return {
    '@type': 'SoftwareApplication',
    '@id': ids.eInvoicing,
    name: 'E-Invoicing',
    alternateName: 'MYFUNDBOX E-Invoicing (E-Rechnung)',
    url: absoluteUrl('/e-invoicing/'),
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Electronic invoicing (XRechnung, ZUGFeRD)',
    operatingSystem: 'Web browser',
    description:
      'E-invoicing for German businesses: create invoices, validate them against EN 16931 and German rules, generate XRechnung or ZUGFeRD, and transfer them to Lexware Office, DATEV or sevdesk without changing accounting software.',
    featureList: CAPABILITIES.map((c) => `${c.title}: ${c.desc}`),
    isRelatedTo: { '@id': ids.subscriptionBilling },
    publisher: { '@id': ids.organization },
    offers: EINVOICING_PLANS.map((p) => ({
      '@type': 'Offer',
      name: p.name,
      description: `${p.included} e-invoices per month${p.overage ? `, then €${p.overage.toFixed(2)} each` : ''}. ${p.desc}`,
      price: p.price.toFixed(2),
      priceCurrency: 'EUR',
      url: absoluteUrl('/e-invoicing/#pricing'),
      category: p.price === 0 ? 'Free' : 'Subscription',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: p.price.toFixed(2),
        priceCurrency: 'EUR',
        unitText: 'MONTH',
        valueAddedTaxIncluded: false,
      },
    })),
  };
}

export function website(): Json {
  return {
    '@type': 'WebSite',
    '@id': ids.website,
    name: SITE.name,
    alternateName: SITE.fullName,
    url: absoluteUrl('/'),
    description: SITE.summary,
    inLanguage: SITE.language,
    publisher: { '@id': ids.organization },
  };
}

export function webPage(
  path: string,
  title: string,
  description: string,
  type = 'WebPage',
  reviewed?: string,
  lang: string = SITE.language,
): Json {
  return {
    ...(reviewed ? { lastReviewed: reviewed, dateModified: reviewed } : {}),
    '@type': type,
    '@id': absoluteUrl(path) + '#webpage',
    url: absoluteUrl(path),
    name: title,
    description,
    inLanguage: lang,
    isPartOf: { '@id': ids.website },
    publisher: { '@id': ids.organization },
  };
}

export function breadcrumbs(trail: { name: string; path: string }[]): Json {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: absoluteUrl(t.path),
    })),
  };
}

export function subscriptionBillingProduct(): Json {
  return {
    '@type': 'SoftwareApplication',
    '@id': ids.subscriptionBilling,
    name: 'Subscription Billing',
    alternateName: SITE.fullName,
    url: absoluteUrl('/subscription-billing/'),
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Subscription billing and recurring payments',
    operatingSystem: 'Web browser',
    description:
      'Subscription billing for SaaS companies: flat and tiered plans, shareable pay links, smart dunning, Stripe, PayPal, GoCardless and Mollie payouts in one ledger, revenue analytics, GDPR data-rights tooling, PSD2 SCA testing and real-time EU VAT validation.',
    featureList: [
      'Flat and tiered subscription plans with custom billing intervals',
      'Shareable pay links and branded checkout',
      'Smart dunning with payment-method-aware retries',
      'Stripe, PayPal, GoCardless and Mollie in one settlement ledger',
      'ARR, forecast and collected-revenue analytics',
      'GDPR Article 15 portability exports and Article 17 erasure',
      'PSD2 Strong Customer Authentication sandbox',
      'Real-time EU VAT ID validation against VIES',
    ],
    publisher: { '@id': ids.organization },
    offers: PLANS.map((p) => ({
      '@type': 'Offer',
      name: p.name,
      description: `${p.limit}. ${p.desc}`,
      price: p.price.monthly.toFixed(2),
      priceCurrency: 'EUR',
      url: absoluteUrl('/pricing/'),
      category: p.price.monthly === 0 ? 'Free' : 'Subscription',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: p.price.monthly.toFixed(2),
        priceCurrency: 'EUR',
        unitText: 'MONTH',
        valueAddedTaxIncluded: false,
      },
    })),
  };
}

export function faqPage(path: string, faqs: Faq[]): Json {
  return {
    '@type': 'FAQPage',
    '@id': absoluteUrl(path) + '#faq',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function article(g: {
  slug: string;
  title: string;
  description: string;
  category: string;
  published: string;
  reviewed: string;
}): Json {
  const url = absoluteUrl(`/resources/${g.slug}/`);
  return {
    '@type': 'Article',
    '@id': url + '#article',
    headline: g.title,
    description: g.description,
    articleSection: g.category,
    datePublished: g.published,
    dateModified: g.reviewed,
    inLanguage: SITE.language,
    mainEntityOfPage: { '@id': url + '#webpage' },
    author: { '@id': ids.organization },
    publisher: { '@id': ids.organization },
    image: absoluteUrl(SITE.logo),
    about: ['German e-invoicing', 'XRechnung', 'ZUGFeRD', 'EN 16931'],
  };
}

export function itemList(name: string, items: { name: string; path: string }[]): Json {
  return {
    '@type': 'ItemList',
    name,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      url: absoluteUrl(it.path),
    })),
  };
}

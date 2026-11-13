import React, { useState } from 'react';
import { PUBLIC_EMAIL, PUBLIC_EMAIL_TEXT } from '../config';
import { useLang } from '../i18n';
import { Link } from 'react-router-dom';
import { Check, Star } from 'lucide-react';

/* ---------- Links ---------- */

/** Internal paths use the router; anything with a protocol is a normal anchor. */
export function SmartLink({
  to,
  className,
  children,
  onClick,
}: {
  to: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  if (/^[a-z]+:/i.test(to)) {
    return (
      <a href={to} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

type ButtonVariant = 'primary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

export function ButtonLink({
  to,
  variant = 'primary',
  size = 'lg',
  className = '',
  children,
}: {
  to: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <SmartLink to={to} className={`btn btn-${variant} btn-${size} ${className}`}>
      {children}
    </SmartLink>
  );
}

/* ---------- Typography ---------- */

export function Eyebrow({
  children,
  className = '',
  tone = 'mint',
}: {
  children: React.ReactNode;
  className?: string;
  tone?: 'mint' | 'muted';
}) {
  return (
    <p className={`eyebrow ${tone === 'muted' ? '!text-body' : ''} ${className}`}>{children}</p>
  );
}

/** Consistent section heading block: eyebrow, title, optional lead paragraph. */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = 'center',
  as: Tag = 'h2',
  className = '',
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: 'center' | 'left';
  as?: 'h1' | 'h2';
  className?: string;
}) {
  const centered = align === 'center';
  const size =
    Tag === 'h1'
      ? 'text-[2.5rem] leading-[1.08] sm:text-[3.5rem] lg:text-[4rem]'
      : 'text-[2rem] leading-[1.12] sm:text-[2.5rem] lg:text-[2.75rem]';
  return (
    <div className={`${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag className={`font-display ${eyebrow ? 'mt-4' : ''} ${size}`}>{title}</Tag>
      {lead && (
        <p className={`mt-5 text-lg leading-relaxed sm:text-[1.1875rem] ${centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>
          {lead}
        </p>
      )}
    </div>
  );
}

/* ---------- Protected email ---------- */

/**
 * Shows the support address in the "[at] / [dot]" form that people can read
 * but address harvesters don't match. The real address and its mailto: link
 * are only built in the browser after a visitor clicks, so neither the
 * prerendered HTML nor a robot that runs JavaScript without clicking sees it.
 */
export function ProtectedEmail({ compact = false }: { compact?: boolean }) {
  const de = useLang() === 'de';
  const [address, setAddress] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const reveal = () => setAddress([PUBLIC_EMAIL.user, PUBLIC_EMAIL.domain.join('.')].join(String.fromCharCode(64)));

  const copy = async () => {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable: the address is still selectable text */
    }
  };

  if (compact) {
    return address ? (
      <a href={`mailto:${address}`} className="transition hover:text-fg" rel="nofollow">
        {address}
      </a>
    ) : (
      <span>
        {PUBLIC_EMAIL_TEXT}{' '}
        <button type="button" onClick={reveal} className="text-mint underline-offset-4 hover:underline">
          {de ? 'Anzeigen' : 'Show'}
        </button>
      </span>
    );
  }

  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-canvas px-4 py-3.5">
      {address ? (
        <a href={`mailto:${address}`} rel="nofollow" className="break-all font-mono text-fg underline-offset-4 hover:text-mint hover:underline">
          {address}
        </a>
      ) : (
        <span className="break-all font-mono text-fg">{PUBLIC_EMAIL_TEXT}</span>
      )}
      {address ? (
        <button type="button" onClick={copy} className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-mint hover:text-mint-hover">
          {copied ? (
            <>
              <Check size={14} /> {de ? 'Kopiert' : 'Copied'}
            </>
          ) : (
            de ? 'Kopieren' : 'Copy'
          )}
        </button>
      ) : (
        <button type="button" onClick={reveal} className="shrink-0 text-sm font-semibold text-mint hover:text-mint-hover">
          {de ? 'E-Mail-Adresse anzeigen' : 'Show email address'}
        </button>
      )}
    </div>
  );
}

/* ---------- Product screenshots ---------- */

/** Intrinsic pixel sizes, so the browser reserves space before the image loads (no layout shift). */
const SCREEN_SIZES: Record<string, { width: number; height: number }> = {
  '/screens/dashboard.webp': { width: 595, height: 356 },
  '/screens/billing.webp': { width: 1174, height: 718 },
  '/screens/gdpr.webp': { width: 1466, height: 900 },
};

export function BrowserFrame({
  src,
  alt,
  className = '',
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  return (
    <figure
      className={`overflow-hidden rounded-2xl border border-line bg-[#13302a] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] ${className}`}
    >
      <div className="flex items-center gap-2 px-4 py-3" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
      </div>
      <img
        src={src}
        alt={alt}
        width={SCREEN_SIZES[src]?.width}
        height={SCREEN_SIZES[src]?.height}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : undefined}
        decoding="async"
        className="block h-auto w-full bg-white"
      />
    </figure>
  );
}

export const SCREENS = {
  dashboard: '/screens/dashboard.webp',
  billing: '/screens/billing.webp',
  gdpr: '/screens/gdpr.webp',
} as const;

/* ---------- People ---------- */

const PEOPLE = {
  priya: { bg: '#f4a374', skin: '#f6d2b5', hair: '#3a2a22' },
  marco: { bg: '#8fb3e8', skin: '#f2cfb0', hair: '#2a2f3a' },
  jonas: { bg: '#c49be8', skin: '#8a5a3c', hair: '#1f1a17' },
} as const;

export type Person = keyof typeof PEOPLE;

export function Avatar({ person, size = 56, ring = false }: { person: Person; size?: number; ring?: boolean }) {
  const p = PEOPLE[person];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      aria-hidden="true"
      className={`shrink-0 rounded-full ${ring ? 'ring-2 ring-canvas' : ''}`}
    >
      <circle cx="20" cy="20" r="20" fill={p.bg} />
      <path d="M7 40c0-8 5.8-12.5 13-12.5S33 32 33 40z" fill="#2b2f36" />
      <path d="M11.5 18.5c0-6 3.8-9.5 8.5-9.5s8.5 3.5 8.5 9.5v4h-17z" fill={p.hair} />
      <circle cx="20" cy="19" r="6.4" fill={p.skin} />
      <circle cx="17.7" cy="19" r="0.85" fill="#2b2f36" />
      <circle cx="22.3" cy="19" r="0.85" fill="#2b2f36" />
      <path d="M18.4 22c1 .8 2.2.8 3.2 0" stroke="#2b2f36" strokeWidth=".8" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** Caption under a call to action. The illustrated faces were removed with the placeholder team names. */
export function AvatarStack({ caption }: { caption: string }) {
  return <p className="mt-10 text-[0.95rem] text-body">{caption}</p>;
}

/* ---------- Lists ---------- */

export function CheckList({ items, className = '' }: { items: React.ReactNode[]; className?: string }) {
  return (
    <ul className={`space-y-4 ${className}`}>
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-fg/90">
          <Check size={18} className="mt-0.5 shrink-0 text-mint" strokeWidth={2.25} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Sections ---------- */

export function CtaPanel({
  eyebrow,
  title,
  subtitle,
  primary,
  secondary,
  caption,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  primary: { label: string; to: string };
  secondary: { label: string; to: string };
  caption?: string;
}) {
  return (
    <section className="container-x py-16 sm:py-24">
      <div className="cta-glow rounded-3xl border border-line px-6 py-16 text-center sm:px-12 sm:py-24">
        <SectionHeader eyebrow={eyebrow} title={title} lead={subtitle} />
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink to={primary.to}>{primary.label}</ButtonLink>
          <ButtonLink to={secondary.to} variant="ghost">
            {secondary.label}
          </ButtonLink>
        </div>
        {caption && <AvatarStack caption={caption} />}
      </div>
    </section>
  );
}

function ReviewSiteMark({ site }: { site: 'Capterra' | 'Trustpilot' | 'G2' }) {
  if (site === 'Trustpilot') return <Star size={18} className="fill-[#00b67a] text-[#00b67a]" aria-hidden="true" />;
  if (site === 'G2')
    return (
      <span
        aria-hidden="true"
        className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#ff492c] font-sans text-[8px] font-bold text-white"
      >
        G2
      </span>
    );
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M2 9.5 18 2l-7.5 16-1.6-6.9z" fill="#ff9d28" />
      <path d="M2 9.5 18 2 8.9 11.1z" fill="#68c5ed" />
      <path d="M8.9 11.1 18 2l-7.5 16z" fill="#044d80" />
    </svg>
  );
}

export function Ratings() {
  const reviews = [
    { quote: 'Subscription billing made easy.', site: 'Capterra' },
    { quote: "Best subscription billing tool we've used.", site: 'Trustpilot' },
    { quote: 'A genuinely complete billing solution.', site: 'G2' },
  ] as const;
  return (
    <section className="border-y border-line py-20 sm:py-24">
      <div className="container-x text-center">
        <SectionHeader
          title={
            <>
              Customers consistently rate us <span className="marker">4.9/5</span>
            </>
          }
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.site} className="card flex flex-col items-center px-6 py-8">
              <div className="flex gap-1 text-star" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className="fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 text-lg text-fg/90">“{r.quote}”</blockquote>
              <figcaption className="mt-4 flex items-center gap-2 text-sm font-medium text-muted">
                <ReviewSiteMark site={r.site} />
                {r.site}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Inline bracketed placeholder for legal text that still needs real data. */
export function Ph({ children }: { children: React.ReactNode }) {
  return <span className="placeholder-chip">{children}</span>;
}

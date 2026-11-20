import { useEffect, useId, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { ButtonLink, SmartLink } from './ui';
import { LINKS, NAV, NAV_DE, type NavLinkItem } from '../config';
import { DE_HOME, counterpart, localizedPath, useLang, type Lang } from '../i18n';
import { isLive, normalizePath } from '../seo/routes';

/** Closes a popover on outside click or Escape. */
function useDismiss(open: boolean, ref: React.RefObject<HTMLElement | null>, close: () => void) {
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, ref, close]);
}

/** United Kingdom flag. Inline SVG because flag emoji don't render on Windows. */
function FlagGB() {
  const clip = `gb-clip-${useId().replace(/:/g, '')}`;
  return (
    <svg viewBox="0 0 60 30" className="h-[14px] w-[22px] shrink-0 rounded-[2px]" aria-hidden="true" focusable="false">
      <clipPath id={clip}>
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath={`url(#${clip})`} stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

/** German flag. */
function FlagDE() {
  return (
    <svg viewBox="0 0 5 3" className="h-[14px] w-[22px] shrink-0 rounded-[2px]" aria-hidden="true" focusable="false">
      <rect width="5" height="1" y="0" fill="#000" />
      <rect width="5" height="1" y="1" fill="#DD0000" />
      <rect width="5" height="1" y="2" fill="#FFCE00" />
    </svg>
  );
}

/**
 * Language switch: both languages always visible, the current one highlighted.
 * Pages with a translation switch to their counterpart; elsewhere, German leads
 * to the German e-invoicing pages (the only German pages so far) and English
 * leads to the home page.
 */
function LanguageSwitch({ className = '' }: { className?: string }) {
  const { pathname } = useLocation();
  const lang = useLang();
  const other = counterpart(pathname);
  const options = [
    { code: 'en' as Lang, short: 'EN', label: 'English', Flag: FlagGB, to: lang === 'en' ? pathname : other?.path ?? '/' },
    { code: 'de' as Lang, short: 'DE', label: 'Deutsch', Flag: FlagDE, to: lang === 'de' ? pathname : other?.path ?? DE_HOME },
  ];

  return (
    <nav aria-label={lang === 'de' ? 'Sprache' : 'Language'} className={`flex items-center gap-1 ${className}`}>
      {options.map(({ code, short, label, Flag, to }) => {
        const current = code === lang;
        return (
          <Link
            key={code}
            to={to}
            hrefLang={code}
            lang={code}
            title={label}
            aria-current={current ? 'true' : undefined}
            className={`flex h-10 items-center gap-2 rounded-lg border px-3 text-sm font-bold tracking-wide transition ${
              current
                ? 'border-mint/50 bg-mint/10 text-fg'
                : 'border-transparent text-muted hover:bg-surface-2 hover:text-fg'
            }`}
          >
            <Flag />
            {short}
          </Link>
        );
      })}
    </nav>
  );
}

/** Navigation with links to unbuilt pages removed; a group left with one link becomes that link. */
type ResolvedEntry = { kind: 'link'; item: NavLinkItem } | { kind: 'group'; label: string; items: NavLinkItem[] };

/** Translate a menu item and point it at the German page when one exists. */
function localize(item: NavLinkItem, lang: Lang): NavLinkItem {
  if (lang !== 'de') return item;
  const de = NAV_DE[item.label];
  return { to: localizedPath(item.to, lang), label: de?.label ?? item.label, desc: de?.desc ?? item.desc };
}

function resolveNav(lang: Lang): ResolvedEntry[] {
  const out: ResolvedEntry[] = [];
  for (const entry of NAV) {
    if ('items' in entry) {
      const items = entry.items.filter((i) => isLive(i.to)).map((i) => localize(i, lang));
      const label = lang === 'de' ? NAV_DE[entry.label]?.label ?? entry.label : entry.label;
      if (items.length === 1) out.push({ kind: 'link', item: items[0] });
      else if (items.length > 1) out.push({ kind: 'group', label, items });
    } else if (isLive(entry.to)) {
      out.push({ kind: 'link', item: localize(entry, lang) });
    }
  }
  return out;
}

const isCurrent = (pathname: string, to: string) => normalizePath(pathname) === normalizePath(to);

function DesktopDropdown({
  label,
  items,
  open,
  onToggle,
  onClose,
}: {
  label: string;
  items: NavLinkItem[];
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  useDismiss(open, ref, onClose);
  const active = items.some((i) => isCurrent(pathname, i.to));
  const panelId = `nav-${label.toLowerCase().replace(/[^a-z]+/g, '-')}`;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className={`flex items-center gap-1 transition hover:text-fg ${active || open ? 'text-fg' : 'text-body'} ${
          active ? 'font-semibold' : ''
        }`}
      >
        {label}
        <ChevronDown size={15} className={`mt-px transition ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      {/* The panel stays in the HTML while closed so crawlers can follow its links. */}
      <div
        id={panelId}
        hidden={!open}
        className="absolute left-1/2 top-full z-50 mt-5 w-[22rem] -translate-x-1/2 rounded-xl border border-line bg-surface p-2 shadow-2xl"
      >
        <ul>
          {items.map((i) => (
            <li key={i.to}>
              <NavLink
                to={i.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-3 transition hover:bg-surface-2 ${isActive ? 'bg-surface-2' : ''}`
                }
              >
                <span className="block font-semibold text-fg">{i.label}</span>
                {i.desc && <span className="mt-0.5 block text-sm text-muted">{i.desc}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `transition hover:text-fg ${isActive ? 'font-semibold text-fg' : 'text-body'}`;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { pathname } = useLocation();
  const lang = useLang();
  const nav = resolveNav(lang);
  const signIn = lang === 'de' ? 'Anmelden' : 'Sign In';
  const trial = lang === 'de' ? 'Kostenlos starten' : 'Start Free Trial';

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/85 backdrop-blur-md">
      <div className="container-x flex h-[76px] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="ml-auto hidden items-center gap-9 whitespace-nowrap text-[1.0625rem] xl:flex">
          {nav.map((e) =>
            e.kind === 'link' ? (
              <NavLink key={e.item.to} to={e.item.to} className={linkClass}>
                {e.item.label}
              </NavLink>
            ) : (
              <DesktopDropdown
                key={e.label}
                label={e.label}
                items={e.items}
                open={openMenu === e.label}
                onToggle={() => setOpenMenu((m) => (m === e.label ? null : e.label))}
                onClose={() => setOpenMenu(null)}
              />
            ),
          )}
        </nav>

        <div className="hidden shrink-0 items-center gap-5 whitespace-nowrap xl:flex">
          <span className="h-7 w-px bg-line" aria-hidden="true" />
          <LanguageSwitch />
          <SmartLink to={LINKS.signIn} className="text-[1.0625rem] font-semibold text-body transition hover:text-fg">
            {signIn}
          </SmartLink>
          <ButtonLink to={LINKS.trial} size="md">
            {trial}
          </ButtonLink>
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-fg xl:hidden"
          aria-label={lang === 'de' ? (mobileOpen ? 'Menü schließen' : 'Menü öffnen') : mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div id="mobile-menu" className="h-[calc(100dvh-76px)] overflow-y-auto border-t border-line bg-canvas xl:hidden">
          <nav aria-label="Mobile" className="container-x flex flex-col py-4">
            {nav.map((e) =>
              e.kind === 'link' ? (
                <NavLink
                  key={e.item.to}
                  to={e.item.to}
                  className={({ isActive }) =>
                    `border-b border-line-soft py-4 text-lg ${isActive ? 'font-semibold text-fg' : 'text-body'}`
                  }
                >
                  {e.item.label}
                </NavLink>
              ) : (
                <details key={e.label} className="group border-b border-line-soft">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-lg text-body [&::-webkit-details-marker]:hidden">
                    {e.label}
                    <ChevronDown size={18} className="transition group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <ul className="pb-3">
                    {e.items.map((i) => (
                      <li key={i.to}>
                        <NavLink
                          to={i.to}
                          className={({ isActive }) =>
                            `block rounded-lg px-3 py-2.5 ${isActive ? 'bg-surface text-fg' : 'text-body'}`
                          }
                        >
                          <span className="block font-medium">{i.label}</span>
                          {i.desc && <span className="block text-sm text-muted">{i.desc}</span>}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </details>
              ),
            )}
            <LanguageSwitch className="mt-6" />
            <div className="mt-6 flex flex-col gap-3">
              <ButtonLink to={LINKS.trial} size="md">
                {trial}
              </ButtonLink>
              <ButtonLink to={LINKS.signIn} size="md" variant="ghost">
                {signIn}
              </ButtonLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

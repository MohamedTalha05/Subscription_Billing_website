import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Check, ChevronDown, Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { ButtonLink, SmartLink } from './ui';
import { LINKS, NAV } from '../config';

const LANGUAGES = [
  { code: 'EN', label: 'English', available: true },
  { code: 'DE', label: 'Deutsch', available: false },
] as const;

function LanguageMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-10 items-center gap-1.5 rounded-md border border-line bg-surface px-3.5 text-sm font-medium text-body transition hover:text-fg"
      >
        EN <ChevronDown size={14} className={`transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 w-48 overflow-hidden rounded-lg border border-line bg-surface py-1 shadow-xl"
        >
          {LANGUAGES.map((l) => (
            <li
              key={l.code}
              role="option"
              aria-selected={l.code === 'EN'}
              aria-disabled={!l.available}
              className={`flex items-center justify-between px-4 py-2.5 text-sm ${
                l.available ? 'text-fg' : 'cursor-not-allowed text-muted'
              }`}
              onClick={() => l.available && setOpen(false)}
            >
              <span>
                {l.label}
                {!l.available && <span className="ml-2 font-mono text-[0.7rem] uppercase">Soon</span>}
              </span>
              {l.code === 'EN' && <Check size={14} className="text-mint" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const navClass = ({ isActive }: { isActive: boolean }) =>
  `transition hover:text-fg ${isActive ? 'font-semibold text-fg' : 'text-body'}`;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setMobileOpen(false), [pathname]);

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

        <nav aria-label="Main" className="hidden items-center gap-9 text-[1.0625rem] lg:flex">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'} className={navClass}>
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <LanguageMenu />
          <SmartLink to={LINKS.signIn} className="text-[1.0625rem] font-semibold text-body transition hover:text-fg">
            Sign In
          </SmartLink>
          <ButtonLink to={LINKS.trial} size="md">
            Start Free Trial
          </ButtonLink>
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-fg lg:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="h-[calc(100dvh-76px)] overflow-y-auto border-t border-line bg-canvas lg:hidden">
          <nav aria-label="Mobile" className="container-x flex flex-col py-4">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === '/'}
                className={({ isActive }) =>
                  `border-b border-line-soft py-4 text-lg ${isActive ? 'font-semibold text-fg' : 'text-body'}`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <div className="mt-8 flex flex-col gap-3">
              <ButtonLink to={LINKS.trial} size="md">
                Start Free Trial
              </ButtonLink>
              <ButtonLink to={LINKS.signIn} size="md" variant="ghost">
                Sign In
              </ButtonLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

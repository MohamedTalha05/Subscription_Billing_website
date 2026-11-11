import { Link } from 'react-router-dom';

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link to="/" onClick={onClick} className="flex items-center gap-2.5" aria-label="Subscription Billing home">
      <span className="flex h-10 w-12 shrink-0 items-center justify-center rounded-lg bg-[#eaf5f2] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6)]">
        <img src="/logo.png" alt="" width={40} height={29} className="h-[29px] w-10" decoding="async" />
      </span>
      <span className="flex flex-col font-mono leading-none tracking-wide">
        <span className="text-[0.9375rem] font-bold uppercase text-fg">Subscription</span>
        <span className="mt-1 text-[0.9375rem] font-medium uppercase text-mint">Billing</span>
      </span>
    </Link>
  );
}

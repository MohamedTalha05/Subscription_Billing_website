/**
 * Generates the 1200×630 social preview images in public/og/ (the picture
 * shown when a link is shared in LinkedIn, Slack, WhatsApp, X, etc.).
 *
 * Run manually after changing a card's text: `node scripts/og-images.mjs`
 * Requires Google Chrome (set CHROME_PATH if it isn't in the default place).
 * The images are committed, so the normal build doesn't need Chrome.
 */
import { spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public/og');
mkdirSync(outDir, { recursive: true });

const chrome =
  process.env.CHROME_PATH ||
  [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
  ].find((p) => existsSync(p));
if (!chrome) throw new Error('Chrome not found. Set CHROME_PATH.');

const logo = `data:image/png;base64,${readFileSync(join(root, 'public/logo.png')).toString('base64')}`;
const font = (f) => pathToFileURL(join(root, 'public/fonts', f)).href;

/** One card per page type. `id` becomes public/og/<id>.png. */
const CARDS = [
  {
    id: 'default',
    eyebrow: 'Subscription billing & e-invoicing',
    title: 'Recurring revenue and German e-invoicing, built compliant.',
    points: ['Plans, dunning & payouts', 'XRechnung & ZUGFeRD', 'EU VAT, GDPR & PSD2'],
  },
  {
    id: 'subscription-billing',
    eyebrow: 'Subscription Billing',
    title: 'Every part of the subscription lifecycle, in one ledger.',
    points: ['Stripe · PayPal · GoCardless · Mollie', 'Smart dunning', 'Free up to 25 subscriptions'],
  },
  {
    id: 'e-invoicing',
    eyebrow: 'E-Invoicing for Germany',
    title: 'XRechnung & ZUGFeRD, ready for 2027. No new accounting software.',
    points: ['EN 16931 validation', 'Lexware Office · DATEV · sevdesk', 'Free for 5 e-invoices a month'],
  },
  {
    id: 'mandate',
    eyebrow: 'E-invoicing mandate · Germany',
    title: 'Who must issue e-invoices, and when: 2025, 2027, 2028.',
    points: ['Receive since 2025', 'Issue from 2027 above €800,000', 'All businesses from 2028'],
  },
  {
    id: 'de-e-rechnung',
    lang: 'de',
    eyebrow: 'E-Rechnung für Deutschland',
    title: 'Die E-Rechnung. Bereit für 2027, ohne neue Buchhaltung.',
    points: ['XRechnung & ZUGFeRD', 'Prüfung nach EN 16931', 'Kostenlos für 5 E-Rechnungen im Monat'],
  },
];

const page = (c) => `<!doctype html><html lang="${c.lang ?? 'en'}"><head><meta charset="utf-8"><style>
@font-face{font-family:Fraunces;font-weight:400 700;src:url('${font('fraunces-latin.woff2')}') format('woff2')}
@font-face{font-family:'Public Sans';font-weight:400 700;src:url('${font('public-sans-latin.woff2')}') format('woff2')}
@font-face{font-family:'JetBrains Mono';font-weight:400 700;src:url('${font('jetbrains-mono-latin.woff2')}') format('woff2')}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:#0a1715;color:#ecf3f1;font-family:'Public Sans',sans-serif;overflow:hidden;position:relative}
.glow{position:absolute;inset:0;background:radial-gradient(ellipse 70% 80% at 85% 0%,rgba(32,88,76,.55),transparent 65%)}
.wrap{position:relative;height:100%;padding:64px 72px;display:flex;flex-direction:column}
.brand{display:flex;align-items:center;gap:16px}
.tile{width:64px;height:52px;border-radius:12px;background:#eaf5f2;display:flex;align-items:center;justify-content:center}
.tile img{width:52px}
.name{font-family:'JetBrains Mono',monospace;font-weight:700;font-size:22px;letter-spacing:.08em;line-height:1.05}
.name span{display:block;color:#5eead4;font-weight:500}
.eyebrow{margin-top:64px;font-family:'JetBrains Mono',monospace;font-size:20px;letter-spacing:.2em;text-transform:uppercase;color:#5eead4}
h1{margin-top:18px;font-family:Fraunces,serif;font-weight:600;font-size:64px;line-height:1.08;letter-spacing:-.02em;max-width:980px}
ul{list-style:none;padding:0;margin-top:auto;display:flex;gap:14px;flex-wrap:wrap}
li{border:1px solid #1e3a34;background:#102420;border-radius:999px;padding:12px 22px;font-size:22px;color:#a3b8b3}
.url{position:absolute;right:72px;top:78px;font-family:'JetBrains Mono',monospace;font-size:20px;color:#6e8a85}
</style></head><body><div class="glow"></div><div class="wrap">
<div class="brand"><div class="tile"><img src="${logo}" alt=""></div><div class="name">SUBSCRIPTION<span>BILLING</span></div></div>
<p class="url">subscriptionbilling.eu</p>
<p class="eyebrow">${c.eyebrow}</p><h1>${c.title}</h1>
<ul>${c.points.map((p) => `<li>${p}</li>`).join('')}</ul>
</div></body></html>`;

for (const c of CARDS) {
  const htmlFile = join(tmpdir(), `og-${c.id}.html`);
  writeFileSync(htmlFile, page(c));
  const out = join(outDir, `${c.id}.png`);
  const r = spawnSync(chrome, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
    '--window-size=1200,630', '--virtual-time-budget=3000', '--allow-file-access-from-files',
    `--screenshot=${out}`, pathToFileURL(htmlFile).href,
  ]);
  if (r.status !== 0 || !existsSync(out)) throw new Error(`Chrome failed for ${c.id}: ${r.stderr}`);
  console.log(`public/og/${c.id}.png`);
}

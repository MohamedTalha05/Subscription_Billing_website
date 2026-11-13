import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { normalizePath } from './seo/routes';
import './fonts.css';
import './index.css';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Production pages arrive prerendered (see scripts/prerender.mjs), which
// stamps the route it rendered on #root. React attaches to that HTML only when
// it belongs to the current address; otherwise (a host serving another page's
// HTML as a fallback, or a query string such as /contact/?intent=demo that
// changes the content) it renders fresh to avoid a hydration mismatch.
const renderedFor = container.dataset.prerendered;
const matches = renderedFor === '/404/' || renderedFor === normalizePath(window.location.pathname);
if (container.firstElementChild !== null && matches && !window.location.search) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}

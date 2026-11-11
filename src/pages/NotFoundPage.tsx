import { ButtonLink, Eyebrow, usePageTitle } from '../components/ui';
import { LINKS } from '../config';

export default function NotFoundPage() {
  usePageTitle('Page not found');
  return (
    <section className="container-x py-28 text-center sm:py-40">
      <Eyebrow>404</Eyebrow>
      <h1 className="font-display mx-auto mt-6 max-w-2xl text-4xl sm:text-6xl">This page didn't make it to the ledger.</h1>
      <p className="mx-auto mt-6 max-w-xl text-lg">The link may be out of date, or the page may have moved.</p>
      <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
        <ButtonLink to="/">Back to home</ButtonLink>
        <ButtonLink to={LINKS.demo} variant="ghost">
          Contact us
        </ButtonLink>
      </div>
    </section>
  );
}

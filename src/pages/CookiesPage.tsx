import { Link } from 'react-router-dom';
import { B, LegalPage, P, UL } from '../components/LegalPage';
import { CONTACT } from '../config';

/**
 * Cookie policy for this website. It describes what the site actually does
 * today: no cookies of its own, no analytics or advertising, and no
 * third-party requests (fonts are self-hosted in public/fonts). Update it
 * whenever analytics, a chat widget or embedded media change that picture.
 */
export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      subtitle="Cookie-Richtlinie"
      meta="Applies to the website at subscriptionbilling.eu"
      closing="This cookie policy describes the website only. Signing in or starting a trial takes you to the product app at app.subscriptionbilling.eu; how personal data is processed there is described in our Privacy Policy."
      sections={[
        {
          id: 'what',
          title: '1. What cookies are',
          body: (
            <P>
              Cookies are small text files that a website stores in your browser. Similar technologies, such as local
              storage, work in the same way. This policy covers all of them.
            </P>
          ),
        },
        {
          id: 'this-site',
          title: '2. Cookies on this website',
          body: (
            <>
              <P>
                <B>This website does not set any cookies of its own</B>, and it uses no analytics, advertising or
                tracking tools. That is why we do not show a cookie banner.
              </P>
              <P>If we add a tool that needs your consent, we will ask for it before it runs and update this page.</P>
            </>
          ),
        },
        {
          id: 'third-party',
          title: '3. Third-party services',
          body: (
            <P>
              This website loads everything it needs, including its fonts, from its own server. It does not load
              scripts, fonts, maps, videos or other content from third-party services, so visiting it does not send
              your data to other companies.
            </P>
          ),
        },
        {
          id: 'manage',
          title: '4. Managing cookies in your browser',
          body: (
            <>
              <P>You can view and delete cookies, and block them, in your browser settings:</P>
              <UL
                items={[
                  'Chrome: Settings › Privacy and security › Third-party cookies',
                  'Firefox: Settings › Privacy & Security › Cookies and Site Data',
                  'Safari: Settings › Privacy › Manage Website Data',
                  'Edge: Settings › Cookies and site permissions',
                ]}
              />
            </>
          ),
        },
        {
          id: 'contact',
          title: '5. Questions',
          body: (
            <P>
              For questions about cookies or data protection, see our{' '}
              <Link to="/privacy/" className="link-mint">
                Privacy Policy
              </Link>{' '}
              or contact {CONTACT.company} through the{' '}
              <Link to="/contact/" className="link-mint">
                contact page
              </Link>
              .
            </P>
          ),
        },
      ]}
      showToc={false}
    />
  );
}

import { B, H3, LegalPage, P, UL, type LegalSection } from '../components/LegalPage';
import { CONTACT } from '../config';

const SECTIONS: Omit<LegalSection, 'id'>[] = [
  {
    title: '1. Controller (Verantwortlicher)',
    body: (
      <>
        <P>
          The controller responsible for the processing of personal data described in this Privacy Policy, within the
          meaning of Art. 4(7) GDPR, is:
        </P>
        <P>{CONTACT.company}</P>
        <P>{CONTACT.address}</P>
        <P>Email: {CONTACT.legalEmail}</P>
      </>
    ),
  },
  {
    title: '2. Scope',
    body: (
      <>
        <P>This Privacy Policy explains how personal data is processed in connection with the Subscription Billing platform, for:</P>
        <UL
          items={[
            'Visitors to our marketing website;',
            'SaaS platform users and account holders;',
            'Business customers and their authorized contacts;',
            'Support requesters; and',
            'Marketing-communication subscribers.',
          ]}
        />
      </>
    ),
  },
  {
    title: '3. Personal Data We Process',
    body: (
      <>
        <H3>Account Data</H3>
        <UL items={['Name', 'Email address', 'Company', 'Login/authentication information']} />
        <H3>Business Data</H3>
        <UL items={['Company name and address', 'VAT information', 'Billing information']} />
        <H3>Subscription Data</H3>
        <UL items={['Subscription plan and billing cycle', 'Subscription status', 'Invoice information']} />
        <H3>Payment-Related Data</H3>
        <P>
          Full payment instrument details (such as complete card numbers) are generally processed directly by our
          integrated payment providers, not stored by the Platform itself — see Section 9. Depending on the payment
          provider and integration, the Platform may receive and store limited payment-related information, which may
          include:
        </P>
        <UL
          items={[
            'Payment status',
            'Transaction ID',
            'Payment provider reference',
            'Card brand, where provided by the payment provider',
            'Last four digits of a card, where provided by the payment provider',
          ]}
        />
      </>
    ),
  },
  {
    title: '4. Technical Data',
    body: (
      <>
        <P>When you use our website and Platform, we may process the following technical data:</P>
        <UL
          items={[
            'IP address',
            'Browser type and version',
            'Device and operating system information',
            'Server logs and security logs',
            'Date and time of access',
            'Referrer information',
            'General usage information within the Platform',
          ]}
        />
      </>
    ),
  },
  {
    title: '5. Purposes of Processing',
    body: (
      <>
        <P>We process personal data for the following purposes:</P>
        <UL
          items={[
            'Account management and authentication',
            'Performance of our contract with the Customer',
            'Subscription management and billing',
            'Invoice generation',
            'Payment processing, in conjunction with our payment providers',
            'Customer support',
            'Security and fraud prevention',
            'Service improvement',
            'Analytics, where enabled — see Section 8',
            'Marketing communications, where consented to or otherwise legally permissible — see Section 18',
            'Compliance with legal obligations',
          ]}
        />
      </>
    ),
  },
  {
    title: '6. GDPR Legal Bases',
    body: (
      <>
        <P>
          The legal basis for each processing purpose above depends on its nature; we do not rely on consent for
          everything. In general:
        </P>
        <UL
          items={[
            <>
              <B>Art. 6(1)(b) GDPR — Contract:</B> account management, subscription management, billing, invoicing, and
              payment processing necessary to perform our contract with the Customer.
            </>,
            <>
              <B>Art. 6(1)(c) GDPR — Legal obligation:</B> retention of invoicing/accounting records and other data we
              are legally required to keep, and responding to lawful requests from authorities.
            </>,
            <>
              <B>Art. 6(1)(f) GDPR — Legitimate interests:</B> security and fraud prevention, service improvement, and
              certain analytics and B2B marketing activities — see Section 7.
            </>,
            <>
              <B>Art. 6(1)(a) GDPR — Consent:</B> non-essential cookies/tracking (Section 8) and marketing
              communications that require opt-in consent under applicable law (Section 18).
            </>,
          ]}
        />
      </>
    ),
  },
  {
    title: '7. Legitimate Interests',
    body: (
      <P>
        Where we rely on legitimate interests under Art. 6(1)(f) GDPR, the relevant interests are, depending on the
        specific activity: keeping the Platform secure and preventing fraud or abuse; understanding and improving how
        the Platform is used; and reaching existing business customers with relevant product information. We balance
        these interests against the rights and freedoms of the individuals concerned, and individuals may object to
        processing based on legitimate interests at any time — see Section 15.
      </P>
    ),
  },
  {
    title: '8. Cookies and Tracking',
    body: (
      <>
        <P>Our website and Platform may use the following categories of cookies and similar technologies:</P>
        <UL
          items={[
            <>
              <B>Strictly necessary cookies</B> — required for login, security and core Platform functionality;
            </>,
            <>
              <B>Preference cookies</B> — remember settings such as language;
            </>,
            <>
              <B>Analytics cookies</B> — help us understand how the website and Platform are used, where enabled;
            </>,
            <>
              <B>Marketing/tracking cookies</B> — used for advertising or cross-site tracking, where enabled.
            </>,
          ]}
        />
        <P>
          <B>Non-essential cookies (analytics and marketing) are only set with prior consent</B>, consistent with § 25
          TTDSG and Art. 6(1)(a) GDPR — they are not assumed to be permitted without that consent.
        </P>
      </>
    ),
  },
  {
    title: '9. Payment Providers',
    body: (
      <>
        <P>To process Transactions, we work with third-party payment service providers.</P>
        <P>
          Depending on the provider, personal and payment-related data (such as name, billing address, and payment
          instrument details) may be transferred to the relevant payment provider so that it can authorize, process,
          and settle a Transaction on our behalf, and so that fraud-prevention checks required by the provider can be
          performed. Each payment provider acts under its own privacy policy and, where relevant, its own role as an
          independent controller for the data it processes to provide its own regulated payment services. Where a
          payment provider is located outside the EEA, Section 12 applies to that transfer.
        </P>
      </>
    ),
  },
  {
    title: '10. Other Service Providers',
    body: (
      <P>
        We use carefully selected service providers to operate the website and Platform — for example hosting and cloud
        infrastructure, email delivery, and customer support tooling. They process personal data only on our
        instructions and under a data processing agreement pursuant to Art. 28 GDPR.
      </P>
    ),
  },
  {
    title: '11. Data Processing Agreements',
    body: (
      <P>
        Where a business Customer determines the purposes and means of processing personal data of its own end
        customers through its use of the Platform, the Customer acts as controller and we generally act as processor on
        its behalf within the meaning of Art. 28 GDPR. In that relationship, we enter into a Data Processing Agreement
        (DPA / Auftragsverarbeitungsvertrag) with the Customer, available on request.
      </P>
    ),
  },
  {
    title: '12. International Data Transfers',
    body: (
      <P>
        Where personal data is transferred to a recipient located outside the European Economic Area (EEA), we rely on
        an applicable GDPR transfer mechanism, which may include an adequacy decision by the European Commission under
        Art. 45 GDPR, Standard Contractual Clauses under Art. 46 GDPR, or another appropriate safeguard. The specific
        mechanism depends on the actual recipient and its location.
      </P>
    ),
  },
  {
    title: '13. Data Retention',
    body: (
      <P>
        We retain personal data only for as long as necessary for the purpose for which it was collected, or as required
        by applicable statutory retention obligations. German commercial and tax law generally requires certain
        accounting and invoicing records to be retained for defined statutory periods (e.g. under §§ 147 AO and 257
        HGB).
      </P>
    ),
  },
  {
    title: '14. Data Security',
    body: (
      <P>
        We implement appropriate technical and organizational measures designed to protect personal data against
        unauthorized access, loss, or misuse, proportionate to the risk involved, consistent with Art. 32 GDPR. We do not
        publish specific details of our security architecture, as doing so could itself create security risk.
      </P>
    ),
  },
  {
    title: '15. Data Subject Rights',
    body: (
      <>
        <P>Subject to the conditions set out in the GDPR, you have the following rights regarding your personal data:</P>
        <UL
          items={[
            <><B>Right of access</B> — Art. 15 GDPR</>,
            <><B>Right to rectification</B> — Art. 16 GDPR</>,
            <><B>Right to erasure</B> — Art. 17 GDPR</>,
            <><B>Right to restriction of processing</B> — Art. 18 GDPR</>,
            <><B>Right to data portability</B> — Art. 20 GDPR</>,
            <><B>Right to object</B> — Art. 21 GDPR</>,
            <><B>Right to withdraw consent</B> at any time, without affecting the lawfulness of processing before withdrawal</>,
            <><B>Right to lodge a complaint</B> with a supervisory authority — see Section 16</>,
          ]}
        />
        <P>To exercise any of these rights, contact us at {CONTACT.legalEmail}.</P>
      </>
    ),
  },
  {
    title: '16. Supervisory Authority',
    body: (
      <>
        <P>
          You have the right to lodge a complaint with a data protection supervisory authority, in particular in the
          German federal state (Bundesland) in which the company is established.
        </P>
        <P>
          Die Landesbeauftragte für den Datenschutz Niedersachsen (LfD Niedersachsen) — the competent authority for the
          federal state of Lower Saxony, where the company's registered address (Wolfsburg) is located.
        </P>
      </>
    ),
  },
  {
    title: "17. Children's Data",
    body: (
      <P>
        The Platform is intended for business and professional use by organizations and their authorized personnel. It
        is not directed at, and we do not knowingly collect personal data from, children.
      </P>
    ),
  },
  {
    title: '18. Marketing Communications',
    body: (
      <P>
        Where we send marketing communications by email, we do so based on your consent or, where legally permissible
        for existing business customers under applicable law (e.g. § 7(3) UWG for similar products to an existing
        customer relationship), on the basis of legitimate interest. Every marketing email includes an unsubscribe
        mechanism, and you may withdraw consent or object to such communications at any time.
      </P>
    ),
  },
  {
    title: '19. Changes to this Privacy Policy',
    body: (
      <P>
        We may update this Privacy Policy from time to time to reflect changes in our processing activities or legal
        requirements. Material changes will be communicated through the Platform or by other appropriate means.
      </P>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Datenschutzerklärung"
      subtitle="Privacy Policy"
      sections={SECTIONS.map((s, i) => ({ ...s, id: `section-${i + 1}` }))}
    />
  );
}

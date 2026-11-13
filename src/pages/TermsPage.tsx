import { B, LegalPage, P, UL, type LegalSection } from '../components/LegalPage';
import { CONTACT } from '../config';

const DEFINITIONS: [string, string][] = [
  ['Provider', 'MYFUNDBOX GmbH, the operator of the Subscription Billing platform.'],
  ['Customer', 'the business entity that has registered an account to use the platform.'],
  ['User', "any individual authorized by the Customer to access the platform under the Customer's account."],
  ['Account', "the Customer's registered organization workspace on the platform."],
  ['Platform', 'the Subscription Billing software-as-a-service application, including its web interface and API.'],
  ['Services', 'the subscription management, billing, payment-collection, invoicing, reporting and related functionality made available through the Platform.'],
  ['Subscription', 'a recurring commercial arrangement the Customer configures on the Platform between itself and its own end customers.'],
  ['Billing Period', 'the recurring interval (e.g. monthly, annually) on which a Subscription is charged.'],
  ['Payment Provider', 'a third-party payment service provider or gateway integrated with the Platform that processes payment transactions.'],
  ['Customer Data', "data the Customer or its end customers submit to, or generate through use of, the Platform, including personal data processed on the Customer's behalf."],
  ['Transaction', 'a single payment attempt, charge, refund, or related payment event recorded on the Platform.'],
  ['Invoice', 'a billing document generated through the Platform for a Subscription charge.'],
];

const SECTIONS: Omit<LegalSection, 'id'>[] = [
  {
    title: '1. Scope (Geltungsbereich)',
    body: (
      <>
        <P>
          These Terms &amp; Conditions ("AGB") govern the contractual relationship between MYFUNDBOX GmbH ("Provider",
          "we") and the organization that registers for and uses the Subscription Billing platform ("Customer", "you"). The
          platform is offered to businesses for their own commercial subscription billing operations.
        </P>
        <P>
          <B>These AGB are drafted for business customers (B2B).</B> Unless the Provider has expressly confirmed
          otherwise in writing, the platform is not intended for use by consumers within the meaning of § 13 BGB, and no
          consumer-protection provisions specific to B2C contracts apply.
        </P>
        <P>
          Any deviating, conflicting, or supplementary terms proposed by the Customer do not become part of the
          contract unless the Provider expressly agrees to them in writing.
        </P>
      </>
    ),
  },
  {
    title: '2. Definitions',
    body: (
      <UL
        items={DEFINITIONS.map(([term, def]) => (
          <>
            <B>{term}</B> — {def}
          </>
        ))}
      />
    ),
  },
  {
    title: '3. Registration and Account',
    body: (
      <>
        <P>
          To use the Platform, the Customer must register an Account and provide accurate, complete, and current
          information. The Customer is responsible for maintaining the confidentiality and security of its Account
          credentials and for all activity that occurs under its Account, including activity by Users it authorizes.
        </P>
        <P>
          The Customer must notify the Provider promptly of any known or suspected unauthorized use of its Account. The
          Provider may suspend an Account where there is reasonable cause to believe its security has been compromised,
          subject to the suspension provisions in Section 16.
        </P>
      </>
    ),
  },
  {
    title: '4. SaaS Service',
    body: (
      <>
        <P>
          The Platform is provided as a cloud-based, browser-accessible service. The Provider will make reasonable
          efforts to maintain and improve the Platform's functionality, including periodic updates, bug fixes, and
          feature enhancements, which may change the Platform's functionality over time.
        </P>
        <P>
          <B>The Provider does not promise uninterrupted or 100% availability</B> unless a separately agreed Service
          Level Agreement expressly guarantees a specific uptime commitment — see Section 15.
        </P>
      </>
    ),
  },
  {
    title: '5. Pricing, Subscription and Fees',
    body: (
      <>
        <P>
          The Customer's use of the Platform is subject to the subscription plan and pricing selected at registration
          or otherwise agreed in writing. Fees are billed in advance for each Billing Period unless stated otherwise, and
          are exclusive of applicable VAT/sales tax unless stated otherwise.
        </P>
        <P>
          The Provider may change its pricing for future Billing Periods on reasonable prior notice; price changes do
          not apply retroactively to Billing Periods already invoiced. Additional usage-based charges, where applicable,
          will be disclosed in the applicable plan description.
        </P>
      </>
    ),
  },
  {
    title: '6. Payment Processing',
    body: (
      <>
        <P>
          The Platform may integrate with third-party payment service providers and payment gateways to process
          Transactions on the Customer's behalf. In connection with this functionality:
        </P>
        <UL
          items={[
            'Payment processing itself may be performed by the relevant Payment Provider, not by the Provider directly.',
            "Card details, SEPA mandates, direct-debit information, or other payment instrument data may be collected and processed by the relevant Payment Provider's own secure systems.",
            'The Platform may receive and display Transaction status and limited payment-related metadata (e.g. masked card identifiers, payment status) from the Payment Provider, without holding full payment credentials.',
            'The Provider does not necessarily hold or custody Customer funds; authorization, capture, and settlement of funds may be performed by the relevant Payment Provider under its own regulatory status.',
            "The applicable Payment Provider's own terms of service and privacy policy apply in addition to these AGB, and the Customer is responsible for complying with that Payment Provider's requirements.",
          ]}
        />
        <P>
          <B>
            The Provider is not a bank, payment institution, e-money institution, or other regulated payment service
            provider unless expressly and factually confirmed otherwise.
          </B>{' '}
          Nothing in these AGB should be read as claiming such status.
        </P>
      </>
    ),
  },
  {
    title: '7. Recurring Payments and Subscription Billing',
    body: (
      <>
        <P>
          The Platform enables the Customer to configure recurring billing for its own end customers' Subscriptions,
          including billing dates, retry (dunning) logic for failed payments, and suspension of a Subscription after
          repeated unsuccessful payment attempts, as configured by the Customer.
        </P>
        <P>
          <B>
            The Customer is solely responsible for obtaining any authorization, mandate, or consent required by
            applicable law from its own end customers before initiating recurring charges against them
          </B>
          , including SEPA mandate requirements and any applicable Strong Customer Authentication obligations under
          PSD2. The Provider's tooling supports this process but does not substitute for the Customer's own legal
          compliance obligations toward its end customers.
        </P>
        <P>
          Customers may change or cancel their own Subscriptions, or their end customers' Subscriptions configured on
          the Platform, subject to the cancellation terms in Section 17.
        </P>
      </>
    ),
  },
  {
    title: '8. Invoices and Tax',
    body: (
      <>
        <P>
          The Platform can generate Invoices for Subscription charges based on the billing information the Customer
          provides, including VAT/tax information. The Customer is responsible for the accuracy of the billing and tax
          information it enters, and for its own compliance with applicable invoicing and tax obligations, including any
          German/EU e-invoicing format requirements that may apply to its business.
        </P>
        <P>
          The Platform's built-in tax calculation functionality is a tool to assist with rate application based on
          customer region and is not a substitute for professional tax advice. <B>The Provider is not a tax adviser</B>{' '}
          and does not guarantee the correctness of tax treatment for the Customer's specific circumstances; the
          Customer remains responsible for verifying applicable tax rates and its own tax compliance.
        </P>
      </>
    ),
  },
  {
    title: '9. Customer Obligations',
    body: (
      <>
        <P>The Customer must:</P>
        <UL
          items={[
            'Provide accurate and up-to-date registration, billing, and tax information;',
            'Use the Platform only for lawful purposes and in accordance with these AGB;',
            'Maintain the security of its Account and User credentials;',
            'Obtain all consents and authorizations required from its own end customers, including under applicable data protection and payment-authorization law;',
            'Comply with applicable GDPR/DSGVO and other data protection requirements in its own use of Customer Data;',
            'Comply with payment-related regulations applicable to its own business and industry; and',
            'Comply with applicable tax and invoicing requirements for its own Subscriptions and Transactions.',
          ]}
        />
      </>
    ),
  },
  {
    title: '10. Acceptable Use / Prohibited Activities',
    body: (
      <>
        <P>The Customer must not use the Platform to:</P>
        <UL
          items={[
            'Engage in fraud, money-laundering-related activity, or unauthorized payment activity;',
            'Process illegal transactions or transactions for prohibited goods or services;',
            "Abuse or circumvent the Platform's payment systems or security controls;",
            'Upload or transmit malware or other harmful code;',
            'Attempt unauthorized access to the Platform, other accounts, or underlying infrastructure;',
            "Abuse the Platform's APIs, including through excessive or automated misuse;",
            "Attempt to disrupt, overload, or impair the Platform's operation; or",
            'Otherwise use the Platform in a manner that violates applicable German/EU law.',
          ]}
        />
      </>
    ),
  },
  {
    title: '11. Third-Party Services and Integrations',
    body: (
      <>
        <P>
          The Platform may integrate with third-party services, including payment gateways and processors, accounting
          systems, tax services, email delivery services, cloud infrastructure providers, analytics services, and other
          business software integrations the Customer chooses to enable.
        </P>
        <P>
          Each such third-party service is governed by its own terms of service and privacy policy, which apply in
          addition to these AGB. The Provider is not responsible for the acts, omissions, or availability of
          third-party services it does not control.
        </P>
      </>
    ),
  },
  {
    title: '12. Data Protection',
    body: (
      <>
        <P>
          Personal data is processed in accordance with the Provider's Privacy Policy / Datenschutzerklärung and
          applicable data protection law, including the GDPR/DSGVO.
        </P>
        <P>
          Where the Customer determines the purposes and means of processing personal data of its own end customers
          through its use of the Platform, the Customer acts as a controller and the Provider generally acts as a
          processor on the Customer's behalf. Where this relationship applies, a Data Processing Agreement (DPA /
          Auftragsverarbeitungsvertrag) under Art. 28 GDPR may be required and is available on request.
        </P>
      </>
    ),
  },
  {
    title: '13. Confidentiality',
    body: (
      <P>
        Each party agrees to keep the other party's confidential information — including non-public business,
        technical, and Customer Data — confidential, and to use it only as necessary to perform under these AGB, except
        where disclosure is required by law or a binding order of a competent authority.
      </P>
    ),
  },
  {
    title: '14. Intellectual Property',
    body: (
      <>
        <P>
          The Provider retains all rights, title, and interest in and to the Platform software, website, documentation,
          and the Provider's branding and trademarks. Nothing in these AGB transfers ownership of these assets to the
          Customer.
        </P>
        <P>
          <B>The Customer retains its own rights in its Customer Data</B>, subject to the licenses necessary for the
          Provider to operate the Platform and perform these AGB, and subject to applicable law.
        </P>
      </>
    ),
  },
  {
    title: '15. Availability, Maintenance and Support',
    body: (
      <>
        <P>
          The Provider performs planned maintenance, security updates, and improvements to the Platform from time to
          time, which may result in brief service interruptions. Where reasonably possible, planned maintenance that may
          affect availability will be communicated in advance.
        </P>
        <P>
          Where a separate Service Level Agreement has been agreed, its uptime and support commitments apply instead of
          or in addition to this section.
        </P>
      </>
    ),
  },
  {
    title: '16. Suspension and Termination',
    body: (
      <>
        <P>The Provider may suspend or terminate the Customer's access to the Platform where there is:</P>
        <UL
          items={[
            'A material breach of these AGB not cured within a reasonable period after notice;',
            'Non-payment of undisputed fees after notice;',
            'A reasonable suspicion of fraud, illegal use, or a security threat to the Platform or other customers; or',
            "A legal obligation to do so, including in connection with the Customer's insolvency where applicable.",
          ]}
        />
      </>
    ),
  },
  {
    title: '17. Cancellation',
    body: (
      <>
        <P>
          <B>Cancelling the Customer's own Subscription Billing account.</B> The Customer may cancel its Subscription to the
          Platform through its Account settings or by written notice. Cancellation becomes effective at the end of the then-current Billing Period
          unless otherwise agreed. Fees already incurred for the current Billing Period remain payable; no partial-period
          refund is implied by cancellation alone (see Section 18).
        </P>
        <P>
          <B>Cancelling an end customer's subscription on the Platform.</B> The Customer cancels one of its own end
          customers' Subscriptions by setting an end date on that Subscription (the Platform's "Set End Date" action),
          rather than by an instant mid-cycle cutoff. The Subscription continues, and may continue to bill, until the
          chosen end date is reached, unless the Customer configures otherwise for its own end customer relationship.
          Where a Subscription is suspended instead for repeated failed payments (see Sections 7 and 16), that
          suspension follows the Customer's own configured dunning/retry cadence, not an immediate cancellation.
        </P>
        <P>
          Following termination, Customer Data will be retained or deleted in accordance with the Provider's data
          retention practices and applicable legal retention obligations, as described in the Privacy Policy.
        </P>
      </>
    ),
  },
  {
    title: '18. Refunds',
    body: (
      <>
        <P>Refunds are addressed differently depending on their nature:</P>
        <UL
          items={[
            <>
              <B>Payment-provider refunds</B> — a refund of a charge collected from the Customer's own end customer is
              processed through the relevant Payment Provider and is subject to that Payment Provider's own refund
              mechanics and timelines, not the Provider's own fee refund policy.
            </>,
            <>
              <B>Chargebacks</B> initiated by an end customer with their card issuer or bank are handled according to
              the relevant Payment Provider's dispute process; the Customer may be responsible for chargeback fees as
              passed through by the Payment Provider.
            </>,
            <>
              <B>Customer-requested refunds</B> of end-customer charges are the Customer's own commercial decision,
              initiated from the Platform's Payments ledger as a full or partial refund with a reason recorded for the
              record. Availability of a refund, and whether a partial refund is possible, depends on what the relevant
              Payment Provider supports for that Transaction — the Platform cannot refund a charge its connected
              Payment Provider does not allow it to refund.
            </>,
          ]}
        />
      </>
    ),
  },
  {
    title: '19. Liability',
    body: (
      <>
        <P>
          Nothing in these AGB excludes or limits either party's liability for intent (Vorsatz) or gross negligence
          (grobe Fahrlässigkeit), for injury to life, body, or health, for liability under the German Product Liability
          Act (Produkthaftungsgesetz), or for any other liability that cannot be excluded or limited as a matter of
          mandatory German law.
        </P>
        <P>
          Subject to the foregoing, liability for ordinary negligence is limited to foreseeable damages typical for
          contracts of this kind, and liability for indirect or consequential damages is excluded to the extent
          permitted by mandatory law.
        </P>
      </>
    ),
  },
  {
    title: '20. Indemnification',
    body: (
      <P>
        Each party agrees to indemnify the other against reasonably foreseeable, documented third-party claims directly
        arising from that party's own breach of these AGB or violation of applicable law, in each case subject to the
        liability principles in Section 19 and without creating liability broader than what mandatory German/EU law
        permits.
      </P>
    ),
  },
  {
    title: '21. Changes to the Service and Terms',
    body: (
      <P>
        The Provider may update the Platform's functionality, pricing (see Section 5), or these AGB from time to time.
        Material changes to these AGB will be communicated to the Customer with reasonable prior notice, and continued use of the Platform after the effective date of a
        change constitutes acceptance, subject to any statutory requirement for explicit consent that may apply to a
        particular change. The Provider does not reserve an unlimited unilateral right to amend terms in ways that
        German law restricts for standard business terms (AGB) under §§ 305 ff. BGB.
      </P>
    ),
  },
  {
    title: '22. Governing Law',
    body: (
      <P>
        These AGB are governed by the laws of the Federal Republic of Germany, excluding
        its conflict-of-laws rules and the UN Convention on Contracts for the International Sale of Goods (CISG),
        unless otherwise required by mandatory law.
      </P>
    ),
  },
  {
    title: '23. Severability',
    body: (
      <P>
        Should any provision of these AGB be or become invalid or unenforceable, the validity of the remaining
        provisions is not affected. The invalid or unenforceable provision will be replaced by a valid provision that
        most closely reflects the economic intent of the original provision, to the extent permitted by mandatory German
        law (salvatorische Klausel).
      </P>
    ),
  },
  {
    title: '24. Contact',
    body: (
      <>
        <P>{CONTACT.company}</P>
        <P>{CONTACT.address}</P>
        <P>{CONTACT.legalEmail}</P>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      subtitle="Allgemeine Geschäftsbedingungen (AGB)"
      meta="Applies to use of the Subscription Billing platform by MYFUNDBOX GmbH"
      sections={SECTIONS.map((s, i) => ({ ...s, id: `section-${i + 1}` }))}
    />
  );
}

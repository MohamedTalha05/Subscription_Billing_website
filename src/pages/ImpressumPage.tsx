import { Field, LegalPage, P } from '../components/LegalPage';
import { CONTACT } from '../config';

export default function ImpressumPage() {
  return (
    <LegalPage
      title="Impressum"
      subtitle="Legal Notice"
      meta="Pursuant to § 5 TMG / § 18 Abs. 2 MStV (German Telemedia Act / Media State Treaty)"
      showToc={false}
      closing="This Impressum is provided for general informational purposes only and does not constitute legal advice."
      sections={[
        {
          id: 'provider',
          title: 'Anbieter (Service Provider)',
          body: (
            <>
              <Field label="Company">{CONTACT.company}</Field>
              <Field label="Legal form">GmbH (Gesellschaft mit beschränkter Haftung)</Field>
              <Field label="Registered address">
                Schiller40 Coworking Space, Porschestraße 2c
                <br />
                38440 Wolfsburg
                <br />
                Germany
              </Field>
            </>
          ),
        },
        {
          id: 'representative',
          title: 'Vertretungsberechtigte Person (Authorized Representative)',
          body: (
            <>
              <P>Managing Directors / Geschäftsführer:</P>
              <Field label="Name">Yasmeen Thimiri Aafreen Kauser — Founder and CEO</Field>
              <Field label="Name">Yasmeen Thimiri — Co-Founder and CEO</Field>
            </>
          ),
        },
        {
          id: 'register',
          title: 'Register Information',
          body: (
            <>
              <Field label="Register court / Registergericht">District Court (Amtsgericht)</Field>
              <Field label="Commercial register number / Handelsregisternummer">HRB 207466</Field>
            </>
          ),
        },
        {
          id: 'vat',
          title: 'Umsatzsteuer-Identifikationsnummer (VAT ID)',
          body: (
            <>
              <P>VAT identification number pursuant to § 27a of the German VAT Act (UStG):</P>
              <Field label="USt-IdNr.">DE 320324101</Field>
            </>
          ),
        },
        {
          id: 'contact',
          title: 'Contact',
          body: <Field label="Email">{CONTACT.legalEmail}</Field>,
        },
        {
          id: 'content',
          title: 'Verantwortlich für den Inhalt (Responsible for Content)',
          body: (
            <>
              <P>
                Where legally applicable under § 18 Abs. 2 Medienstaatsvertrag (MStV), the person responsible for
                journalistic/editorial content on this website is:
              </P>
              <Field label="Name">Sameer Ahmed</Field>
            </>
          ),
        },
        {
          id: 'dispute',
          title: 'Verbraucherstreitbeilegung (Consumer Dispute Resolution)',
          body: (
            <P>
              The European Commission's Online Dispute Resolution (ODR) platform, previously provided under Regulation
              (EU) No 524/2013, has been discontinued.
            </P>
          ),
        },
      ]}
    />
  );
}

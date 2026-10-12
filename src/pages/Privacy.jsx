import LegalDoc from '../components/LegalDoc'
import { privacy, privacyIntro, privacyUpdated } from '../data/privacy'

const sections = privacy.map((s) => ({ ...s, clauses: s.clauses.map(([title, text]) => ({ title, text })) }))

export default function Privacy() {
  return (
    <LegalDoc
      path="/privacy"
      title="Privacy policy"
      intro={privacyIntro}
      updated={privacyUpdated}
      sections={sections}
      note="This policy is a general template and not legal advice. Please have it reviewed by a lawyer for your country and business, and check that it matches how your site and services actually handle data, before relying on it."
    />
  )
}

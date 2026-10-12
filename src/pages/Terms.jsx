import LegalDoc from '../components/LegalDoc'
import { terms, termsIntro, termsUpdated } from '../data/terms'
import { termsTitles } from '../data/termsTitles'

const sections = terms.map((s, i) => ({
  ...s,
  clauses: s.clauses.map((text, k) => ({ title: termsTitles[s.id]?.[k] || `Clause ${i + 1}.${k + 1}`, text })),
}))

export default function Terms() {
  return (
    <LegalDoc
      path="/terms"
      title="Terms and conditions"
      intro={termsIntro}
      updated={termsUpdated}
      sections={sections}
      showSolutionsIn="services"
      note="These terms are a general template and not legal advice. Please have them reviewed by a lawyer in India before relying on them."
    />
  )
}

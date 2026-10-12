// All editable copy and configuration lives here.
export const site = {
  name: 'GrowALabs',
  description:
    'A small software team building websites, SaaS products, automation and backend systems for businesses that need software that works.',
  contact: {
    email: 'hello@example.com', // TODO: replace with real contact address
    phone: '', // optional
    location: 'Coimbatore, Tamil Nadu, India',
  },
  socials: [], // e.g. { label: 'GitHub', href: 'https://github.com/...' }
}

export const nav = [
  { label: 'Services', href: '#services' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export const services = [
  { id: 'web', title: 'Custom web development', text: 'Responsive websites and web applications built for real business needs.' },
  { id: 'saas', title: 'SaaS and product engineering', text: 'MVPs, internal platforms, dashboards, and scalable product foundations.' },
  { id: 'auto', title: 'Business automation', text: 'Connect tools, reduce repetitive tasks, and streamline everyday operations.' },
  { id: 'ai', title: 'AI and backend systems', text: 'Practical AI integrations, APIs, databases, and reliable backend infrastructure.' },
]

export const steps = [
  { n: '01', title: 'Discover', text: 'Understand the business problem, users, and desired outcome.' },
  { n: '02', title: 'Design and build', text: 'Develop the solution through clear milestones and regular feedback.' },
  { n: '03', title: 'Launch and improve', text: 'Deploy, test, measure, and continue improving the product.' },
]

// Demonstration concepts only. Replace with real case studies when available.
export const work = [
  { id: 'ops', name: 'Operations dashboard', category: 'Concept · Self-initiated', text: 'A demonstration of an internal dashboard for tracking orders, stock and team tasks in one place.', tags: ['React', 'FastAPI', 'PostgreSQL'], href: '', size: 'wide' },
  { id: 'booking', name: 'Booking platform', category: 'Concept · Self-initiated', text: 'A demonstration appointment flow with availability rules and automated reminders.', tags: ['TypeScript', 'Node.js'], href: '', size: 'tall' },
  { id: 'flow', name: 'Workflow automation', category: 'Concept · Self-initiated', text: 'A demonstration of connecting form intake, a database and notifications without manual copy-paste.', tags: ['Python', 'MongoDB'], href: '', size: 'std' },
]

export const why = [
  { title: 'Direct communication', text: 'Talk directly to the people building your product.' },
  { title: 'Fit for your business', text: 'Solutions designed around your business, not unnecessary complexity.' },
  { title: 'Built to evolve', text: 'A maintainable foundation that can grow with your needs.' },
]

export const tech = ['React', 'TypeScript', 'Node.js', 'Python', 'FastAPI', 'MongoDB', 'PostgreSQL', 'Cloud deployment']

export const faqs = [
  { q: 'What types of projects do you take on?', a: 'Websites, web applications, SaaS products, internal tools, automation and backend or API work. If you are unsure whether something fits, send us a short description.' },
  { q: 'Can you build an MVP from scratch?', a: 'Yes. We help define a focused first version, build it in milestones, and leave you with a codebase that can keep growing.' },
  { q: 'Can you improve an existing application?', a: 'Often, yes. We start with a review of the current code and infrastructure, then agree on what to fix, refactor or extend.' },
  { q: 'How does project pricing work?', a: 'Pricing depends on scope, so we do not quote fixed prices or dates up front. After an initial conversation we provide an estimate based on the work involved.' },
  { q: 'Do you provide ongoing support?', a: 'Yes. Support and maintenance can be arranged after launch. The details are agreed per project.' },
]

// ---- Extended detail ----
export const serviceDetails = {
  web: ['Marketing sites and web apps', 'Responsive, accessible interfaces', 'Performance and SEO foundations', 'CMS and content workflows'],
  saas: ['MVP scoping and delivery', 'Auth, roles and billing-ready structure', 'Dashboards and admin tools', 'Architecture that can scale'],
  auto: ['Tool and API integrations', 'Approval and notification flows', 'Data sync between systems', 'Scheduled jobs and reports'],
  ai: ['REST APIs and backend services', 'Database design and migration', 'LLM features with sensible guardrails', 'Deployment and monitoring setup'],
}

export const solutions = [
  {
    id: 'ops', tab: 'Operations', title: 'Run the business from one place',
    text: 'Replace scattered spreadsheets and inboxes with a single internal system your team actually uses.',
    points: ['Order, inventory and task tracking', 'Role-based access for staff', 'Reports that update themselves'],
    mock: 'table',
  },
  {
    id: 'customer', tab: 'Customer-facing', title: 'Give customers a better front door',
    text: 'Websites, portals and booking flows that are fast, clear and easy to maintain.',
    points: ['Self-service portals and accounts', 'Online booking and payments flows', 'Content you can edit without a developer'],
    mock: 'cards',
  },
  {
    id: 'auto', tab: 'Automation', title: 'Stop doing the same task twice',
    text: 'Connect the tools you already use so data moves on its own and people focus on judgement calls.',
    points: ['Form-to-database-to-notification pipelines', 'Document and email processing', 'Alerts when something needs attention'],
    mock: 'flow',
  },
  {
    id: 'data', tab: 'Data and AI', title: 'Make your data useful',
    text: 'Practical APIs, search and AI features built on top of data you already own.',
    points: ['Clean, well-structured databases', 'Internal assistants and summarisation', 'APIs other systems can rely on'],
    mock: 'chat',
  },
]

export const stepDetails = [
  { gets: ['A short discovery call', 'Written scope and priorities', 'Recommended approach and stack'], output: 'Output: a clear plan' },
  { gets: ['Milestone-based delivery', 'Working builds to review', 'Feedback folded in each cycle'], output: 'Output: working software' },
  { gets: ['Production deployment', 'Handover and documentation', 'Optional support and iteration'], output: 'Output: a product that keeps improving' },
]

export const caseDetails = {
  ops: { problem: 'Teams track orders and stock across separate sheets.', approach: 'One dashboard with live tables, filters and simple permissions.', role: 'Design, frontend, API' },
  booking: { problem: 'Back-and-forth messages to find a free slot.', approach: 'Availability rules, slot picking and automatic reminders.', role: 'Design, full-stack' },
  flow: { problem: 'Enquiries copied by hand into several tools.', approach: 'Validated intake that writes to a database and notifies the team.', role: 'Backend, automation' },
}

export const engagements = [
  { title: 'Project build', text: 'A defined scope with milestones, for a website, platform or internal tool.', fit: 'Best when you know what you need.' },
  { title: 'MVP sprint', text: 'A focused first version of a product so you can test it with real users.', fit: 'Best for early-stage ideas.' },
  { title: 'Ongoing partnership', text: 'Continued development, maintenance and improvements after launch.', fit: 'Best for evolving products.' },
]

export const techGroups = [
  { label: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Vite', 'TypeScript'] },
  { label: 'Mobile', items: ['Flutter', 'Dart'] },
  { label: 'Backend', items: ['Node.js', 'Python', 'FastAPI'] },
  { label: 'Data', items: ['PostgreSQL', 'MongoDB'] },
  { label: 'AI', items: ['OpenAI', 'Claude', 'Gemini'] },
  { label: 'Infrastructure', items: ['AWS', 'GCP', 'Cloudflare', 'Cloud deployment', 'CI/CD pipelines'] },
]

export const moreFaqs = [
  { q: 'How do we communicate during a project?', a: 'You work directly with the people building your product, with regular check-ins and working builds to review. The cadence is agreed at the start.' },
  { q: 'Who owns the code?', a: 'This is agreed in writing before work starts. The usual aim is that you can take your product and its code forward without being locked in.' },
  { q: 'What do you need from us to get started?', a: 'A short description of the problem, who will use the software, and any existing tools or data involved. Rough notes are fine.' },
]

// Booking-card visuals in the Solutions section.
// To use real photos: drop files in public/images/cards/ and set img, e.g. '/images/cards/studio.jpg'.
// While img is empty, the built-in illustration (art) is shown.
export const bookingCards = [
  { title: 'Studio session', art: 'studio', img: '/images/cards/studio.jpg', alt: 'Photography studio with lights and backdrops' },
  { title: 'Consultation', art: 'consult', img: '/images/cards/consult.jpg', alt: 'Two colleagues reviewing a document' },
  { title: 'Workshop', art: 'workshop', img: '/images/cards/workshop.jpg', alt: 'Team placing sticky notes on a glass wall' },
  { title: 'Follow-up', art: 'followup', img: '/images/cards/followup.jpg', alt: 'Two colleagues reviewing progress at a desk' },
]


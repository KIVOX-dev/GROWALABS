// One entry per solution page (/solutions/:slug). The `dash` block drives the sample dashboard:
// all figures are illustrative sample data, not real customer results.
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']

export const solutions = [
  // ---------- Small local businesses ----------
  {
    slug: 'appointment-booking', group: 'Small local businesses', icon: 'CalendarCheck', title: 'Appointment booking',
    headline: 'Let customers book online and never miss a slot, with WhatsApp reminders that cut no-shows.',
    problem: 'Salons, clinics and tutors lose hours to phone calls, double bookings and customers who simply forget. Every empty slot is lost income.',
    steps: [
      ['Share your booking link', 'Customers pick a service, a time and pay a small deposit if you want one.'],
      ['Automatic reminders', 'WhatsApp reminders go out the day before and the morning of the visit.'],
      ['Run the day from one screen', 'See today\'s schedule, reschedule in a tap and track repeat clients.'],
    ],
    features: ['Online booking page for your business', 'WhatsApp and SMS reminders', 'Staff calendars and working hours', 'Deposits and no-show rules', 'Client history and notes', 'Simple reports on busy hours'],
    audience: 'Salons, clinics, tutors, trainers and any business that works by appointment.',
    dash: {
      app: 'Bookings', nav: ['Today', 'Calendar', 'Clients', 'Reminders'],
      kpis: [{ l: 'Bookings today', n: 24, d: '+12%' }, { l: 'Reminders sent', n: 61, d: 'this week' }, { l: 'No-shows', n: 2, d: '-60%' }, { l: 'Revenue', n: 18400, pre: '₹', d: '+9%' }],
      chart: { type: 'bars', title: 'Bookings this week', data: [14, 18, 22, 19, 26, 31, 24], labels: days },
      table: { title: 'Upcoming appointments', cols: ['Time', 'Client', 'Service', 'Status'], status: 3, rows: [['10:00', 'Priya S.', 'Haircut', 'Confirmed'], ['10:45', 'Rahul M.', 'Consultation', 'Confirmed'], ['11:30', 'Anita K.', 'Facial', 'Pending'], ['12:15', 'Vikram R.', 'Beard trim', 'Confirmed'], ['13:00', 'Meera D.', 'Colour', 'Pending']] },
    },
  },
  {
    slug: 'invoicing-gst-billing', group: 'Small local businesses', icon: 'Receipt', title: 'Invoicing and GST billing',
    headline: 'Create GST-ready invoices in seconds and always know who has paid and who has not.',
    problem: 'Handwritten bills and spreadsheets make GST filing painful and payments easy to lose track of.',
    steps: [
      ['Add items and customers', 'Save your products, prices and tax rates once.'],
      ['Bill in a few taps', 'Generate a GST invoice, then send it by WhatsApp, email or print.'],
      ['Track payments', 'See what is paid, due or overdue, and export clean data for your accountant.'],
    ],
    features: ['GST-ready invoice formats', 'Product and customer lists', 'Payment status and reminders', 'Works for counter billing', 'Sales and tax summary exports', 'Multiple users with roles'],
    audience: 'Retail shops, wholesalers, service providers and small manufacturers.',
    dash: {
      app: 'Billing', nav: ['Invoices', 'Customers', 'Products', 'GST report'],
      kpis: [{ l: 'Sales this month', n: 248000, pre: '₹', d: '+14%' }, { l: 'Invoices', n: 186, d: 'this month' }, { l: 'Outstanding', n: 32500, pre: '₹', d: '9 invoices' }, { l: 'GST collected', n: 44640, pre: '₹', d: 'Q3' }],
      chart: { type: 'line', title: 'Sales by month (₹ thousand)', data: [120, 148, 139, 190, 212, 236, 248], labels: months },
      table: { title: 'Recent invoices', cols: ['No.', 'Customer', 'Amount', 'Status'], status: 3, rows: [['#1042', 'Sharma Traders', '₹12,400', 'Paid'], ['#1043', 'Metro Stores', '₹8,950', 'Due'], ['#1044', 'Anand & Co', '₹21,300', 'Paid'], ['#1045', 'Krishna Mart', '₹5,600', 'Overdue'], ['#1046', 'Lakshmi Agency', '₹16,800', 'Paid']] },
    },
  },
  {
    slug: 'review-collector', group: 'Small local businesses', icon: 'Star', title: 'Review collector',
    headline: 'Turn happy customers into Google reviews, automatically and politely.',
    problem: 'Most happy customers never leave a review, and a few unhappy ones can dominate your rating.',
    steps: [
      ['Customer finishes a visit', 'A short WhatsApp or SMS message goes out after the service.'],
      ['Ask for a quick rating', 'Happy customers are sent straight to your Google review page.'],
      ['Handle the rest privately', 'Unhappy customers send feedback to you first, so you can fix it.'],
    ],
    features: ['One-tap link to your Google reviews', 'Private feedback for low ratings', 'Timed follow-up messages', 'QR code for your counter', 'Rating trend over time', 'Reply suggestions'],
    audience: 'Clinics, restaurants, salons, repair shops and local services.',
    dash: {
      app: 'Reviews', nav: ['Requests', 'Reviews', 'Feedback', 'Settings'],
      kpis: [{ l: 'Google rating', n: 4.7, d: '+0.3' }, { l: 'Requests sent', n: 312, d: 'this month' }, { l: 'New reviews', n: 58, d: '+41%' }, { l: 'Private feedback', n: 11, d: 'to resolve' }],
      chart: { type: 'bars', title: 'New reviews per week', data: [6, 9, 12, 15, 17, 21, 26], labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'] },
      table: { title: 'Latest responses', cols: ['Customer', 'Rating', 'Channel', 'Status'], status: 3, rows: [['Deepa N.', '5 ★', 'WhatsApp', 'Posted'], ['Imran A.', '4 ★', 'SMS', 'Posted'], ['Suresh P.', '2 ★', 'WhatsApp', 'Review'], ['Kavita L.', '5 ★', 'WhatsApp', 'Posted'], ['Arjun T.', '5 ★', 'SMS', 'Sent']] },
    },
  },
  {
    slug: 'digital-menu-qr-ordering', group: 'Small local businesses', icon: 'QrCode', title: 'Digital menu and QR ordering',
    headline: 'Guests scan, browse and order from their phone, and the kitchen sees it instantly.',
    problem: 'Printed menus go out of date, waiters are stretched and orders get mixed up at busy hours.',
    steps: [
      ['Scan the table QR', 'No app to install. The menu opens in the phone browser.'],
      ['Order and pay', 'Guests add items, add notes and send the order to the kitchen.'],
      ['Kitchen and counter in sync', 'Orders appear on a live board, with status updates back to the guest.'],
    ],
    features: ['Menu you can edit anytime', 'Table-wise QR codes', 'Live kitchen order board', 'Sold-out toggles', 'Optional online payment', 'Daily sales and popular items'],
    audience: 'Cafes, restaurants, food courts and cloud kitchens.',
    dash: {
      app: 'Orders', nav: ['Live orders', 'Menu', 'Tables', 'Sales'],
      kpis: [{ l: 'Orders today', n: 143, d: '+18%' }, { l: 'Avg. prep time', n: 11, suf: ' min', d: '-2 min' }, { l: 'Revenue', n: 36200, pre: '₹', d: '+11%' }, { l: 'Tables active', n: 9, d: 'of 14' }],
      chart: { type: 'bars', title: 'Orders by hour', data: [8, 15, 32, 41, 28, 19, 36], labels: ['9', '11', '1', '3', '5', '7', '9'] },
      table: { title: 'Kitchen board', cols: ['Table', 'Items', 'Time', 'Status'], status: 3, rows: [['T4', 'Latte x2, Sandwich', '2 min', 'Preparing'], ['T1', 'Cold coffee', '4 min', 'Ready'], ['T7', 'Pasta, Brownie', '6 min', 'Preparing'], ['T2', 'Tea x3', '9 min', 'Served'], ['T9', 'Burger, Fries', '1 min', 'New']] },
    },
  },

  // ---------- Creators and freelancers ----------
  {
    slug: 'link-in-bio-page', group: 'Creators and freelancers', icon: 'Link2', title: 'Link-in-bio page',
    headline: 'One clean page for everything you share, with analytics that show what people click.',
    problem: 'A generic link tool gives you no control over design and little insight into what your audience actually does.',
    steps: [
      ['Build your page', 'Add links, products, videos and your own branding.'],
      ['Share one link', 'Put it in your bio, your videos and your email signature.'],
      ['See what works', 'Watch clicks by link, source and day, and keep the best performers on top.'],
    ],
    features: ['Your own domain and branding', 'Click and visitor analytics', 'Links, embeds and product cards', 'Scheduled or time-limited links', 'Email capture', 'Fast on mobile'],
    audience: 'Creators, coaches, photographers, musicians and personal brands.',
    dash: {
      app: 'Link analytics', nav: ['Overview', 'Links', 'Audience', 'Design'],
      kpis: [{ l: 'Page views', n: 12840, d: '+22%' }, { l: 'Link clicks', n: 5320, d: '+17%' }, { l: 'Click rate', n: 41.4, suf: '%', d: '+3 pts' }, { l: 'Email signups', n: 214, d: 'this month' }],
      chart: { type: 'line', title: 'Visitors this week', data: [820, 910, 1100, 980, 1340, 1620, 1480], labels: days },
      table: { title: 'Top links', cols: ['Link', 'Source', 'Clicks', 'Trend'], status: 3, rows: [['Latest video', 'Instagram', '1,420', 'Up'], ['Book a call', 'YouTube', '980', 'Up'], ['Shop presets', 'TikTok', '760', 'Steady'], ['Newsletter', 'Twitter', '540', 'Up'], ['Portfolio', 'Direct', '410', 'Steady']] },
    },
  },
  {
    slug: 'client-portal', group: 'Creators and freelancers', icon: 'FolderOpen', title: 'Client portal',
    headline: 'Share files, invoices and project status in one place your clients actually use.',
    problem: 'Project updates are scattered across email threads and chat apps, and clients keep asking where things stand.',
    steps: [
      ['Invite your client', 'Each client gets a private login and sees only their own project.'],
      ['Share work and get approvals', 'Upload files, request feedback and collect sign-off in one thread.'],
      ['Invoice and get paid', 'Invoices and payment status sit next to the work they belong to.'],
    ],
    features: ['Private client logins', 'File sharing with versions', 'Project timeline and milestones', 'Comments and approvals', 'Invoices and payment status', 'Your branding and domain'],
    audience: 'Freelancers, designers, developers, consultants and small agencies.',
    dash: {
      app: 'Client portal', nav: ['Projects', 'Files', 'Invoices', 'Messages'],
      kpis: [{ l: 'Active projects', n: 7, d: '2 due soon' }, { l: 'Files shared', n: 134, d: 'this month' }, { l: 'Awaiting approval', n: 4, d: 'clients' }, { l: 'Outstanding', n: 85000, pre: '₹', d: '3 invoices' }],
      chart: { type: 'bars', title: 'Milestones completed', data: [3, 5, 4, 7, 6, 9, 8], labels: months },
      table: { title: 'Projects', cols: ['Project', 'Client', 'Progress', 'Status'], status: 3, rows: [['Brand refresh', 'Nova Foods', '80%', 'Review'], ['Website rebuild', 'Arka Labs', '55%', 'Active'], ['App UI', 'Lumen Health', '30%', 'Active'], ['Pitch deck', 'Green Ridge', '95%', 'Review'], ['Campaign', 'Zest Cafe', '100%', 'Done']] },
    },
  },
  {
    slug: 'proposal-quote-generator', group: 'Creators and freelancers', icon: 'FileText', title: 'Proposal and quote generator',
    headline: 'Send polished, accurate quotes in minutes and see exactly when clients open them.',
    problem: 'Writing every proposal from scratch is slow, and late quotes lose jobs to whoever replies first.',
    steps: [
      ['Pick a template', 'Start from your own services, prices and terms.'],
      ['Customise and send', 'Adjust scope and price, then send a link or PDF.'],
      ['Know when to follow up', 'See when it is opened, and let clients accept online.'],
    ],
    features: ['Reusable service and price library', 'Branded proposal templates', 'Online accept and e-signature', 'Open and view tracking', 'Automatic follow-up reminders', 'Convert a quote to an invoice'],
    audience: 'Freelancers, agencies, contractors and consultants.',
    dash: {
      app: 'Proposals', nav: ['Pipeline', 'Templates', 'Clients', 'Reports'],
      kpis: [{ l: 'Quotes sent', n: 38, d: 'this month' }, { l: 'Win rate', n: 46, suf: '%', d: '+8 pts' }, { l: 'Pipeline value', n: 640000, pre: '₹', d: '12 open' }, { l: 'Avg. reply time', n: 1.8, suf: ' days', d: '-0.9' }],
      chart: { type: 'bars', title: 'Quotes accepted', data: [2, 3, 3, 5, 4, 6, 7], labels: months },
      table: { title: 'Open proposals', cols: ['Client', 'Value', 'Opened', 'Status'], status: 3, rows: [['Arka Labs', '₹1,20,000', 'Today', 'Viewed'], ['Nova Foods', '₹68,000', 'Yesterday', 'Viewed'], ['Green Ridge', '₹2,40,000', 'Not yet', 'Sent'], ['Lumen Health', '₹95,000', '2 days ago', 'Accepted'], ['Zest Cafe', '₹32,000', 'Not yet', 'Draft']] },
    },
  },

  // ---------- Education ----------
  {
    slug: 'attendance-fee-tracking', group: 'Education', icon: 'ClipboardCheck', title: 'Attendance and fee tracking',
    headline: 'Take attendance in seconds and never chase a pending fee by hand again.',
    problem: 'Registers, notebooks and spreadsheets make it hard to see who is absent, who owes fees and how each batch is doing.',
    steps: [
      ['Set up batches', 'Add students, batches, timings and fee plans.'],
      ['Mark attendance daily', 'Tap present or absent. Parents can be notified automatically.'],
      ['Collect fees on time', 'Track instalments, send reminders and issue receipts.'],
    ],
    features: ['Batch and student records', 'One-tap attendance', 'Parent alerts by WhatsApp or SMS', 'Fee plans, instalments and receipts', 'Due and overdue lists', 'Monthly reports'],
    audience: 'Coaching centres, tuition classes, training institutes and small schools.',
    dash: {
      app: 'Centre manager', nav: ['Attendance', 'Students', 'Fees', 'Reports'],
      kpis: [{ l: 'Present today', n: 112, d: 'of 128' }, { l: 'Attendance rate', n: 87.5, suf: '%', d: '+2 pts' }, { l: 'Fees collected', n: 94500, pre: '₹', d: 'this month' }, { l: 'Fees pending', n: 28000, pre: '₹', d: '14 students' }],
      chart: { type: 'bars', title: 'Attendance by day (%)', data: [91, 88, 90, 85, 87, 79, 0], labels: days },
      table: { title: 'Fee status', cols: ['Student', 'Batch', 'Amount', 'Status'], status: 3, rows: [['Aarav S.', 'JEE-A', '₹4,500', 'Paid'], ['Diya P.', 'NEET-B', '₹4,000', 'Due'], ['Rohan K.', 'JEE-A', '₹4,500', 'Paid'], ['Sneha M.', 'Foundation', '₹2,500', 'Overdue'], ['Kabir J.', 'NEET-B', '₹4,000', 'Paid']] },
    },
  },
  {
    slug: 'mock-tests-quizzes', group: 'Education', icon: 'BookOpenCheck', title: 'Mock tests and quizzes',
    headline: 'Run timed online tests and give every student a clear result report.',
    problem: 'Paper tests take days to grade, and students rarely learn which topics they should revisit.',
    steps: [
      ['Build a test', 'Add questions, marks, negative marking and a time limit.'],
      ['Students attempt online', 'Tests run in the browser with a timer and auto-submit.'],
      ['Instant results', 'Scores, ranks and topic-wise analysis go out the moment they finish.'],
    ],
    features: ['Question bank with topics', 'Timed tests with auto-submit', 'Negative marking and sections', 'Instant scoring and ranks', 'Topic-wise strength and weakness report', 'Results export'],
    audience: 'Coaching institutes, schools, tutors and training providers.',
    dash: {
      app: 'Test platform', nav: ['Tests', 'Question bank', 'Results', 'Students'],
      kpis: [{ l: 'Attempts today', n: 214, d: '+31' }, { l: 'Average score', n: 64.2, suf: '%', d: '+4 pts' }, { l: 'Tests live', n: 6, d: '2 scheduled' }, { l: 'Pass rate', n: 78, suf: '%', d: '+5 pts' }],
      chart: { type: 'line', title: 'Average score by test (%)', data: [48, 52, 55, 58, 61, 63, 64], labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'] },
      table: { title: 'Leaderboard', cols: ['Rank', 'Student', 'Score', 'Status'], status: 3, rows: [['1', 'Ishaan V.', '92 / 100', 'Passed'], ['2', 'Tanvi R.', '89 / 100', 'Passed'], ['3', 'Neel D.', '84 / 100', 'Passed'], ['4', 'Pooja S.', '61 / 100', 'Passed'], ['5', 'Yash B.', '38 / 100', 'Review']] },
    },
  },
  {
    slug: 'placement-tracker', group: 'Education', icon: 'Briefcase', title: 'Placement tracker',
    headline: 'Keep every company, student and offer in one place during placement season.',
    problem: 'Placement cells juggle spreadsheets and group chats, so deadlines slip and nobody has a full picture.',
    steps: [
      ['List companies and roles', 'Record drives, eligibility and dates.'],
      ['Match and apply', 'Students see only the drives they qualify for and apply in one click.'],
      ['Track every round', 'Update shortlists, interviews and offers, then report to management.'],
    ],
    features: ['Company and drive management', 'Eligibility rules by branch and CGPA', 'Student applications and resumes', 'Round-wise status tracking', 'Offer and package records', 'Placement reports for NAAC and management'],
    audience: 'Colleges, universities and training institutes with a placement or internship cell.',
    dash: {
      app: 'Placement cell', nav: ['Drives', 'Students', 'Companies', 'Reports'],
      kpis: [{ l: 'Students placed', n: 186, d: 'of 240' }, { l: 'Placement rate', n: 77.5, suf: '%', d: '+6 pts' }, { l: 'Companies', n: 42, d: 'visited' }, { l: 'Top package', n: 18, suf: ' LPA', d: 'this year' }],
      chart: { type: 'bars', title: 'Offers by month', data: [12, 28, 41, 36, 30, 22, 17], labels: months },
      table: { title: 'Upcoming drives', cols: ['Company', 'Role', 'Date', 'Status'], status: 3, rows: [['TechNova', 'Software engineer', '14 Oct', 'Scheduled'], ['Finlytics', 'Data analyst', '16 Oct', 'Open'], ['BuildCo', 'Site engineer', '19 Oct', 'Scheduled'], ['CloudNest', 'Intern', '22 Oct', 'Open'], ['MediSure', 'QA analyst', '25 Oct', 'Pending']] },
    },
  },

  // ---------- Small teams ----------
  {
    slug: 'feedback-widget', group: 'Small teams', icon: 'MessageSquare', title: 'Feedback widget',
    headline: 'Collect feedback right on your website, then sort and act on it in one inbox.',
    problem: 'Visitors who spot a problem or have an idea rarely bother to email you, so you never hear it.',
    steps: [
      ['Add one line of code', 'A small widget appears on your site, styled to match it.'],
      ['Visitors share feedback', 'Ratings, comments and screenshots arrive in seconds.'],
      ['Triage and respond', 'Tag, assign and close the loop with the person who wrote in.'],
    ],
    features: ['Embeddable widget with your branding', 'Ratings, comments and screenshots', 'Page and device context', 'Tags, assignment and status', 'Email replies to the sender', 'Weekly digest'],
    audience: 'Product teams, SaaS startups, agencies and content sites.',
    dash: {
      app: 'Feedback inbox', nav: ['Inbox', 'Insights', 'Widget', 'Team'],
      kpis: [{ l: 'New feedback', n: 47, d: 'this week' }, { l: 'Avg. rating', n: 4.2, d: '+0.2' }, { l: 'Open items', n: 19, d: 'to triage' }, { l: 'Replied within 24h', n: 92, suf: '%', d: '+7 pts' }],
      chart: { type: 'line', title: 'Feedback received', data: [4, 6, 5, 9, 8, 12, 10], labels: days },
      table: { title: 'Latest feedback', cols: ['Page', 'Message', 'Rating', 'Status'], status: 3, rows: [['/pricing', 'Plan table is unclear', '3 ★', 'New'], ['/signup', 'Love the new form', '5 ★', 'Replied'], ['/docs', 'Search misses results', '2 ★', 'Review'], ['/home', 'Faster than before', '5 ★', 'Replied'], ['/app', 'Export button missing', '3 ★', 'New']] },
    },
  },
  {
    slug: 'status-page-uptime-monitor', group: 'Small teams', icon: 'Activity', title: 'Status page and uptime monitor',
    headline: 'Know the moment your site goes down, and show customers what is happening.',
    problem: 'Customers tell you about outages before your own tools do, and silence during an incident costs trust.',
    steps: [
      ['Add your endpoints', 'Websites, APIs and services are checked every minute.'],
      ['Get alerted instantly', 'Email, WhatsApp or Slack when something fails or slows down.'],
      ['Keep customers informed', 'A public status page shows uptime and incident updates.'],
    ],
    features: ['Checks every minute from multiple regions', 'Alerts on email, WhatsApp and Slack', 'Response-time tracking', 'Public status page on your domain', 'Incident updates and history', 'Monthly uptime reports'],
    audience: 'SaaS teams, agencies hosting client sites and any business with an online service.',
    dash: {
      app: 'Uptime', nav: ['Monitors', 'Incidents', 'Status page', 'Alerts'],
      kpis: [{ l: 'Uptime (30 days)', n: 99.97, suf: '%', d: 'all services' }, { l: 'Avg. response', n: 182, suf: ' ms', d: '-14 ms' }, { l: 'Incidents', n: 1, d: 'resolved' }, { l: 'Monitors', n: 12, d: 'all up' }],
      chart: { type: 'line', title: 'Response time (ms)', data: [210, 195, 188, 240, 176, 169, 182], labels: days },
      table: { title: 'Monitors', cols: ['Service', 'Region', 'Response', 'Status'], status: 3, rows: [['Website', 'Mumbai', '142 ms', 'Online'], ['API', 'Singapore', '188 ms', 'Online'], ['Checkout', 'Mumbai', '320 ms', 'Degraded'], ['Database', 'Private', '24 ms', 'Online'], ['Docs', 'Frankfurt', '210 ms', 'Online']] },
    },
  },
  {
    slug: 'simple-hr-tools', group: 'Small teams', icon: 'CalendarDays', title: 'Simple HR tools',
    headline: 'Handle leave requests and new-joiner onboarding without spreadsheets.',
    problem: 'Small teams run leave and onboarding over chat messages and sheets, which means missed approvals and forgotten steps.',
    steps: [
      ['Set up policies', 'Define leave types, balances and the onboarding checklist.'],
      ['Employees request and join', 'Leave is requested in a tap, and new joiners follow their checklist.'],
      ['Managers approve and track', 'Approvals, balances and team calendar stay in sync.'],
    ],
    features: ['Leave types and balances', 'Approval workflow', 'Team calendar and who is off', 'Onboarding checklists with owners', 'Reminders for pending tasks', 'Basic headcount and leave reports'],
    audience: 'Startups and small companies that have outgrown spreadsheets but do not need a full HR suite.',
    dash: {
      app: 'People', nav: ['Leave', 'Calendar', 'Onboarding', 'Team'],
      kpis: [{ l: 'On leave today', n: 3, d: 'of 28' }, { l: 'Pending requests', n: 5, d: 'to approve' }, { l: 'New joiners', n: 2, d: 'this month' }, { l: 'Onboarding done', n: 78, suf: '%', d: 'avg.' }],
      chart: { type: 'bars', title: 'Leave days by month', data: [22, 18, 26, 31, 24, 19, 28], labels: months },
      table: { title: 'Leave requests', cols: ['Employee', 'Type', 'Dates', 'Status'], status: 3, rows: [['Nisha R.', 'Casual', '14 to 15 Oct', 'Approved'], ['Karthik V.', 'Sick', '13 Oct', 'Approved'], ['Farah S.', 'Annual', '20 to 24 Oct', 'Pending'], ['Dev P.', 'Casual', '17 Oct', 'Pending'], ['Lata M.', 'Annual', '27 to 31 Oct', 'Approved']] },
    },
  },

  // ---------- AI-powered niche tools ----------
  {
    slug: 'resume-screener', group: 'AI-powered niche tools', icon: 'FileSearch', title: 'Resume screener',
    headline: 'Shortlist the right candidates faster, with clear reasons you can check.',
    problem: 'A single opening can bring hundreds of resumes, and reading each one properly takes days.',
    steps: [
      ['Describe the role', 'Paste the job description and set your must-haves.'],
      ['Upload resumes', 'Bulk upload PDFs or connect an inbox. Each is read and scored.'],
      ['Review the shortlist', 'See a ranked list with the reasons, then decide. A person always makes the call.'],
    ],
    features: ['Bulk resume upload', 'Scoring against your must-haves', 'Short summary per candidate', 'Reasons shown for every score', 'Notes and shortlist stages', 'Export to your hiring tracker'],
    audience: 'Small recruiters, staffing firms and HR teams hiring in volume.',
    dash: {
      app: 'Screener', nav: ['Roles', 'Candidates', 'Shortlist', 'Reports'],
      kpis: [{ l: 'Resumes screened', n: 482, d: 'this week' }, { l: 'Shortlisted', n: 36, d: '7.5%' }, { l: 'Time saved', n: 21, suf: ' hrs', d: 'vs manual' }, { l: 'Open roles', n: 5, d: 'active' }],
      chart: { type: 'bars', title: 'Match score spread', data: [12, 34, 68, 120, 142, 76, 30], labels: ['<40', '40', '50', '60', '70', '80', '90+'] },
      table: { title: 'Top candidates', cols: ['Candidate', 'Role', 'Match', 'Status'], status: 3, rows: [['Ananya G.', 'Backend dev', '94%', 'Shortlisted'], ['Rohit N.', 'Backend dev', '91%', 'Shortlisted'], ['Sana K.', 'Backend dev', '86%', 'Review'], ['Mihir T.', 'Backend dev', '82%', 'Review'], ['Pallavi D.', 'Backend dev', '79%', 'Review']] },
    },
  },
  {
    slug: 'auto-reply-drafts', group: 'AI-powered niche tools', icon: 'MessageCircleReply', title: 'Auto reply drafts',
    headline: 'Get a ready-to-send draft for every customer email or WhatsApp message.',
    problem: 'Support teams answer the same questions all day, and slow replies cost customers.',
    steps: [
      ['Teach it your business', 'Add your FAQs, policies and tone of voice.'],
      ['Drafts appear instantly', 'Each incoming message gets a suggested reply based on your own content.'],
      ['Approve, edit, send', 'Your team stays in control. Nothing is sent without approval unless you choose to.'],
    ],
    features: ['Works with email and WhatsApp', 'Answers from your own FAQs and policies', 'Tone and language settings', 'Approve-before-send by default', 'Handoff for questions it is unsure about', 'Reply time and volume reports'],
    audience: 'Support teams, ecommerce stores, clinics and service businesses.',
    dash: {
      app: 'Support drafts', nav: ['Inbox', 'Drafts', 'Knowledge', 'Reports'],
      kpis: [{ l: 'Messages today', n: 168, d: '+9%' }, { l: 'Drafts approved', n: 74, suf: '%', d: 'unchanged' }, { l: 'Avg. first reply', n: 6, suf: ' min', d: '-22 min' }, { l: 'Needs a person', n: 14, d: 'flagged' }],
      chart: { type: 'line', title: 'Messages handled', data: [96, 120, 134, 128, 156, 142, 168], labels: days },
      table: { title: 'Draft queue', cols: ['From', 'Question', 'Channel', 'Status'], status: 3, rows: [['Asha T.', 'Where is my order?', 'WhatsApp', 'Draft'], ['Manoj B.', 'Refund policy?', 'Email', 'Approved'], ['Rina S.', 'Change delivery date', 'WhatsApp', 'Draft'], ['Dinesh K.', 'Invoice copy', 'Email', 'Sent'], ['Zoya H.', 'Damaged item', 'Email', 'Review']] },
    },
  },
  {
    slug: 'social-post-scheduler', group: 'AI-powered niche tools', icon: 'CalendarClock', title: 'Social post scheduler',
    headline: 'Captions and a posting calendar tailored to one niche, such as real estate.',
    problem: 'Generic schedulers leave you writing every caption yourself, and niche audiences notice when content feels generic.',
    steps: [
      ['Pick your niche', 'Start from templates built for listings, tips and local updates.'],
      ['Generate and edit captions', 'Drafts use your listing details and brand voice. You edit before anything is saved.'],
      ['Schedule across channels', 'Plan the month, then publish on a schedule and see what performs.'],
    ],
    features: ['Niche templates, for example property listings', 'Caption drafts from your details', 'Content calendar', 'Scheduling to major social platforms', 'Hashtag and best-time suggestions', 'Post performance summary'],
    audience: 'Real estate agents, local service brands and solo marketers focused on one niche.',
    dash: {
      app: 'Content planner', nav: ['Calendar', 'Drafts', 'Library', 'Insights'],
      kpis: [{ l: 'Posts scheduled', n: 28, d: 'next 14 days' }, { l: 'Reach', n: 48200, d: '+26%' }, { l: 'Engagement', n: 5.8, suf: '%', d: '+1.1 pts' }, { l: 'Leads from posts', n: 17, d: 'this month' }],
      chart: { type: 'bars', title: 'Reach by day', data: [4200, 5100, 6900, 5600, 8200, 9800, 8400], labels: days },
      table: { title: 'Scheduled posts', cols: ['Post', 'Channel', 'When', 'Status'], status: 3, rows: [['3 BHK in Whitefield', 'Instagram', 'Today 6 pm', 'Scheduled'], ['Home loan tips', 'LinkedIn', 'Tomorrow', 'Scheduled'], ['Open house this Sunday', 'Facebook', 'Fri 10 am', 'Draft'], ['Market update', 'Instagram', 'Sat 9 am', 'Scheduled'], ['Client story', 'LinkedIn', 'Mon', 'Draft']] },
    },
  },
]

// Menu structure: solutions grouped in their original order.
export const solutionGroups = solutions.reduce((acc, s) => {
  const g = acc.find((x) => x.group === s.group)
  if (g) g.items.push(s)
  else acc.push({ group: s.group, items: [s] })
  return acc
}, [])

export const bySlug = (slug) => solutions.find((s) => s.slug === slug)

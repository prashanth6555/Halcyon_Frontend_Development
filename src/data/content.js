export const studios = ['Northwind', 'Harbor & Co', 'Fieldnote', 'Kindred', 'Lumen', 'Atlas Room', 'Brassline', 'Olive']

export const features = [
  {
    title: 'Signal board',
    copy: 'Revenue, pipeline, and delivery sit on one surface. No more reconciling three tools before standup.',
    span: 'md:col-span-2 xl:col-span-2 xl:row-span-2',
    wide: true,
  },
  {
    title: 'Client rooms',
    copy: 'A shared timeline clients can follow without another login maze.',
  },
  {
    title: 'Quiet alerts',
    copy: 'Halcyon only taps you when a number leaves the band you set.',
  },
  {
    title: 'Rolling forecasts',
    copy: 'A 90-day view that revises itself as invoices and hours land.',
  },
  {
    title: 'Studio billing',
    copy: 'Invoices that match the work, with a trail your finance lead will trust.',
  },
]

export const steps = [
  {
    n: '01',
    title: 'Connect the sources',
    copy: 'Bring in billing, time, and the CRM you already live in. Halcyon maps them the same afternoon.',
  },
  {
    n: '02',
    title: 'Set the bands',
    copy: 'Choose what “healthy” looks like for margin, response time, and cash. The board stays quiet until it isn’t.',
  },
  {
    n: '03',
    title: 'Run the week from one room',
    copy: 'Standup, client check-ins, and Friday close all read from the same numbers.',
  },
]

export const stories = [
  {
    quote: 'We retired three dashboards in a week. Friday close went from a scramble to a twenty-minute read.',
    name: 'Priya Raman',
    role: 'Operations lead, Harbor & Co',
    initials: 'PR',
    photo: '/images/portrait-priya.jpg',
  },
  {
    quote: 'Clients stopped asking for status decks. The room shows the work, and the conversation got shorter.',
    name: 'Jonah Ellis',
    role: 'Partner, Fieldnote',
    initials: 'JE',
    photo: '/images/portrait-jonah.jpg',
  },
  {
    quote: 'The alerts are the feature. I hear about a slipping retainer before the client does.',
    name: 'Amelia Cho',
    role: 'Finance, Kindred Studio',
    initials: 'AC',
    photo: '/images/portrait-amelia.jpg',
  },
  {
    quote: 'It looks like a product our team wanted to open. That sounds small until you live in the tool all day.',
    name: 'Mateo Ruiz',
    role: 'Director, Atlas Room',
    initials: 'MR',
    photo: '/images/portrait-mateo.jpg',
  },
]

export const payments = [
  { id: 'INV-2048', name: 'Harbor & Co', plan: 'Scale', amount: 4800, status: 'Paid', date: '2026-10-02' },
  { id: 'INV-2047', name: 'Fieldnote', plan: 'Studio', amount: 1600, status: 'Paid', date: '2026-10-01' },
  { id: 'INV-2046', name: 'Northwind', plan: 'Scale', amount: 4800, status: 'Pending', date: '2026-09-28' },
  { id: 'INV-2045', name: 'Brassline', plan: 'Starter', amount: 640, status: 'Paid', date: '2026-09-26' },
  { id: 'INV-2044', name: 'Olive Supply', plan: 'Studio', amount: 1600, status: 'Refunded', date: '2026-09-22' },
  { id: 'INV-2043', name: 'Kindred Studio', plan: 'Scale', amount: 5200, status: 'Paid', date: '2026-09-19' },
  { id: 'INV-2042', name: 'Lumen Co', plan: 'Studio', amount: 1800, status: 'Pending', date: '2026-09-16' },
  { id: 'INV-2041', name: 'Atlas Room', plan: 'Scale', amount: 4800, status: 'Paid', date: '2026-09-12' },
]

export const revenueSeries = {
  '7d': [
    { label: 'Mon', revenue: 18, forecast: 16 },
    { label: 'Tue', revenue: 22, forecast: 19 },
    { label: 'Wed', revenue: 19, forecast: 21 },
    { label: 'Thu', revenue: 28, forecast: 24 },
    { label: 'Fri', revenue: 31, forecast: 27 },
    { label: 'Sat', revenue: 17, forecast: 18 },
    { label: 'Sun', revenue: 21, forecast: 20 },
  ],
  '30d': [
    { label: 'W1', revenue: 86, forecast: 80 },
    { label: 'W2', revenue: 94, forecast: 88 },
    { label: 'W3', revenue: 91, forecast: 96 },
    { label: 'W4', revenue: 112, forecast: 104 },
  ],
  '90d': [
    { label: 'Jul', revenue: 240, forecast: 228 },
    { label: 'Aug', revenue: 268, forecast: 250 },
    { label: 'Sep', revenue: 301, forecast: 286 },
    { label: 'Oct', revenue: 128, forecast: 140 },
  ],
}

export const plans = [
  { name: 'Scale', value: 62, color: '#1f9d84' },
  { name: 'Studio', value: 28, color: '#e07a45' },
  { name: 'Starter', value: 10, color: '#e2b657' },
]

export const activity = [
  { title: 'Harbor & Co moved to Scale', time: '12 min ago', tone: 'Paid' },
  { title: 'Forecast revised for October', time: '1 hr ago', tone: 'Pending' },
  { title: 'Olive Supply invoice refunded', time: '3 hr ago', tone: 'Refunded' },
  { title: 'New client room opened for Lumen', time: 'Yesterday', tone: 'Paid' },
  { title: 'Margin band tripped on Brassline', time: 'Yesterday', tone: 'Pending' },
]

export const channels = [
  { name: 'Referrals', value: 86 },
  { name: 'Outbound', value: 64 },
  { name: 'Inbound site', value: 51 },
  { name: 'Partners', value: 38 },
]

export const funnel = [
  { name: 'Intro calls', value: 48 },
  { name: 'Proposals', value: 29 },
  { name: 'Workshops', value: 18 },
  { name: 'Retainers', value: 11 },
]

export const weeklyBars = [
  { label: 'Mon', closed: 12, open: 7 },
  { label: 'Tue', closed: 16, open: 5 },
  { label: 'Wed', closed: 11, open: 9 },
  { label: 'Thu', closed: 18, open: 6 },
  { label: 'Fri', closed: 21, open: 4 },
  { label: 'Sat', closed: 6, open: 2 },
  { label: 'Sun', closed: 4, open: 3 },
]

export const invoices = [
  { id: 'INV-2048', client: 'Harbor & Co', amount: 4800, status: 'Paid', date: 'Oct 2' },
  { id: 'INV-2046', client: 'Northwind', amount: 4800, status: 'Pending', date: 'Sep 28' },
  { id: 'INV-2045', client: 'Brassline', amount: 640, status: 'Paid', date: 'Sep 26' },
  { id: 'INV-2042', client: 'Lumen Co', amount: 1800, status: 'Pending', date: 'Sep 16' },
]

export function money(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function prettyDate(iso) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

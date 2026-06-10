import { useMemo, useState } from 'react'
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  CircleDot,
  Code2,
  Database,
  Gauge,
  GitPullRequestArrow,
  LayoutDashboard,
  ListChecks,
  MonitorSmartphone,
  PackageCheck,
  PanelsTopLeft,
  ShieldCheck,
  Sparkles,
  Wand2,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const navItems = [
  { label: 'Audit', icon: LayoutDashboard },
  { label: 'UI fixes', icon: MonitorSmartphone },
  { label: 'Features', icon: PackageCheck },
  { label: 'Backend', icon: Database },
  { label: 'Handoff', icon: GitPullRequestArrow },
]

const velocity = [
  { day: 'Mon', fixed: 4, reviewed: 7 },
  { day: 'Tue', fixed: 7, reviewed: 9 },
  { day: 'Wed', fixed: 8, reviewed: 11 },
  { day: 'Thu', fixed: 12, reviewed: 14 },
  { day: 'Fri', fixed: 15, reviewed: 17 },
]

const performance = [
  { name: 'Routes', score: 91 },
  { name: 'Forms', score: 88 },
  { name: 'Tables', score: 84 },
  { name: 'Mobile', score: 93 },
]

const features = [
  { name: 'Customer settings page', type: 'New page', status: 'Ready', owner: 'Frontend + API' },
  { name: 'Subscription usage panel', type: 'Enhancement', status: 'In QA', owner: 'Full stack' },
  { name: 'Admin search filters', type: 'UX fix', status: 'Next', owner: 'Frontend' },
  { name: 'Webhook retry logs', type: 'Backend', status: 'Scoped', owner: 'API' },
]

const auditNotes = {
  ui: [
    'Normalize button sizes, table density, and form spacing across existing pages.',
    'Fix mobile sidebar collapse, overflowing cards, and chart labels below 768px.',
    'Create reusable page shell components so new features match the current product.',
  ],
  code: [
    'Map routes, API clients, auth guards, state stores, and shared component boundaries first.',
    'Ship changes as small pull requests with screenshots and regression notes.',
    'Replace brittle one-off UI fixes with reusable components only where it lowers risk.',
  ],
}

type IconType = typeof Activity

function MetricCard({ label, value, detail, icon: Icon }: { label: string; value: string; detail: string; icon: IconType }) {
  return (
    <section className="metric-card" aria-label={label}>
      <div className="metric-icon"><Icon size={18} /></div>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </section>
  )
}

export default function App() {
  const [activeAudit, setActiveAudit] = useState<'ui' | 'code'>('ui')
  const [selectedFeature, setSelectedFeature] = useState(features[0].name)
  const [lastReview, setLastReview] = useState('ready now')
  const notes = useMemo(() => auditNotes[activeAudit], [activeAudit])

  function runReview() {
    setActiveAudit((current) => (current === 'ui' ? 'code' : 'ui'))
    setLastReview(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark"><PanelsTopLeft size={20} /></div>
          <div>
            <strong>SaaS Upgrade Desk</strong>
            <span>Proposal demo for existing apps</span>
          </div>
        </div>

        <nav aria-label="Main navigation">
          {navItems.map(({ label, icon: Icon }) => (
            <button className={label === 'Audit' ? 'nav-item active' : 'nav-item'} key={label}>
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>

        <div className="stack-card">
          <span>Fits this Upwork brief</span>
          <strong>React, Angular, Node, Laravel, Django, REST APIs</strong>
          <p>Built to show how I would improve an existing SaaS app without rewriting the product or slowing the team down.</p>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <h1>Existing SaaS codebase, upgraded safely.</h1>
            <p>Audit the current structure, repair UI responsiveness, add features, clean code paths, and hand off small tested releases.</p>
          </div>
          <div className="topbar-actions">
            <button className="ghost-button"><ShieldCheck size={16} /> Low-risk PRs</button>
            <button className="primary-button">Review plan <ArrowRight size={16} /></button>
          </div>
        </header>

        <section className="metrics-grid">
          <MetricCard label="First pass audit" value="48 hrs" detail="routes, UI, API, risk map" icon={ListChecks} />
          <MetricCard label="Responsive targets" value="3 sizes" detail="desktop, tablet, mobile" icon={MonitorSmartphone} />
          <MetricCard label="Feature cadence" value="1-2 / wk" detail="small releases with notes" icon={PackageCheck} />
          <MetricCard label="Quality gate" value="QA notes" detail="screenshots before merge" icon={Gauge} />
        </section>

        <section className="content-grid">
          <section className="panel audit-panel">
            <div className="panel-header">
              <div>
                <span className="section-label">Codebase intake</span>
                <h2>{activeAudit === 'ui' ? 'UI/UX improvement pass' : 'Existing code review pass'}</h2>
              </div>
              <button className="icon-button" onClick={runReview} aria-label="Switch review focus">
                <Wand2 size={17} />
              </button>
            </div>
            <div className="prompt-tabs">
              <button className={activeAudit === 'ui' ? 'selected' : ''} onClick={() => setActiveAudit('ui')}>UI fixes</button>
              <button className={activeAudit === 'code' ? 'selected' : ''} onClick={() => setActiveAudit('code')}>Code map</button>
            </div>
            <div className="audit-output">
              {notes.map((line) => (
                <div className="audit-line" key={line}>
                  <CheckCircle2 size={17} />
                  <p>{line}</p>
                </div>
              ))}
            </div>
            <footer className="panel-footer">Review focus updated {lastReview}</footer>
          </section>

          <section className="panel velocity-panel">
            <div className="panel-header">
              <div>
                <span className="section-label">Delivery rhythm</span>
                <h2>Small fixes, visible progress</h2>
              </div>
              <span className="status-pill good">Weekly release-ready</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={velocity}>
                <defs>
                  <linearGradient id="fixed" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#d8e1ea" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={34} />
                <Tooltip />
                <Area type="monotone" dataKey="reviewed" stroke="#64748b" fill="transparent" strokeWidth={2} />
                <Area type="monotone" dataKey="fixed" stroke="#2563eb" fill="url(#fixed)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </section>

          <section className="panel feature-panel">
            <div className="panel-header">
              <div>
                <span className="section-label">Feature queue</span>
                <h2>Pages and fixes I can ship</h2>
              </div>
              <span className="status-pill">4 scoped items</span>
            </div>
            <div className="feature-list">
              {features.map((feature) => (
                <button
                  className={selectedFeature === feature.name ? 'feature-row selected' : 'feature-row'}
                  key={feature.name}
                  onClick={() => setSelectedFeature(feature.name)}
                >
                  <CircleDot size={16} />
                  <span>
                    <strong>{feature.name}</strong>
                    <small>{feature.type} · {feature.owner}</small>
                  </span>
                  <em>{feature.status}</em>
                </button>
              ))}
            </div>
          </section>

          <section className="panel backend-panel">
            <div className="panel-header">
              <div>
                <span className="section-label">Backend readiness</span>
                <h2>API, data, and performance</h2>
              </div>
              <span className="status-pill good">Scoped</span>
            </div>
            <div className="service-list">
              <div><Code2 size={18} /><strong>Frontend</strong><span>React, Vue, Angular, jQuery cleanup</span></div>
              <div><Database size={18} /><strong>Backend</strong><span>Node.js, Laravel, Django APIs</span></div>
              <div><Activity size={18} /><strong>Performance</strong><span>Bundle, query, and render checks</span></div>
              <div><Sparkles size={18} /><strong>UX polish</strong><span>Modern spacing, states, and flows</span></div>
            </div>
            <ResponsiveContainer width="100%" height={154}>
              <BarChart data={performance}>
                <CartesianGrid stroke="#d8e1ea" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip />
                <Bar dataKey="score" fill="#f97316" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </section>
        </section>

        <section className="delivery-band">
          <GitPullRequestArrow size={20} />
          <div>
            <strong>How I would start your project</strong>
            <p>Clone the app, run it locally, document current routes and API calls, fix one visible UI issue first, then continue with feature PRs that include screenshots, notes, and clear rollback points.</p>
          </div>
        </section>
      </section>
    </main>
  )
}

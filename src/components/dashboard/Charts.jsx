import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { plans, revenueSeries, weeklyBars } from '../../data/content'

function Tip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-xs shadow-[var(--shadow)]">
      <p className="font-bold">{label}</p>
      {payload.map((item) => (
        <p key={item.dataKey} className="mt-1" style={{ color: item.color }}>
          {item.name}: {item.value}
        </p>
      ))}
    </div>
  )
}

const axis = { fill: 'var(--muted)', fontSize: 12 }

export function RevenueChart({ range }) {
  const data = revenueSeries[range]
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.35} />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--line)" vertical={false} />
          <XAxis dataKey="label" tick={axis} axisLine={false} tickLine={false} />
          <YAxis tick={axis} axisLine={false} tickLine={false} />
          <Tooltip content={<Tip />} />
          <Area type="monotone" dataKey="forecast" name="Forecast" stroke="var(--gold)" fill="transparent" strokeDasharray="5 5" strokeWidth={2} />
          <Area type="monotone" dataKey="revenue" name="Revenue" stroke="var(--accent)" fill="url(#rev)" strokeWidth={2.5} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export function PlanMix() {
  return (
    <div className="h-52 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={plans} dataKey="value" nameKey="name" innerRadius={52} outerRadius={78} paddingAngle={3} stroke="none">
            {plans.map((plan) => (
              <Cell key={plan.name} fill={plan.color} />
            ))}
          </Pie>
          <Tooltip content={<Tip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export function WeeklyChart() {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={weeklyBars} margin={{ top: 10, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid stroke="var(--line)" vertical={false} />
          <XAxis dataKey="label" tick={axis} axisLine={false} tickLine={false} />
          <YAxis tick={axis} axisLine={false} tickLine={false} />
          <Tooltip content={<Tip />} />
          <Bar dataKey="closed" name="Closed" fill="var(--accent)" radius={[8, 8, 0, 0]} />
          <Bar dataKey="open" name="Open" fill="var(--sienna)" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

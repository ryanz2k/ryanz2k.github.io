import { useState } from 'react'
import { semiMonthlySlip } from '../data/payroll'

const peso = (n: number) =>
  '₱' + n.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

function Line({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex items-baseline justify-between gap-4 py-2 text-sm ${strong ? 'font-semibold text-fg' : 'text-muted'}`}>
      <span>{label}</span>
      <span className="font-mono tabular-nums text-fg">{value}</span>
    </div>
  )
}

/** Move the salary and watch one semi-monthly payslip recompute, using the demo's own arithmetic. */
export default function PayslipDemo() {
  const [salary, setSalary] = useState(24000)
  const [overtime, setOvertime] = useState(true)
  const allowance = 500
  const slip = semiMonthlySlip(salary, allowance, overtime ? 750 : 0)

  return (
    <div className="card grid gap-8 p-6 sm:p-8 md:grid-cols-[1fr_1.1fr]">
      <div>
        <h3 className="text-lg font-semibold text-fg">Try a payslip</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          One semi-monthly payday. Change the salary and every line below it follows, the same way it does in the
          app.
        </p>

        <label htmlFor="payslip-salary" className="mt-6 flex items-baseline justify-between text-sm text-muted">
          <span>Monthly salary</span>
          <span className="font-mono text-base font-semibold tabular-nums text-fg">{peso(salary)}</span>
        </label>
        <input
          id="payslip-salary"
          type="range"
          min={15000}
          max={120000}
          step={1000}
          value={salary}
          onChange={(e) => setSalary(Number(e.target.value))}
          className="mt-3 w-full accent-accent"
        />

        <label className="mt-5 flex cursor-pointer items-center gap-3 text-sm text-muted">
          <input
            type="checkbox"
            checked={overtime}
            onChange={(e) => setOvertime(e.target.checked)}
            className="h-4 w-4 accent-accent"
          />
          Include ₱750.00 of approved overtime
        </label>

        <p className="mt-6 text-xs leading-relaxed text-subtle">
          Rates and brackets here are the demo’s defaults. In the app they are settings an administrator can
          edit, so treat the figures as an illustration, not payroll advice.
        </p>
      </div>

      <div className="rounded-xl border border-line bg-bg p-5" aria-live="polite">
        <p className="eyebrow">Earnings</p>
        <div className="mt-1 divide-y divide-line">
          <Line label="Basic pay" value={peso(slip.basic)} />
          <Line label="Taxable allowance" value={peso(allowance)} />
          <Line label="Overtime pay" value={peso(overtime ? 750 : 0)} />
          <Line label="Gross earnings" value={peso(slip.gross)} strong />
        </div>
        <p className="eyebrow mt-5">Employee deductions</p>
        <div className="mt-1 divide-y divide-line">
          <Line label="SSS" value={peso(slip.sss)} />
          <Line label="PhilHealth" value={peso(slip.philhealth)} />
          <Line label="Pag-IBIG" value={peso(slip.pagibig)} />
          <Line label="Withholding tax" value={peso(slip.tax)} />
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-4 rounded-lg border border-accent/30 bg-accent/10 px-4 py-3">
          <span className="text-sm font-medium text-fg">Take-home pay</span>
          <span className="font-mono text-xl font-semibold tabular-nums text-accent">{peso(slip.net)}</span>
        </div>
      </div>
    </div>
  )
}

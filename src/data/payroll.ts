import overview from '../assets/payroll/desktop-1-overview.webp'
import runs from '../assets/payroll/desktop-2-payroll-runs.webp'
import payslip from '../assets/payroll/desktop-3-payslip.webp'
import timekeeping from '../assets/payroll/desktop-4-timekeeping.webp'
import employees from '../assets/payroll/desktop-5-employees.webp'
import employeeApp from '../assets/payroll/phone-1-employee-app.webp'
import phoneOverview from '../assets/payroll/phone-2-overview.webp'

export const PAYROLL = {
  name: 'HR & Payroll System',
  tagline: 'Time, leave and payroll in one place, for Philippine small businesses.',
  pitch:
    'Attendance and approved requests flow into a pay run, the pay run produces payslips with SSS, PhilHealth, Pag-IBIG and withholding tax worked out, and a finalized payday can never quietly change afterwards.',
  stats: [
    { value: '14', label: 'screens, from time logs to payslips' },
    { value: '4', label: 'pay frequencies: daily to monthly' },
    { value: '22', label: 'automated tests on the pay and time rules' },
  ],
  chips: ['JavaScript', 'HTML & CSS', 'IndexedDB', 'Node test runner'],
  hero: overview,
}

export const PAYROLL_SCREENS = [
  { src: overview, alt: 'Workspace overview with headcount, attendance rate, payroll chart and the current pay cycle', caption: 'Overview: headcount, attendance and the current pay cycle' },
  { src: runs, alt: 'Payroll run for a semi-monthly period with gross, deductions and net pay per employee', caption: 'Pay run: gross, deductions and net per employee' },
  { src: payslip, alt: 'Employee payslip with earnings, government contributions, withholding tax and take-home pay', caption: 'Payslip: every line that makes up take-home pay' },
  { src: timekeeping, alt: 'Daily attendance register with shift, time in, time out and status', caption: 'Timekeeping: attendance logs that become payroll time records' },
  { src: employees, alt: 'Employee directory with department, role and monthly salary', caption: 'Employees: directory, departments and compensation' },
]

export const PAYROLL_PHONES = [
  { src: employeeApp, alt: 'Employee self-service on a phone: profile and request buttons for overtime, leave and more', caption: 'Employee app: profile, requests and payslips' },
  { src: phoneOverview, alt: 'Workspace overview on a phone', caption: 'The same workspace at phone width' },
]

export const PAYROLL_PROBLEMS = [
  {
    title: 'A finalized payday stays finalized',
    body: 'Finalizing a period stores a snapshot of every payslip. If a salary changes the next day, last month’s payslip does not. A period cannot be finalized before its attendance is reviewed, or finalized twice.',
  },
  {
    title: 'Only approved time reaches pay',
    body: 'Overtime counts once it is approved, and cancelling it takes it back out. Approved leave offsets a time shortfall. Changing an attendance log after the time records were processed marks them as needing a rerun.',
  },
  {
    title: 'Imports are all or nothing',
    body: 'A CSV of time logs or adjustments is validated as a whole, quoted fields included. One bad row rejects the batch, and importing the same file twice changes nothing the second time.',
  },
  {
    title: 'Loans end on the exact peso',
    body: 'A loan posts one installment per payday, never twice for the same period, and the last deduction is capped at what is still owed.',
  },
]

export const PAYROLL_FEATURES = [
  'Daily, weekly, semi-monthly and monthly pay periods',
  'SSS, PhilHealth, Pag-IBIG and withholding tax, with editable rates and brackets',
  'Requests for leave, overtime, undertime, schedule changes, missed logs and official business',
  'Approvals limited to users with approver rights, and never for your own request',
  'Daily-paid staff, holiday premiums and off-cycle pay runs',
  'Payslips to preview and print, and a payroll register to export',
  '13th-month and annual tax worksheets built from finalized paydays only',
  'Access profiles with per-module rights and read-only roles',
  'Employee self-service for profile, requests and issued payslips',
  'Light and dark appearance, usable at phone width',
]

export const PAYROLL_STACK = [
  'JavaScript (no framework)',
  'HTML & CSS',
  'localStorage',
  'IndexedDB',
  'Node test runner',
]

/* ------------------------------------------------------------------ */
/* The semi-monthly payslip arithmetic the demo uses, for PayslipDemo. */

const round = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100

/** [taxable income from, tax at that point, rate on the excess], highest first. */
const SEMI_MONTHLY_TAX: [number, number, number][] = [
  [333333, 91770.7, 0.35],
  [83333, 16770.7, 0.3],
  [33333, 4270.7, 0.25],
  [16667, 937.5, 0.2],
  [10417, 0, 0.15],
]

export interface Slip {
  basic: number
  gross: number
  sss: number
  philhealth: number
  pagibig: number
  taxable: number
  tax: number
  net: number
}

/** One semi-monthly payslip from a monthly salary, plus allowance and overtime for the period. */
export function semiMonthlySlip(monthlySalary: number, allowance: number, overtime: number): Slip {
  const basic = round(monthlySalary / 2)
  const gross = round(basic + allowance + overtime)
  const credit = Math.min(35000, Math.max(5000, Math.round((gross * 2) / 500) * 500))
  const sss = round((credit * 0.05) / 2)
  const philhealth = round((Math.min(100000, Math.max(10000, monthlySalary)) * 0.025) / 2)
  const pagibig = round((Math.min(10000, gross * 2) * 0.02) / 2)
  const taxable = round(Math.max(0, gross - sss - philhealth - pagibig))
  const row = SEMI_MONTHLY_TAX.find(([from]) => taxable >= from)
  const tax = row ? round(row[1] + (taxable - row[0]) * row[2]) : 0
  return { basic, gross, sss, philhealth, pagibig, taxable, tax, net: round(gross - sss - philhealth - pagibig - tax) }
}

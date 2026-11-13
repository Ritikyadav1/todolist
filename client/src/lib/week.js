export const pad = (n) => String(n).padStart(2, '0')

export function addDays(date, n) {
  const d = new Date(date)
  d.setDate(d.getDate() + n)
  return d
}

export function sameDay(a, b) {
  return a.toDateString() === b.toDateString()
}

// Monday 00:00 of the week containing `date`
export function weekStart(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7))
  return d
}

export function groupByWeek(tasks) {
  const weeks = new Map()
  for (const task of tasks) {
    const start = weekStart(task.dueAt)
    const key = start.getTime()
    if (!weeks.has(key)) weeks.set(key, { key, start, tasks: [] })
    weeks.get(key).tasks.push(task)
  }
  return [...weeks.values()].sort((a, b) => a.key - b.key)
}

const short = { month: 'short', day: 'numeric' }

export function weekLabel(start) {
  const from = start.toLocaleDateString(undefined, short)
  const to = addDays(start, 6).toLocaleDateString(undefined, short)
  return `${from} – ${to}`
}

export function toDateInput(date) {
  const d = new Date(date)
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function toTimeInput(date) {
  const d = new Date(date)
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`
}

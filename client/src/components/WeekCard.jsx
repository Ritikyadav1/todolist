import { useState } from 'react'
import { weekLabel } from '../lib/week'
import { ChevronRight } from './icons'
import TaskRow from './TaskRow'

export default function WeekCard({ week, defaultOpen, ...handlers }) {
  const [open, setOpen] = useState(defaultOpen)
  const completed = week.tasks.filter((t) => t.status === 'Completed').length
  const openCount = week.tasks.length - completed

  return (
    <section className="rounded-lg border border-slate-200 px-4 py-3">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-left"
      >
        <div>
          <h2 className="text-sm font-semibold">{weekLabel(week.start)}</h2>
          <div className="mt-2 flex gap-2 text-[11px]">
            <span className="rounded bg-danger-soft px-2 py-0.5 text-danger">{openCount} open</span>
            <span className="rounded bg-brand-soft px-2 py-0.5 text-brand">{completed} completed</span>
          </div>
        </div>
        <ChevronRight className={`text-slate-400 transition-transform ${open ? 'rotate-90' : ''}`} />
      </button>

      {open && (
        <ul className="mt-2">
          {week.tasks.map((task) => (
            <TaskRow key={task._id} task={task} showDate {...handlers} />
          ))}
        </ul>
      )}
    </section>
  )
}

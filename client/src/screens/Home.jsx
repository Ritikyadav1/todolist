import { useState } from 'react'
import { CheckIcon, ChevronLeft, ChevronRight, CloseIcon, SearchIcon } from '../components/icons'
import TaskRow from '../components/TaskRow'
import { addDays, pad, sameDay, weekLabel, weekStart } from '../lib/week'

export default function Home({ tasks, loading, actions, onAdd, onSearch, onViewAll }) {
  const [today] = useState(() => new Date())
  const [selected, setSelected] = useState(today)

  const start = weekStart(selected)
  const days = Array.from({ length: 7 }, (_, i) => addDays(start, i))
  const weekTasks = tasks.filter((t) => weekStart(t.dueAt).getTime() === start.getTime())
  const done = weekTasks.filter((t) => t.status === 'Completed').length
  const pending = weekTasks.length - done
  const percent = weekTasks.length ? Math.round((done / weekTasks.length) * 100) : 0
  const dayTasks = tasks.filter((t) => sameDay(new Date(t.dueAt), selected))

  const heading = sameDay(selected, today)
    ? 'Tasks Today'
    : `Tasks · ${selected.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}`

  return (
    <div className="px-5 pb-28 pt-6">
      <button
        onClick={onSearch}
        aria-label="Search for a task"
        className="flex h-11 w-full items-center justify-between rounded-md border border-slate-200 px-4 text-xs text-slate-400"
      >
        Search for a task
        <SearchIcon className="text-slate-800" />
      </button>

      <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
        <button aria-label="Previous week" onClick={() => setSelected(addDays(selected, -7))}>
          <ChevronLeft width={18} height={18} />
        </button>
        <span>{weekLabel(start)}</span>
        <button aria-label="Next week" onClick={() => setSelected(addDays(selected, 7))}>
          <ChevronRight width={18} height={18} />
        </button>
      </div>

      <div className="mt-2 grid grid-cols-7 gap-1">
        {days.map((d) => {
          const hasTasks = tasks.some((t) => sameDay(new Date(t.dueAt), d))
          return (
            <button
              key={d.getTime()}
              onClick={() => setSelected(d)}
              aria-label={d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
              className={`flex flex-col items-center gap-1 rounded-sm py-2 ${
                sameDay(d, selected) ? 'bg-brand text-white' : 'text-slate-400'
              }`}
            >
              <span className="text-[10px]">{d.toLocaleDateString(undefined, { weekday: 'short' })}</span>
              <span className="text-xs font-medium">{pad(d.getDate())}</span>
              <span className={`h-1 w-1 rounded-full ${hasTasks ? 'bg-current' : ''}`} />
            </button>
          )
        })}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-md bg-brand-soft p-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="grid h-6 w-6 place-items-center rounded-sm border border-brand bg-brand/25 text-brand">
              <CheckIcon width={14} height={14} strokeWidth={2.5} />
            </span>
            Task Complete
          </div>
          <p className="mt-3 text-xl font-semibold">
            {pad(done)} <span className="text-[10px] font-light text-slate-500">This Week</span>
          </p>
        </div>
        <div className="rounded-md bg-danger-soft p-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="grid h-6 w-6 place-items-center rounded-sm border border-danger bg-danger/20 text-danger">
              <CloseIcon width={14} height={14} strokeWidth={2.5} />
            </span>
            Task Pending
          </div>
          <p className="mt-3 text-xl font-semibold">
            {pad(pending)} <span className="text-[10px] font-light text-slate-500">This Week</span>
          </p>
        </div>
      </div>

      <h2 className="mt-6 text-sm font-semibold">Weekly Progress</h2>
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-3 h-3.5 overflow-hidden rounded-sm bg-[#d9dcfa]"
      >
        <div style={{ width: `${percent}%` }} className="h-full bg-brand-dark transition-all" />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <h2 className="text-sm font-semibold">{heading}</h2>
        <button onClick={onViewAll} className="text-xs font-medium text-brand">
          View All
        </button>
      </div>

      {loading ? (
        <p className="mt-6 text-center text-xs text-slate-400">Loading…</p>
      ) : dayTasks.length === 0 ? (
        <p className="mt-6 text-center text-xs text-slate-400">No tasks for this day.</p>
      ) : (
        <ul className="mt-2">
          {dayTasks.map((task) => (
            <TaskRow key={task._id} task={task} {...actions} />
          ))}
        </ul>
      )}

      <button
        onClick={() => onAdd(selected)}
        aria-label="Add Task"
        className="fixed bottom-6 left-1/2 grid h-14 w-14 -translate-x-1/2 place-items-center rounded-full bg-brand text-3xl text-white shadow-lg"
      >
        +
      </button>
    </div>
  )
}

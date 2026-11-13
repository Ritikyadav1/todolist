import { useRef, useState } from 'react'
import { CheckIcon, EditIcon, TrashIcon } from './icons'

const REVEAL = 80 // px the row slides to show Delete

const dot = { High: 'bg-red-500', Medium: 'bg-amber-400', Low: 'bg-green-500' }

const time = (d) => new Date(d).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })

export default function TaskRow({ task, showDate, onToggle, onEdit, onDelete }) {
  const [offset, setOffset] = useState(0)
  const [dragging, setDragging] = useState(false)
  const start = useRef({ x: 0, offset: 0 })
  const moved = useRef(false)

  const done = task.status === 'Completed'
  const when = [
    showDate && new Date(task.dueAt).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }),
    time(task.dueAt) + (task.endAt ? ` – ${time(task.endAt)}` : ''),
  ]
    .filter(Boolean)
    .join(' · ')

  function onTouchStart(e) {
    start.current = { x: e.touches[0].clientX, offset }
    moved.current = false
    setDragging(true)
  }

  function onTouchMove(e) {
    const dx = e.touches[0].clientX - start.current.x
    if (Math.abs(dx) > 5) moved.current = true
    setOffset(Math.max(-REVEAL, Math.min(0, start.current.offset + dx)))
  }

  function onTouchEnd() {
    setDragging(false)
    setOffset(offset < -REVEAL / 2 ? -REVEAL : 0)
  }

  function handleClick() {
    if (moved.current) return
    if (offset !== 0) setOffset(0)
    else onEdit(task)
  }

  // keeps the click from reaching the row's own handler
  const only = (fn) => (e) => {
    e.stopPropagation()
    fn()
  }

  return (
    <li className="relative overflow-hidden">
      <button
        onClick={() => onDelete(task)}
        className="absolute inset-y-0 right-0 w-20 bg-danger text-sm font-medium text-white"
      >
        Delete
      </button>

      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onClick={handleClick}
        style={{ transform: `translateX(${offset}px)` }}
        className={`relative flex touch-pan-y items-center gap-3 border-b border-slate-100 bg-white py-3 ${
          dragging ? '' : 'transition-transform duration-200'
        }`}
      >
        <button
          role="checkbox"
          aria-checked={done}
          aria-label={done ? 'Mark as in progress' : 'Mark as completed'}
          onClick={only(() => onToggle(task))}
          className="grid h-5 w-5 shrink-0 place-items-center rounded-[3px] border border-brand/60 text-brand"
        >
          {done && <CheckIcon width={14} height={14} strokeWidth={2.5} />}
        </button>

        <div className="min-w-0 flex-1">
          <p className={`truncate text-sm font-medium ${done ? 'line-through' : ''}`}>{task.title}</p>
          <p className="truncate text-[11px] text-slate-400">{when}</p>
        </div>

        {task.priority && (
          <span title={`${task.priority} priority`} className={`h-2 w-2 shrink-0 rounded-full ${dot[task.priority]}`} />
        )}

        <button
          aria-label="Delete task"
          onClick={only(() => setOffset(offset ? 0 : -REVEAL))}
          className="text-slate-300 hover:text-danger"
        >
          <TrashIcon />
        </button>
        <button aria-label="Edit task" onClick={only(() => onEdit(task))} className="text-slate-300 hover:text-brand">
          <EditIcon />
        </button>
      </div>
    </li>
  )
}

import { useState } from 'react'
import { toDateInput, toTimeInput } from '../lib/week'
import { CloseIcon } from './icons'

const label = 'mb-1 block text-xs text-slate-500'
const field = 'h-11 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-brand'

// task is null when creating a new one
export default function TaskForm({ task, defaultDate, onSave, onClose }) {
  const [form, setForm] = useState(() => ({
    title: task?.title ?? '',
    description: task?.description ?? '',
    date: toDateInput(task?.dueAt ?? defaultDate ?? new Date()),
    start: task ? toTimeInput(task.dueAt) : '',
    end: task?.endAt ? toTimeInput(task.endAt) : '',
    priority: task?.priority ?? '',
  }))
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const set = (name) => (e) => setForm({ ...form, [name]: e.target.value })

  async function submit(e) {
    e.preventDefault()
    if (!form.title.trim()) return setError('Task title is required')
    if (!form.date || !form.start) return setError('Pick a date and a start time')

    const dueAt = new Date(`${form.date}T${form.start}`)
    const endAt = form.end ? new Date(`${form.date}T${form.end}`) : null
    if (endAt && endAt <= dueAt) return setError('End time must be after the start time')

    setSaving(true)
    try {
      await onSave({
        title: form.title.trim(),
        description: form.description,
        priority: form.priority || null,
        dueAt: dueAt.toISOString(),
        endAt: endAt ? endAt.toISOString() : null,
      })
    } catch (err) {
      setError(err.message)
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-20 flex items-end bg-black/40" onClick={onClose}>
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="mx-auto max-h-full w-full max-w-md space-y-4 overflow-y-auto bg-white p-5"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-medium">{task ? 'Edit Task' : 'Add New Task'}</h2>
          <button type="button" onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>

        <div>
          <label htmlFor="title" className={label}>Task title</label>
          <input id="title" value={form.title} onChange={set('title')} className={field} autoFocus />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="start" className={label}>Set Time</label>
            <input id="start" type="time" value={form.start} onChange={set('start')} className={field} />
          </div>
          <div>
            <label htmlFor="end" className={`${label} text-transparent`}>Ends</label>
            <input id="end" type="time" value={form.end} onChange={set('end')} className={field} aria-label="Ends" />
          </div>
        </div>

        <div>
          <label htmlFor="date" className={label}>Set Date</label>
          <input id="date" type="date" value={form.date} onChange={set('date')} className={field} />
        </div>

        <div>
          <label htmlFor="desc" className={label}>Description</label>
          <textarea
            id="desc"
            value={form.description}
            onChange={set('description')}
            placeholder="Add Description"
            rows={3}
            className="w-full rounded-md border border-slate-200 p-3 text-sm outline-none focus:border-brand"
          />
        </div>

        <div>
          <span className={label}>Priority (optional)</span>
          <div className="flex gap-2">
            {['Low', 'Medium', 'High'].map((p) => (
              <button
                key={p}
                type="button"
                aria-pressed={form.priority === p}
                onClick={() => setForm({ ...form, priority: form.priority === p ? '' : p })}
                className={`flex-1 rounded-md border py-2 text-sm ${
                  form.priority === p ? 'border-brand bg-brand text-white' : 'border-slate-200 text-slate-500'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-sm text-danger">{error}</p>}

        <button disabled={saving} className="h-12 w-full rounded-sm bg-brand text-sm text-white disabled:opacity-50">
          {task ? 'Save changes' : 'Create task'}
        </button>
      </form>
    </div>
  )
}

import { useState } from 'react'
import { BackIcon, SearchIcon } from '../components/icons'
import TaskRow from '../components/TaskRow'

export default function Search({ tasks, actions, onBack }) {
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()
  const results = q ? tasks.filter((t) => `${t.title} ${t.description}`.toLowerCase().includes(q)) : []

  return (
    <div className="px-5 pt-6">
      <button onClick={onBack} aria-label="Back">
        <BackIcon />
      </button>

      <div className="mt-5 flex h-11 items-center rounded-md border border-slate-200 px-4">
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title or description"
          className="min-w-0 flex-1 text-xs outline-none"
        />
        <SearchIcon />
      </div>

      {!q ? (
        <p className="mt-8 text-center text-xs text-slate-400">Type to search your tasks.</p>
      ) : results.length === 0 ? (
        <p className="mt-8 text-center text-xs text-slate-400">No matching tasks.</p>
      ) : (
        <ul className="mt-4">
          {results.map((task) => (
            <TaskRow key={task._id} task={task} showDate {...actions} />
          ))}
        </ul>
      )}
    </div>
  )
}

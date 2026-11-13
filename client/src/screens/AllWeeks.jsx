import { useState } from 'react'
import { BackIcon } from '../components/icons'
import WeekCard from '../components/WeekCard'
import { groupByWeek, weekStart } from '../lib/week'

export default function AllWeeks({ tasks, actions, onBack }) {
  const [thisWeek] = useState(() => weekStart(new Date()).getTime())
  const weeks = groupByWeek(tasks)

  return (
    <div className="px-5 pb-10 pt-6">
      <div className="flex items-center gap-3">
        <button onClick={onBack} aria-label="Back">
          <BackIcon />
        </button>
        <h1 className="text-lg font-semibold">All Weeks</h1>
      </div>

      {weeks.length === 0 ? (
        <p className="mt-8 text-center text-xs text-slate-400">No tasks yet.</p>
      ) : (
        <div className="mt-5 space-y-3">
          {weeks.map((week) => (
            <WeekCard key={week.key} week={week} defaultOpen={week.key === thisWeek} {...actions} />
          ))}
        </div>
      )}
    </div>
  )
}

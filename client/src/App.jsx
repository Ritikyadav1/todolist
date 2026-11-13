import { useCallback, useEffect, useState } from 'react'
import TaskForm from './components/TaskForm'
import { createTask, deleteTask, getTasks, updateTask } from './lib/api'
import AllWeeks from './screens/AllWeeks'
import Home from './screens/Home'
import Onboarding from './screens/Onboarding'
import Search from './screens/Search'

function seenOnboarding() {
  try {
    return localStorage.getItem('onboarded') === '1'
  } catch {
    return false
  }
}

export default function App() {
  const [screen, setScreen] = useState(seenOnboarding() ? 'home' : 'onboarding')
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [sheet, setSheet] = useState(null)

  const load = useCallback(
    () =>
      getTasks()
        .then((data) => {
          setTasks(data)
          setError('')
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false)),
    [],
  )

  useEffect(() => {
    load()
  }, [load])

  const run = (action) => action().then(load).catch((err) => setError(err.message))

  const actions = {
    onEdit: (task) => setSheet({ task }),
    onToggle: (task) =>
      run(() => updateTask(task._id, { status: task.status === 'Completed' ? 'In Progress' : 'Completed' })),
    onDelete: (task) => run(() => deleteTask(task._id)),
  }

  async function save(data) {
    await (sheet.task ? updateTask(sheet.task._id, data) : createTask(data))
    setSheet(null)
    load()
  }

  function start() {
    try {
      localStorage.setItem('onboarded', '1')
    } catch {
      /* storage blocked, onboarding shows again next time */
    }
    setScreen('home')
  }

  const page = 'relative mx-auto min-h-screen max-w-md bg-white shadow-sm'

  if (screen === 'onboarding') {
    return (
      <div className={page}>
        <Onboarding onStart={start} />
      </div>
    )
  }

  return (
    <div className={page}>
      {error && <p className="bg-danger-soft px-5 py-2 text-xs text-danger">{error}</p>}

      {screen === 'home' && (
        <Home
          tasks={tasks}
          loading={loading}
          actions={actions}
          onAdd={(date) => setSheet({ task: null, date })}
          onSearch={() => setScreen('search')}
          onViewAll={() => setScreen('all')}
        />
      )}
      {screen === 'search' && <Search tasks={tasks} actions={actions} onBack={() => setScreen('home')} />}
      {screen === 'all' && <AllWeeks tasks={tasks} actions={actions} onBack={() => setScreen('home')} />}

      {sheet && <TaskForm task={sheet.task} defaultDate={sheet.date} onSave={save} onClose={() => setSheet(null)} />}
    </div>
  )
}

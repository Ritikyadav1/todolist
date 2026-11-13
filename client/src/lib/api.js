const BASE = ''

async function request(path, options) {
  const res = await fetch(BASE + path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || 'Something went wrong')
  }
  return res.status === 204 ? null : res.json()
}

export const getTasks = () => request('/api/tasks')

export const createTask = (task) =>
  request('/api/tasks', { method: 'POST', body: JSON.stringify(task) })

export const updateTask = (id, patch) =>
  request(`/api/tasks/${id}`, { method: 'PUT', body: JSON.stringify(patch) })

export const deleteTask = (id) => request(`/api/tasks/${id}`, { method: 'DELETE' })

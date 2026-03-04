import { useState } from 'react'
import { useHabits } from '../useHabits'

export default function Home() {
  const { habits, deleteHabit, toggleCheckIn, isCheckedToday } = useHabits()

  const [inputVal, setInputVal] = useState('')

  function handleAdd() {
    const ok = addHabit(inputVal)
    if (ok) setInputVal('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleAdd()
  } 

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Today's Habits 🌿</h1>
        <p className="page-subtitle">Small steps. Big life.</p>
      </div>

      <div className="add-form glass">
        <input
            className="add-input"
            type="text"
            placeholder="Add a new habit... e.g. Read 10 pages"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={60}
        />
        <button className="btn btn-primary" onClick={handleAdd}>
            + Add
        </button>
      </div>

      {habits.length === 0 ? (
        <div className="empty-state glass">
          <div className="empty-icon">🌱</div>
          <h3>No habits yet</h3>
          <p>Add your first habit to get started!</p>
        </div>
      ) : (
        <div className="habit-list">
          {habits.map(habit => {
            const checked = isCheckedToday(habit)
            return (
              <div key={habit.id} className={`habit-card glass ${checked ? 'checked-today' : ''}`}>
                <button
                  className={`habit-checkbox ${checked ? 'done' : ''}`}
                  onClick={() => toggleCheckIn(habit.id)}
                >
                  {checked ? '✓' : ''}
                </button>
                <div className="habit-info">
                  <div className={`habit-name ${checked ? 'done-text' : ''}`}>
                    {habit.name}
                  </div>
                </div>
                <button className="btn btn-icon" onClick={() => deleteHabit(habit.id)}>
                  ✕
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
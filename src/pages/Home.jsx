import { useState } from 'react'
import { useHabits } from '../useHabits'

export default function Home() {
  const {
    habits,
    addHabit,
    deleteHabit,
    toggleCheckIn,
    isCheckedToday,
    getStreak,
    getTodayNote,
    todayCount,
    totalHabits,
  } = useHabits()

  const [inputVal, setInputVal] = useState('')
  const [openNoteId, setOpenNoteId] = useState(null)
  const [noteVal, setNoteVal] = useState('')

  function handleAdd() {
    const ok = addHabit(inputVal)
    if (ok) setInputVal('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleAdd()
  }

  const todayLabel = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric'
  })

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Today's Habits 🌿</h1>
        <p className="page-subtitle">Small steps. Big life.</p>
      </div>

      {/* Today Banner */}
      {totalHabits > 0 && (
        <div className="today-banner glass">
          <span className="today-date">{todayLabel}</span>
          <span className="today-progress">
            {todayCount}/{totalHabits} done
            {todayCount === totalHabits ? ' 🎉' : ''}
          </span>
        </div>
      )}

      {/* Add Form */}
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

      {/* Progress Bar */}
      {totalHabits > 0 && (
        <div className="progress-bar-wrap" style={{ marginBottom: '20px' }}>
          <div
            className="progress-bar-fill"
            style={{ width: `${(todayCount / totalHabits) * 100}%` }}
          />
        </div>
      )}

      {/* Habit List */}
      {habits.length === 0 ? (
        <div className="empty-state glass">
          <div className="empty-icon">🌱</div>
          <h3>No habits yet</h3>
          <p>Add your first habit above to get started!</p>
        </div>
      ) : (
        <div className="habit-list">
          {habits.map(habit => {
            const checked = isCheckedToday(habit)
            const streak = getStreak(habit)
            return (
              <div key={habit.id} className={`habit-card glass ${checked ? 'checked-today' : ''}`}>

                {/* Main Row */}
                <div className="habit-card-main">
                  <button
                    className={`habit-checkbox ${checked ? 'done' : ''}`}
                    onClick={() => {
                      if (checked) {
                        toggleCheckIn(habit.id)
                        setOpenNoteId(null)
                      } else {
                        setOpenNoteId(openNoteId === habit.id ? null : habit.id)
                        setNoteVal('')
                      }
                    }}
                  >
                    {checked ? '✓' : ''}
                  </button>

                  <div className="habit-info">
                    <div className={`habit-name ${checked ? 'done-text' : ''}`}>
                      {habit.name}
                    </div>
                    <div className="habit-meta">
                      {streak > 0 ? (
                        <span className="streak-badge">
                          🔥 {streak} day{streak !== 1 ? 's' : ''}
                        </span>
                      ) : (
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                          Start your streak today!
                        </span>
                      )}
                    </div>
                  </div>

                  <button className="btn btn-icon" onClick={() => deleteHabit(habit.id)}>
                    ✕
                  </button>
                </div>

                {/* Note Input — opens when clicking unchecked habit */}
                {openNoteId === habit.id && !checked && (
                  <div className="note-input-wrap">
                    <input
                      className="note-input"
                      type="text"
                      placeholder="Add a note... (optional)"
                      value={noteVal}
                      onChange={e => setNoteVal(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          toggleCheckIn(habit.id, noteVal)
                          setOpenNoteId(null)
                        }
                      }}
                      autoFocus
                    />
                    <button
                      className="btn btn-primary"
                      style={{ padding: '8px 16px', fontSize: '0.8rem' }}
                      onClick={() => {
                        toggleCheckIn(habit.id, noteVal)
                        setOpenNoteId(null)
                      }}
                    >
                      ✓ Done
                    </button>
                  </div>
                )}

                {/* Saved Note — shows after checking in */}
                {checked && getTodayNote(habit) && (
                  <div className="note-saved">
                    💬 {getTodayNote(habit)}
                  </div>
                )}

              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
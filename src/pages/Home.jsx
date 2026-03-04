import { useHabits } from '../useHabits'

export default function Home() {
  const { habits, deleteHabit, toggleCheckIn, isCheckedToday } = useHabits()

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Today's Habits 🌿</h1>
        <p className="page-subtitle">Small steps. Big life.</p>
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
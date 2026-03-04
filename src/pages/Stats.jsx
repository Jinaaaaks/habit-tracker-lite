import { useHabits } from '../useHabits'

export default function Stats() {
  const { habits, getStreak, getBestStreak, getCompletionRate, isCheckedToday } = useHabits()

  const totalCheckIns = habits.reduce((sum, h) => sum + h.checkIns.length, 0)
  const overallBestStreak = habits.reduce((max, h) => Math.max(max, getBestStreak(h)), 0)
  const avgRate = habits.length > 0
    ? Math.round(habits.reduce((sum, h) => sum + getCompletionRate(h), 0) / habits.length)
    : 0

  if (habits.length === 0) {
    return (
      <div>
        <div className="page-header">
          <h1 className="page-title">Stats 📊</h1>
          <p className="page-subtitle">Your progress at a glance</p>
        </div>
        <div className="empty-state glass">
          <div className="empty-icon">📊</div>
          <h3>No data yet</h3>
          <p>Add some habits on the Today page to see your stats!</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Stats 📊</h1>
        <p className="page-subtitle">Your progress at a glance</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card glass">
          <div className="stat-number">{habits.length}</div>
          <div className="stat-label">Total Habits</div>
        </div>
        <div className="stat-card glass">
          <div className="stat-number">{totalCheckIns}</div>
          <div className="stat-label">Total Check-ins</div>
        </div>
        <div className="stat-card glass">
          <div className="stat-number" style={{ color: 'var(--accent-warm)' }}>
            {overallBestStreak}
          </div>
          <div className="stat-label">Best Streak 🔥</div>
        </div>
        <div className="stat-card glass">
          <div className="stat-number" style={{ color: 'var(--success)' }}>
            {avgRate}%
          </div>
          <div className="stat-label">Avg Completion</div>
        </div>
      </div>

      {/* Per-habit breakdown */}
      <h2 className="section-label">Per Habit</h2>

      <div className="habit-stats-list">
        {habits.map(habit => {
          const streak = getStreak(habit)
          const best = getBestStreak(habit)
          const rate = getCompletionRate(habit)
          const checked = isCheckedToday(habit)

          return (
            <div key={habit.id} className="habit-stat-row glass">
              <div>
                <div className="habit-stat-name">
                  {checked ? '✅ ' : ''}{habit.name}
                </div>
                <div className="progress-bar-wrap">
                  <div className="progress-bar-fill" style={{ width: `${rate}%` }} />
                </div>
              </div>
              <div className="habit-stat-badges">
                <span className="mini-badge badge-streak">🔥 {streak}</span>
                <span className="mini-badge badge-best">⭐ {best}</span>
                <span className="mini-badge badge-rate">{rate}%</span>
              </div>
            </div>
          )
        })}
      </div>

      <p className="stats-legend">
        🔥 current streak · ⭐ best streak · % completion
      </p>
    </div>
  )
}
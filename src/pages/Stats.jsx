import { useHabits } from '../useHabits'

export default function Stats() {
  const { habits, getBestStreak, getCompletionRate } = useHabits()

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
    </div>
  )
}
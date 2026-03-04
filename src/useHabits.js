import { useState, useEffect } from 'react'

const STORAGE_KEY = 'habit-tracker-lite-v1'

function getTodayStr() {
  return new Date().toISOString().split('T')[0]  // gives "2026-03-04"
}

function calculateStreak(checkIns) {
  if (!checkIns || checkIns.length === 0) return 0
  const dates = checkIns.map(c => c.date)
  const sorted = [...dates].sort((a, b) => b.localeCompare(a))
  let streak = 0
  let current = getTodayStr()

  for (const date of sorted) {
    if (date === current) {
      streak++
      const d = new Date(current)
      d.setDate(d.getDate() - 1)
      current = d.toISOString().split('T')[0]
    } else {
      break
    }
  }
  return streak
}

function calculateBestStreak(checkIns) {
  if (!checkIns || checkIns.length === 0) return 0
  const sorted = [...new Set(checkIns.map(c => c.date))].sort()
  let best = 1
  let current = 1

  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1])
    const curr = new Date(sorted[i])
    const diff = (curr - prev) / (1000 * 60 * 60 * 24)
    if (diff === 1) {
      current++
      best = Math.max(best, current)
    } else {
      current = 1
    }
  }
  return best
}

export function useHabits() {
  const [habits, setHabits] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits))
  }, [habits])

  function addHabit(name) {
    const trimmed = name.trim()
    if (!trimmed) return false
    const newHabit = {
      id: Date.now().toString(),
      name: trimmed,
      createdAt: getTodayStr(),
      checkIns: [],
    }
    setHabits(prev => [newHabit, ...prev])
    return true
  }

  function deleteHabit(id) {
    setHabits(prev => prev.filter(h => h.id !== id))
  }

  function toggleCheckIn(id, note = '') {
    const today = getTodayStr()
    setHabits(prev => prev.map(h => {
        if (h.id !== id) return h
        const alreadyChecked = h.checkIns.some(c => c.date === today)
        return {
        ...h,
        checkIns: alreadyChecked
            ? h.checkIns.filter(c => c.date !== today)
            : [...h.checkIns, { date: today, note }]
        }
    }))
  }

  function getTodayNote(habit) {
    const entry = habit.checkIns.find(c => c.date === getTodayStr())
    return entry ? entry.note : ''
  }
  function isCheckedToday(habit) {
    return habit.checkIns.some(c => c.date === getTodayStr())
  }

  function getStreak(habit) { return calculateStreak(habit.checkIns) }
  function getBestStreak(habit) { return calculateBestStreak(habit.checkIns) }

  function getCompletionRate(habit) {
    if (habit.checkIns.length === 0) return 0
    const created = new Date(habit.createdAt)
    const today = new Date()
    const days = Math.max(1, Math.round((today - created) / (1000 * 60 * 60 * 24)) + 1)
    return Math.round((habit.checkIns.length / days) * 100)
  }

  const todayCount = habits.filter(isCheckedToday).length

  return {
    habits,
    addHabit,
    deleteHabit,
    toggleCheckIn,
    isCheckedToday,
    getTodayNote,
    getStreak,
    getBestStreak,
    getCompletionRate,
    todayCount,
    totalHabits: habits.length,
  }
}
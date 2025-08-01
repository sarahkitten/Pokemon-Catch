// Daily challenge completion tracking
export interface DailyChallengeStats {
  totalCompleted: number;
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate: string | null;
  completedDates: string[];
}

// Function to get today's date in Pacific Time to ensure global consistency
export const getTodayPacific = (): Date => {
  const now = new Date();
  const pacificTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
  return new Date(pacificTime.getFullYear(), pacificTime.getMonth(), pacificTime.getDate());
};

export const getDailyChallengeStats = (): DailyChallengeStats => {
  const defaultStats: DailyChallengeStats = {
    totalCompleted: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastCompletedDate: null,
    completedDates: []
  };

  try {
    const stored = localStorage.getItem('dailyChallengeStats');
    if (stored) {
      return { ...defaultStats, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.error('Failed to parse daily challenge stats:', e);
  }

  return defaultStats;
};

export const saveDailyChallengeStats = (stats: DailyChallengeStats): void => {
  try {
    localStorage.setItem('dailyChallengeStats', JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save daily challenge stats:', e);
  }
};

export const markDailyChallengeCompleted = (): DailyChallengeStats => {
  const today = getTodayPacific();
  const todayString = today.toISOString().slice(0, 10); // "2025-08-01"
  const stats = getDailyChallengeStats();

  // Don't mark as completed if already completed today
  if (stats.completedDates.includes(todayString)) {
    return stats;
  }

  // Add today to completed dates
  const newCompletedDates = [...stats.completedDates, todayString].sort();
  
  // Calculate new streak
  let newCurrentStreak = 1;
  if (stats.lastCompletedDate) {
    const lastDate = new Date(stats.lastCompletedDate);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Check if last completion was yesterday (consecutive days)
    if (lastDate.toISOString().slice(0, 10) === yesterday.toISOString().slice(0, 10)) {
      newCurrentStreak = stats.currentStreak + 1;
    }
    // If there's a gap, streak resets to 1
  }

  const newStats: DailyChallengeStats = {
    totalCompleted: stats.totalCompleted + 1,
    currentStreak: newCurrentStreak,
    longestStreak: Math.max(stats.longestStreak, newCurrentStreak),
    lastCompletedDate: todayString,
    completedDates: newCompletedDates
  };

  saveDailyChallengeStats(newStats);
  return newStats;
};

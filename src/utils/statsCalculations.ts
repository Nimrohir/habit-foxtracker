interface Habit {
  id: number;
  name: string;
  description?: string;
  progress: number;
  category?: string;
  lastCompleted: string | null; // ← ДОБАВЛЕНО
}

export interface Stats {
  totalProgress: number;
  completedToday: number;
  bestHabit: Habit | null;
  totalHabits: number;
  streak: number;
}

export const calculateTotalProgress = (habits: Habit[]): number => {
  if (habits.length === 0) return 0;
  const total = habits.reduce((sum, habit) => sum + habit.progress, 0);
  return Math.round(total / habits.length);
};

export const calculateCompletedToday = (habits: Habit[]): number => {
  const today = new Date().toISOString().split('T')[0]; // "2026-01-11"
  return habits.filter(habit => habit.lastCompleted === today).length;
};

export const findBestHabit = (habits: Habit[]): Habit | null => {
  if (habits.length === 0) return null;
  return habits.reduce((best, current) => 
    current.progress > best.progress ? current : best
  );
};

export const calculateStreak = (habits: Habit[]): number => {
  if (habits.length === 0) return 0;
  
  const today = new Date().toISOString().split('T')[0];
  const dates = new Set<string>();
  
  // Собираем все даты выполнения всех привычек
  habits.forEach(habit => {
    if (habit.lastCompleted) {
      dates.add(habit.lastCompleted);
    }
  });
  
  // Проверяем, какие даты присутствуют у ВСЕХ привычек
  const commonDates = Array.from(dates).filter(date => 
    habits.every(habit => habit.lastCompleted === date || habit.lastCompleted === date)
  );
  
  // Сортируем даты по убыванию и ищем последовательные дни
  const sortedDates = commonDates.sort().reverse();
  let streak = 0;
  
  for (let i = 0; i < sortedDates.length; i++) {
    const currentDate = new Date(sortedDates[i]);
    const prevDate = i > 0 ? new Date(sortedDates[i-1]) : null;
    
    if (i === 0 || (prevDate && 
        currentDate.getTime() === prevDate.setDate(prevDate.getDate() - 1))) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
};

export const calculateAllStats = (habits: Habit[]): Stats => {
  return {
    totalProgress: calculateTotalProgress(habits),
    completedToday: calculateCompletedToday(habits),
    bestHabit: findBestHabit(habits),
    totalHabits: habits.length,
    streak: calculateStreak(habits)
  };
};
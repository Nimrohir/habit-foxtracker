const API_URL = 'http://localhost:3001';

import type { Habit, NewHabit } from '../types';

export const habitsApi = {
  async getAll(): Promise<Habit[]> {
    try {
      const response = await fetch(`${API_URL}/habits`);
      if (!response.ok) {
        throw new Error(`Ошибка загрузки: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Ошибка при получении привычек:', error);
      throw error;
    }
  },

  async create(habit: NewHabit): Promise<Habit> {
    try {
      const newHabit = {
        ...habit,
        progress: habit.progress || 0,
        lastCompleted: null // ← ДОБАВЛЕНО
      };

      const response = await fetch(`${API_URL}/habits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newHabit),
      });

      if (!response.ok) {
        throw new Error(`Ошибка создания: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Ошибка при создании привычки:', error);
      throw error;
    }
  },

  async updateProgress(id: number, progress: number): Promise<Habit> {
    try {
      const today = new Date().toISOString().split('T')[0]; // "2026-01-11" ← ДОБАВЛЕНО
      const updateData = { 
        progress,
        lastCompleted: today // ← ДОБАВЛЕНО: обновляем дату при отметке
      };
      
      const response = await fetch(`${API_URL}/habits/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error(`Ошибка обновления: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Ошибка при обновлении привычки:', error);
      throw error;
    }
  },

  async updateHabitName(id: number, name: string): Promise<Habit> {
    try {
      const response = await fetch(`${API_URL}/habits/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error(`Ошибка обновления: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Ошибка при обновлении названия привычки:', error);
      throw error;
    }
  },

  async delete(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/habits/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Ошибка удаления: ${response.status}`);
      }
    } catch (error) {
      console.error('Ошибка при удалении привычки:', error);
      throw error;
    }
  }
};
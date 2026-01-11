import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { habitsReducer, initialState } from '../reducers/habitsReducer';
import type { HabitAction } from '../reducers/habitsReducer';
import { habitsApi } from '../services/api';

interface Habit {
  id: number;
  name: string;
  description?: string;
  progress: number;
  category?: string;
}

interface HabitsState {
  habits: Habit[];
  loading: boolean;
  error: string | null;
}

interface HabitsContextType {
  state: HabitsState;
  dispatch: React.Dispatch<HabitAction>;
  loadHabits: () => Promise<void>;
  addHabit: (name: string, description?: string, category?: string) => Promise<void>;
  updateProgress: (id: number, progress: number) => Promise<void>;
  deleteHabit: (id: number) => Promise<void>;
  editHabitName: (id: number, name: string) => Promise<void>;
  clearError: () => void;
}

const HabitsContext = createContext<HabitsContextType | undefined>(undefined);

export const HabitsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(habitsReducer, initialState);

  const loadHabits = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const habits = await habitsApi.getAll();
      dispatch({ type: 'SET_HABITS', payload: habits });
    } catch (_error) {
      dispatch({ type: 'SET_ERROR', payload: 'Не удалось загрузить привычки' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addHabit = async (name: string, description?: string, category?: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const newHabit = await habitsApi.create({ 
        name, 
        description, 
        category,
        progress: 0 
      });
      dispatch({ type: 'ADD_HABIT', payload: newHabit });
    } catch (_error) {
      dispatch({ type: 'SET_ERROR', payload: 'Не удалось добавить привычку' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateProgress = async (id: number, progress: number) => {
    try {
      // УБРАН dispatch({ type: 'SET_LOADING', payload: true });
      await habitsApi.updateProgress(id, progress);
      dispatch({ type: 'UPDATE_PROGRESS', payload: { id, progress } });
    } catch (_error) {
      dispatch({ type: 'SET_ERROR', payload: 'Не удалось обновить прогресс' });
    }
    // УБРАН finally с SET_LOADING
  };

  const deleteHabit = async (id: number) => {
    try {
      // УБРАН SET_LOADING
      await habitsApi.delete(id);
      dispatch({ type: 'DELETE_HABIT', payload: id });
    } catch (_error) {
      dispatch({ type: 'SET_ERROR', payload: 'Не удалось удалить привычку' });
    }
  };

  const editHabitName = async (id: number, name: string) => {
    try {
      // УБРАН SET_LOADING
      await habitsApi.updateHabitName(id, name);
      dispatch({ type: 'EDIT_HABIT_NAME', payload: { id, name } });
    } catch (_error) {
      dispatch({ type: 'SET_ERROR', payload: 'Не удалось обновить название привычки' });
    }
  };

  const clearError = () => {
    dispatch({ type: 'SET_ERROR', payload: null });
  };

  useEffect(() => {
    loadHabits();
  }, []);

  return (
    <HabitsContext.Provider value={{ 
      state, 
      dispatch, 
      loadHabits, 
      addHabit, 
      updateProgress, 
      deleteHabit, 
      editHabitName,
      clearError 
    }}>
      {children}
    </HabitsContext.Provider>
  );
};

export const useHabits = (): HabitsContextType => {
  const context = useContext(HabitsContext);
  if (context === undefined) {
    throw new Error('useHabits must be used within a HabitsProvider');
  }
  return context;
};
export interface Habit {
  id: number;
  name: string;
  description?: string;
  progress: number;
  category?: string;
  lastCompleted?: string;
}

export interface HabitsState {
  habits: Habit[];
  loading: boolean;
  error: string | null;
}

export type HabitAction = 
  | { type: 'SET_HABITS'; payload: Habit[] }
  | { type: 'ADD_HABIT'; payload: Habit }
  | { type: 'UPDATE_PROGRESS'; payload: { id: number; progress: number }}
  | { type: 'DELETE_HABIT'; payload: number }
  | { type: 'RESET_ALL_PROGRESS' }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'EDIT_HABIT_NAME'; payload: { id: number; name: string } };

export const initialState: HabitsState = {
  habits: [],
  loading: true,
  error: null,
};

export function habitsReducer(state: HabitsState, action: HabitAction): HabitsState {
  switch (action.type) {
    case 'SET_HABITS': return { ...state, habits: action.payload, loading: false, error: null };
    case 'ADD_HABIT': return { ...state, habits: [...state.habits, action.payload], error: null };
    case 'UPDATE_PROGRESS': return { ...state, habits: state.habits.map(h => h.id === action.payload.id ? { ...h, progress: action.payload.progress } : h), error: null };
    case 'DELETE_HABIT': return { ...state, habits: state.habits.filter(h => h.id !== action.payload), error: null };
    case 'RESET_ALL_PROGRESS': return { ...state, habits: state.habits.map(h => ({ ...h, progress: 0 })), error: null };
    case 'SET_ERROR': return { ...state, error: action.payload, loading: false };
    case 'SET_LOADING': return { ...state, loading: action.payload };
    case 'EDIT_HABIT_NAME': return { ...state, habits: state.habits.map(h => h.id === action.payload.id ? { ...h, name: action.payload.name } : h), error: null };
    default: return state;
  }
}
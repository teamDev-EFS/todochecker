import { createContext, useContext, useEffect, useReducer, useCallback, ReactNode } from 'react';
import type { Task, NewTaskInput } from '../types/task';
import { seedTasks } from '../data/seedTasks';

const STORAGE_KEY = 'promptfloe.todo.v1';

type State = { tasks: Task[] };

type Action =
  | { type: 'HYDRATE'; tasks: Task[] }
  | { type: 'ADD'; task: Task }
  | { type: 'TOGGLE'; id: string }
  | { type: 'EDIT'; id: string; title: string }
  | { type: 'DELETE'; id: string }
  | { type: 'CLEAR_COMPLETED' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'HYDRATE':
      return { tasks: action.tasks };
    case 'ADD':
      return { tasks: [action.task, ...state.tasks] };
    case 'TOGGLE':
      return {
        tasks: state.tasks.map((t) =>
          t.id === action.id
            ? {
                ...t,
                completed: !t.completed,
                completedAt: !t.completed ? new Date().toISOString() : null,
              }
            : t
        ),
      };
    case 'EDIT':
      return {
        tasks: state.tasks.map((t) =>
          t.id === action.id ? { ...t, title: action.title.trim() } : t
        ),
      };
    case 'DELETE':
      return { tasks: state.tasks.filter((t) => t.id !== action.id) };
    case 'CLEAR_COMPLETED':
      return { tasks: state.tasks.filter((t) => !t.completed) };
    default:
      return state;
  }
}

function loadInitial(): State {
  if (typeof window === 'undefined') return { tasks: seedTasks };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { tasks: seedTasks };
    const parsed = JSON.parse(raw) as Task[];
    if (Array.isArray(parsed)) return { tasks: parsed };
    return { tasks: seedTasks };
  } catch {
    return { tasks: seedTasks };
  }
}

interface TodoContextValue {
  tasks: Task[];
  remaining: number;
  completedCount: number;
  addTask: (input: NewTaskInput) => void;
  toggleTask: (id: string) => void;
  editTask: (id: string, title: string) => void;
  deleteTask: (id: string) => void;
  clearCompleted: () => void;
}

const TodoContext = createContext<TodoContextValue | null>(null);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitial);

  // Persist to localStorage on every change
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
    } catch {
      /* storage may be unavailable — silently ignore */
    }
  }, [state.tasks]);

  const addTask = useCallback((input: NewTaskInput) => {
    const title = input.title.trim();
    if (!title) return;
    const task: Task = {
      id: `t_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
      title,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
      priority: input.priority ?? 'medium',
    };
    dispatch({ type: 'ADD', task });
  }, []);

  const toggleTask = useCallback((id: string) => dispatch({ type: 'TOGGLE', id }), []);
  const editTask = useCallback((id: string, title: string) => {
    if (!title.trim()) return;
    dispatch({ type: 'EDIT', id, title });
  }, []);
  const deleteTask = useCallback((id: string) => dispatch({ type: 'DELETE', id }), []);
  const clearCompleted = useCallback(() => dispatch({ type: 'CLEAR_COMPLETED' }), []);

  const remaining = state.tasks.filter((t) => !t.completed).length;
  const completedCount = state.tasks.length - remaining;

  return (
    <TodoContext.Provider
      value={{
        tasks: state.tasks,
        remaining,
        completedCount,
        addTask,
        toggleTask,
        editTask,
        deleteTask,
        clearCompleted,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error('useTodos must be used within TodoProvider');
  return ctx;
}

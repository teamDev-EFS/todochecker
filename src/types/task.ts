export type FilterType = 'all' | 'active' | 'completed';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string; // ISO
  completedAt: string | null; // ISO or null
  priority: 'low' | 'medium' | 'high';
}

export interface NewTaskInput {
  title: string;
  priority?: Task['priority'];
}

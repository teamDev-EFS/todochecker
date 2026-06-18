import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { useTodos } from '../context/TodoContext';
import { TaskInput } from '../components/tasks/TaskInput';
import { TaskList } from '../components/tasks/TaskList';
import { FilterBar } from '../components/tasks/FilterBar';
import { TaskCounter } from '../components/tasks/TaskCounter';
import { EmptyState } from '../components/tasks/EmptyState';
import type { FilterType } from '../types/task';

export default function Tasks() {
  const { tasks, remaining, completedCount, clearCompleted } = useTodos();
  const [filter, setFilter] = useState<FilterType>('all');

  const counts = useMemo(
    () => ({
      all: tasks.length,
      active: tasks.filter((t) => !t.completed).length,
      completed: tasks.filter((t) => t.completed).length,
    }),
    [tasks]
  );

  const visible = useMemo(() => {
    if (filter === 'active') return tasks.filter((t) => !t.completed);
    if (filter === 'completed') return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-2"
      >
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-primary">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          Today
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          What needs your focus?
        </h1>
        <p className="text-sm text-muted-foreground max-w-md">
          A quiet place to capture, organise and finish the work that matters. Your list saves automatically.
        </p>
      </motion.header>

      {/* Input */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      >
        <TaskInput />
      </motion.div>

      {/* Filter row */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
      >
        <FilterBar value={filter} onChange={setFilter} counts={counts} />
        <div className="flex items-center gap-4">
          <TaskCounter remaining={remaining} />
          {completedCount > 0 && (
            <button
              type="button"
              onClick={clearCompleted}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-danger transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear completed
            </button>
          )}
        </div>
      </motion.div>

      {/* List */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        {visible.length === 0 ? <EmptyState filter={filter} /> : <TaskList tasks={visible} />}
      </motion.section>
    </div>
  );
}

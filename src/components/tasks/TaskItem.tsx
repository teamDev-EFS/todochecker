import { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { Check, Pencil, Trash2, X } from 'lucide-react';
import clsx from 'clsx';
import type { Task } from '../../types/task';
import { useTodos } from '../../context/TodoContext';

interface Props {
  task: Task;
}

const priorityStyles: Record<Task['priority'], string> = {
  high: 'bg-danger/15 text-danger ring-1 ring-danger/20',
  medium: 'bg-warning/15 text-warning ring-1 ring-warning/20',
  low: 'bg-success/15 text-success ring-1 ring-success/20',
};

const priorityLabel: Record<Task['priority'], string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.round(diff / 60_000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.round(h / 24);
  if (d < 7) return `${d}d ago`;
  return new Date(iso).toLocaleDateString();
}

export function TaskItem({ task }: Props) {
  const { toggleTask, editTask, deleteTask } = useTodos();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  function commit() {
    const trimmed = draft.trim();
    if (!trimmed) {
      setDraft(task.title);
      setEditing(false);
      return;
    }
    if (trimmed !== task.title) editTask(task.id, trimmed);
    setEditing(false);
  }

  function cancel() {
    setDraft(task.title);
    setEditing(false);
  }

  function onKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') commit();
    if (e.key === 'Escape') cancel();
  }

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -16, transition: { duration: 0.18 } }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-surface1 border border-border hover:border-borderStrong hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 transition-all duration-200"
    >
      {/* Checkbox */}
      <motion.button
        type="button"
        onClick={() => toggleTask(task.id)}
        whileTap={{ scale: 0.85 }}
        aria-label={task.completed ? 'Mark as not completed' : 'Mark as completed'}
        className={clsx(
          'shrink-0 w-5 h-5 rounded-full flex items-center justify-center border-2 transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface1 outline-none',
          task.completed
            ? 'bg-primary border-primary'
            : 'border-input hover:border-primary'
        )}
      >
        {task.completed && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 22 }}
          >
            <Check className="w-3 h-3 text-white" strokeWidth={3} />
          </motion.span>
        )}
      </motion.button>

      {/* Title */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={onKey}
            onBlur={commit}
            className="w-full bg-transparent outline-none text-sm text-foreground border-b border-primary/40 focus:border-primary pb-0.5"
            aria-label="Edit task"
          />
        ) : (
          <div className="flex flex-col gap-0.5">
            <span
              onDoubleClick={() => setEditing(true)}
              className={clsx(
                'text-sm truncate select-none',
                task.completed
                  ? 'text-muted-foreground line-through'
                  : 'text-foreground'
              )}
            >
              {task.title}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {task.completed && task.completedAt
                ? `Completed ${relativeTime(task.completedAt)}`
                : `Added ${relativeTime(task.createdAt)}`}
            </span>
          </div>
        )}
      </div>

      {/* Priority badge */}
      {!editing && (
        <span
          className={clsx(
            'hidden sm:inline-flex text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full',
            priorityStyles[task.priority]
          )}
        >
          {priorityLabel[task.priority]}
        </span>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
        {editing ? (
          <>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={commit}
              aria-label="Save"
              className="p-1.5 rounded-md text-success hover:bg-success/10 transition-colors"
            >
              <Check className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={cancel}
              aria-label="Cancel"
              className="p-1.5 rounded-md text-muted-foreground hover:bg-surface2 hover:text-foreground transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setEditing(true)}
              aria-label="Edit task"
              className="p-1.5 rounded-md text-muted-foreground hover:bg-surface2 hover:text-foreground transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => deleteTask(task.id)}
              aria-label="Trash2 task"
              className="p-1.5 rounded-md text-muted-foreground hover:bg-danger/10 hover:text-danger transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </>
        )}
      </div>
    </motion.li>
  );
}

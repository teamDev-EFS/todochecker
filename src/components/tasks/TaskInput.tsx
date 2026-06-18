import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useTodos } from '../../context/TodoContext';

export function TaskInput() {
  const { addTask } = useTodos();
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      setError('Type a task before pressing enter');
      return;
    }
    if (trimmed.length > 140) {
      setError('Keep it under 140 characters');
      return;
    }
    addTask({ title: trimmed });
    setValue('');
    setError(null);
  }

  return (
    <form onSubmit={onSubmit} className="relative">
      <div className="flex items-center gap-2 bg-surface1 border border-border rounded-xl px-4 py-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
        <div className="w-5 h-5 rounded-full border-2 border-input flex items-center justify-center shrink-0">
          <Plus className="w-3 h-3 text-muted-foreground" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError(null);
          }}
          placeholder="Add a task and press enter…"
          aria-label="New task"
          className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground text-foreground"
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primaryHover focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface1 transition-colors"
        >
          Add
        </motion.button>
      </div>
      {error && (
        <p className="text-xs text-danger mt-2 ml-1">{error}</p>
      )}
    </form>
  );
}

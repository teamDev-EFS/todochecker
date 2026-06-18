import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ListTodo, Flame, TrendingUp } from 'lucide-react';
import { useTodos } from '../context/TodoContext';

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  tone,
  delay,
}: {
  icon: typeof ListTodo;
  label: string;
  value: string;
  hint: string;
  tone: 'primary' | 'success' | 'warning' | 'danger';
  delay: number;
}) {
  const toneClasses: Record<typeof tone, string> = {
    primary: 'bg-primarySubtle text-primary ring-primary/30',
    success: 'bg-success/15 text-success ring-success/30',
    warning: 'bg-warning/15 text-warning ring-warning/30',
    danger: 'bg-danger/15 text-danger ring-danger/30',
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
      className="rounded-xl border border-border bg-surface1 p-5 hover:border-borderStrong hover:shadow-lg hover:shadow-black/20 transition-all"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{label}</span>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ring-1 ${toneClasses[tone]}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <p className="mt-3 text-3xl font-bold text-foreground tracking-tight">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </motion.div>
  );
}

export default function Stats() {
  const { tasks, remaining, completedCount } = useTodos();

  const { highPriority, completionRate, completedToday } = useMemo(() => {
    const highPriority = tasks.filter((t) => !t.completed && t.priority === 'high').length;
    const total = tasks.length || 1;
    const completionRate = Math.round((completedCount / total) * 100);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const completedToday = tasks.filter(
      (t) => t.completed && t.completedAt && new Date(t.completedAt) >= today
    ).length;

    return { highPriority, completionRate, completedToday };
  }, [tasks, completedCount]);

  return (
    <div className="space-y-8">
      <motion.header
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-2"
      >
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-primary">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          Overview
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          How the work is moving
        </h1>
        <p className="text-sm text-muted-foreground max-w-md">
          A quick read of your task load — what\u2019s open, what\u2019s done, and where to focus next.
        </p>
      </motion.header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard
          icon={ListTodo}
          label="Remaining"
          value={remaining.toString()}
          hint={remaining === 0 ? 'Inbox zero — well done.' : 'Tasks still waiting on you'}
          tone="primary"
          delay={0.05}
        />
        <StatCard
          icon={CheckCircle2}
          label="Completed"
          value={completedCount.toString()}
          hint={`${completedToday} finished today`}
          tone="success"
          delay={0.1}
        />
        <StatCard
          icon={Flame}
          label="High priority open"
          value={highPriority.toString()}
          hint={highPriority === 0 ? 'No fires today' : 'These deserve attention first'}
          tone="danger"
          delay={0.15}
        />
        <StatCard
          icon={TrendingUp}
          label="Completion rate"
          value={`${completionRate}%`}
          hint="Across your entire list"
          tone="warning"
          delay={0.2}
        />
      </div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-xl border border-border bg-surface1 p-6"
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-semibold text-foreground">Overall progress</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {completedCount} of {tasks.length} tasks completed
            </p>
          </div>
          <span className="text-2xl font-bold text-primary tracking-tight">{completionRate}%</span>
        </div>
        <div className="h-2 rounded-full bg-surface2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionRate}%` }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
}

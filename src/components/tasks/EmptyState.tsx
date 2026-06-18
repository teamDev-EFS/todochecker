import { CheckCircle2, ListTodo, Sparkles } from 'lucide-react';
import type { FilterType } from '../../types/task';

interface Props {
  filter: FilterType;
}

const copy: Record<FilterType, { icon: typeof ListTodo; title: string; subtitle: string }> = {
  all: {
    icon: ListTodo,
    title: 'Your task list is empty',
    subtitle: 'Add your first task above to get started. Press enter to save.',
  },
  active: {
    icon: Sparkles,
    title: 'You\u2019re all caught up',
    subtitle: 'No active tasks right now — a perfect moment to plan what\u2019s next.',
  },
  completed: {
    icon: CheckCircle2,
    title: 'Nothing finished yet',
    subtitle: 'Tasks you complete will appear here so you can look back on the day.',
  },
};

export function EmptyState({ filter }: Props) {
  const { icon: Icon, title, subtitle } = copy[filter];
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 rounded-xl border border-dashed border-border bg-surface1/40">
      <div className="w-14 h-14 rounded-2xl bg-primarySubtle flex items-center justify-center mb-4 ring-1 ring-primary/20">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="text-xs text-muted-foreground mt-1 max-w-xs">{subtitle}</p>
    </div>
  );
}

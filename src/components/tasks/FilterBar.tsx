import clsx from 'clsx';
import type { FilterType } from '../../types/task';

interface Props {
  value: FilterType;
  onChange: (f: FilterType) => void;
  counts: { all: number; active: number; completed: number };
}

const filters: { id: FilterType; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'completed', label: 'Completed' },
];

export function FilterBar({ value, onChange, counts }: Props) {
  return (
    <div
      role="tablist"
      aria-label="Filter tasks"
      className="inline-flex items-center gap-1 p-1 rounded-lg bg-surface1 border border-border"
    >
      {filters.map((f) => {
        const active = value === f.id;
        return (
          <button
            key={f.id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(f.id)}
            className={clsx(
              'px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
              active
                ? 'bg-primarySubtle text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-surface2'
            )}
          >
            {f.label}
            <span
              className={clsx(
                'ml-1.5 text-[10px] font-medium',
                active ? 'text-primary/70' : 'text-muted-foreground/70'
              )}
            >
              {counts[f.id]}
            </span>
          </button>
        );
      })}
    </div>
  );
}

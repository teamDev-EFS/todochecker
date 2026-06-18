import { NavLink } from 'react-router-dom';
import { CheckSquare, BarChart3, Sparkles } from 'lucide-react';
import clsx from 'clsx';
import { useTodos } from '../../context/TodoContext';

const nav = [
  { to: '/tasks', label: 'Tasks', icon: CheckSquare },
  { to: '/stats', label: 'Overview', icon: BarChart3 },
];

export function Sidebar() {
  const { remaining } = useTodos();

  return (
    <aside className="hidden lg:flex w-60 shrink-0 h-screen sticky top-0 flex-col bg-surface1 border-r border-border">
      <div className="h-16 px-6 flex items-center gap-2.5 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center ring-1 ring-primary/30">
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold text-foreground">Floe Tasks</span>
          <span className="text-[11px] text-muted-foreground">Stay focused</span>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {nav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              clsx(
                'h-10 px-3 rounded-lg flex items-center gap-3 text-sm transition-colors duration-150',
                isActive
                  ? 'bg-primarySubtle text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-surface2'
              )
            }
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
            {to === '/tasks' && remaining > 0 && (
              <span className="ml-auto text-[11px] font-medium px-2 py-0.5 rounded-full bg-surface2 text-foreground border border-border">
                {remaining}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center text-xs font-semibold text-white">
            SM
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Sarah Mitchell</p>
            <p className="text-[11px] text-muted-foreground truncate">sarah@floe.dev</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

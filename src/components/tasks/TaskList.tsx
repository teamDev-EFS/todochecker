import { AnimatePresence } from 'framer-motion';
import type { Task } from '../../types/task';
import { TaskItem } from './TaskItem';

interface Props {
  tasks: Task[];
}

export function TaskList({ tasks }: Props) {
  return (
    <ul className="space-y-2">
      <AnimatePresence initial={false}>
        {tasks.map((t) => (
          <TaskItem key={t.id} task={t} />
        ))}
      </AnimatePresence>
    </ul>
  );
}

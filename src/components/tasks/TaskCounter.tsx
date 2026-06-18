import { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface Props {
  remaining: number;
}

function AnimatedNumber({ value }: { value: number }) {
  const mv = useMotionValue(0);
  const display = useTransform(mv, (v) => Math.round(v).toString());
  useEffect(() => {
    const controls = animate(mv, value, { duration: 0.6, ease: [0.22, 1, 0.36, 1] });
    return controls.stop;
  }, [value, mv]);
  return <motion.span>{display}</motion.span>;
}

export function TaskCounter({ remaining }: Props) {
  const label = remaining === 1 ? 'task remaining' : 'tasks remaining';
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <span className="inline-flex items-center justify-center min-w-[1.5rem] h-6 px-2 rounded-full bg-primarySubtle text-primary font-semibold">
        <AnimatedNumber value={remaining} />
      </span>
      <span>{label}</span>
    </div>
  );
}

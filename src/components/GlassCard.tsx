import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'glass-card rounded-2xl p-6',
        className
      )}
      whileHover={
        hover
          ? {
              y: -4,
              boxShadow: '0 12px 48px rgba(0, 0, 0, 0.4)',
              transition: { duration: 0.3 },
            }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
}

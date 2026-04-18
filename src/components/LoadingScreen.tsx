import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  isLoading: boolean;
}

export function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[200] bg-[#0f0f0f] flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-8 h-8 border-2 border-[rgba(255,255,255,0.1)] border-t-[#e76f51] rounded-full animate-spin-loader" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

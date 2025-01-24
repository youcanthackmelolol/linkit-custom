import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimatedTransition = ({ children, className }: AnimatedTransitionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className={cn("w-full", className)}
    >
      {children}
    </motion.div>
  );
};
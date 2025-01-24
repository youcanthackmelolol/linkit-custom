import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard = ({ children, className, ...props }: GlassCardProps) => {
  return (
    <div
      className={cn(
        "backdrop-blur-md bg-white/30 rounded-lg border border-white/20 shadow-lg p-6 transition-all duration-300 hover:shadow-xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
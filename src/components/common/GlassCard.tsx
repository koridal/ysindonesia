// components/common/GlassCard.tsx
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function GlassCard({ className, children }: { className?: string; children: React.ReactNode; }) {
  return (
    <Card className={cn(
      "bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.15)]",
      className
    )}>
      {children}
    </Card>
  );
}
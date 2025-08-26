import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  gradient?: "primary" | "accent" | "warning" | "success";
}

const StatsCard = ({
  title,
  value,
  icon: Icon,
  change,
  changeType = "neutral",
  gradient = "primary",
}: StatsCardProps) => {
  const getGradientClass = () => {
    switch (gradient) {
      case "accent":
        return "from-accent to-accent/80";
      case "warning":
        return "from-warning to-orange-400";
      case "success":
        return "from-success to-emerald-400";
      default:
        return "from-primary to-primary-dark";
    }
  };

  const getChangeColor = () => {
    switch (changeType) {
      case "positive":
        return "text-success";
      case "negative":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className="card-professional p-4 relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {change && <p className={`text-xs ${getChangeColor()}`}>{change}</p>}
        </div>
        <div
          className={`p-3 rounded-xl bg-gradient-to-br ${getGradientClass()} shadow-professional`}
        >
          <Icon className="h-6 w-6 text-white" strokeWidth={2} />
        </div>
      </div>

      {/* Subtle background pattern */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 to-transparent rounded-full -translate-y-10 translate-x-10" />
    </Card>
  );
};

export default StatsCard;

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, UserPlus, ClipboardList, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      id: "new-customer",
      label: "New Customer",
      icon: UserPlus,
      color: "primary",
      path: "/customers",
    },
    {
      id: "new-order",
      label: "New Order",
      icon: Plus,
      color: "accent",
      path: "/orders",
    },
    {
      id: "search-customer",
      label: "Find Customer",
      icon: Search,
      color: "warning",
      path: "/customers",
    },
    {
      id: "pending-orders",
      label: "Pending Orders",
      icon: ClipboardList,
      color: "success",
      path: "/orders",
    },
  ];

  const getButtonVariant = (color: string) => {
    switch (color) {
      case "accent":
        return "default";
      case "warning":
        return "secondary";
      case "success":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <Card className="card-professional p-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.id}
              variant={getButtonVariant(action.color)}
              onClick={() => navigate(action.path)}
              className="h-20 flex flex-col space-y-2 p-4 transition-professional hover:scale-105"
            >
              <Icon size={24} strokeWidth={2} />
              <span className="text-sm font-medium">{action.label}</span>
            </Button>
          );
        })}
      </div>
    </Card>
  );
};

export default QuickActions;

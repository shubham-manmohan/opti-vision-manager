import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, Eye, Package, User } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { formatDistanceToNow } from "date-fns";

interface ActivityItem {
  id: string;
  type: "order" | "customer" | "delivery";
  title: string;
  subtitle: string;
  time: string;
  status?: "pending" | "completed" | "in-progress";
}

const RecentActivity = () => {
  const { orders, customers } = useAppStore();

  // Generate recent activities from real data
  const generateActivities = (): ActivityItem[] => {
    const activities: ActivityItem[] = [];

    // Add recent orders
    const recentOrders = orders
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 3);

    recentOrders.forEach((order) => {
      activities.push({
        id: order.id,
        type: "order",
        title: `Order ${order.orderId}`,
        subtitle: `${order.customerName} - ${order.lensType}`,
        time: formatDistanceToNow(new Date(order.createdAt), {
          addSuffix: true,
        }),
        status:
          order.status === "delivered"
            ? "completed"
            : order.status === "in-lab"
            ? "in-progress"
            : "pending",
      });
    });

    // Add recent customers if we have space
    if (activities.length < 4) {
      const recentCustomers = customers
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 4 - activities.length);

      recentCustomers.forEach((customer) => {
        activities.push({
          id: customer.id,
          type: "customer",
          title: "New Customer Added",
          subtitle: `${customer.name} - First Visit`,
          time: formatDistanceToNow(new Date(customer.createdAt), {
            addSuffix: true,
          }),
          status: "completed",
        });
      });
    }

    return activities.sort((a, b) => {
      const timeA = a.time.includes("min")
        ? 0
        : a.time.includes("hour")
        ? 1
        : 2;
      const timeB = b.time.includes("min")
        ? 0
        : b.time.includes("hour")
        ? 1
        : 2;
      return timeA - timeB;
    });
  };

  const activities = generateActivities();

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="secondary"
            className="bg-warning/10 text-warning border-warning/20"
          >
            Pending
          </Badge>
        );
      case "completed":
        return (
          <Badge
            variant="secondary"
            className="bg-success/10 text-success border-success/20"
          >
            Completed
          </Badge>
        );
      case "in-progress":
        return (
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary border-primary/20"
          >
            In Progress
          </Badge>
        );
      default:
        return null;
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "order":
        return Package;
      case "delivery":
        return Eye;
      case "customer":
        return User;
      default:
        return Clock;
    }
  };

  return (
    <Card className="card-professional p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          Recent Activity
        </h3>
        <Clock size={20} className="text-muted-foreground" />
      </div>

      <div className="space-y-4">
        {activities.length === 0 ? (
          <div className="text-center py-6">
            <div className="text-2xl mb-2">📋</div>
            <p className="text-sm text-muted-foreground">No recent activity</p>
            <p className="text-xs text-muted-foreground">
              Start by creating orders and adding customers
            </p>
          </div>
        ) : (
          activities.map((activity) => {
            const Icon = getIcon(activity.type);
            return (
              <div
                key={activity.id}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-professional"
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10">
                    <Icon size={16} className="text-primary" />
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground truncate">
                      {activity.title}
                    </p>
                    {activity.status && getStatusBadge(activity.status)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.subtitle}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
};

export default RecentActivity;

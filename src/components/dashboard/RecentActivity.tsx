import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, Eye, Package, User } from "lucide-react";

interface ActivityItem {
  id: string;
  type: 'order' | 'customer' | 'delivery';
  title: string;
  subtitle: string;
  time: string;
  status?: 'pending' | 'completed' | 'in-progress';
}

const RecentActivity = () => {
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'order',
      title: 'New Order #ORD-2024-001',
      subtitle: 'Rajesh Kumar - Progressive Lenses',
      time: '5 min ago',
      status: 'pending'
    },
    {
      id: '2',
      type: 'delivery',
      title: 'Order Delivered',
      subtitle: 'Priya Sharma - Single Vision',
      time: '15 min ago',
      status: 'completed'
    },
    {
      id: '3',
      type: 'customer',
      title: 'New Customer Added',
      subtitle: 'Amit Singh - First Visit',
      time: '1 hour ago',
      status: 'completed'
    },
    {
      id: '4',
      type: 'order',
      title: 'Order in Lab',
      subtitle: 'Meera Patel - Bifocal Lenses',
      time: '2 hours ago',
      status: 'in-progress'
    }
  ];

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">Pending</Badge>;
      case 'completed':
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20">Completed</Badge>;
      case 'in-progress':
        return <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">In Progress</Badge>;
      default:
        return null;
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'order': return Package;
      case 'delivery': return Eye;
      case 'customer': return User;
      default: return Clock;
    }
  };

  return (
    <Card className="card-professional p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <Clock size={20} className="text-muted-foreground" />
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = getIcon(activity.type);
          return (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-professional">
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
        })}
      </div>
    </Card>
  );
};

export default RecentActivity;
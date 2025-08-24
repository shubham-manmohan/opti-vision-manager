import MobileLayout from "@/components/layout/MobileLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { 
  Users, 
  ClipboardList, 
  Package, 
  TrendingUp,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const Index = () => {
  return (
    <MobileLayout title="Dashboard">
      {/* Welcome Section */}
      <div className="card-professional p-4 gradient-primary text-primary-foreground">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Eye className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Good Morning, Dr. Optical!</h2>
            <p className="text-sm opacity-90">Ready to serve your customers today</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <StatsCard
          title="Today's Orders"
          value="12"
          icon={ClipboardList}
          change="+3 from yesterday"
          changeType="positive"
          gradient="primary"
        />
        <StatsCard
          title="Pending Orders"
          value="8"
          icon={Clock}
          change="2 urgent"
          changeType="negative"
          gradient="warning"
        />
        <StatsCard
          title="Total Customers"
          value="1,247"
          icon={Users}
          change="+24 this week"
          changeType="positive"
          gradient="accent"
        />
        <StatsCard
          title="Today's Revenue"
          value="₹15,420"
          icon={TrendingUp}
          change="+12% vs yesterday"
          changeType="positive"
          gradient="success"
        />
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Recent Activity */}
      <RecentActivity />

      {/* Order Status Summary */}
      <div className="card-professional p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Order Status Overview</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-success/5 rounded-lg border border-success/20">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="font-medium text-foreground">Completed Today</span>
            </div>
            <span className="text-lg font-bold text-success">4</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center space-x-3">
              <Package className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground">In Production</span>
            </div>
            <span className="text-lg font-bold text-primary">6</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-warning/5 rounded-lg border border-warning/20">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-warning" />
              <span className="font-medium text-foreground">Awaiting Approval</span>
            </div>
            <span className="text-lg font-bold text-warning">2</span>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Index;

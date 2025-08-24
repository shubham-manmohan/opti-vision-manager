import { useEffect, useState, useMemo } from "react";
import MobileLayout from "@/components/layout/MobileLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
import ExportSection from "@/components/dashboard/ExportSection";
import { useAppStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  ClipboardList, 
  TrendingUp,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  TrendingDown,
  Activity,
  Calendar,
  BarChart3,
  PieChart
} from "lucide-react";

const Index = () => {
  const { getAnalytics, orders, customers } = useAppStore();
  const [analytics, setAnalytics] = useState({
    totalCustomers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    lowStockItems: 0,
    topProducts: []
  });

  // Real-time analytics calculation
  const realTimeAnalytics = useMemo(() => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const thisYear = new Date(now.getFullYear(), 0, 1);

    // Today's metrics
    const todaysOrders = orders.filter(order => order.orderDate === today);
    const todaysRevenue = todaysOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    const todaysDeliveries = orders.filter(order => 
      order.status === 'delivered' && order.orderDate === today
    ).length;

    // This week's metrics
    const weeklyOrders = orders.filter(order => 
      new Date(order.orderDate) >= thisWeek
    );
    const weeklyRevenue = weeklyOrders.reduce((sum, order) => sum + order.totalAmount, 0);

    // This month's metrics
    const monthlyOrders = orders.filter(order => 
      new Date(order.orderDate) >= thisMonth
    );
    const monthlyRevenue = monthlyOrders.reduce((sum, order) => sum + order.totalAmount, 0);

    // This year's metrics
    const yearlyOrders = orders.filter(order => 
      new Date(order.orderDate) >= thisYear
    );
    const yearlyRevenue = yearlyOrders.reduce((sum, order) => sum + order.totalAmount, 0);

    // Order status breakdown
    const orderStatusBreakdown = {
      pending: orders.filter(order => order.status === 'pending').length,
      confirmed: orders.filter(order => order.status === 'confirmed').length,
      'in-lab': orders.filter(order => order.status === 'in-lab').length,
      ready: orders.filter(order => order.status === 'ready').length,
      delivered: orders.filter(order => order.status === 'delivered').length,
      cancelled: orders.filter(order => order.status === 'cancelled').length
    };

    // Customer growth
    const newCustomersThisWeek = customers.filter(customer => 
      new Date(customer.createdAt) >= thisWeek
    ).length;



    // Revenue trends - simplified calculation
    const revenueTrend = weeklyRevenue > 0 ? 10 : 0; // Placeholder for now

    return {
      today: {
        orders: todaysOrders.length,
        revenue: todaysRevenue,
        deliveries: todaysDeliveries
      },
      week: {
        orders: weeklyOrders.length,
        revenue: weeklyRevenue,
        newCustomers: newCustomersThisWeek
      },
      month: {
        orders: monthlyOrders.length,
        revenue: monthlyRevenue
      },
      year: {
        orders: yearlyOrders.length,
        revenue: yearlyRevenue
      },
      orderStatus: orderStatusBreakdown,

      revenueTrend: revenueTrend
    };
  }, [orders, customers]);

  useEffect(() => {
    setAnalytics(getAnalytics());
  }, [getAnalytics]);

  // Dynamic greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  // Get current date info
  const getCurrentDateInfo = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return now.toLocaleDateString('en-US', options);
  };

  return (
    <MobileLayout title="Dashboard">
      {/* Welcome Section */}
      <div className="card-professional p-4 gradient-primary text-primary-foreground">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Eye className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold">{getGreeting()}, Roshni Opticals!</h2>
            <p className="text-sm opacity-90">{getCurrentDateInfo()}</p>
          </div>
        </div>
      </div>

      {/* Real-time Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <StatsCard
          title="Today's Orders"
          value={realTimeAnalytics.today.orders}
          icon={ClipboardList}
          change={`${realTimeAnalytics.today.orders > 0 ? '+' : ''}${realTimeAnalytics.today.orders} today`}
          changeType={realTimeAnalytics.today.orders > 0 ? "positive" : "neutral"}
          gradient="primary"
        />
        <StatsCard
          title="Today's Revenue"
          value={`₹${realTimeAnalytics.today.revenue.toLocaleString()}`}
          icon={TrendingUp}
          change={`₹${realTimeAnalytics.today.revenue > 0 ? realTimeAnalytics.today.revenue : 0} earned`}
          changeType={realTimeAnalytics.today.revenue > 0 ? "positive" : "neutral"}
          gradient="success"
        />
        <StatsCard
          title="Pending Orders"
          value={realTimeAnalytics.orderStatus.pending}
          icon={Clock}
          change={`${realTimeAnalytics.orderStatus.pending} active`}
          changeType={realTimeAnalytics.orderStatus.pending > 0 ? "negative" : "neutral"}
          gradient="warning"
        />
        <StatsCard
          title="Total Customers"
          value={analytics.totalCustomers.toLocaleString()}
          icon={Users}
          change={`+${realTimeAnalytics.week.newCustomers} this week`}
          changeType="positive"
          gradient="accent"
        />
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Enhanced Analytics Section */}
      <Card className="card-professional p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <BarChart3 className="mr-2 h-5 w-5" />
          Business Analytics
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-primary/5 rounded-lg border border-primary/20">
            <div className="text-2xl font-bold text-primary">₹{realTimeAnalytics.week.revenue.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">This Week</div>
            <div className="text-xs text-primary mt-1">
              {realTimeAnalytics.revenueTrend > 0 ? '+' : ''}{realTimeAnalytics.revenueTrend.toString()}% vs last week
            </div>
          </div>
          <div className="text-center p-3 bg-accent/5 rounded-lg border border-accent/20">
            <div className="text-2xl font-bold text-accent">{realTimeAnalytics.week.orders}</div>
            <div className="text-sm text-muted-foreground">Orders This Week</div>
            <div className="text-xs text-accent mt-1">
              +{realTimeAnalytics.week.newCustomers} new customers
            </div>
          </div>
        </div>
      </Card>

      {/* Order Status Summary - Enhanced */}
      <Card className="card-professional p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <PieChart className="mr-2 h-5 w-5" />
          Order Status Overview
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-success/5 rounded-lg border border-success/20">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="font-medium text-foreground">Completed Today</span>
            </div>
            <span className="text-lg font-bold text-success">
              {realTimeAnalytics.today.deliveries}
            </span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground">In Production</span>
            </div>
            <span className="text-lg font-bold text-primary">
              {realTimeAnalytics.orderStatus['in-lab']}
            </span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-warning/5 rounded-lg border border-warning/20">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-warning" />
              <span className="font-medium text-foreground">Awaiting Approval</span>
            </div>
            <span className="text-lg font-bold text-warning">
              {realTimeAnalytics.orderStatus.pending}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-accent/5 rounded-lg border border-accent/20">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-accent" />
              <span className="font-medium text-foreground">Ready for Delivery</span>
            </div>
            <span className="text-lg font-bold text-accent">
              {realTimeAnalytics.orderStatus.ready}
            </span>
          </div>
        </div>
      </Card>



      {/* Revenue Trends */}
      <Card className="card-professional p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <TrendingUp className="mr-2 h-5 w-5" />
          Revenue Overview
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-success/5 rounded-lg border border-success/20">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-success" />
              <span className="text-sm font-medium">This Week</span>
            </div>
            <span className="font-bold text-success">₹{realTimeAnalytics.week.revenue.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">This Month</span>
            </div>
            <span className="font-bold text-primary">₹{realTimeAnalytics.month.revenue.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-accent/5 rounded-lg border border-accent/20">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">This Year</span>
            </div>
            <span className="font-bold text-accent">₹{realTimeAnalytics.year.revenue.toLocaleString()}</span>
          </div>
        </div>
      </Card>

      {/* Export Section */}
      <div className="mt-6">
        <ExportSection />
      </div>

      {/* Recent Activity */}
      <RecentActivity />
    </MobileLayout>
  );
};

export default Index;

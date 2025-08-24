import MobileLayout from "@/components/layout/MobileLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ShoppingCart,
  Package,
  Eye,
  BarChart3,
  PieChart,
  Filter
} from "lucide-react";

const Analytics = () => {
  // Sample data - in real app this would come from API
  const salesData = {
    today: { value: 15420, change: 12.5, trend: 'up' },
    week: { value: 89650, change: -3.2, trend: 'down' },
    month: { value: 345000, change: 18.7, trend: 'up' },
    year: { value: 2850000, change: 25.3, trend: 'up' }
  };

  const topProducts = [
    { name: 'Progressive Lenses', sales: '₹1,25,000', percentage: 35, color: 'bg-primary' },
    { name: 'Ray-Ban Frames', sales: '₹98,000', percentage: 28, color: 'bg-accent' },
    { name: 'Single Vision', sales: '₹75,000', percentage: 22, color: 'bg-warning' },
    { name: 'Blue Cut Lenses', sales: '₹42,000', percentage: 15, color: 'bg-success' }
  ];

  const customerMetrics = [
    { label: 'New Customers', value: '47', change: '+12%', trend: 'up' },
    { label: 'Repeat Customers', value: '89', change: '+8%', trend: 'up' },
    { label: 'Customer Retention', value: '73%', change: '+2%', trend: 'up' },
    { label: 'Avg. Order Value', value: '₹4,250', change: '-5%', trend: 'down' }
  ];

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? TrendingUp : TrendingDown;
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-success' : 'text-destructive';
  };

  return (
    <MobileLayout title="Analytics">
      {/* Period Selector */}
      <Card className="card-professional p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Analytics Dashboard</h3>
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            This Month
          </Button>
        </div>
        
        <div className="flex space-x-2 overflow-x-auto pb-2">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 whitespace-nowrap">
            Today
          </Badge>
          <Badge variant="outline" className="whitespace-nowrap">This Week</Badge>
          <Badge variant="outline" className="whitespace-nowrap">This Month</Badge>
          <Badge variant="outline" className="whitespace-nowrap">This Year</Badge>
        </div>
      </Card>

      {/* Sales Overview */}
      <Card className="card-professional p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Sales Overview</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(salesData).map(([period, data]) => {
            const TrendIcon = getTrendIcon(data.trend);
            return (
              <div key={period} className="p-3 bg-muted/20 rounded-lg">
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  {period}
                </div>
                <div className="text-lg font-bold text-foreground">
                  ₹{data.value.toLocaleString()}
                </div>
                <div className={`flex items-center space-x-1 text-xs ${getTrendColor(data.trend)}`}>
                  <TrendIcon className="h-3 w-3" />
                  <span>{Math.abs(data.change)}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Key Metrics */}
      <Card className="card-professional p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Key Metrics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
            <div className="p-2 bg-primary/10 rounded-lg">
              <ShoppingCart className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">124</div>
              <div className="text-xs text-muted-foreground">Total Orders</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-accent/5 rounded-lg border border-accent/20">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Users className="h-5 w-5 text-accent" />
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">1,247</div>
              <div className="text-xs text-muted-foreground">Total Customers</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-warning/5 rounded-lg border border-warning/20">
            <div className="p-2 bg-warning/10 rounded-lg">
              <Package className="h-5 w-5 text-warning" />
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">89</div>
              <div className="text-xs text-muted-foreground">Pending Orders</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-success/5 rounded-lg border border-success/20">
            <div className="p-2 bg-success/10 rounded-lg">
              <DollarSign className="h-5 w-5 text-success" />
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">₹4,250</div>
              <div className="text-xs text-muted-foreground">Avg Order Value</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Top Products */}
      <Card className="card-professional p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Top Selling Products</h3>
        <div className="space-y-4">
          {topProducts.map((product, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{product.name}</span>
                <span className="text-sm text-muted-foreground">{product.sales}</span>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-2">
                <div 
                  className={`${product.color} h-2 rounded-full transition-all duration-300`}
                  style={{ width: `${product.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Customer Metrics */}
      <Card className="card-professional p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Customer Analytics</h3>
        <div className="grid grid-cols-2 gap-3">
          {customerMetrics.map((metric, index) => {
            const TrendIcon = getTrendIcon(metric.trend);
            return (
              <div key={index} className="p-3 bg-muted/20 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">{metric.label}</div>
                <div className="text-lg font-bold text-foreground">{metric.value}</div>
                <div className={`flex items-center space-x-1 text-xs ${getTrendColor(metric.trend)}`}>
                  <TrendIcon className="h-3 w-3" />
                  <span>{metric.change}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="card-professional p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Reports & Export</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-20 flex flex-col space-y-2">
            <Download className="h-5 w-5" />
            <span className="text-sm">Export Sales</span>
          </Button>
          
          <Button variant="outline" className="h-20 flex flex-col space-y-2">
            <Users className="h-5 w-5" />
            <span className="text-sm">Customer Report</span>
          </Button>
          
          <Button variant="outline" className="h-20 flex flex-col space-y-2">
            <Package className="h-5 w-5" />
            <span className="text-sm">Inventory Report</span>
          </Button>
          
          <Button variant="outline" className="h-20 flex flex-col space-y-2">
            <BarChart3 className="h-5 w-5" />
            <span className="text-sm">Full Analytics</span>
          </Button>
        </div>
      </Card>

      {/* Advanced Analytics */}
      <Card className="card-professional p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Advanced Analytics</h3>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <PieChart className="mr-3 h-4 w-4" />
            Product Category Analysis
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <BarChart3 className="mr-3 h-4 w-4" />
            Sales Trend Analysis
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Eye className="mr-3 h-4 w-4" />
            Customer Behavior Analysis
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Filter className="mr-3 h-4 w-4" />
            Custom Reports
          </Button>
        </div>
      </Card>

      {/* Export Data */}
      <Card className="card-professional p-4">
        <Button className="w-full gradient-primary">
          <Download className="mr-2 h-4 w-4" />
          Export Complete Data to Excel
        </Button>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Export all data including customers, orders, inventory, and analytics
        </p>
      </Card>
    </MobileLayout>
  );
};

export default Analytics;
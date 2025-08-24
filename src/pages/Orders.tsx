import MobileLayout from "@/components/layout/MobileLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Filter,
  Calendar,
  User,
  Eye,
  Package,
  Clock,
  CheckCircle,
  AlertTriangle,
  X
} from "lucide-react";

interface Order {
  id: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
  status: 'pending' | 'confirmed' | 'in-lab' | 'ready' | 'delivered' | 'cancelled';
  orderDate: string;
  expectedDelivery: string;
  frameDetails: string;
  lensType: string;
  totalAmount: number;
  advancePaid: number;
  balanceDue: number;
}

const Orders = () => {
  const orders: Order[] = [
    {
      id: '1',
      orderId: 'ORD-2024-001',
      customerName: 'Rajesh Kumar',
      customerPhone: '+91 98765 43210',
      status: 'in-lab',
      orderDate: '2024-01-20',
      expectedDelivery: '2024-01-25',
      frameDetails: 'Ray-Ban RB2140 - Black',
      lensType: 'Progressive - Crizal Coating',
      totalAmount: 8500,
      advancePaid: 5000,
      balanceDue: 3500
    },
    {
      id: '2',
      orderId: 'ORD-2024-002',
      customerName: 'Priya Sharma',
      customerPhone: '+91 87654 32109',
      status: 'ready',
      orderDate: '2024-01-18',
      expectedDelivery: '2024-01-23',
      frameDetails: 'Oakley OX8156 - Silver',
      lensType: 'Single Vision - Blue Cut',
      totalAmount: 6200,
      advancePaid: 6200,
      balanceDue: 0
    },
    {
      id: '3',
      orderId: 'ORD-2024-003',
      customerName: 'Amit Singh',
      customerPhone: '+91 76543 21098',
      status: 'pending',
      orderDate: '2024-01-22',
      expectedDelivery: '2024-01-28',
      frameDetails: 'Titan 1234 - Brown',
      lensType: 'Bifocal - Anti-Glare',
      totalAmount: 4800,
      advancePaid: 2000,
      balanceDue: 2800
    },
    {
      id: '4',
      orderId: 'ORD-2024-004',
      customerName: 'Meera Patel',
      customerPhone: '+91 65432 10987',
      status: 'delivered',
      orderDate: '2024-01-15',
      expectedDelivery: '2024-01-20',
      frameDetails: 'Lenskart LK-5678 - Black',
      lensType: 'Single Vision - Scratch Resistant',
      totalAmount: 3200,
      advancePaid: 3200,
      balanceDue: 0
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-warning/10 text-warning border-warning/20', icon: Clock, label: 'Pending' },
      confirmed: { color: 'bg-primary/10 text-primary border-primary/20', icon: CheckCircle, label: 'Confirmed' },
      'in-lab': { color: 'bg-accent/10 text-accent border-accent/20', icon: Package, label: 'In Lab' },
      ready: { color: 'bg-success/10 text-success border-success/20', icon: CheckCircle, label: 'Ready' },
      delivered: { color: 'bg-muted text-muted-foreground border-muted', icon: CheckCircle, label: 'Delivered' },
      cancelled: { color: 'bg-destructive/10 text-destructive border-destructive/20', icon: X, label: 'Cancelled' }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;

    return (
      <Badge variant="secondary" className={config.color}>
        <Icon className="mr-1 h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'border-l-success';
      case 'in-lab': return 'border-l-accent';
      case 'pending': return 'border-l-warning';
      case 'delivered': return 'border-l-muted';
      case 'cancelled': return 'border-l-destructive';
      default: return 'border-l-primary';
    }
  };

  return (
    <MobileLayout title="Orders">
      {/* Search and Actions */}
      <Card className="card-professional p-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search by order ID or customer..."
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          <Button className="w-full gradient-primary">
            <Plus className="mr-2 h-4 w-4" />
            Create New Order
          </Button>
        </div>
      </Card>

      {/* Order Status Summary */}
      <Card className="card-professional p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Order Status Summary</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-warning/5 rounded-lg border border-warning/20">
            <div className="text-2xl font-bold text-warning">1</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </div>
          <div className="text-center p-3 bg-accent/5 rounded-lg border border-accent/20">
            <div className="text-2xl font-bold text-accent">1</div>
            <div className="text-sm text-muted-foreground">In Lab</div>
          </div>
          <div className="text-center p-3 bg-success/5 rounded-lg border border-success/20">
            <div className="text-2xl font-bold text-success">1</div>
            <div className="text-sm text-muted-foreground">Ready</div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg border border-muted">
            <div className="text-2xl font-bold text-muted-foreground">1</div>
            <div className="text-sm text-muted-foreground">Delivered</div>
          </div>
        </div>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className={`card-professional p-4 border-l-4 ${getStatusColor(order.status)}`}>
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{order.orderId}</h3>
                  <p className="text-sm text-muted-foreground">{order.customerName}</p>
                </div>
                {getStatusBadge(order.status)}
              </div>

              {/* Customer Info */}
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{order.customerPhone}</span>
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Frame:</span>
                  <span className="text-sm text-muted-foreground">{order.frameDetails}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Lens:</span>
                  <span className="text-sm text-muted-foreground">{order.lensType}</span>
                </div>
              </div>

              {/* Dates */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Ordered: {new Date(order.orderDate).toLocaleDateString()}</span>
                </div>
                <div className="text-primary font-medium">
                  Due: {new Date(order.expectedDelivery).toLocaleDateString()}
                </div>
              </div>

              {/* Payment Info */}
              <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <div className="text-sm">
                  <span className="font-medium text-foreground">Total: ₹{order.totalAmount.toLocaleString()}</span>
                  <br />
                  <span className="text-muted-foreground">Paid: ₹{order.advancePaid.toLocaleString()}</span>
                </div>
                {order.balanceDue > 0 && (
                  <div className="text-right">
                    <div className="text-sm font-medium text-destructive">
                      Due: ₹{order.balanceDue.toLocaleString()}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Button>
                {order.status === 'ready' && (
                  <Button size="sm" className="gradient-accent">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark Delivered
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </MobileLayout>
  );
};

export default Orders;
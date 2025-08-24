import { useState } from "react";
import MobileLayout from "@/components/layout/MobileLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { OrderForm } from "@/components/forms/OrderForm";
import { useAppStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { exportToCSV, formatOrderForExport } from "@/lib/exportUtils";
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
  X,
  Edit,
  Trash2,
  Download
} from "lucide-react";

const Orders = () => {
  const { orders, searchOrders, deleteOrder, setSearchQuery, searchQuery } = useAppStore();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState<typeof orders[0] | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredOrders = searchOrders(searchQuery).filter(order => {
    if (statusFilter === 'all') return true;
    return order.status === statusFilter;
  });

  const handleAddOrder = () => {
    setEditingOrder(null);
    setShowForm(true);
  };

  const handleEditOrder = (order: typeof orders[0]) => {
    setEditingOrder(order);
    setShowForm(true);
  };

  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      deleteOrder(orderId);
      toast({
        title: "Order Deleted",
        description: "Order has been deleted successfully.",
      });
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingOrder(null);
  };

  const handleFormSave = () => {
    setShowForm(false);
    setEditingOrder(null);
  };

  const handleExportOrders = () => {
    try {
      const formattedData = formatOrderForExport(orders);
      exportToCSV(formattedData, `Opti-Vision-Orders-${new Date().toISOString().split('T')[0]}`);
      toast({
        title: "Export Successful",
        description: `${orders.length} orders exported to CSV`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export orders data",
        variant: "destructive",
      });
    }
  };

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

  // Calculate order status counts
  const statusCounts = {
    pending: orders.filter(order => order.status === 'pending').length,
    'in-lab': orders.filter(order => order.status === 'in-lab').length,
    ready: orders.filter(order => order.status === 'ready').length,
    delivered: orders.filter(order => order.status === 'delivered').length,
    confirmed: orders.filter(order => order.status === 'confirmed').length,
    cancelled: orders.filter(order => order.status === 'cancelled').length
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          {showFilters && (
            <div className="p-3 bg-muted/20 rounded-lg border border-border/50">
              <div className="flex space-x-2 overflow-x-auto pb-2">
                <Badge 
                  variant={statusFilter === 'all' ? 'default' : 'secondary'}
                  className="whitespace-nowrap cursor-pointer"
                  onClick={() => setStatusFilter('all')}
                >
                  All ({orders.length})
                </Badge>
                <Badge 
                  variant={statusFilter === 'pending' ? 'default' : 'secondary'}
                  className="whitespace-nowrap cursor-pointer"
                  onClick={() => setStatusFilter('pending')}
                >
                  Pending ({statusCounts.pending})
                </Badge>
                <Badge 
                  variant={statusFilter === 'confirmed' ? 'default' : 'secondary'}
                  className="whitespace-nowrap cursor-pointer"
                  onClick={() => setStatusFilter('confirmed')}
                >
                  Confirmed ({statusCounts.confirmed})
                </Badge>
                <Badge 
                  variant={statusFilter === 'in-lab' ? 'default' : 'secondary'}
                  className="whitespace-nowrap cursor-pointer"
                  onClick={() => setStatusFilter('in-lab')}
                >
                  In Lab ({statusCounts['in-lab']})
                </Badge>
                <Badge 
                  variant={statusFilter === 'ready' ? 'default' : 'secondary'}
                  className="whitespace-nowrap cursor-pointer"
                  onClick={() => setStatusFilter('ready')}
                >
                  Ready ({statusCounts.ready})
                </Badge>
                <Badge 
                  variant={statusFilter === 'delivered' ? 'default' : 'secondary'}
                  className="whitespace-nowrap cursor-pointer"
                  onClick={() => setStatusFilter('delivered')}
                >
                  Delivered ({statusCounts.delivered})
                </Badge>
                <Badge 
                  variant={statusFilter === 'cancelled' ? 'default' : 'secondary'}
                  className="whitespace-nowrap cursor-pointer"
                  onClick={() => setStatusFilter('cancelled')}
                >
                  Cancelled ({statusCounts.cancelled})
                </Badge>
              </div>
            </div>
          )}
          
          <div className="flex space-x-2">
            <Button className="flex-1 gradient-primary" onClick={handleAddOrder}>
              <Plus className="mr-2 h-4 w-4" />
              Create New Order
            </Button>
            <Button 
              variant="outline" 
              onClick={handleExportOrders}
              disabled={orders.length === 0}
              className="px-3"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Order Status Summary */}
      <Card className="card-professional p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Order Status Summary</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-warning/5 rounded-lg border border-warning/20">
            <div className="text-2xl font-bold text-warning">{statusCounts.pending}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </div>
          <div className="text-center p-3 bg-accent/5 rounded-lg border border-accent/20">
            <div className="text-2xl font-bold text-accent">{statusCounts['in-lab']}</div>
            <div className="text-sm text-muted-foreground">In Lab</div>
          </div>
          <div className="text-center p-3 bg-success/5 rounded-lg border border-success/20">
            <div className="text-2xl font-bold text-success">{statusCounts.ready}</div>
            <div className="text-sm text-muted-foreground">Ready</div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg border border-muted">
            <div className="text-2xl font-bold text-muted-foreground">{statusCounts.delivered}</div>
            <div className="text-sm text-muted-foreground">Delivered</div>
          </div>
        </div>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <Card className="card-professional p-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl">📋</div>
              <h3 className="text-lg font-semibold text-foreground">No orders found</h3>
              <p className="text-muted-foreground">
                {searchQuery ? 'Try adjusting your search terms' : 'Create your first order to get started'}
              </p>
            </div>
          </Card>
        ) : (
          filteredOrders.map((order) => (
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
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleEditOrder(order)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteOrder(order.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Load More */}
      {filteredOrders.length > 0 && (
        <Card className="card-professional p-4">
          <div className="text-center text-sm text-muted-foreground">
            Showing {filteredOrders.length} of {orders.length} orders
          </div>
        </Card>
      )}

      {/* Order Form Modal */}
      {showForm && (
        <OrderForm
          order={editingOrder || undefined}
          onClose={handleFormClose}
          onSave={handleFormSave}
        />
      )}
    </MobileLayout>
  );
};

export default Orders;
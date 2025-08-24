import MobileLayout from "@/components/layout/MobileLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Filter,
  Package,
  AlertTriangle,
  TrendingUp,
  Eye,
  Edit,
  BarChart3
} from "lucide-react";

interface InventoryItem {
  id: string;
  itemCode: string;
  brand: string;
  model: string;
  category: 'frame' | 'lens' | 'accessory';
  type: string;
  color?: string;
  size?: string;
  costPrice: number;
  sellingPrice: number;
  currentStock: number;
  reorderLevel: number;
  supplier: string;
  lastRestocked: string;
}

const Inventory = () => {
  const inventoryItems: InventoryItem[] = [
    {
      id: '1',
      itemCode: 'RB-2140-BLK-54',
      brand: 'Ray-Ban',
      model: 'RB2140 Wayfarer',
      category: 'frame',
      type: 'Full Rim',
      color: 'Black',
      size: '54mm',
      costPrice: 4500,
      sellingPrice: 6500,
      currentStock: 15,
      reorderLevel: 10,
      supplier: 'Luxottica India',
      lastRestocked: '2024-01-15'
    },
    {
      id: '2',
      itemCode: 'ESS-PROG-156',
      brand: 'Essilor',
      model: 'Varilux Progressive',
      category: 'lens',
      type: 'Progressive',
      costPrice: 2800,
      sellingPrice: 4200,
      currentStock: 8,
      reorderLevel: 12,
      supplier: 'Essilor India',
      lastRestocked: '2024-01-10'
    },
    {
      id: '3',
      itemCode: 'OAK-8156-SIL-56',
      brand: 'Oakley',
      model: 'OX8156',
      category: 'frame',
      type: 'Full Rim',
      color: 'Silver',
      size: '56mm',
      costPrice: 3200,
      sellingPrice: 4800,
      currentStock: 22,
      reorderLevel: 15,
      supplier: 'Luxottica India',
      lastRestocked: '2024-01-18'
    },
    {
      id: '4',
      itemCode: 'CASE-HARD-BLK',
      brand: 'Generic',
      model: 'Hard Case',
      category: 'accessory',
      type: 'Protective Case',
      color: 'Black',
      costPrice: 150,
      sellingPrice: 300,
      currentStock: 45,
      reorderLevel: 20,
      supplier: 'Local Supplier',
      lastRestocked: '2024-01-20'
    }
  ];

  const getStockStatus = (currentStock: number, reorderLevel: number) => {
    if (currentStock === 0) {
      return { status: 'out-of-stock', color: 'bg-destructive/10 text-destructive border-destructive/20', label: 'Out of Stock' };
    } else if (currentStock <= reorderLevel) {
      return { status: 'low-stock', color: 'bg-warning/10 text-warning border-warning/20', label: 'Low Stock' };
    } else {
      return { status: 'in-stock', color: 'bg-success/10 text-success border-success/20', label: 'In Stock' };
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'frame': return '👓';
      case 'lens': return '🔍';
      case 'accessory': return '📦';
      default: return '📦';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'frame': return 'bg-primary/10 text-primary border-primary/20';
      case 'lens': return 'bg-accent/10 text-accent border-accent/20';
      case 'accessory': return 'bg-secondary/10 text-secondary-foreground border-secondary';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <MobileLayout title="Inventory">
      {/* Search and Actions */}
      <Card className="card-professional p-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search by item code or brand..."
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          <Button className="w-full gradient-primary">
            <Plus className="mr-2 h-4 w-4" />
            Add New Item
          </Button>
        </div>
      </Card>

      {/* Inventory Summary */}
      <Card className="card-professional p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Inventory Overview</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-success/5 rounded-lg border border-success/20">
            <div className="text-2xl font-bold text-success">85</div>
            <div className="text-xs text-muted-foreground">Total Items</div>
          </div>
          <div className="text-center p-3 bg-warning/5 rounded-lg border border-warning/20">
            <div className="text-2xl font-bold text-warning">12</div>
            <div className="text-xs text-muted-foreground">Low Stock</div>
          </div>
          <div className="text-center p-3 bg-destructive/5 rounded-lg border border-destructive/20">
            <div className="text-2xl font-bold text-destructive">3</div>
            <div className="text-xs text-muted-foreground">Out of Stock</div>
          </div>
        </div>
      </Card>

      {/* Quick Filters */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 whitespace-nowrap">
          👓 Frames (45)
        </Badge>
        <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 whitespace-nowrap">
          🔍 Lenses (32)
        </Badge>
        <Badge variant="secondary" className="bg-secondary/10 text-secondary-foreground border-secondary whitespace-nowrap">
          📦 Accessories (8)
        </Badge>
      </div>

      {/* Inventory Items */}
      <div className="space-y-4">
        {inventoryItems.map((item) => {
          const stockStatus = getStockStatus(item.currentStock, item.reorderLevel);
          
          return (
            <Card key={item.id} className="card-professional p-4">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-lg">{getCategoryIcon(item.category)}</span>
                      <h3 className="text-lg font-semibold text-foreground">{item.brand} {item.model}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.itemCode}</p>
                  </div>
                  <Badge variant="secondary" className={stockStatus.color}>
                    {stockStatus.label}
                  </Badge>
                </div>

                {/* Item Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-foreground">Category:</span>
                    <br />
                    <Badge variant="secondary" className={`${getCategoryColor(item.category)} mt-1`}>
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Type:</span>
                    <br />
                    <span className="text-muted-foreground">{item.type}</span>
                  </div>
                  {item.color && (
                    <div>
                      <span className="font-medium text-foreground">Color:</span>
                      <br />
                      <span className="text-muted-foreground">{item.color}</span>
                    </div>
                  )}
                  {item.size && (
                    <div>
                      <span className="font-medium text-foreground">Size:</span>
                      <br />
                      <span className="text-muted-foreground">{item.size}</span>
                    </div>
                  )}
                </div>

                {/* Stock Information */}
                <div className="p-3 bg-muted/20 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-foreground">Current Stock:</span>
                      <br />
                      <span className={`text-lg font-bold ${
                        item.currentStock <= item.reorderLevel ? 'text-warning' : 'text-success'
                      }`}>
                        {item.currentStock} units
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Reorder Level:</span>
                      <br />
                      <span className="text-muted-foreground">{item.reorderLevel} units</span>
                    </div>
                  </div>
                  
                  {item.currentStock <= item.reorderLevel && (
                    <div className="flex items-center space-x-2 mt-2 p-2 bg-warning/10 rounded border border-warning/20">
                      <AlertTriangle className="h-4 w-4 text-warning" />
                      <span className="text-sm text-warning font-medium">Reorder Required</span>
                    </div>
                  )}
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="text-sm">
                    <span className="font-medium text-foreground">Cost: ₹{item.costPrice.toLocaleString()}</span>
                    <br />
                    <span className="text-muted-foreground">Selling: ₹{item.sellingPrice.toLocaleString()}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-success">
                      <TrendingUp className="inline h-4 w-4 mr-1" />
                      {(((item.sellingPrice - item.costPrice) / item.costPrice) * 100).toFixed(1)}% Margin
                    </div>
                  </div>
                </div>

                {/* Supplier & Last Restocked */}
                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Supplier: {item.supplier}</span>
                    <span>Last restocked: {new Date(item.lastRestocked).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </MobileLayout>
  );
};

export default Inventory;
// Types
export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  gender?: string;
  location: string;
  lastVisit: string;
  totalOrders: number;
  status: "active" | "inactive" | "vip";
  profilePicture?: string;
  prescription?: {
    leftEye: string;
    rightEye: string;
    pd: string;
    notes?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  orderId: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  status:
    | "pending"
    | "confirmed"
    | "in-lab"
    | "ready"
    | "delivered"
    | "cancelled";
  orderDate: string;
  expectedDelivery: string;
  frameDetails: string;
  lensType: string;
  totalAmount: number;
  advancePaid: number;
  balanceDue: number;
  prescription?: {
    leftEye: string;
    rightEye: string;
    pd: string;
    notes?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface InventoryItem {
  id: string;
  itemCode: string;
  brand: string;
  model: string;
  category: "frame" | "lens" | "accessory";
  type: string;
  color?: string;
  size?: string;
  costPrice: number;
  sellingPrice: number;
  currentStock: number;
  reorderLevel: number;
  supplier: string;
  lastRestocked: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppState {
  // State
  customers: Customer[];
  orders: Order[];
  inventory: InventoryItem[];
  searchQuery: string;
  currentFilter: string;
  isLoading: boolean;

  // Actions
  // Customer actions
  addCustomer: (
    customer: Omit<Customer, "id" | "createdAt" | "updatedAt">
  ) => void;
  updateCustomer: (id: string, updates: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  getCustomer: (id: string) => Customer | undefined;
  searchCustomers: (query: string) => Customer[];

  // Order actions
  addOrder: (
    order: Omit<Order, "id" | "orderId" | "createdAt" | "updatedAt">
  ) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  deleteOrder: (id: string) => void;
  getOrder: (id: string) => Order | undefined;
  getOrdersByStatus: (status: Order["status"]) => Order[];
  searchOrders: (query: string) => Order[];

  // Inventory actions
  addInventoryItem: (
    item: Omit<InventoryItem, "id" | "createdAt" | "updatedAt">
  ) => void;
  updateInventoryItem: (id: string, updates: Partial<InventoryItem>) => void;
  deleteInventoryItem: (id: string) => void;
  getInventoryItem: (id: string) => InventoryItem | undefined;
  searchInventory: (query: string) => InventoryItem[];
  updateStock: (id: string, quantity: number) => void;

  // App actions
  setSearchQuery: (query: string) => void;
  setCurrentFilter: (filter: string) => void;
  setLoading: (loading: boolean) => void;

  // Analytics
  getAnalytics: () => {
    totalCustomers: number;
    totalOrders: number;
    totalRevenue: number;
    pendingOrders: number;
    lowStockItems: number;
    topProducts: Array<{ name: string; sales: number; percentage: number }>;
  };
}

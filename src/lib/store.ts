import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  location: string;
  lastVisit: string;
  totalOrders: number;
  status: 'active' | 'inactive' | 'vip';
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
  status: 'pending' | 'confirmed' | 'in-lab' | 'ready' | 'delivered' | 'cancelled';
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
  addCustomer: (customer: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateCustomer: (id: string, updates: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  getCustomer: (id: string) => Customer | undefined;
  searchCustomers: (query: string) => Customer[];
  
  // Order actions
  addOrder: (order: Omit<Order, 'id' | 'orderId' | 'createdAt' | 'updatedAt'>) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  deleteOrder: (id: string) => void;
  getOrder: (id: string) => Order | undefined;
  getOrdersByStatus: (status: Order['status']) => Order[];
  searchOrders: (query: string) => Order[];
  
  // Inventory actions
  addInventoryItem: (item: Omit<InventoryItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
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

// Helper functions
const generateId = () => Math.random().toString(36).substr(2, 9);
const generateOrderId = () => `ORD-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
const getCurrentTimestamp = () => new Date().toISOString();

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      customers: [],
      orders: [],
      inventory: [],
      searchQuery: '',
      currentFilter: '',
      isLoading: false,

      // Customer actions
      addCustomer: (customerData) => {
        const newCustomer: Customer = {
          ...customerData,
          id: generateId(),
          createdAt: getCurrentTimestamp(),
          updatedAt: getCurrentTimestamp(),
        };
        set((state) => ({
          customers: [...state.customers, newCustomer],
        }));
      },

      updateCustomer: (id, updates) => {
        set((state) => ({
          customers: state.customers.map((customer) =>
            customer.id === id
              ? { ...customer, ...updates, updatedAt: getCurrentTimestamp() }
              : customer
          ),
        }));
      },

      deleteCustomer: (id) => {
        set((state) => ({
          customers: state.customers.filter((customer) => customer.id !== id),
        }));
      },

      getCustomer: (id) => {
        return get().customers.find((customer) => customer.id === id);
      },

      searchCustomers: (query) => {
        const customers = get().customers;
        if (!query) return customers;
        
        const lowerQuery = query.toLowerCase();
        return customers.filter((customer) =>
          customer.name.toLowerCase().includes(lowerQuery) ||
          customer.phone.includes(query) ||
          customer.email?.toLowerCase().includes(lowerQuery) ||
          customer.location.toLowerCase().includes(lowerQuery)
        );
      },

      // Order actions
      addOrder: (orderData) => {
        const newOrder: Order = {
          ...orderData,
          id: generateId(),
          orderId: generateOrderId(),
          createdAt: getCurrentTimestamp(),
          updatedAt: getCurrentTimestamp(),
        };
        set((state) => ({
          orders: [...state.orders, newOrder],
        }));
      },

      updateOrder: (id, updates) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id
              ? { ...order, ...updates, updatedAt: getCurrentTimestamp() }
              : order
          ),
        }));
      },

      deleteOrder: (id) => {
        set((state) => ({
          orders: state.orders.filter((order) => order.id !== id),
        }));
      },

      getOrder: (id) => {
        return get().orders.find((order) => order.id === id);
      },

      getOrdersByStatus: (status) => {
        return get().orders.filter((order) => order.status === status);
      },

      searchOrders: (query) => {
        const orders = get().orders;
        if (!query) return orders;
        
        const lowerQuery = query.toLowerCase();
        return orders.filter((order) =>
          order.orderId.toLowerCase().includes(lowerQuery) ||
          order.customerName.toLowerCase().includes(lowerQuery) ||
          order.customerPhone.includes(query) ||
          order.frameDetails.toLowerCase().includes(lowerQuery)
        );
      },

      // Inventory actions
      addInventoryItem: (itemData) => {
        const newItem: InventoryItem = {
          ...itemData,
          id: generateId(),
          createdAt: getCurrentTimestamp(),
          updatedAt: getCurrentTimestamp(),
        };
        set((state) => ({
          inventory: [...state.inventory, newItem],
        }));
      },

      updateInventoryItem: (id, updates) => {
        set((state) => ({
          inventory: state.inventory.map((item) =>
            item.id === id
              ? { ...item, ...updates, updatedAt: getCurrentTimestamp() }
              : item
          ),
        }));
      },

      deleteInventoryItem: (id) => {
        set((state) => ({
          inventory: state.inventory.filter((item) => item.id !== id),
        }));
      },

      getInventoryItem: (id) => {
        return get().inventory.find((item) => item.id === id);
      },

      searchInventory: (query) => {
        const inventory = get().inventory;
        if (!query) return inventory;
        
        const lowerQuery = query.toLowerCase();
        return inventory.filter((item) =>
          item.itemCode.toLowerCase().includes(lowerQuery) ||
          item.brand.toLowerCase().includes(lowerQuery) ||
          item.model.toLowerCase().includes(lowerQuery) ||
          item.category.toLowerCase().includes(lowerQuery)
        );
      },

      updateStock: (id, quantity) => {
        set((state) => ({
          inventory: state.inventory.map((item) =>
            item.id === id
              ? { ...item, currentStock: item.currentStock + quantity, updatedAt: getCurrentTimestamp() }
              : item
          ),
        }));
      },

      // App actions
      setSearchQuery: (query) => set({ searchQuery: query }),
      setCurrentFilter: (filter) => set({ currentFilter: filter }),
      setLoading: (loading) => set({ isLoading: loading }),

      // Analytics
      getAnalytics: () => {
        const state = get();
        const totalCustomers = state.customers.length;
        const totalOrders = state.orders.length;
        const totalRevenue = state.orders
          .filter((order) => order.status === 'delivered')
          .reduce((sum, order) => sum + order.totalAmount, 0);
        const pendingOrders = state.orders.filter((order) => 
          ['pending', 'confirmed', 'in-lab'].includes(order.status)
        ).length;
        const lowStockItems = state.inventory.filter((item) => 
          item.currentStock <= item.reorderLevel
        ).length;

        // Calculate top products
        const productSales = new Map<string, number>();
        state.orders.forEach((order) => {
          const key = `${order.frameDetails} - ${order.lensType}`;
          productSales.set(key, (productSales.get(key) || 0) + order.totalAmount);
        });

        const topProducts = Array.from(productSales.entries())
          .map(([name, sales]) => ({ name, sales, percentage: 0 }))
          .sort((a, b) => b.sales - a.sales)
          .slice(0, 5);

        // Calculate percentages
        const totalSales = topProducts.reduce((sum, product) => sum + product.sales, 0);
        topProducts.forEach((product) => {
          product.percentage = totalSales > 0 ? Math.round((product.sales / totalSales) * 100) : 0;
        });

        return {
          totalCustomers,
          totalOrders,
          totalRevenue,
          pendingOrders,
          lowStockItems,
          topProducts,
        };
      },
    }),
    {
      name: 'optical-store-storage',
      partialize: (state) => ({
        customers: state.customers,
        orders: state.orders,
        inventory: state.inventory,
      }),
    }
  )
); 
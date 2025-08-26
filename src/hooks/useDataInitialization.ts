import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import {
  sampleCustomers,
  sampleInventory,
  sampleOrders,
} from "@/lib/sampleData";

export const useDataInitialization = () => {
  const {
    customers,
    orders,
    inventory,
    addCustomer,
    addInventoryItem,
    addOrder,
  } = useAppStore();

  useEffect(() => {
    // Only initialize if no data exists
    if (customers.length === 0) {
      sampleCustomers.forEach((customer) => addCustomer(customer));
    }

    if (inventory.length === 0) {
      sampleInventory.forEach((item) => addInventoryItem(item));
    }

    if (orders.length === 0) {
      sampleOrders.forEach((order) => addOrder(order));
    }
  }, [
    customers.length,
    orders.length,
    inventory.length,
    addCustomer,
    addInventoryItem,
    addOrder,
  ]);
};

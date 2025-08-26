import { Customer } from "@/types/types";

const API_BASE = "http://localhost:8080/api"; // adjust backend URL

// Add customer to backend
export async function addCustomerApi(
  customer: Omit<Customer, "id" | "createdAt" | "updatedAt">
): Promise<Customer> {
  const res = await fetch(`${API_BASE}/customers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  });

  if (!res.ok) {
    throw new Error("Failed to add customer");
  }

  return res.json();
}

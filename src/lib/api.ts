import { Customer } from "@/types/types";

const API_BASE = "https://39yaoyq33e.execute-api.ap-south-1.amazonaws.com"; // adjust backend URL

// Add customer to backend
export async function addCustomerApi(
  customer: Omit<Customer, "id" | "createdAt" | "updatedAt">
): Promise<Customer> {
  console.log(JSON.stringify(customer));
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

// ✅ Fetch all customers
export async function getCustomersApi(): Promise<Customer[]> {
  const res = await fetch(`${API_BASE}/customers`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch customers");
  }

  return res.json();
}

// ✅ Fetch all customers
export async function deleteCustomerApi(id: string): Promise<Customer[]> {
  const res = await fetch(`${API_BASE}/customers/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Failed to Delete Customer ${id}`);
  }

  return res.json();
}

// ✅ Update customer in backend
export async function updateCustomerApi(
  customer: Partial<Omit<Customer, "createdAt" | "updatedAt">> & { id: string }
): Promise<Customer> {
  const res = await fetch(`${API_BASE}/customers`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  });

  if (!res.ok) {
    throw new Error(`Failed to update customer ${customer.id}`);
  }

  return res.json();
}

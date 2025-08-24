import { Customer, Order } from './store';

export const exportToCSV = (data: any[], filename: string) => {
  if (data.length === 0) {
    console.warn('No data to export');
    return;
  }

  // Get headers from first object
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  const csvContent = [
    headers.join(','), // Header row
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Handle special characters and wrap in quotes if needed
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const formatCustomerForExport = (customers: Customer[]) => {
  return customers.map(customer => ({
    'Customer ID': customer.id,
    'Name': customer.name,
    'Phone': customer.phone,
    'Email': customer.email || '',
    'Status': customer.status,
    'Address': customer.address || '',
    'Date of Birth': customer.dateOfBirth || '',
    'Gender': customer.gender || '',
    'Left Eye SPH': customer.prescription?.leftEye?.sph || '',
    'Left Eye CYL': customer.prescription?.leftEye?.cyl || '',
    'Left Eye AXIS': customer.prescription?.leftEye?.axis || '',
    'Right Eye SPH': customer.prescription?.rightEye?.sph || '',
    'Right Eye CYL': customer.prescription?.rightEye?.cyl || '',
    'Right Eye AXIS': customer.prescription?.rightEye?.axis || '',
    'PD': customer.prescription?.pd || '',
    'Notes': customer.prescription?.notes || '',
    'Created Date': new Date(customer.createdAt).toLocaleDateString(),
    'Last Updated': new Date(customer.updatedAt).toLocaleDateString()
  }));
};

export const formatOrderForExport = (orders: Order[]) => {
  return orders.map(order => ({
    'Order ID': order.orderId,
    'Customer Name': order.customerName,
    'Customer Phone': order.customerPhone,
    'Status': order.status,
    'Order Date': order.orderDate,
    'Expected Delivery': order.expectedDelivery,
    'Frame Details': order.frameDetails,
    'Lens Type': order.lensType,
    'Total Amount': `₹${order.totalAmount}`,
    'Advance Paid': `₹${order.advancePaid}`,
    'Balance Due': `₹${order.balanceDue}`,
    'Left Eye Prescription': order.prescription?.leftEye || '',
    'Right Eye Prescription': order.prescription?.rightEye || '',
    'PD': order.prescription?.pd || '',
    'Notes': order.prescription?.notes || '',
    'Created Date': new Date(order.createdAt).toLocaleDateString(),
    'Last Updated': new Date(order.updatedAt).toLocaleDateString()
  }));
};



export const exportDashboardData = (customers: Customer[], orders: Order[]) => {
  const timestamp = new Date().toISOString().split('T')[0];
  
  // Export all data as separate sheets in one CSV
  const allData = [
    // Customers section
    ['CUSTOMERS DATA'],
    [''],
    ...formatCustomerForExport(customers).map(row => Object.values(row)),
    [''],
    [''],
    
    // Orders section
    ['ORDERS DATA'],
    [''],
    ...formatOrderForExport(orders).map(row => Object.values(row))
  ];

  const csvContent = allData.map(row => row.join(',')).join('\n');
  
  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `Opti-Vision-Dashboard-Export-${timestamp}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}; 
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAppStore } from "@/lib/store";
import { X, Save, Plus, Calculator } from "lucide-react";
import { Customer, Order } from "@/types/types";

interface OrderFormProps {
  order?: Order;
  onClose: () => void;
  onSave: () => void;
}

export const OrderForm = ({ order, onClose, onSave }: OrderFormProps) => {
  const { toast } = useToast();
  const { addOrder, updateOrder, customers, getCustomer } = useAppStore();

  const [formData, setFormData] = useState({
    customerId: order?.customerId || "",
    customerName: order?.customerName || "",
    customerPhone: order?.customerPhone || "",
    status: order?.status || ("pending" as const),
    orderDate: order?.orderDate || new Date().toISOString().split("T")[0],
    expectedDelivery: order?.expectedDelivery || "",
    frameDetails: order?.frameDetails || "",
    lensType: order?.lensType || "",
    totalAmount: order?.totalAmount || 0,
    advancePaid: order?.advancePaid || 0,
    balanceDue: order?.balanceDue || 0,
    prescription: {
      leftEye: order?.prescription?.leftEye || "",
      rightEye: order?.prescription?.rightEye || "",
      pd: order?.prescription?.pd || "",
      notes: order?.prescription?.notes || "",
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  useEffect(() => {
    if (formData.customerId) {
      const customer = getCustomer(formData.customerId);
      if (customer) {
        setSelectedCustomer(customer);
        setFormData((prev) => ({
          ...prev,
          customerName: customer.name,
          customerPhone: customer.phone,
          prescription: {
            leftEye: customer.prescription?.leftEye || "",
            rightEye: customer.prescription?.rightEye || "",
            pd: customer.prescription?.pd || "",
            notes: customer.prescription?.notes || "",
          },
        }));
      }
    }
  }, [formData.customerId, getCustomer]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerId) newErrors.customerId = "Customer is required";
    if (!formData.frameDetails.trim())
      newErrors.frameDetails = "Frame details are required";
    if (!formData.lensType.trim()) newErrors.lensType = "Lens type is required";
    if (!formData.expectedDelivery)
      newErrors.expectedDelivery = "Expected delivery date is required";
    if (formData.totalAmount <= 0)
      newErrors.totalAmount = "Total amount must be greater than 0";
    if (formData.advancePaid < 0)
      newErrors.advancePaid = "Advance paid cannot be negative";
    if (formData.advancePaid > formData.totalAmount) {
      newErrors.advancePaid = "Advance paid cannot exceed total amount";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateBalance = () => {
    const balance = formData.totalAmount - formData.advancePaid;
    setFormData((prev) => ({ ...prev, balanceDue: Math.max(0, balance) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const orderData = {
        ...formData,
        balanceDue: formData.totalAmount - formData.advancePaid,
      };

      if (order) {
        updateOrder(order.id, orderData);
        toast({
          title: "Order Updated",
          description: "Order has been updated successfully.",
        });
      } else {
        addOrder(orderData);
        toast({
          title: "Order Created",
          description: "New order has been created successfully.",
        });
      }

      onSave();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save order. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handlePrescriptionChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      prescription: { ...prev.prescription, [field]: value },
    }));
  };

  const handleCustomerSelect = (customerId: string) => {
    const customer = getCustomer(customerId);
    if (customer) {
      setSelectedCustomer(customer);
      setFormData((prev) => ({
        ...prev,
        customerId,
        customerName: customer.name,
        customerPhone: customer.phone,
        prescription: {
          leftEye: customer.prescription?.leftEye || "",
          rightEye: customer.prescription?.rightEye || "",
          pd: customer.prescription?.pd || "",
          notes: customer.prescription?.notes || "",
        },
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="card-professional w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              {order ? "Edit Order" : "Create New Order"}
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Customer Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerId">Select Customer *</Label>
                  <Select
                    value={formData.customerId}
                    onValueChange={handleCustomerSelect}
                  >
                    <SelectTrigger
                      className={errors.customerId ? "border-destructive" : ""}
                    >
                      <SelectValue placeholder="Choose a customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.name} - {customer.phone}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.customerId && (
                    <p className="text-sm text-destructive">
                      {errors.customerId}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Order Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: Order["status"]) =>
                      handleInputChange("status", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="in-lab">In Lab</SelectItem>
                      <SelectItem value="ready">Ready</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="orderDate">Order Date</Label>
                  <Input
                    id="orderDate"
                    type="date"
                    value={formData.orderDate}
                    onChange={(e) =>
                      handleInputChange("orderDate", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expectedDelivery">Expected Delivery *</Label>
                  <Input
                    id="expectedDelivery"
                    type="date"
                    value={formData.expectedDelivery}
                    onChange={(e) =>
                      handleInputChange("expectedDelivery", e.target.value)
                    }
                    className={
                      errors.expectedDelivery ? "border-destructive" : ""
                    }
                  />
                  {errors.expectedDelivery && (
                    <p className="text-sm text-destructive">
                      {errors.expectedDelivery}
                    </p>
                  )}
                </div>
              </div>

              {selectedCustomer && (
                <div className="p-3 bg-muted/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Selected Customer:</strong> {selectedCustomer.name}{" "}
                    | {selectedCustomer.phone}
                    {selectedCustomer.email && ` | ${selectedCustomer.email}`}
                  </p>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Product Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="frameDetails">Frame Details *</Label>
                  <Input
                    id="frameDetails"
                    value={formData.frameDetails}
                    onChange={(e) =>
                      handleInputChange("frameDetails", e.target.value)
                    }
                    placeholder="Brand, Model, Color, Size"
                    className={errors.frameDetails ? "border-destructive" : ""}
                  />
                  {errors.frameDetails && (
                    <p className="text-sm text-destructive">
                      {errors.frameDetails}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lensType">Lens Type *</Label>
                  <Input
                    id="lensType"
                    value={formData.lensType}
                    onChange={(e) =>
                      handleInputChange("lensType", e.target.value)
                    }
                    placeholder="Single Vision, Progressive, Bifocal + Coatings"
                    className={errors.lensType ? "border-destructive" : ""}
                  />
                  {errors.lensType && (
                    <p className="text-sm text-destructive">
                      {errors.lensType}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Prescription Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Prescription Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="leftEye">Left Eye</Label>
                  <Input
                    id="leftEye"
                    value={formData.prescription.leftEye}
                    onChange={(e) =>
                      handlePrescriptionChange("leftEye", e.target.value)
                    }
                    placeholder="-2.50 -0.75 x 90"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rightEye">Right Eye</Label>
                  <Input
                    id="rightEye"
                    value={formData.prescription.rightEye}
                    onChange={(e) =>
                      handlePrescriptionChange("rightEye", e.target.value)
                    }
                    placeholder="-2.25 -0.50 x 85"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pd">PD</Label>
                  <Input
                    id="pd"
                    value={formData.prescription.pd}
                    onChange={(e) =>
                      handlePrescriptionChange("pd", e.target.value)
                    }
                    placeholder="62mm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Prescription Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.prescription.notes}
                  onChange={(e) =>
                    handlePrescriptionChange("notes", e.target.value)
                  }
                  placeholder="Additional notes about prescription preferences, lens coatings, etc."
                  rows={2}
                />
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Pricing</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="totalAmount">Total Amount *</Label>
                  <Input
                    id="totalAmount"
                    type="number"
                    value={formData.totalAmount}
                    onChange={(e) =>
                      handleInputChange(
                        "totalAmount",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    placeholder="0"
                    className={errors.totalAmount ? "border-destructive" : ""}
                  />
                  {errors.totalAmount && (
                    <p className="text-sm text-destructive">
                      {errors.totalAmount}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="advancePaid">Advance Paid</Label>
                  <Input
                    id="advancePaid"
                    type="number"
                    value={formData.advancePaid}
                    onChange={(e) =>
                      handleInputChange(
                        "advancePaid",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    placeholder="0"
                    className={errors.advancePaid ? "border-destructive" : ""}
                  />
                  {errors.advancePaid && (
                    <p className="text-sm text-destructive">
                      {errors.advancePaid}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="balanceDue">Balance Due</Label>
                  <Input
                    id="balanceDue"
                    type="number"
                    value={formData.balanceDue}
                    readOnly
                    className="bg-muted"
                  />
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={calculateBalance}
                className="flex items-center space-x-2"
              >
                <Calculator className="h-4 w-4" />
                <span>Calculate Balance</span>
              </Button>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="gradient-primary">
                {order ? (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Update Order
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Order
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

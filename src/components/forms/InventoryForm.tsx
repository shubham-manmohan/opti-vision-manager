import { useState } from "react";
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
import { X, Save, Package, TrendingUp } from "lucide-react";
import { InventoryItem } from "@/types/types";

interface InventoryFormProps {
  item?: InventoryItem;
  onClose: () => void;
  onSave: () => void;
}

export const InventoryForm = ({
  item,
  onClose,
  onSave,
}: InventoryFormProps) => {
  const { toast } = useToast();
  const { addInventoryItem, updateInventoryItem } = useAppStore();

  const [formData, setFormData] = useState({
    itemCode: item?.itemCode || "",
    brand: item?.brand || "",
    model: item?.model || "",
    category: item?.category || ("frame" as const),
    type: item?.type || "",
    color: item?.color || "",
    size: item?.size || "",
    costPrice: item?.costPrice || 0,
    sellingPrice: item?.sellingPrice || 0,
    currentStock: item?.currentStock || 0,
    reorderLevel: item?.reorderLevel || 0,
    supplier: item?.supplier || "",
    lastRestocked:
      item?.lastRestocked || new Date().toISOString().split("T")[0],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.itemCode.trim()) newErrors.itemCode = "Item code is required";
    if (!formData.brand.trim()) newErrors.brand = "Brand is required";
    if (!formData.model.trim()) newErrors.model = "Model is required";
    if (!formData.type.trim()) newErrors.type = "Type is required";
    if (formData.costPrice <= 0)
      newErrors.costPrice = "Cost price must be greater than 0";
    if (formData.sellingPrice <= 0)
      newErrors.sellingPrice = "Selling price must be greater than 0";
    if (formData.sellingPrice < formData.costPrice) {
      newErrors.sellingPrice = "Selling price cannot be less than cost price";
    }
    if (formData.currentStock < 0)
      newErrors.currentStock = "Current stock cannot be negative";
    if (formData.reorderLevel < 0)
      newErrors.reorderLevel = "Reorder level cannot be negative";
    if (!formData.supplier.trim()) newErrors.supplier = "Supplier is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateMargin = () => {
    if (formData.costPrice > 0 && formData.sellingPrice > 0) {
      return (
        ((formData.sellingPrice - formData.costPrice) / formData.costPrice) *
        100
      ).toFixed(1);
    }
    return "0";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (item) {
        updateInventoryItem(item.id, formData);
        toast({
          title: "Item Updated",
          description: "Inventory item has been updated successfully.",
        });
      } else {
        addInventoryItem(formData);
        toast({
          title: "Item Added",
          description: "New inventory item has been added successfully.",
        });
      }

      onSave();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save item. Please try again.",
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

  const generateItemCode = () => {
    const brand = formData.brand.substring(0, 3).toUpperCase();
    const model = formData.model.substring(0, 4).toUpperCase();
    const category = formData.category.substring(0, 1).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    const newCode = `${brand}-${model}-${category}-${random}`;
    setFormData((prev) => ({ ...prev, itemCode: newCode }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="card-professional w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              {item ? "Edit Inventory Item" : "Add New Inventory Item"}
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="itemCode">Item Code *</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="itemCode"
                      value={formData.itemCode}
                      onChange={(e) =>
                        handleInputChange("itemCode", e.target.value)
                      }
                      placeholder="RB-2140-BLK-54"
                      className={errors.itemCode ? "border-destructive" : ""}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={generateItemCode}
                      className="whitespace-nowrap"
                    >
                      Generate
                    </Button>
                  </div>
                  {errors.itemCode && (
                    <p className="text-sm text-destructive">
                      {errors.itemCode}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value: "frame" | "lens" | "accessory") =>
                      handleInputChange("category", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frame">Frame</SelectItem>
                      <SelectItem value="lens">Lens</SelectItem>
                      <SelectItem value="accessory">Accessory</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brand">Brand *</Label>
                  <Input
                    id="brand"
                    value={formData.brand}
                    onChange={(e) => handleInputChange("brand", e.target.value)}
                    placeholder="Ray-Ban, Oakley, Essilor"
                    className={errors.brand ? "border-destructive" : ""}
                  />
                  {errors.brand && (
                    <p className="text-sm text-destructive">{errors.brand}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model">Model *</Label>
                  <Input
                    id="model"
                    value={formData.model}
                    onChange={(e) => handleInputChange("model", e.target.value)}
                    placeholder="RB2140, OX8156, Varilux"
                    className={errors.model ? "border-destructive" : ""}
                  />
                  {errors.model && (
                    <p className="text-sm text-destructive">{errors.model}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Type *</Label>
                  <Input
                    id="type"
                    value={formData.type}
                    onChange={(e) => handleInputChange("type", e.target.value)}
                    placeholder="Full Rim, Progressive, Protective Case"
                    className={errors.type ? "border-destructive" : ""}
                  />
                  {errors.type && (
                    <p className="text-sm text-destructive">{errors.type}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    value={formData.color}
                    onChange={(e) => handleInputChange("color", e.target.value)}
                    placeholder="Black, Silver, Brown"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="size">Size</Label>
                  <Input
                    id="size"
                    value={formData.size}
                    onChange={(e) => handleInputChange("size", e.target.value)}
                    placeholder="54mm, 56mm, 58mm"
                  />
                </div>
              </div>
            </div>

            {/* Pricing Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Pricing Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="costPrice">Cost Price *</Label>
                  <Input
                    id="costPrice"
                    type="number"
                    value={formData.costPrice}
                    onChange={(e) =>
                      handleInputChange(
                        "costPrice",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    placeholder="0"
                    className={errors.costPrice ? "border-destructive" : ""}
                  />
                  {errors.costPrice && (
                    <p className="text-sm text-destructive">
                      {errors.costPrice}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sellingPrice">Selling Price *</Label>
                  <Input
                    id="sellingPrice"
                    type="number"
                    value={formData.sellingPrice}
                    onChange={(e) =>
                      handleInputChange(
                        "sellingPrice",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    placeholder="0"
                    className={errors.sellingPrice ? "border-destructive" : ""}
                  />
                  {errors.sellingPrice && (
                    <p className="text-sm text-destructive">
                      {errors.sellingPrice}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="margin">Profit Margin</Label>
                  <Input
                    id="margin"
                    value={`${calculateMargin()}%`}
                    readOnly
                    className="bg-muted"
                  />
                </div>
              </div>

              {formData.costPrice > 0 && formData.sellingPrice > 0 && (
                <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center space-x-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="font-medium text-foreground">
                      Profit: ₹
                      {(
                        formData.sellingPrice - formData.costPrice
                      ).toLocaleString()}
                    </span>
                    <span className="text-muted-foreground">
                      (Margin: {calculateMargin()}%)
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Stock Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Stock Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentStock">Current Stock</Label>
                  <Input
                    id="currentStock"
                    type="number"
                    value={formData.currentStock}
                    onChange={(e) =>
                      handleInputChange(
                        "currentStock",
                        parseInt(e.target.value) || 0
                      )
                    }
                    placeholder="0"
                    className={errors.currentStock ? "border-destructive" : ""}
                  />
                  {errors.currentStock && (
                    <p className="text-sm text-destructive">
                      {errors.currentStock}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reorderLevel">Reorder Level</Label>
                  <Input
                    id="reorderLevel"
                    type="number"
                    value={formData.reorderLevel}
                    onChange={(e) =>
                      handleInputChange(
                        "reorderLevel",
                        parseInt(e.target.value) || 0
                      )
                    }
                    placeholder="0"
                    className={errors.reorderLevel ? "border-destructive" : ""}
                  />
                  {errors.reorderLevel && (
                    <p className="text-sm text-destructive">
                      {errors.reorderLevel}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastRestocked">Last Restocked</Label>
                  <Input
                    id="lastRestocked"
                    type="date"
                    value={formData.lastRestocked}
                    onChange={(e) =>
                      handleInputChange("lastRestocked", e.target.value)
                    }
                  />
                </div>
              </div>

              {formData.currentStock <= formData.reorderLevel &&
                formData.currentStock > 0 && (
                  <div className="p-3 bg-warning/10 rounded-lg border border-warning/20">
                    <p className="text-sm text-warning font-medium">
                      ⚠️ Low stock alert: Current stock ({formData.currentStock}
                      ) is at or below reorder level ({formData.reorderLevel})
                    </p>
                  </div>
                )}

              {formData.currentStock === 0 && (
                <div className="p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                  <p className="text-sm text-destructive font-medium">
                    🚫 Out of stock: Current stock is 0
                  </p>
                </div>
              )}
            </div>

            {/* Supplier Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Supplier Information
              </h3>

              <div className="space-y-2">
                <Label htmlFor="supplier">Supplier *</Label>
                <Input
                  id="supplier"
                  value={formData.supplier}
                  onChange={(e) =>
                    handleInputChange("supplier", e.target.value)
                  }
                  placeholder="Luxottica India, Essilor India"
                  className={errors.supplier ? "border-destructive" : ""}
                />
                {errors.supplier && (
                  <p className="text-sm text-destructive">{errors.supplier}</p>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="gradient-primary">
                {item ? (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Update Item
                  </>
                ) : (
                  <>
                    <Package className="mr-2 h-4 w-4" />
                    Add Item
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

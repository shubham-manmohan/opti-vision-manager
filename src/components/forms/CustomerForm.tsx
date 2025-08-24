import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Customer, useAppStore } from '@/lib/store';
import { X, Save, UserPlus } from 'lucide-react';

interface CustomerFormProps {
  customer?: Customer;
  onClose: () => void;
  onSave: () => void;
}

export const CustomerForm = ({ customer, onClose, onSave }: CustomerFormProps) => {
  const { toast } = useToast();
  const { addCustomer, updateCustomer } = useAppStore();
  
  const [formData, setFormData] = useState({
    name: customer?.name || '',
    phone: customer?.phone || '',
    email: customer?.email || '',
    location: customer?.location || '',
    status: customer?.status || 'active' as const,
    prescription: {
      leftEye: customer?.prescription?.leftEye || '',
      rightEye: customer?.prescription?.rightEye || '',
      pd: customer?.prescription?.pd || '',
      notes: customer?.prescription?.notes || ''
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const customerData = {
        ...formData,
        lastVisit: customer?.lastVisit || new Date().toISOString(),
        totalOrders: customer?.totalOrders || 0
      };

      if (customer) {
        updateCustomer(customer.id, customerData);
        toast({
          title: "Customer Updated",
          description: "Customer information has been updated successfully.",
        });
      } else {
        addCustomer(customerData);
        toast({
          title: "Customer Added",
          description: "New customer has been added successfully.",
        });
      }
      
      onSave();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save customer. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePrescriptionChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      prescription: { ...prev.prescription, [field]: value }
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="card-professional w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              {customer ? 'Edit Customer' : 'Add New Customer'}
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter full name"
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+91 98765 43210"
                    className={errors.phone ? 'border-destructive' : ''}
                  />
                  {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="customer@email.com"
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="City, Area"
                    className={errors.location ? 'border-destructive' : ''}
                  />
                  {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: 'active' | 'inactive' | 'vip') => 
                      handleInputChange('status', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="vip">VIP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Prescription Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Prescription Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="leftEye">Left Eye (SPH CYL AXIS)</Label>
                  <Input
                    id="leftEye"
                    value={formData.prescription.leftEye}
                    onChange={(e) => handlePrescriptionChange('leftEye', e.target.value)}
                    placeholder="-2.50 -0.75 x 90"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rightEye">Right Eye (SPH CYL AXIS)</Label>
                  <Input
                    id="rightEye"
                    value={formData.prescription.rightEye}
                    onChange={(e) => handlePrescriptionChange('rightEye', e.target.value)}
                    placeholder="-2.25 -0.50 x 85"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pd">Pupillary Distance (PD)</Label>
                  <Input
                    id="pd"
                    value={formData.prescription.pd}
                    onChange={(e) => handlePrescriptionChange('pd', e.target.value)}
                    placeholder="62mm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Prescription Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.prescription.notes}
                  onChange={(e) => handlePrescriptionChange('notes', e.target.value)}
                  placeholder="Additional notes about prescription preferences, lens coatings, etc."
                  rows={3}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="gradient-primary">
                {customer ? (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Update Customer
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Customer
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
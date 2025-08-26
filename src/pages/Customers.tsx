import { useState } from "react";
import MobileLayout from "@/components/layout/MobileLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CustomerForm } from "@/components/forms/CustomerForm";

import {
  Search,
  UserPlus,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Eye,
  Filter,
  Edit,
  Trash2,
  Download,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { exportToCSV, formatCustomerForExport } from "@/lib/exportUtils";
import { deleteCustomerApi, getCustomersApi } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Customer } from "@/types/types";

const Customers = () => {
  const {
    data: customers = [],
    isLoading,
    isError,
    error,
  } = useQuery<Customer[]>({
    queryKey: ["customers"],
    queryFn: getCustomersApi,
  });

  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<
    (typeof customers)[0] | null
  >(null);
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery);

    const matchesStatus =
      statusFilter === "all" ? true : c.status === statusFilter;

    return matchesSearch && matchesStatus;
  });
  const handleAddCustomer = () => {
    setEditingCustomer(null);
    setShowForm(true);
  };

  const handleEditCustomer = (customer: (typeof customers)[0]) => {
    setEditingCustomer(customer);
    setShowForm(true);
  };

  const queryClient = useQueryClient();
  const { mutate: deleteCustomer } = useMutation({
    mutationFn: deleteCustomerApi, // backend delete call
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast({
        title: "Customer Deleted",
        description: "Customer has been deleted successfully.",
      });
    },
    onError: (err: Error) => {
      toast({
        title: "Error",
        description: err.message || "Failed to delete customer",
        variant: "destructive",
      });
    },
  });

  const handleDeleteCustomer = (customerId: string) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      deleteCustomer(customerId);
      toast({
        title: "Customer Deleted",
        description: "Customer has been deleted successfully.",
      });
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingCustomer(null);
  };

  const handleFormSave = () => {
    setShowForm(false);
    setEditingCustomer(null);
  };

  const handleExportCustomers = () => {
    try {
      const formattedData = formatCustomerForExport(customers);
      exportToCSV(
        formattedData,
        `Opti-Vision-Customers-${new Date().toISOString().split("T")[0]}`
      );
      toast({
        title: "Export Successful",
        description: `${customers.length} customers exported to CSV`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export customers data",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "vip":
        return (
          <Badge className="bg-primary/10 text-primary border-primary/20">
            VIP
          </Badge>
        );
      case "active":
        return (
          <Badge
            variant="secondary"
            className="bg-success/10 text-success border-success/20"
          >
            Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge variant="secondary" className="bg-muted text-muted-foreground">
            Inactive
          </Badge>
        );
      default:
        return null;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  return (
    <MobileLayout title="Customers">
      {/* Search and Actions */}
      <Card className="card-professional p-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search customers by name or phone..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {showFilters && (
            <div className="p-3 bg-muted/20 rounded-lg border border-border/50">
              <div className="flex space-x-2 overflow-x-auto pb-2">
                <Badge
                  variant={statusFilter === "all" ? "default" : "secondary"}
                  className="whitespace-nowrap cursor-pointer"
                  onClick={() => setStatusFilter("all")}
                >
                  All ({customers.length})
                </Badge>
                <Badge
                  variant={statusFilter === "active" ? "default" : "secondary"}
                  className="whitespace-nowrap cursor-pointer"
                  onClick={() => setStatusFilter("active")}
                >
                  Active (
                  {customers.filter((c) => c.status === "active").length})
                </Badge>
                <Badge
                  variant={statusFilter === "vip" ? "default" : "secondary"}
                  className="whitespace-nowrap cursor-pointer"
                  onClick={() => setStatusFilter("vip")}
                >
                  VIP ({customers.filter((c) => c.status === "vip").length})
                </Badge>
                <Badge
                  variant={
                    statusFilter === "inactive" ? "default" : "secondary"
                  }
                  className="whitespace-nowrap cursor-pointer"
                  onClick={() => setStatusFilter("inactive")}
                >
                  Inactive (
                  {customers.filter((c) => c.status === "inactive").length})
                </Badge>
              </div>
            </div>
          )}

          <div className="flex space-x-2">
            <Button
              className="flex-1 gradient-primary"
              onClick={handleAddCustomer}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Add New Customer
            </Button>
            <Button
              variant="outline"
              onClick={handleExportCustomers}
              disabled={customers.length === 0}
              className="px-3"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Customer List */}
      <div className="space-y-4">
        {filteredCustomers.length === 0 ? (
          <Card className="card-professional p-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl">👥</div>
              <h3 className="text-lg font-semibold text-foreground">
                No customers found
              </h3>
              <p className="text-muted-foreground">
                {searchQuery
                  ? "Try adjusting your search terms"
                  : "Add your first customer to get started"}
              </p>
            </div>
          </Card>
        ) : (
          filteredCustomers.map((customer) => (
            <Card key={customer.id} className="card-professional p-4">
              <div className="flex items-start space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {getInitials(customer.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-foreground truncate">
                      {customer.name}
                    </h3>
                    {getStatusBadge(customer.status)}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{customer.phone}</span>
                    </div>

                    {customer.email && (
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span className="truncate">{customer.email}</span>
                      </div>
                    )}

                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="truncate">{customer.location}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>
                          Last visit:{" "}
                          {new Date(customer.lastVisit).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-primary font-medium">
                        {customer.totalOrders} orders
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleEditCustomer(customer)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteCustomer(customer.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Load More */}
      {filteredCustomers.length > 0 && (
        <Card className="card-professional p-4">
          <div className="text-center text-sm text-muted-foreground">
            Showing {filteredCustomers.length} of {customers.length} customers
          </div>
        </Card>
      )}

      {/* Customer Form Modal */}
      {showForm && (
        <CustomerForm
          customer={editingCustomer || undefined}
          onClose={handleFormClose}
          onSave={handleFormSave}
        />
      )}
    </MobileLayout>
  );
};

export default Customers;

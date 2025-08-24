import MobileLayout from "@/components/layout/MobileLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Search, 
  UserPlus, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  Eye,
  Filter
} from "lucide-react";

interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  location: string;
  lastVisit: string;
  totalOrders: number;
  status: 'active' | 'inactive' | 'vip';
  profilePicture?: string;
}

const Customers = () => {
  const customers: Customer[] = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      email: 'rajesh.k@email.com',
      location: 'Connaught Place, Delhi',
      lastVisit: '2024-01-20',
      totalOrders: 5,
      status: 'vip'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      phone: '+91 87654 32109',
      location: 'Karol Bagh, Delhi',
      lastVisit: '2024-01-18',
      totalOrders: 2,
      status: 'active'
    },
    {
      id: '3',
      name: 'Amit Singh',
      phone: '+91 76543 21098',
      email: 'amit.singh@email.com',
      location: 'Lajpat Nagar, Delhi',
      lastVisit: '2024-01-15',
      totalOrders: 8,
      status: 'vip'
    },
    {
      id: '4',
      name: 'Meera Patel',
      phone: '+91 65432 10987',
      location: 'CP Metro Station, Delhi',
      lastVisit: '2024-01-10',
      totalOrders: 1,
      status: 'active'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'vip':
        return <Badge className="bg-primary/10 text-primary border-primary/20">VIP</Badge>;
      case 'active':
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20">Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary" className="bg-muted text-muted-foreground">Inactive</Badge>;
      default:
        return null;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
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
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          <Button className="w-full gradient-primary">
            <UserPlus className="mr-2 h-4 w-4" />
            Add New Customer
          </Button>
        </div>
      </Card>

      {/* Customer List */}
      <div className="space-y-4">
        {customers.map((customer) => (
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
                      <span>Last visit: {new Date(customer.lastVisit).toLocaleDateString()}</span>
                    </div>
                    <div className="text-primary font-medium">
                      {customer.totalOrders} orders
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="mr-2 h-4 w-4" />
                    View Profile
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <Card className="card-professional p-4">
        <Button variant="outline" className="w-full">
          Load More Customers
        </Button>
      </Card>
    </MobileLayout>
  );
};

export default Customers;
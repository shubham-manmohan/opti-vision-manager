import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  FileText,
  Users,
  ClipboardList,
  Database,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import {
  exportToCSV,
  formatCustomerForExport,
  formatOrderForExport,
  exportDashboardData,
} from "@/lib/exportUtils";

const ExportSection = () => {
  const { customers, orders } = useAppStore();
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);

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

  const handleExportOrders = () => {
    try {
      const formattedData = formatOrderForExport(orders);
      exportToCSV(
        formattedData,
        `Opti-Vision-Orders-${new Date().toISOString().split("T")[0]}`
      );
      toast({
        title: "Export Successful",
        description: `${orders.length} orders exported to CSV`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export orders data",
        variant: "destructive",
      });
    }
  };

  const handleExportAll = async () => {
    setIsExporting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 100)); // Small delay for UX
      exportDashboardData(customers, orders);
      toast({
        title: "Full Export Successful",
        description: `All data exported to CSV (${customers.length} customers, ${orders.length} orders)`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export all data",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const getDataStatus = () => {
    const totalItems = customers.length + orders.length;
    const hasData = totalItems > 0;

    return {
      hasData,
      totalItems,
      customersCount: customers.length,
      ordersCount: orders.length,
    };
  };

  const dataStatus = getDataStatus();

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Database className="h-5 w-5 text-blue-600" />
          Data Export Center
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Data Status Overview */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="text-center p-2 bg-blue-50 rounded-lg">
            <div className="text-lg font-semibold text-blue-600">
              {dataStatus.customersCount}
            </div>
            <div className="text-xs text-gray-600">Customers</div>
          </div>
          <div className="text-center p-2 bg-green-50 rounded-lg">
            <div className="text-lg font-semibold text-green-600">
              {dataStatus.ordersCount}
            </div>
            <div className="text-xs text-gray-600">Orders</div>
          </div>
        </div>

        {/* Export Options */}
        <div className="space-y-3">
          {/* Individual Export Buttons */}
          <div className="grid grid-cols-1 gap-2">
            <Button
              onClick={handleExportCustomers}
              variant="outline"
              className="justify-start"
              disabled={customers.length === 0}
            >
              <Users className="h-4 w-4 mr-2" />
              Export Customers ({customers.length})
            </Button>

            <Button
              onClick={handleExportOrders}
              variant="outline"
              className="justify-start"
              disabled={orders.length === 0}
            >
              <ClipboardList className="h-4 w-4 mr-2" />
              Export Orders ({orders.length})
            </Button>
          </div>

          {/* Full Export Button */}
          <Button
            onClick={handleExportAll}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            disabled={!dataStatus.hasData || isExporting}
          >
            <Download className="h-4 w-4 mr-2" />
            {isExporting
              ? "Exporting..."
              : `Export All Data (${dataStatus.totalItems} items)`}
          </Button>
        </div>

        {/* Export Info */}
        <div className="text-xs text-gray-500 space-y-1">
          <div className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3 text-green-500" />
            CSV format with proper headers
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3 text-green-500" />
            Automatic file naming with timestamps
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3 text-green-500" />
            Handles special characters properly
          </div>
          {!dataStatus.hasData && (
            <div className="flex items-center gap-1 text-amber-600">
              <AlertCircle className="h-3 w-3" />
              No data available for export
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExportSection;

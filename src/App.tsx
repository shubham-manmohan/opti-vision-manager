import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDataInitialization } from "./hooks/useDataInitialization";
import Index from "./pages/Index";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  useDataInitialization();
  
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/orders" element={<Orders />} />

      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/optics">
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { Toaster as Sonner, Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
 defaultOptions: {
  queries: {
   refetchOnWindowFocus: false,
   retry: 1,
  },
 },
});

const App = () => (
 <QueryClientProvider client={queryClient}>
  <TooltipProvider>
   <Toaster />
   <Sonner />
   <BrowserRouter basename="/github-explorer-repositories">
    <Routes>
     <Route path="/" element={<Index />} />
     <Route path="*" element={<NotFound />} />
    </Routes>
   </BrowserRouter>
  </TooltipProvider>
 </QueryClientProvider>
);

export default App;

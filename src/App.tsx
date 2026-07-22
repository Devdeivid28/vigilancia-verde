import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/DashboardLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import TecnovigilanciaForm from "./pages/TecnovigilanciaForm";
import FarmacovigilanciaForm from "./pages/FarmacovigilanciaForm";
import HemovigilanciaForm from "./pages/HemovigilanciaForm";
import SaneantesForm from "./pages/SaneantesForm";
import QuedasForm from "./pages/QuedasForm";
import IdentificacaoForm from "./pages/IdentificacaoForm";
import LesaoPeleForm from "./pages/LesaoPeleForm";
import CirurgiaSeguraForm from "./pages/CirurgiaSeguraForm";
import Dashboard from "./pages/Dashboard";
import Pendentes from "./pages/Pendentes";
import Respondidas from "./pages/Respondidas";
import Arquivadas from "./pages/Arquivadas";
import Pesquisa from "./pages/Pesquisa";
import Configuracoes from "./pages/Configuracoes";
import Usuarios from "./pages/Usuarios";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/tecnovigilancia/form" element={<TecnovigilanciaForm />} />
            <Route path="/farmacovigilancia/form" element={<FarmacovigilanciaForm />} />
            <Route path="/hemovigilancia/form" element={<HemovigilanciaForm />} />
            <Route path="/saneantes/form" element={<SaneantesForm />} />
            <Route path="/quedas/form" element={<QuedasForm />} />
            <Route path="/identificacao/form" element={<IdentificacaoForm />} />
            <Route path="/lesao-pele/form" element={<LesaoPeleForm />} />
            <Route path="/cirurgia-segura/form" element={<CirurgiaSeguraForm />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/dashboard/pendentes" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Pendentes />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/dashboard/respondidas" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Respondidas />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/dashboard/arquivadas" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Arquivadas />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/dashboard/pesquisa" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Pesquisa />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/dashboard/configuracoes" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Configuracoes />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/dashboard/usuarios" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Usuarios />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            {/* Catch all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

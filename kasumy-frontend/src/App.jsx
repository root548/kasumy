import { Routes, Route, Navigate } from "react-router-dom";
import WelcomePage from "./pages/login/welcomepage";
import LoginPage from "./pages/login/login";
import DashboardPage from "./pages/dashboard/dashboard";
import ServiciosPage from "./pages/servicios/servicios";
import UsuariosPage from "./pages/usuarios/usuarios";
import CitasPage from "./pages/citas/citaspage";
import ClientesPage from "./pages/clientes/clientepage";
import ReportesPage from "./pages/reportes/reportes";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <Routes>
      {/* 1. RUTAS PÚBLICAS (Bienvenida primero) */}
      <Route path="/bienvenida" element={<WelcomePage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* 2. RUTAS PROTEGIDAS */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/servicios" element={<ServiciosPage />} />
          <Route path="/usuarios" element={<UsuariosPage />} />
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/reportes" element={<ReportesPage />} />
          <Route path="/citas" element={<CitasPage />} />
        </Route>
      </Route>

      {/* 3. REDIRECCIÓN: Si entran a la raíz (/), van a bienvenida */}
      <Route path="*" element={<Navigate to="/bienvenida" replace />} />
    </Routes>
  );
}

export default App;
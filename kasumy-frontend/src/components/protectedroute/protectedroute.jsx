import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ allowedRoles }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <p style={{ padding: "20px" }}>Verificando sesión...</p>;
    }

    // Si no hay usuario, lo devuelve al Login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // (Opcional) Si enviamos roles permitidos y el usuario no tiene ese rol
    if (allowedRoles && !allowedRoles.includes(user.rol)) {
        return <Navigate to="/acceso-denegado" replace />;
    }

    // Si todo está bien, muestra la página que el usuario quería ver
    return <Outlet />;
}
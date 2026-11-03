import { createContext, useContext, useEffect, useState } from "react";
import { apiRequest } from "../services/apiClient";
import { iniciarSesion, cerrarSesion } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Al cargar la página, revisa si ya había una sesión iniciada
    useEffect(() => {
        async function restaurarSesion() {
            const token = sessionStorage.getItem("kasumi_token");
            const userGuardado = sessionStorage.getItem("kasumi_user");

            if (!token || !userGuardado) {
                setLoading(false);
                return;
            }

            try {
                // Aquí podrías consultar a tu backend para validar el token
                // Por ahora, restauramos los datos del sessionStorage
                setUser(JSON.parse(userGuardado));
            } catch (error) {
                cerrarSesion();
            } finally {
                setLoading(false);
            }
        }
        restaurarSesion();
    }, []);

    const login = async (email, password) => {
        const userData = await iniciarSesion(email, password);
        setUser(userData);
    };

    const logout = () => {
        cerrarSesion();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook personalizado para usar la autenticación en cualquier componente
export const useAuth = () => useContext(AuthContext);
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./login.css";

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await login(email, password);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="login-page">
            {/* Contenedor para el efecto de luz neón */}
            <div className="login-box">
                <div className="login-card">
                    <form onSubmit={handleSubmit}>
                        <h1>🌸 KASUMY</h1>

                        <div className="input-group">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Usuario / Correo"
                            />
                        </div>

                        <div className="input-group">
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Contraseña"
                            />
                        </div>

                        {error && <p className="error-message">{error}</p>}

                        <button type="submit" disabled={loading} className="btn-login">
                            {loading ? "Ingresando..." : "Iniciar sesión"}
                        </button>

                        <div className="login-links">
                            <a href="#">Olvidé mi contraseña</a>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
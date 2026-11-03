import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react"; 


import "./Layout.css";

export default function Layout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [menuAbierto, setMenuAbierto] = useState(false);
    const location = useLocation(); // Para saber en qué página estamos
    const [busqueda, setBusqueda] = useState("");

    function handleLogout() {
        logout();
        navigate("/login");
    }

    // Función para saber si el enlace está activo
    const isActive = (path) => location.pathname === path;

    return (
        <div className="app-layout">
            {/* SIDEBAR (Menú Lateral)   */}
        
            <aside className={`sidebar ${menuAbierto ? "abierto" : ""}`}>
                <div className="logo">
                    <h1>🌸 Kasumy</h1>
                </div>

                <nav className="menu">
                    <ul>
                     

                        <li className={isActive("/dashboard") ? "active" : ""}>
                            <Link to="/dashboard" onClick={() => setMenuAbierto(false)}>📊 Dashboard</Link>
                        </li>
                        <li className={isActive("/citas") ? "active" : ""}>
                            <Link to="/citas" onClick={() => setMenuAbierto(false)}>📅 Citas</Link>
                        </li>
                        <li className={isActive("/clientes") ? "active" : ""}>
                            <Link to="/clientes" onClick={() => setMenuAbierto(false)}>👤 Clientes</Link>
                        </li>
                        <li className={isActive("/servicios") ? "active" : ""}>
                            <Link to="/servicios" onClick={() => setMenuAbierto(false)}>💅 Servicios</Link>
                        </li>
                        <li className={isActive("/reportes") ? "active" : ""}>
                            <Link to="/reportes" onClick={() => setMenuAbierto(false)}>📊 Reportes</Link>
                        </li>
                        <li className={isActive("/usuarios") ? "active" : ""}>
                            <Link to="/usuarios" onClick={() => setMenuAbierto(false)}>👥 Usuarios</Link>
                        </li>



                    </ul>
                </nav>

                <div className="logout">
                    <button onClick={handleLogout}>🚪 Cerrar sesión</button>
                </div>
            </aside>

            {/* CONTENIDO PRINCIPAL */}
            <div className="main-wrapper">
                {/* HEADER */}
                <header className="header">
                    <div className="header-left">
                        {/*boton  */}
                        <button className="menu-toggle" onClick={() => setMenuAbierto(!menuAbierto)}>
                            ☰
                        </button>

                        <span className="breadcrumb">Kasumi &gt; {location.pathname.replace("/", "")}</span>
                    </div>
                    {/*  barra de busqueda */}
                    <div className="header-right">
                        {/* AQUÍ VA EL NUEVO INPUT DE BÚSQUEDA */}
                        <input type="text"className="search"placeholder="🔍 Buscar..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)}/>
                        <div className="user-profile">
                            <span>👤 {user?.nombre || "Usuario"}</span>
                            <span className="dropdown">▼</span>
                        </div>
                    </div>

                </header>

                {/* CONTENIDO DE LA PÁGINA */}
                <main className="app-content">
                    <Outlet context={{ busqueda }} />
                </main>
            </div>
        </div>
    );
}
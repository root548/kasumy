import { useNavigate } from "react-router-dom";
import "./welcomepage.css";

export default function WelcomePage() {
    const navigate = useNavigate();

    return (
        <main className="welcome-page">
            <div className="welcome-box">
                {/* El botón que brilla */}
                <div
                    className="neon-button"
                    onClick={() => navigate("/login")}
                >
                    <span>🌸 LOGIN 🌸</span>
                </div>
            </div>
        </main>
    );
}
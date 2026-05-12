import { useState } from "react";
import api from "../services/api.js";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("client");

    const handleRegister = async () => {
        try {
            await api.post("/api/register/", {
                email,
                password,
                role,
            });
            alert("Registration successful! Please log in.");
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    return (
        <div className="auth-page">
            <div className="form-card">
                <h2>Регистрация</h2>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="client">Client</option>
                        <option value="contractor">Contractor</option>
                    </select>
                </div>
                <button type="button" className="button-primary" onClick={handleRegister}>
                    Register
                </button>
            </div>
        </div>
    );
}

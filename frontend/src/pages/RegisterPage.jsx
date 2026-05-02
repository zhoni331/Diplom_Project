import { useState } from "react";
import api from "../services/api.js";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            await api.post("/api/register/", {
                email,
                password,
            });
            alert("Registration successful! Please log in.");
        } catch (error) {
            console.error("Registration failed:", error);
            };

    };
    return (
        <div>
            <h2>Register</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <select onChange={(e) => setRole(e.target.value)}>
                <option value="client">Client</option>
                <option value="contractor">Contractor</option>
            </select>

            
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}
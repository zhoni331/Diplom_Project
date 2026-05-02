import { useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("LOGIN CLICKED"); // 👈 добавь
    try {
      const res = await api.post("/api/token/", {
        email,
        password,
      });

      console.log(res.data); // 👈 добавь

      login(res.data.access);
      navigate("/");
    } catch (err) {
      console.log("ERROR:", err); // 👈 добавь
      console.log(err);
      alert("Ошибка логина");
    }
  };

  return (
  <div style={{ 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    height: "100vh",
    flexDirection: "column",
    gap: "10px"
  }}>
    <h2>Login</h2>

    <input
      placeholder="email"
      onChange={(e) => setEmail(e.target.value)}
    />

    <input
      placeholder="password"
      type="password"
      onChange={(e) => setPassword(e.target.value)}
    />

    <button onClick={handleLogin}>Login</button>
  </div>
);
}
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
    console.log("LOGIN CLICKED");
    try {
      const res = await api.post("/api/token/", {
        email,
        password,
      });

      console.log(res.data);

      login(res.data.access);
      navigate("/");
      const me = await api.get("/api/me/");
      localStorage.setItem("user", JSON.stringify(me.data));
    } catch (err) {
      console.log("ERROR:", err);
      console.log(err);
      alert("Ошибка логина");
    }
  };

  return (
    <div className="auth-page">
      <div className="form-card">
        <h2>Вход</h2>
        <div className="form-group">
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" className="button-primary" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

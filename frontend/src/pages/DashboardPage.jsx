import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/api/me/")
      .then(res => {
        setUser(res.data);

        if (res.data.role === "client") {
          navigate("/client");
        } else {
          navigate("/contractor");
        }
      })
      .catch(err => console.log(err));
  }, []);

  return <div>Loading...</div>;
}
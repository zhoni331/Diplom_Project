import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function JobPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    setUser(u);

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const jobRes = await api.get(`/jobs/${id}/`);
      setJob(jobRes.data);

      const propRes = await api.get("/proposals/");
      setProposals(propRes.data);
    } catch (err) {
      console.error(err);
    }
  };
    const handleAccept = async (proposalId) => {
        try {
            await api.post(`/proposals/${proposalId}/accept/`);
            alert("Принято ✅");
            fetchData();
        } catch (err) {
            console.error(err.response?.data || err);
    }
  };
    const handleComplete = async () => {
        try {
            await api.post(`/jobs/${id}/COMPLETE/`);
            alert("Завершено ✅");
            fetchData();
        } catch (err) {
            console.error(err.response?.data || err);
    }
  };
    const [score, setScore] = useState(5);
    const [comment, setComment] = useState("");

  const handleRate = async () => {
    try {
      await api.post("/ratings/", {
        job: id,
        score,
        comment
      });
      alert("Оценка отправлена ⭐");
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };
    console.log("USER:", user);
    console.log("JOB:", job);

    if (!job) return <p>Loading...</p>;

  return (
    <div>
      <h2>{job.title}</h2>
      <p>{job.description}</p>
      <p>Status: {job.status}</p>

      {/* 🔥 COMPLETE */}
      {user?.role === "client" && job.status === "in_progress" && (
        <button onClick={handleComplete}>
          Завершить работу
        </button>
      )}

      {/* 🔥 PROPOSALS (только для клиента) */}
      {user?.role === "client" && (
        <div>
          <h3>Отклики</h3>

          {proposals
            .filter(p => p.job === job.id)
            .map(p => (
              <div key={p.id}>
                <p>{p.message}</p>
                <p>Цена: {p.price}</p>
                <p>Status: {p.status}</p>

                {p.status === "pending" && (
                  <button onClick={() => handleAccept(p.id)}>
                    Accept
                  </button>
                )}
              </div>
            ))}
        </div>
      )}

      {/* 🔥 RATING */}
      {user?.role === "client" && job.status === "completed" && (
        <div>
          <h3>Оценить исполнителя</h3>

          <input
            type="number"
            min="1"
            max="5"
            value={score}
            onChange={(e) => setScore(e.target.value)}
          />

          <textarea
            placeholder="Комментарий"
            onChange={(e) => setComment(e.target.value)}
          />

          <button onClick={handleRate}>
            Отправить оценку
          </button>
        </div>
      )}
    </div>
  );
}
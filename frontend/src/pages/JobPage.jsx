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
        comment,
      });
      alert("Оценка отправлена ⭐");
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  if (!job) return <p>Loading...</p>;

  return (
    <div className="page-shell">
      <article className="card">
        <h2>{job.title}</h2>
        <p>{job.description}</p>
        <div className="job-meta">
          <span className="status-pill">{job.status}</span>
        </div>

        {user?.role === "client" && job.status === "in_progress" && (
          <button type="button" className="button-primary" onClick={handleComplete}>
            Завершить работу
          </button>
        )}
      </article>

      {user?.role === "client" && (
        <section className="form-card section-block">
          <h3 className="section-title">Отклики</h3>
          {proposals
            .filter((p) => p.job === job.id)
            .map((p) => (
              <article key={p.id} className="card">
                <div className="proposal-row">
                  <p>{p.message}</p>
                  <p>Цена: {p.price}</p>
                  <p>Status: {p.status}</p>
                </div>
                {p.status === "pending" && (
                  <button type="button" className="button-primary" onClick={() => handleAccept(p.id)}>
                    Accept
                  </button>
                )}
              </article>
            ))}
        </section>
      )}

      {user?.role === "client" && job.status === "completed" && (
        <section className="form-card">
          <h3 className="section-title">Оценить исполнителя</h3>
          <div className="form-group">
            <input
              type="number"
              min="1"
              max="5"
              value={score}
              onChange={(e) => setScore(e.target.value)}
            />
          </div>
          <div className="form-group">
            <textarea
              placeholder="Комментарий"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <button type="button" className="button-primary" onClick={handleRate}>
            Отправить оценку
          </button>
        </section>
      )}
    </div>
  );
}

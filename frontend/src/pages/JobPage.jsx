import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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

      const propRes = await api.get("/proposals/", { params: { t: Date.now() } });
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
      alert("Оценка отправлена 🌟");
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
          {console.log('User role:', user?.role, 'Is client?', user?.role === "client")}
          {console.log('All proposals:', proposals)}
          {console.log('Job ID:', job?.id)}
          {proposals
            .filter((p) => {
              const match = p.job === job?.id;
              console.log('Checking proposal', p.id, '- job:', p.job, 'target job:', job?.id, 'match:', match);
              return match;
            })
            .map((p) => (
              <article key={p.id} className="card">
                <div className="proposal-row">
                  <p>Contractor: {p.contractor_email}</p>
                  <p>{p.message}</p>
                  <p>Цена: {p.price}</p>
                  <p>Status: {p.status}</p>
                </div>
                <div className="proposal-actions">
                  {console.log('Proposal data:', p)}
                  {p.contractor_id ? (
                    <Link to={`/contractor/${p.contractor_id}`} className="button-secondary">
                      View Profile
                    </Link>
                  ) : (
                    <span>No contractor_id</span>
                  )}
                  {p.status === "pending" && (
                    <button type="button" className="button-primary" onClick={() => handleAccept(p.id)}>
                      Accept
                    </button>
                  )}
                </div>
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

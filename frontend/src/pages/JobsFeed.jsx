import { useEffect, useState } from "react";
import { getMyJobs } from "../services/jobs";

export default function JobsFeed() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      console.log("FETCH START");
      const res = await getMyJobs();
      console.log("FETCH SUCCESS:", res);
      setJobs(res.data);
      console.log("API RESPONSE:", res.data);
    } catch (err) {
      console.log("FETCH ERROR:", err);
    }
  };

  return (
    <div className="page-shell">
      <h2 className="section-title">Доступные заказы</h2>
      <div className="jobs-grid">
        {jobs.map((job) => (
          <article key={job.id} className="card job-card">
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <div className="job-meta">
              <span>$ {job.budget}</span>
              <span className="status-pill">{job.status}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import { getMyJobs } from "../services/jobs";

export default function JobsFeed() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await getMyJobs();
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Доступные заказы</h2>

      {jobs.map((job) => (
        <div key={job.id} style={{ border: "1px solid gray", margin: 10 }}>
          <h3>{job.title}</h3>
          <p>{job.description}</p>
          <p>💰 {job.budget}</p>
          <p>📌 {job.status}</p>
        </div>
      ))}
    </div>
  );
}
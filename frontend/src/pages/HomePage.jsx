import { useEffect, useState } from "react";
import api from "../services/api";
import JobCard from "../components/JobCard";

export default function HomePage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api.get("/jobs/")
      .then((res) => setJobs(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="page-shell">
      <h1 className="page-title">Jobs</h1>
      <div className="jobs-grid">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}

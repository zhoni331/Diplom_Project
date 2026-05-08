import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import JobModal from '../components/JobModal';

export default function ClientDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJobId, setSelectedJobId] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get('/jobs/');
      setJobs(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleJobClick = (jobId) => {
    setSelectedJobId(jobId);
  };

  const handleCloseModal = () => {
    setSelectedJobId(null);
  };

  const handleComplete = () => {
    fetchJobs(); // Refresh list
  };

  if (loading) return <div className="page-shell"><p>Loading...</p></div>;

  return (
    <div className="page-shell">
      <h1 className="page-title">Client Dashboard</h1>

      <Link to="/create-job" className="btn-primary">Create New Job</Link>

      <h2>My Jobs</h2>
      <div className="jobs-list">
        {jobs.map(job => (
          <div key={job.id} className="job-card" onClick={() => handleJobClick(job.id)}>
            <h3>{job.title}</h3>
            <p>Status: {job.status}</p>
            <p>Budget: ${job.budget}</p>
          </div>
        ))}
      </div>

      {selectedJobId && (
        <JobModal
          jobId={selectedJobId}
          onClose={handleCloseModal}
          onComplete={handleComplete}
        />
      )}
    </div>
  );
}
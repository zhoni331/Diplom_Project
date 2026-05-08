import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import JobModal from '../components/JobModal';

export default function ContractorDashboard() {
  const [jobs, setJobs] = useState([]);
  const [myProposals, setMyProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJobId, setSelectedJobId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [jobsRes, proposalsRes] = await Promise.all([
        api.get('/jobs/?status=open'),
        api.get('/proposals/')
      ]);
      setJobs(jobsRes.data);
      setMyProposals(proposalsRes.data);
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

  if (loading) return <div className="page-shell"><p>Loading...</p></div>;

  return (
    <div className="page-shell">
      <h1 className="page-title">Contractor Dashboard</h1>

      <h2>Available Jobs</h2>
      <div className="jobs-list">
        {jobs.map(job => (
          <div key={job.id} className="job-card" onClick={() => handleJobClick(job.id)}>
            <h3>{job.title}</h3>
            <p>Budget: ${job.budget}</p>
            <Link to={`/jobs/${job.id}`} className="btn-secondary">View Details</Link>
          </div>
        ))}
      </div>

      <h2>My Proposals</h2>
      <div className="proposals-list">
        {myProposals.map(proposal => (
          <div key={proposal.id} className="proposal-card">
            <h3>{proposal.job_title || 'Job'}</h3>
            <p>Status: {proposal.status}</p>
            <p>Price: ${proposal.price}</p>
          </div>
        ))}
      </div>

      {selectedJobId && (
        <JobModal
          jobId={selectedJobId}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
import { useEffect, useState } from "react";
import api from "../services/api";

export default function MyProposalsPage() {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    try {
      const response = await api.get("/proposals/");
      setProposals(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page-shell">
      <h1 className="page-title">My Proposals</h1>

      <div className="proposals-grid">
        {proposals.map((proposal) => (
          <article key={proposal.id} className="card proposal-card">
            <div className="proposal-row">
              <p><strong>Job:</strong> {proposal.job}</p>
              <p><strong>Message:</strong> {proposal.message}</p>
              <p><strong>Price:</strong> {proposal.price}</p>
              <p><strong>Status:</strong> {proposal.status}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
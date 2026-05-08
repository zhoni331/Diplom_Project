import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

export default function ContractorProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/users/${id}/`)
      .then(res => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="page-shell"><p>Loading...</p></div>;
  if (!user) return <div className="page-shell"><p>User not found</p></div>;

  return (
    <div className="page-shell">
      <h1 className="page-title">Contractor Profile</h1>
      <div className="form-card">
        <h2>{user.email}</h2>
        <p><strong>Role:</strong> {user.role}</p>
        {user.role === 'contractor' && (
          <p><strong>Average Rating:</strong> {user.average_rating} ⭐</p>
        )}
      </div>
    </div>
  );
}
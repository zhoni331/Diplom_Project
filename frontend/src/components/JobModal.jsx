import { useState, useEffect } from 'react';
import api from '../services/api';

export default function JobModal({ jobId, onClose, onComplete }) {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  useEffect(() => {
    fetchJob();
  }, [jobId]);

  const fetchJob = async () => {
    try {
      const res = await api.get(`/jobs/${jobId}/`);
      setJob(res.data);
      // Check if rating exists
      const ratingRes = await api.get('/ratings/');
      const hasRating = ratingRes.data.some(r => r.job === jobId);
      setRatingSubmitted(hasRating);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    setCompleting(true);
    try {
      await api.post(`/jobs/${jobId}/complete/`);
      setJob({ ...job, status: 'completed' });
      onComplete && onComplete();
    } catch (err) {
      console.log(err);
    } finally {
      setCompleting(false);
    }
  };

  const handleRate = async () => {
    try {
      await api.post('/ratings/', {
        job: jobId,
        rating,
        comment,
      });
      setRatingSubmitted(true);
      alert('Rating submitted!');
    } catch (err) {
      console.log(err);
      alert('Не удалось отправить рейтинг. Проверьте, что вы авторизованы и работа в статусе In Progress.');
    }
  };

  if (loading) return <div className="modal-overlay" onClick={onClose}><div className="modal-content">Loading...</div></div>;

  if (!job) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>{job.title}</h2>
        <p><strong>Description:</strong> {job.description}</p>
        <p><strong>Budget:</strong> ${job.budget}</p>
        <p><strong>Status:</strong> {job.status}</p>
        <p><strong>Client:</strong> {job.client_email || 'Unknown'}</p>
        <p><strong>Created:</strong> {new Date(job.created_at).toLocaleDateString()}</p>

        {job.status === 'in_progress' && (
          <>
            <button
              onClick={handleComplete}
              disabled={!ratingSubmitted || completing}
              className="btn-primary"
            >
              {completing ? 'Completing...' : ratingSubmitted ? 'Complete Job' : 'Rate contractor first'}
            </button>

            {!ratingSubmitted && (
              <div className="rating-form">
                <h3>Rate the Contractor</h3>
                <label>
                  Rating:
                  <select value={rating} onChange={e => setRating(Number(e.target.value))}>
                    {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} ⭐</option>)}
                  </select>
                </label>
                <label>
                  Comment:
                  <textarea value={comment} onChange={e => setComment(e.target.value)} />
                </label>
                <button onClick={handleRate} className="btn-primary">Submit Rating</button>
              </div>
            )}
          </>
        )}

        {job.status === 'completed' && !ratingSubmitted && (
          <div className="rating-form">
            <h3>Rate the Contractor</h3>
            <label>
              Rating:
              <select value={rating} onChange={e => setRating(Number(e.target.value))}>
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} ⭐</option>)}
              </select>
            </label>
            <label>
              Comment:
              <textarea value={comment} onChange={e => setComment(e.target.value)} />
            </label>
            <button onClick={handleRate} className="btn-primary">Submit Rating</button>
          </div>
        )}

        <button onClick={onClose} className="btn-secondary">Close</button>
      </div>
    </div>
  );
}
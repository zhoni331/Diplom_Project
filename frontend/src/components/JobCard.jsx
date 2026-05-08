
import { useNavigate } from "react-router-dom";
import { createProposal } from "../services/proposal";
import { useState } from "react";

export default function JobCard({ job }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");
  const [showform, setShowForm] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const isContractor = user?.role === "contractor";

  const handleApply = async () => {
    try {
      await createProposal(job.id, message, price);
      alert("Заявка отправлена");
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Ошибка при отправке заявки");
    }
  };

  return (
    <article className="card job-card">
      <div>
        <h3>{job.title}</h3>
        <p>{job.description}</p>
      </div>

      <div className="job-meta">
        <span className="status-pill">{job.status}</span>
        <span>💰 {job.budget}</span>
      </div>

      {isContractor && (
        <>
          {!showform ? (
            <div className="job-actions">
              <button type="button" className="button-primary" onClick={() => setShowForm(true)}>
                View Details
              </button>
            </div>
          ) : (
            <div className="form-card">
              <div className="form-group">
                <input
                  placeholder="Сообщение"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  placeholder="Цена"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="job-actions">
                <button type="button" className="button-primary" onClick={handleApply}>
                  Отправить
                </button>
                <button type="button" className="button-secondary" onClick={() => setShowForm(false)}>
                  Отмена
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </article>
  );
}



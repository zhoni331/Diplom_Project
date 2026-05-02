
import { useNavigate } from "react-router-dom";
import { createProposal } from "../services/proposal";
import { useState } from "react";

export default function JobCard({ job }) {
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");
  const handleApply = async () => {
    try {
      await createProposal(job.id, message, price);
      alert("Заявка отправлена");
    } catch (err) {
      console.error(err);
      alert("Ошибка при отправке заявки");
    }
  }
  const [showform, setShowForm] = useState(false);
  return (
    <div onClick={() => navigate(`/jobs/${job.id}`)}>
      <div style={{
      border: "1px solid #ccc",
      padding: "15px",
      margin: "10px",
      borderRadius: "10px"
    }}>
      <h3>{job.title}</h3>
      <p>{job.description}</p>
      <p><b>Status:</b> {job.status}</p>
      <p><b>Budget:</b> {job.budget}</p>

      {!showform ?(
        <button onClick={() => setShowForm(true)}>
          View Details
        </button>
      ) : (
        <>
          <input
            placeholder="Сообщение"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <input
            placeholder="Цена"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button onClick={handleApply}>Отправить</button>
        </>
      )}
      </div>
    </div>
  );
}



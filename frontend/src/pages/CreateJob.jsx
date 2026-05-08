import { useState } from "react";
import { createJob } from "../services/jobs";

export default function CreateJob() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createJob(form);

    alert("Заявка создана");
  };

  return (
    <div className="page-shell">
      <div className="form-card">
        <h2>Создать заказ</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              placeholder="Название"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div className="form-group">
            <textarea
              placeholder="Описание"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              placeholder="Бюджет"
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })}
            />
          </div>

          <button type="submit" className="button-primary">Создать</button>
        </form>
      </div>
    </div>
  );
}
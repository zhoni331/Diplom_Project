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
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Название"
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <textarea
        placeholder="Описание"
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Бюджет"
        onChange={(e) =>
          setForm({ ...form, budget: Number(e.target.value) })
        }
      />

      <button type="submit">Создать</button>
    </form>
  );
}
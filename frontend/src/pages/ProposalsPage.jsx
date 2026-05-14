import { useEffect, useState } from "react";
import api from "../services/api";
import { getMe } from "../services/api";
import { useNavigate } from "react-router-dom";

const ProposalsPage = () => {
    const [proposals, setProposals] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getMe();
            setUser(userData);
        };

        fetchUser();

        api.get("/proposals/").then(res => {
            setProposals(res.data);
        });
    }, []);

    const handleAccept = async (id) => {
        try {
            await api.post(`/proposals/${id}/accept/`);
            alert("Заявка принята");

            setProposals(prev =>
                prev.map(p =>
                    p.id === id
                        ? { ...p, status: "accepted" }
                        : { ...p, status: "rejected" }
                )
            );
        } catch (err) {
            console.error(err.response?.data || err);
            alert("Ошибка при принятии заявки");
        }
    };

    return (
        <div className="page-shell">
            <h2 className="section-title">Отклики</h2>

            <div className="proposal-card">
                {proposals.map(p => (
                    <article key={p.id} className="card">
                        <div className="proposal-row">
                            <p><strong>Job:</strong> {p.job}</p>
                            <p><strong>Message:</strong> {p.message}</p>
                            <p><strong>Price:</strong> {p.price}</p>
                            <p><strong>Status:</strong> {p.status}</p>
                        </div>

                        {user?.role === "client" && p.status === "pending" && (
                            <div className="proposal-actions">
                                <button type="button" className="button-secondary" onClick={() => navigate(`/contractors/${p.contractor_id}`)}>
                                    View Profile
                                </button>
                                <button type="button" className="button-primary" onClick={() => handleAccept(p.id)}>
                                    Accept
                                </button>
                            </div>
                        )}
                    </article>
                ))}
            </div>
        </div>
    );
};

export default ProposalsPage;

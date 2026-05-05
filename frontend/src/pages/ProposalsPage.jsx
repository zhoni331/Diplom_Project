import { useEffect, useState } from "react";
import api from "../services/api";
import { getMe } from "../services/api";

const ProposalsPage = () => {
    const [proposals, setProposals] = useState([]);
    const [user, setUser] = useState(null);

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
        <div>
            <h2>Отклики</h2>

            {proposals.map(p => (
                <div key = {p.id}>
                    <p>Job: {p.job}</p>
                    <p>Message: {p.message}</p>
                    <p>Price: {p.price}</p>
                    {user?.role === "client" && p.status === "pending" && (
                        <button onClick={() => handleAccept(p.id)}>Accept</button>
                    )}
                    <p>Status: {p.status}</p>
                </div>
            ))}
        </div>
    );
};

export default ProposalsPage;
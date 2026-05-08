import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">Freelance Platform</Link>
            </div>
            <div className="nav-links">
                <Link to="/">Home</Link>
                {user?.role === "client" && (
                    <>
                        <Link to="/create-job">Create Job</Link>
                        <Link to="/proposals">My Proposals</Link>
                    </>
                )}

                {user?.role === "contractor" && (
                    <>
                        <Link to="/">Find Jobs</Link>
                        <Link to="/my-proposals">My Proposals</Link>
                    </>
                )}

                <Link to="/profile">Profile</Link>
                <button type="button" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>
    );
}

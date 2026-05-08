import NavBar from "./NavBar";

export default function Layout({ children }) {
    return (
        <div className="page-shell">
            <NavBar />
            <main className="app-container">
                {children}
            </main>
        </div>
    );
}

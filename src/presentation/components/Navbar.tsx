import { Link, useLocation, useNavigate } from "react-router-dom";

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>🎟️ Mi Boleta</div>

      <div style={styles.links}>
        <Link
          to="/dashboard"
          style={{
            ...styles.link,
            ...(location.pathname === "/dashboard"
              ? styles.active
              : {}),
          }}
        >
          Dashboard
        </Link>

        <Link
          to="/tickets"
          style={{
            ...styles.link,
            ...(location.pathname === "/tickets"
              ? styles.active
              : {}),
          }}
        >
          Tickets
        </Link>

        <button
          style={styles.logoutBtn}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

const styles: Record<string, React.CSSProperties> = {
  navbar: {
    height: "70px",
    background: "#142850",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 2rem",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },

  logo: {
    color: "#fff",
    fontSize: "1.5rem",
    fontWeight: 700,
  },

  links: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  },

  link: {
    textDecoration: "none",
    color: "#fff",
    padding: "0.7rem 1.2rem",
    borderRadius: "10px",
    fontWeight: 600,
    transition: "0.2s",
    background: "transparent",
  },

  active: {
    background: "#e94560",
  },

  logoutBtn: {
    background: "#e94560",
    border: "none",
    color: "#fff",
    padding: "0.7rem 1.2rem",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: 600,
  },
};
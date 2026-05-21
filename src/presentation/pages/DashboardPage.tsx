import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useAuth } from "../hooks/useAuth";
import { useTickets } from "../hooks/useTickets";

export function DashboardPage() {
  const { user } = useAuth();
  const { tickets } = useTickets();

  // Derivamos stats reales de los tickets del usuario
  const activeTickets = tickets.filter((t) => String(t.status).toLowerCase() === "active").length;
  const wonTickets = tickets.filter((t) => String(t.status).toLowerCase() === "won").length;

  const cards = [
    {
      icon: "🎟️",
      label: "Mis Tickets",
      desc: "Consulta y gestiona tus boletas",
      to: "/tickets",
      color: "#e94560",
    },
    {
      icon: "🏆",
      label: "Resultados",
      desc: "Últimos sorteos realizados",
      to: "/results",
      color: "#f39c12",
    },
  ];

  return (
    <div style={styles.page}>
      <Navbar />

      <main style={styles.main}>
        <div style={styles.header}>
          <h1 style={styles.greeting}>
            ¡Hola, {user?.name ?? "Usuario"}! 👋
          </h1>
          <p style={styles.subgreeting}>¿Qué quieres hacer hoy?</p>
        </div>

        <div style={styles.statsRow}>
          <div style={styles.statBox}>
            <span style={styles.statValue}>{tickets.length}</span>
            <span style={styles.statLabel}>Total tickets</span>
          </div>
          <div style={styles.statBox}>
            <span style={styles.statValue}>{activeTickets}</span>
            <span style={styles.statLabel}>Tickets activos</span>
          </div>
          <div style={styles.statBox}>
            <span style={styles.statValue}>{wonTickets}</span>
            <span style={styles.statLabel}>Sorteos ganados</span>
          </div>
        </div>

        <h2 style={styles.sectionTitle}>Accesos rápidos</h2>
        <div style={styles.grid}>
          {cards.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              style={{ ...styles.card, borderTop: `4px solid ${c.color}` }}
            >
              <span style={styles.cardIcon}>{c.icon}</span>
              <h3 style={styles.cardTitle}>{c.label}</h3>
              <p style={styles.cardDesc}>{c.desc}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "#f4f6fb" },
  main: { maxWidth: "900px", margin: "0 auto", padding: "2rem 1rem" },
  header: { marginBottom: "2rem" },
  greeting: { fontSize: "1.8rem", fontWeight: 700, color: "#1a1a2e", margin: 0 },
  subgreeting: { color: "#666", marginTop: "0.3rem" },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1rem",
    marginBottom: "2rem",
  },
  statBox: {
    background: "#fff",
    borderRadius: "12px",
    padding: "1.25rem",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
  },
  statValue: { fontSize: "1.8rem", fontWeight: 700, color: "#e94560" },
  statLabel: { fontSize: "0.85rem", color: "#888" },
  sectionTitle: { fontSize: "1.1rem", fontWeight: 600, color: "#444", marginBottom: "1rem" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "1.25rem",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "1.5rem",
    textDecoration: "none",
    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
    display: "block",
  },
  cardIcon: { fontSize: "2rem" },
  cardTitle: { fontSize: "1rem", fontWeight: 700, color: "#1a1a2e", margin: "0.5rem 0 0.25rem" },
  cardDesc: { fontSize: "0.85rem", color: "#888", margin: 0 },
};
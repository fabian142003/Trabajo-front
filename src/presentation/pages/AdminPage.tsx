import { Navbar } from "../components/Navbar";
import { Loader } from "../components/Loader";
import { TicketCard } from "../components/TicketCard";
import { useAdminTickets } from "../hooks/useAdminTickets";

export function AdminPage() {
  const { tickets, loading, fetchTickets } = useAdminTickets();

  const totalActive = tickets.filter((t) => String(t.status).toLowerCase() === "active").length;
  const totalWon = tickets.filter((t) => String(t.status).toLowerCase() === "won").length;

  const stats = [
    { icon: "🎟️", label: "Total tickets", value: tickets.length },
    { icon: "✅", label: "Activos", value: totalActive },
    { icon: "🏆", label: "Ganados", value: totalWon },
  ];

  return (
    <div style={styles.page}>
      <Navbar />

      <main style={styles.main}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Panel Administrador</h1>
            <p style={styles.subtitle}>Resumen general del sistema</p>
          </div>
          <button onClick={fetchTickets} style={styles.refreshBtn}>
            🔄 Actualizar
          </button>
        </div>

        <div style={styles.statsGrid}>
          {stats.map((s) => (
            <div key={s.label} style={styles.statCard}>
              <span style={{ fontSize: "2rem" }}>{s.icon}</span>
              <span style={styles.statValue}>{s.value}</span>
              <span style={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        <h2 style={styles.sectionTitle}>Todos los tickets</h2>

        {loading && <Loader />}

        {!loading && tickets.length === 0 && (
          <p style={{ color: "#aaa", textAlign: "center", padding: "3rem" }}>
            No hay tickets registrados.
          </p>
        )}

        <div style={styles.grid}>
          {tickets.map((ticket) => (
<div style={styles.grid}>
  {tickets.map((ticket) => (
    <TicketCard
      key={ticket.id}
      ticket={ticket}
      showOwner
    />
  ))}
</div>          ))}
        </div>
      </main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "#f4f6fb" },
  main: { maxWidth: "960px", margin: "0 auto", padding: "2rem 1rem" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "2rem",
  },
  title: { fontSize: "1.8rem", fontWeight: 700, color: "#1a1a2e", margin: 0 },
  subtitle: { color: "#888", marginTop: "0.3rem" },
  refreshBtn: {
    padding: "0.6rem 1.2rem",
    background: "#fff",
    border: "1.5px solid #ddd",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "#444",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "1rem",
    marginBottom: "2.5rem",
  },
  statCard: {
    background: "#fff",
    borderRadius: "12px",
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.4rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
  },
  statValue: { fontSize: "1.6rem", fontWeight: 700, color: "#1a1a2e" },
  statLabel: { fontSize: "0.8rem", color: "#888" },
  sectionTitle: { fontSize: "1.1rem", fontWeight: 600, color: "#444", marginBottom: "1rem" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "1.25rem",
  },
};
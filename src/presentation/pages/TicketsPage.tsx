import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Loader } from "../components/Loader";
import { TicketCard } from "../components/TicketCard";
import { TicketForm } from "../components/TicketForm";
import { useTickets } from "../hooks/useTickets";

export function TicketsPage() {
  const { tickets, loading, error, fetchTickets, createTicket, deleteTicket, updateTicket } =
    useTickets();

  const [showForm, setShowForm] = useState(false);

  const activeCount = tickets.filter((t) =>String(t.status).toLowerCase() === "active").length;
  const wonCount = tickets.filter((t) => String(t.status).toLowerCase() === "won").length;

  return (
    <div style={styles.page}>
      <Navbar />

      {/* Modal del form */}
      {showForm && (
        <TicketForm
          onSubmit={async (data) => {
            await createTicket(data);
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <main style={styles.main}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Mis Tickets</h1>
            <p style={styles.subtitle}>
              {tickets.length} boleta{tickets.length !== 1 ? "s" : ""} en total
            </p>
          </div>
          <div style={styles.headerActions}>
            <button onClick={fetchTickets} style={styles.refreshBtn}>
              🔄
            </button>
            <button onClick={() => setShowForm(true)} style={styles.addBtn}>
              + Nuevo ticket
            </button>
          </div>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        {tickets.length > 0 && (
          <div style={styles.summaryRow}>
            <span style={{ ...styles.badge, background: "#27ae60" }}>
              ✅ {activeCount} activos
            </span>
            <span style={{ ...styles.badge, background: "#f39c12" }}>
              🏆 {wonCount} ganados
            </span>
          </div>
        )}

        {loading && <Loader />}

        {!loading && tickets.length === 0 && (
          <div style={styles.empty}>
            <span style={{ fontSize: "3rem" }}>🎟️</span>
            <p style={styles.emptyText}>No tienes tickets aún.</p>
            <button onClick={() => setShowForm(true)} style={styles.addBtn}>
              + Agregar tu primer ticket
            </button>
          </div>
        )}

        <div style={styles.grid}>
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onDelete={deleteTicket}
              onUpdate={updateTicket}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "#f4f6fb" },
  main: { maxWidth: "900px", margin: "0 auto", padding: "2rem 1rem" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "1.5rem",
  },
  title: { fontSize: "1.8rem", fontWeight: 700, color: "#1a1a2e", margin: 0 },
  subtitle: { color: "#888", marginTop: "0.3rem", fontSize: "0.95rem" },
  headerActions: { display: "flex", gap: "0.5rem", alignItems: "center" },
  refreshBtn: {
    padding: "0.6rem 0.9rem",
    background: "#fff",
    border: "1.5px solid #ddd",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  addBtn: {
    padding: "0.65rem 1.2rem",
    background: "linear-gradient(135deg, #e94560, #c0392b)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: 600,
    fontSize: "0.9rem",
    cursor: "pointer",
  },
  error: {
    background: "#fff0f0",
    border: "1px solid #ffcccc",
    color: "#c0392b",
    borderRadius: "8px",
    padding: "0.75rem",
    marginBottom: "1rem",
    fontSize: "0.9rem",
  },
  summaryRow: { display: "flex", gap: "0.75rem", marginBottom: "1.5rem" },
  badge: {
    color: "#fff",
    padding: "0.3rem 0.9rem",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: 600,
  },
  empty: {
    textAlign: "center",
    padding: "4rem 1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
  },
  emptyText: { color: "#aaa", fontSize: "1rem" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "1.25rem",
  },
};
import { useState } from "react";
import type { Ticket } from "../../domain/entities/Ticket";
import type { UpdateTicketData } from "../../domain/repositories/TicketRepository";

interface Props {
  ticket: Ticket;
  showOwner?: boolean;
  onDelete?: (id: string) => void;
  onUpdate?: (id: string, data: UpdateTicketData) => void;
}

export function TicketCard({ ticket, showOwner, onDelete, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(ticket.title);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!onDelete) return;
    if (!window.confirm("¿Seguro que quieres eliminar este ticket?")) return;
    setDeleting(true);
    await onDelete(ticket.id);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onUpdate) return;
    await onUpdate(ticket.id, { title });
    setIsEditing(false);
  };

  const statusConfig: Record<string, { color: string; label: string; icon: string }> = {
    active:  { color: "#27ae60", label: "Activo",    icon: "✅" },
    won:     { color: "#f39c12", label: "Ganado",    icon: "🏆" },
    expired: { color: "#aaa",    label: "Expirado",  icon: "❌" },
    pending: { color: "#0f3460", label: "Pendiente", icon: "⏳" },
  };

  const status = statusConfig[ticket.status] ?? { color: "#aaa", label: ticket.status, icon: "❓" };

  return (
    <div style={styles.card}>

      {/* Badge de estado */}
      <span style={{ ...styles.badge, background: status.color }}>
        {status.icon} {status.label}
      </span>

      {/* Info del dueño — solo en vista admin */}
      {showOwner && ticket.owner && (
        <div style={styles.owner}>
          <span style={styles.ownerName}>👤 {ticket.owner.name}</span>
          <span style={styles.ownerEmail}>{ticket.owner.email}</span>
        </div>
      )}

      {isEditing ? (
        <form onSubmit={handleUpdate} style={styles.editForm}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.editInput}
            autoFocus
          />
          <div style={styles.editActions}>
            <button type="submit" style={styles.saveBtn}>
              💾 Guardar
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setTitle(ticket.title);
              }}
              style={styles.cancelBtn}
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <>
          {/* Título */}
          <h3 style={styles.title}>{ticket.title}</h3>

          {/* Tipo de juego */}
          <p style={styles.meta}>🎮 {ticket.gameType}</p>

          {/* Número de boleta */}
          {ticket.gameNumber && (
            <p style={styles.meta}>🎲 N° {ticket.gameNumber}</p>
          )}

          {/* Valor apostado */}
          {ticket.amount && (
            <p style={styles.meta}>
              💵{" "}
              {ticket.amount.toLocaleString("es-CO", {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0,
              })}
            </p>
          )}

          {/* Lugar de compra */}
          {ticket.place && (
            <p style={styles.meta}>📍 {ticket.place}</p>
          )}

          {/* Fecha del sorteo */}
          <p style={styles.date}>
            📅{" "}
            {new Date(ticket.gameDate).toLocaleDateString("es-CO", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          {/* Notas */}
          {ticket.notes && (
            <p style={styles.notes}>📝 {ticket.notes}</p>
          )}

          {/* Acciones */}
          {(onDelete || onUpdate) && (
            <div style={styles.actions}>
              {onUpdate && (
                <button
                  onClick={() => setIsEditing(true)}
                  style={styles.editBtn}
                >
                  ✏️ Editar
                </button>
              )}
              {onDelete && (
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  style={styles.deleteBtn}
                >
                  {deleting ? "..." : "🗑️ Eliminar"}
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "1.25rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
    display: "flex",
    flexDirection: "column",
    gap: "0.45rem",
  },
  badge: {
    alignSelf: "flex-start",
    color: "#fff",
    padding: "0.2rem 0.7rem",
    borderRadius: "20px",
    fontSize: "0.75rem",
    fontWeight: 600,
  },
  owner: {
    display: "flex",
    flexDirection: "column",
    gap: "0.1rem",
    padding: "0.5rem 0.75rem",
    background: "#f4f6fb",
    borderRadius: "8px",
  },
  ownerName: { fontSize: "0.85rem", fontWeight: 600, color: "#333" },
  ownerEmail: { fontSize: "0.78rem", color: "#aaa" },
  title: { fontSize: "1rem", fontWeight: 700, color: "#1a1a2e", margin: 0 },
  meta: { fontSize: "0.85rem", color: "#666", margin: 0 },
  date: { fontSize: "0.8rem", color: "#999", margin: 0 },
  notes: {
    fontSize: "0.82rem",
    color: "#777",
    margin: 0,
    padding: "0.5rem 0.75rem",
    background: "#fffbea",
    borderRadius: "8px",
    borderLeft: "3px solid #f39c12",
  },
  actions: { display: "flex", gap: "0.5rem", marginTop: "0.5rem" },
  editBtn: {
    flex: 1,
    padding: "0.5rem",
    background: "#f0f4ff",
    border: "1.5px solid #c5d0f5",
    borderRadius: "8px",
    color: "#0f3460",
    fontWeight: 600,
    fontSize: "0.85rem",
    cursor: "pointer",
  },
  deleteBtn: {
    flex: 1,
    padding: "0.5rem",
    background: "#fff0f0",
    border: "1.5px solid #ffcccc",
    borderRadius: "8px",
    color: "#c0392b",
    fontWeight: 600,
    fontSize: "0.85rem",
    cursor: "pointer",
  },
  editForm: { display: "flex", flexDirection: "column", gap: "0.5rem" },
  editInput: {
    padding: "0.6rem 0.8rem",
    borderRadius: "8px",
    border: "1.5px solid #c5d0f5",
    fontSize: "0.95rem",
    outline: "none",
  },
  editActions: { display: "flex", gap: "0.5rem" },
  saveBtn: {
    flex: 1,
    padding: "0.5rem",
    background: "#0f3460",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: 600,
    fontSize: "0.85rem",
    cursor: "pointer",
  },
  cancelBtn: {
    flex: 1,
    padding: "0.5rem",
    background: "#f4f6fb",
    border: "1.5px solid #ddd",
    borderRadius: "8px",
    color: "#666",
    fontWeight: 600,
    fontSize: "0.85rem",
    cursor: "pointer",
  },
};
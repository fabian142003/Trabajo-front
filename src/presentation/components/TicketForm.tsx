import { useState } from "react";
import type { TicketDto } from "../../application/dtos/TicketDto";
import type {
  GameType,
  TicketStatus,
} from "../../domain/entities/Ticket";

interface Props {
  onSubmit: (data: TicketDto) => Promise<void>;
  onCancel: () => void;
}

export function TicketForm({
  onSubmit,
  onCancel,
}: Props) {
  const [title, setTitle] = useState("");

  const [gameType, setGameType] =
    useState<GameType | "">("");

  const [gameDate, setGameDate] =
    useState("");

  const [status, setStatus] =
    useState<TicketStatus | "">("");

  const [gameNumber, setGameNumber] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [place, setPlace] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await onSubmit({
        title,
        gameType: gameType as GameType,

        gameDate: new Date(
          gameDate
        ).toISOString(),

        status: status as TicketStatus,

        ...(gameNumber && {
          gameNumber,
        }),

        ...(amount && {
          amount: Number(amount),
        }),

        ...(place && { place }),

        ...(notes && { notes }),
      });

      // Reset form
      setTitle("");
      setGameType("");
      setGameDate("");
      setStatus("");
      setGameNumber("");
      setAmount("");
      setPlace("");
      setNotes("");

      // Close modal
      onCancel();

    } catch (err: any) {
      const message =
        err?.response?.data?.error ??
        "No se pudo crear el ticket.";

      setError(message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>

        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>
            🎟️ Nuevo Ticket
          </h2>

          <button
            onClick={onCancel}
            style={styles.closeBtn}
          >
            ✕
          </button>
        </div>

        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={styles.form}
        >

          {/* Requeridos */}

          <p style={styles.sectionLabel}>
            Información requerida
          </p>

          <div style={styles.field}>
            <label style={styles.label}>
              Nombre del sorteo *
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="Ej: Lotería de Medellín"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.row}>

            <div style={styles.field}>
              <label style={styles.label}>
                Tipo de juego *
              </label>

              <select
                value={gameType}
                onChange={(e) =>
                  setGameType(
                    e.target.value as GameType
                  )
                }
                required
                style={styles.input}
              >
                <option value="">
                  Selecciona
                </option>

                <option value="Lotería">
                  Lotería
                </option>

                <option value="Rifa">
                  Rifa
                </option>

                <option value="Sorteo">
                  Sorteo
                </option>

                <option value="Boleta">
                  Boleta
                </option>

                <option value="Juego ocasional">
                  Juego ocasional
                </option>
              </select>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>
                Estado *
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value as TicketStatus
                  )
                }
                required
                style={styles.input}
              >
                <option value="">
                  Selecciona
                </option>

                <option value="Pendiente">
                  Pendiente
                </option>

                <option value="Ganado">
                  Ganado
                </option>

                <option value="Perdido">
                  Perdido
                </option>
              </select>
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>
              Fecha del sorteo *
            </label>

            <input
              type="date"
              value={gameDate}
              onChange={(e) =>
                setGameDate(e.target.value)
              }
              required
              style={styles.input}
            />
          </div>

          {/* Opcionales */}

          <p style={styles.sectionLabel}>
            Información adicional
          </p>

          <div style={styles.row}>

            <div style={styles.field}>
              <label style={styles.label}>
                Número jugado
              </label>

              <input
                type="text"
                value={gameNumber}
                onChange={(e) =>
                  setGameNumber(
                    e.target.value
                  )
                }
                placeholder="Ej: 4821"
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>
                Valor apostado
              </label>

              <input
                type="number"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
                placeholder="Ej: 5000"
                min={0}
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>
              Lugar de compra
            </label>

            <input
              type="text"
              value={place}
              onChange={(e) =>
                setPlace(e.target.value)
              }
              placeholder="Ej: Centro Comercial"
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>
              Notas
            </label>

            <textarea
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
              placeholder="Detalles adicionales..."
              rows={3}
              style={{
                ...styles.input,
                resize: "vertical",
              }}
            />
          </div>

          <div style={styles.formActions}>

            <button
              type="button"
              onClick={onCancel}
              style={styles.cancelBtn}
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              style={styles.submitBtn}
            >
              {loading
                ? "Guardando..."
                : "💾 Guardar ticket"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

const styles: Record<
  string,
  React.CSSProperties
> = {
  overlay: {
    position: "fixed",
    inset: 0,
    background:
      "rgba(0,0,0,0.5)",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    zIndex: 100,
    padding: "1rem",
  },

  modal: {
    background: "#fff",
    borderRadius: "16px",
    padding: "2rem",
    width: "100%",
    maxWidth: "520px",

    boxShadow:
      "0 20px 60px rgba(0,0,0,0.3)",

    maxHeight: "90vh",
    overflowY: "auto",
  },

  modalHeader: {
    display: "flex",
    justifyContent:
      "space-between",

    alignItems: "center",
    marginBottom: "1.5rem",
  },

  modalTitle: {
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "#1a1a2e",
    margin: 0,
  },

  closeBtn: {
    background: "none",
    border: "none",
    fontSize: "1.2rem",
    cursor: "pointer",
    color: "#aaa",
  },

  error: {
    background: "#fff0f0",
    border:
      "1px solid #ffcccc",

    color: "#c0392b",

    borderRadius: "8px",
    padding: "0.75rem",

    marginBottom: "1rem",

    fontSize: "0.9rem",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.9rem",
  },

  sectionLabel: {
    fontSize: "0.75rem",
    fontWeight: 700,
    color: "#aaa",

    textTransform:
      "uppercase",

    letterSpacing: "0.05em",

    margin: "0.3rem 0 0",
  },

  row: {
    display: "grid",

    gridTemplateColumns:
      "1fr 1fr",

    gap: "0.75rem",
  },

  field: {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
  },

  label: {
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "#444",
  },

  input: {
    padding: "0.75rem 1rem",

    borderRadius: "8px",

    border:
      "1.5px solid #ddd",

    fontSize: "0.9rem",

    outline: "none",

    background: "#fff",

    width: "100%",

    transition: "0.2s",
  },

  formActions: {
    display: "flex",
    gap: "0.75rem",
    marginTop: "0.5rem",
  },

  cancelBtn: {
    flex: 1,

    padding: "0.75rem",

    background: "#f4f6fb",

    border:
      "1.5px solid #ddd",

    borderRadius: "8px",

    color: "#666",

    fontWeight: 600,

    cursor: "pointer",
  },

  submitBtn: {
    flex: 2,

    padding: "0.75rem",

    background:
      "linear-gradient(135deg, #e94560, #c0392b)",

    color: "#fff",

    border: "none",

    borderRadius: "8px",

    fontWeight: 600,

    fontSize: "0.95rem",

    cursor: "pointer",
  },
};

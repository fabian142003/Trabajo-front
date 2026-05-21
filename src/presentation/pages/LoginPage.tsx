import { useState } from "react";

import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

export function LoginPage() {
  const { login } = useAuth();

  const navigate = useNavigate();

  const [searchParams] =
    useSearchParams();

  const sessionExpired =
    searchParams.get("expired") ===
    "true";

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    setLoading(true);

    try {
      const user = await login({
        email,
        password,
      });

      // 🔥 Redirección según rol
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      const message =
        err?.response?.data?.error ??
        "Credenciales incorrectas";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.logo}>
          🎟️
        </div>

        <h1 style={styles.title}>
          Mi Boleta
        </h1>

        <p style={styles.subtitle}>
          Inicia sesión en tu cuenta
        </p>

        {sessionExpired && (
          <div style={styles.warning}>
            ⚠️ Tu sesión expiró.
            Inicia sesión nuevamente.
          </div>
        )}

        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={styles.form}
        >
          <div style={styles.field}>
            <label style={styles.label}>
              Correo electrónico
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="correo@ejemplo.com"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>
              Contraseña
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              placeholder="••••••••"
              required
              style={styles.input}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={styles.button}
          >
            {loading
              ? "Iniciando sesión..."
              : "Iniciar sesión"}
          </button>
        </form>

        <p style={styles.footer}>
          ¿No tienes cuenta?{" "}
          <Link
            to="/register"
            style={styles.link}
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles: Record<
  string,
  React.CSSProperties
> = {
  wrapper: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
  },

  card: {
    background: "#ffffff",
    borderRadius: "18px",
    padding: "2.5rem",
    width: "100%",
    maxWidth: "420px",
    boxShadow:
      "0 20px 60px rgba(0,0,0,0.35)",
    textAlign: "center",
  },

  logo: {
    fontSize: "3rem",
    marginBottom: "0.5rem",
  },

  title: {
    fontSize: "1.9rem",
    fontWeight: 700,
    color: "#1a1a2e",
    margin: 0,
  },

  subtitle: {
    color: "#666",
    marginTop: "0.4rem",
    marginBottom: "1.7rem",
    fontSize: "0.95rem",
  },

  warning: {
    background: "#fff7e6",
    border: "1px solid #ffd591",
    color: "#ad6800",
    borderRadius: "8px",
    padding: "0.8rem 1rem",
    marginBottom: "1rem",
    fontSize: "0.9rem",
  },

  error: {
    background: "#fff0f0",
    border: "1px solid #ffcccc",
    color: "#c0392b",
    borderRadius: "8px",
    padding: "0.8rem 1rem",
    marginBottom: "1rem",
    fontSize: "0.9rem",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    textAlign: "left",
  },

  field: {
    display: "flex",
    flexDirection: "column",
    gap: "0.45rem",
  },

  label: {
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "#444",
  },

  input: {
    padding: "0.8rem 1rem",
    borderRadius: "10px",
    border: "1.5px solid #ddd",
    fontSize: "0.95rem",
    outline: "none",
  },

  button: {
    marginTop: "0.5rem",
    padding: "0.9rem",
    background:
      "linear-gradient(135deg, #e94560, #c0392b)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "1rem",
    fontWeight: 700,
    cursor: "pointer",
  },

  footer: {
    marginTop: "1.6rem",
    color: "#666",
    fontSize: "0.9rem",
  },

  link: {
    color: "#e94560",
    fontWeight: 700,
    textDecoration: "none",
  },
};
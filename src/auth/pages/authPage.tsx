import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register, getCurrentUser } from "../Services/authService";

type AuthPageProps = {
  onLogin?: () => void;
};

function extractErrorMessage(error: any): string {
  const data = error?.response?.data;
  if (data && typeof data === "object") {
    if (typeof data.error === "string") {
      return data.error;
    }
    // Errores de validación del backend: { campo: "mensaje", ... }
    const messages = Object.values(data).filter(
      (v): v is string => typeof v === "string"
    );
    if (messages.length > 0) {
      return messages.join(" · ");
    }
  }
  return "Ocurrió un error. Intenta nuevamente.";
}

function AuthPage({ onLogin }: AuthPageProps) {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"PASSENGER" | "DRIVER">("PASSENGER");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await login({ email, password });
      } else {
        await register({ firstName, lastName, email, password, role });
      }

      const user = await getCurrentUser();
      const targetRoute = user.role === "DRIVER" ? "/driver" : "/passenger";

      onLogin?.();
      navigate(targetRoute, { replace: true });
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Uber Clone</h1>

      <button onClick={() => setIsLogin(true)}>Login</button>
      <button onClick={() => setIsLogin(false)}>Register</button>

      <hr />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <input
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <input
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {!isLogin && (
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as "PASSENGER" | "DRIVER")}
          >
            <option value="PASSENGER">Passenger</option>
            <option value="DRIVER">Driver</option>
          </select>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : isLogin ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
}

export default AuthPage;

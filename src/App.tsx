import { useState, type SubmitEvent } from 'react';
import { BrowserRouter, Link, Navigate, NavLink, Route, Routes } from 'react-router-dom';

import api, { getApiError, TOKEN_KEY } from './shared/api';
import Button from './shared/Button';
import Input from './shared/Input';
import PassengerDashboard from './passenger/pages/PassengerDashboard';
import PassengerHistory from './passenger/pages/PassengerHistory';
import RequestTripPage from './passenger/pages/RequestTripPage';
import TripDetailPage from './passenger/pages/TripDetailPage';

// TODO: reemplazar por el módulo auth/ (LoginPage/RegisterPage) cuando esté listo.
// Login mínimo provisional para poder probar el flujo de passenger E2E.
function TempLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('ana@uber.com');
  const [password, setPassword] = useState('pass123');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    try {
      const { data } = await api.post<{ token: string }>('/auth/login', { email, password });
      localStorage.setItem(TOKEN_KEY, data.token);
      onLogin();
    } catch (err) {
      setError(getApiError(err));
    }
  }

  return (
    <div className="container" style={{ maxWidth: 420 }}>
      <h1>Iniciar sesión</h1>
      <form className="card" onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <Button type="submit">Entrar</Button>
      </form>
      <p className="muted">Login provisional — usa un usuario PASSENGER del seed (ej. ana@uber.com / pass123).</p>
    </div>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem(TOKEN_KEY) !== null);

  if (!loggedIn) {
    return <TempLogin onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <BrowserRouter>
      <header className="topbar">
        <Link to="/passenger" style={{ color: '#fff', fontWeight: 700 }}>
          🚕 Uber Clone
        </Link>
        <nav>
          <NavLink to="/passenger" end>
            Dashboard
          </NavLink>
          <NavLink to="/passenger/request">Pedir viaje</NavLink>
          <NavLink to="/passenger/history">Historial</NavLink>
          <button
            className="btn btn-secondary"
            style={{ padding: '0.3rem 0.7rem', fontSize: '0.8rem' }}
            onClick={() => {
              localStorage.removeItem(TOKEN_KEY);
              setLoggedIn(false);
            }}
          >
            Salir
          </button>
        </nav>
      </header>
      <Routes>
        <Route path="/passenger" element={<PassengerDashboard />} />
        <Route path="/passenger/request" element={<RequestTripPage />} />
        <Route path="/passenger/trips/:id" element={<TripDetailPage />} />
        <Route path="/passenger/history" element={<PassengerHistory />} />
        <Route path="*" element={<Navigate to="/passenger" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

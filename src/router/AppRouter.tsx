import { useState } from "react";
import { BrowserRouter, Link, Navigate, NavLink, Route, Routes } from "react-router-dom";
import AuthPage from "../auth/pages/authPage";
import PassengerDashboard from "../passenger/pages/PassengerDashboard";
import PassengerHistory from "../passenger/pages/PassengerHistory";
import RequestTripPage from "../passenger/pages/RequestTripPage";
import TripDetailPage from "../passenger/pages/TripDetailPage";
import { TOKEN_KEY } from "../shared/api";

function AppRouter() {
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem(TOKEN_KEY) !== null);

  return (
    <BrowserRouter>
      {loggedIn ? (
        <>
          <header className="topbar">
            <Link to="/passenger" style={{ color: "#fff", fontWeight: 700 }}>
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
                style={{ padding: "0.3rem 0.7rem", fontSize: "0.8rem" }}
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
            <Route path="/" element={<Navigate to="/passenger" replace />} />
            <Route path="/driver" element={<Navigate to="/passenger" replace />} />
            <Route path="/passenger" element={<PassengerDashboard />} />
            <Route path="/passenger/request" element={<RequestTripPage />} />
            <Route path="/passenger/trips/:id" element={<TripDetailPage />} />
            <Route path="/passenger/history" element={<PassengerHistory />} />
            <Route path="*" element={<Navigate to="/passenger" replace />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="*" element={<AuthPage onLogin={() => setLoggedIn(true)} />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default AppRouter;
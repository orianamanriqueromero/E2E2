import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { getApiError } from '../../shared/api';
import Badge from '../../shared/Badge';
import type { Trip } from '../../shared/types';
import RatingForm from '../components/RatingForm';
import { getTrip } from '../passengerService';

const POLL_INTERVAL_MS = 4000;

function TripDetailPage() {
  const { id } = useParams();
  const tripId = Number(id);
  const [trip, setTrip] = useState<Trip | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const data = await getTrip(tripId);
      setTrip(data);
      setError(null);
    } catch (err) {
      setError(getApiError(err));
    }
  }, [tripId]);

  useEffect(() => {
    void load();
  }, [load]);

  // Polling mientras el viaje siga activo (PENDING o IN_PROGRESS)
  useEffect(() => {
    if (!trip || trip.status === 'COMPLETED') return;
    const interval = setInterval(() => void load(), POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [trip, load]);

  if (error && !trip) {
    return (
      <div className="container">
        <p className="error">{error}</p>
        <Link to="/passenger">Volver al dashboard</Link>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="container">
        <p className="muted">Cargando viaje...</p>
      </div>
    );
  }

  const showRatingForm = trip.status === 'COMPLETED' && trip.passengerRating === null;

  return (
    <div className="container">
      <div className="page-header">
        <h1>Viaje #{trip.id}</h1>
        <Badge status={trip.status} />
      </div>

      <div className="card">
        <div className="trip-route">
          <span>📍 <strong>Origen:</strong> {trip.pickupAddress}</span>
          <span>🏁 <strong>Destino:</strong> {trip.dropoffAddress}</span>
        </div>
        <p className="muted" style={{ margin: '0.25rem 0 0' }}>
          Solicitado: {new Date(trip.requestedAt).toLocaleString()}
          {trip.completedAt ? ` · Completado: ${new Date(trip.completedAt).toLocaleString()}` : ''}
        </p>
      </div>

      <div className="card">
        <h3 style={{ marginTop: 0 }}>Conductor</h3>
        {trip.driver ? (
          <p style={{ margin: 0 }}>
            🚗 {trip.driver.firstName} {trip.driver.lastName} · ⭐{' '}
            {trip.driver.rating > 0 ? trip.driver.rating.toFixed(1) : 'Sin rating'}
          </p>
        ) : (
          <p className="muted" style={{ margin: 0 }}>
            Buscando conductor...
          </p>
        )}
      </div>

      {trip.status !== 'COMPLETED' && (
        <p className="muted">🔄 Actualizando estado automáticamente cada {POLL_INTERVAL_MS / 1000} s...</p>
      )}

      {showRatingForm && <RatingForm tripId={trip.id} onRated={setTrip} />}

      {trip.passengerRating !== null && (
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Tu calificación</h3>
          <p style={{ margin: 0 }}>
            {'★'.repeat(trip.passengerRating)}
            {'☆'.repeat(5 - trip.passengerRating)}
            {trip.ratingComment ? ` — "${trip.ratingComment}"` : ''}
          </p>
        </div>
      )}

      <Link to="/passenger">← Volver al dashboard</Link>
    </div>
  );
}

export default TripDetailPage;

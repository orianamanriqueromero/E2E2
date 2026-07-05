import { useState } from 'react';
import { Link } from 'react-router-dom';

import Badge from '../../shared/Badge';
import type { TripStatus } from '../../shared/types';
import { usePassengerTrips } from '../hooks/usePassengerTrips';

type StatusFilter = TripStatus | 'ALL';

function PassengerHistory() {
  const { trips, loading, error } = usePassengerTrips();
  const [filter, setFilter] = useState<StatusFilter>('ALL');

  const filtered = filter === 'ALL' ? trips : trips.filter((t) => t.status === filter);

  return (
    <div className="container">
      <div className="page-header">
        <h1>Historial de viajes</h1>
        <div className="field" style={{ margin: 0 }}>
          <select
            aria-label="Filtrar por estado"
            value={filter}
            onChange={(e) => setFilter(e.target.value as StatusFilter)}
          >
            <option value="ALL">Todos</option>
            <option value="PENDING">PENDING</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        </div>
      </div>

      {loading && <p className="muted">Cargando historial...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <div className="table-wrap">
          <table className="trips-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Origen</th>
                <th>Destino</th>
                <th>Estado</th>
                <th>Conductor</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="muted">
                    No hay viajes con este filtro.
                  </td>
                </tr>
              ) : (
                filtered.map((trip) => (
                  <tr key={trip.id}>
                    <td>
                      <Link to={`/passenger/trips/${trip.id}`}>{trip.id}</Link>
                    </td>
                    <td>{trip.pickupAddress}</td>
                    <td>{trip.dropoffAddress}</td>
                    <td>
                      <Badge status={trip.status} />
                    </td>
                    <td>
                      {trip.driver ? `${trip.driver.firstName} ${trip.driver.lastName}` : '—'}
                    </td>
                    <td>{trip.passengerRating !== null ? `★ ${trip.passengerRating}` : '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PassengerHistory;

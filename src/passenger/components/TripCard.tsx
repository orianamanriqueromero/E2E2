import { useNavigate } from 'react-router-dom';

import Badge from '../../shared/Badge';
import type { Trip } from '../../shared/types';

interface TripCardProps {
  trip: Trip;
}

function TripCard({ trip }: TripCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="card card-clickable"
      onClick={() => navigate(`/passenger/trips/${trip.id}`)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong>Viaje #{trip.id}</strong>
        <Badge status={trip.status} />
      </div>
      <div className="trip-route">
        <span>📍 {trip.pickupAddress}</span>
        <span>🏁 {trip.dropoffAddress}</span>
      </div>
      <div className="muted">
        {new Date(trip.requestedAt).toLocaleString()}
        {trip.driver ? ` · Conductor: ${trip.driver.firstName} ${trip.driver.lastName}` : ''}
      </div>
    </div>
  );
}

export default TripCard;

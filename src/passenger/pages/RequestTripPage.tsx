import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getApiError } from '../../shared/api';
import type { User } from '../../shared/types';
import DriverCard from '../components/DriverCard';
import RequestTripForm from '../components/RequestTripForm';
import { getAvailableDrivers } from '../passengerService';

function RequestTripPage() {
  const navigate = useNavigate();
  const [drivers, setDrivers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAvailableDrivers()
      .then(setDrivers)
      .catch((err) => setError(getApiError(err)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <div className="page-header">
        <h1>Solicitar viaje</h1>
      </div>

      <h2 style={{ fontSize: '1.1rem' }}>Conductores disponibles</h2>
      {loading && <p className="muted">Buscando conductores...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && drivers.length === 0 && (
        <p className="muted">No hay conductores disponibles en este momento.</p>
      )}
      {drivers.map((driver) => (
        <DriverCard key={driver.id} driver={driver} />
      ))}

      <h2 style={{ fontSize: '1.1rem', marginTop: '1.5rem' }}>¿A dónde vas?</h2>
      <RequestTripForm onCreated={(trip) => navigate(`/passenger/trips/${trip.id}`)} />
    </div>
  );
}

export default RequestTripPage;

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../shared/Button';
import type { User } from '../../shared/types';
import PassengerTripList from '../components/PassengerTripList';
import { usePassengerTrips } from '../hooks/usePassengerTrips';
import { getMe } from '../passengerService';

function PassengerDashboard() {
  const [me, setMe] = useState<User | null>(null);
  const { trips, loading, error } = usePassengerTrips();

  useEffect(() => {
    getMe().then(setMe).catch(() => setMe(null));
  }, []);

  return (
    <div className="container">
      <div className="page-header">
        <h1>Hola{me ? `, ${me.firstName}` : ''} 👋</h1>
        <Link to="/passenger/request">
          <Button>Pedir viaje</Button>
        </Link>
      </div>

      <h2 style={{ fontSize: '1.1rem' }}>Mis viajes</h2>
      {loading && <p className="muted">Cargando viajes...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && <PassengerTripList trips={trips} />}
    </div>
  );
}

export default PassengerDashboard;

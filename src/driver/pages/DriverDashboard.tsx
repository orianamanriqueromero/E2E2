import React, { useEffect } from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import { useDriverTrips } from '../hooks/useDriverTrips';
import ActiveTripCard from '../components/ActiveTripCard';
import PendingTripCard from '../components/PendingTripCard';
import Loading from '../../shared/components/Loading';
import ErrorMessage from '../../shared/components/ErrorMessage';
import { Link } from 'react-router-dom';
import MainLayout from '../../shared/layout/MainLayout';

const DriverDashboard: React.FC = () => {
  const { user } = useAuth();
  const {
    pendingTrips,
    myTrips,
    loading,
    error,
    acceptTrip,
    fetchAll,
  } = useDriverTrips();

  const activeTrip = myTrips.find(t => t.status === 'IN_PROGRESS');
  const completedTrips = myTrips.filter(t => t.status === 'COMPLETED');

  useEffect(() => {
    const interval = setInterval(() => {
      fetchAll();
    }, 5000);
    return () => clearInterval(interval);
  }, [fetchAll]);

  if (loading && pendingTrips.length === 0 && myTrips.length === 0) {
    return <Loading />;
  }

  return (
    <MainLayout>
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Dashboard Conductor</h1>
        {user && (
          <div className="mb-4">
            <p className="text-lg">Bienvenido, {user.firstName} {user.lastName}</p>
            <p>Rating: {user.rating?.toFixed(1) ?? 'N/A'} ⭐</p>
          </div>
        )}

        {error && <ErrorMessage message={error} />}

        {/* Viaje activo */}
        {activeTrip ? (
          <div className="mb-6">
            <ActiveTripCard trip={activeTrip} onComplete={fetchAll} />
          </div>
        ) : (
          <div className="mb-6 p-4 bg-gray-100 rounded">
            <p>No tienes viajes en curso.</p>
          </div>
        )}

        {/* Viajes pendientes */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Viajes disponibles para aceptar</h2>
          {pendingTrips.length === 0 ? (
            <p className="text-gray-500">No hay viajes pendientes en este momento.</p>
          ) : (
            pendingTrips.map(trip => (
              <PendingTripCard
                key={trip.id}
                trip={trip}
                onAccept={acceptTrip}
                loading={loading}
              />
            ))
          )}
        </div>

        <div className="flex gap-4 mt-4">
          <Link to="/driver/history" className="text-blue-600 hover:underline">
            Ver historial completo
          </Link>
          <Link to="/driver/pending" className="text-blue-600 hover:underline">
            Ver solo viajes pendientes
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default DriverDashboard;
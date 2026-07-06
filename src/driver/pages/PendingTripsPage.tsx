import React from 'react';
import { useDriverTrips } from '../hooks/useDriverTrips';
import PendingTripCard from '../components/PendingTripCard';
import Loading from '../../shared/components/Loading';
import ErrorMessage from '../../shared/components/ErrorMessage';
import MainLayout from '../../shared/layouts/MainLayout';

const PendingTripsPage: React.FC = () => {
  const { pendingTrips, loading, error, acceptTrip } = useDriverTrips();

  if (loading) return <Loading />;

  return (
    <MainLayout>
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Viajes pendientes</h1>
        {error && <ErrorMessage message={error} />}
        {pendingTrips.length === 0 ? (
          <p className="text-gray-500">No hay viajes pendientes.</p>
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
    </MainLayout>
  );
};

export default PendingTripsPage;
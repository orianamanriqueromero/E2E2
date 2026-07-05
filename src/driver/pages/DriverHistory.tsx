import React from 'react';
import { useDriverTrips } from '../hooks/useDriverTrips';
import DriverTripList from '../components/DriverTripList';
import Loading from '../../shared/components/Loading';
import ErrorMessage from '../../shared/components/ErrorMessage';
import MainLayout from '../../shared/layouts/MainLayout';

const DriverHistory: React.FC = () => {
  const { myTrips, loading, error } = useDriverTrips();
  const completedTrips = myTrips.filter(t => t.status === 'COMPLETED');

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <MainLayout>
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Historial de viajes completados</h1>
        <DriverTripList trips={completedTrips} title="Viajes finalizados" />
      </div>
    </MainLayout>
  );
};

export default DriverHistory;
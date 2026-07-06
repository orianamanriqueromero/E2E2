import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';
import { getTripById } from '../driverService';
import type { Trip } from '../../types';
import Loading from '../../shared/components/Loading';
import ErrorMessage from '../../shared/components/ErrorMessage';
import Badge from '../../shared/Badge';
import MainLayout from '../../shared/layouts/MainLayout';
import CompleteTripButton from '../components/CompleteTripButton';

const DriverTripDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrip = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const data = await getTripById(Number(id));
      setTrip(data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al cargar el viaje');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrip();
  }, [id]);

  useEffect(() => {
    if (!trip) return;
    if (trip.status === 'PENDING' || trip.status === 'IN_PROGRESS') {
      const interval = setInterval(() => {
        fetchTrip();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [trip]);

  const handleComplete = () => {
    fetchTrip();          // refrescar después de completar
    // Opcional: redirigir al dashboard
    navigate('/driver');
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!trip) return <p>Viaje no encontrado</p>;

  const isDriver = user?.id === trip.driver?.id;
  const canComplete = isDriver && trip.status === 'IN_PROGRESS';

  return (
    <MainLayout>
      <div className="p-4 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Detalle del viaje #{trip.id}</h1>
        <div className="border rounded p-4 space-y-2">
          <p><span className="font-semibold">Estado:</span> <Badge status={trip.status} /></p>
          <p><span className="font-semibold">Origen:</span> {trip.pickupAddress}</p>
          <p><span className="font-semibold">Destino:</span> {trip.dropoffAddress}</p>
          <p><span className="font-semibold">Solicitado:</span> {new Date(trip.requestedAt).toLocaleString()}</p>
          {trip.acceptedAt && (
            <p><span className="font-semibold">Aceptado:</span> {new Date(trip.acceptedAt).toLocaleString()}</p>
          )}
          {trip.completedAt && (
            <p><span className="font-semibold">Completado:</span> {new Date(trip.completedAt).toLocaleString()}</p>
          )}
          <p><span className="font-semibold">Pasajero:</span> {trip.passenger.firstName} {trip.passenger.lastName}</p>
          {trip.driver && (
            <p><span className="font-semibold">Conductor:</span> {trip.driver.firstName} {trip.driver.lastName}</p>
          )}
          {trip.passengerRating !== null && (
            <p><span className="font-semibold">Calificación:</span> {trip.passengerRating} ⭐</p>
          )}
          {trip.ratingComment && (
            <p><span className="font-semibold">Comentario:</span> {trip.ratingComment}</p>
          )}
        </div>

        {canComplete && (
          <div className="mt-4">
            <CompleteTripButton tripId={trip.id} onComplete={handleComplete} />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DriverTripDetail;
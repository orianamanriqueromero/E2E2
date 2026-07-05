import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';
import { getTripById, completeTrip } from '../driverService';
import { Trip } from '../../types';
import Loading from '../../shared/components/Loading';
import ErrorMessage from '../../shared/components/ErrorMessage';
import Button from '../../shared/components/Button';
import Badge from '../../shared/components/Badge';
import MainLayout from '../../shared/layouts/MainLayout';

const DriverTripDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completing, setCompleting] = useState(false);

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

  // Polling cada 5 segundos si el viaje está PENDING o IN_PROGRESS
  useEffect(() => {
    if (!trip) return;
    if (trip.status === 'PENDING' || trip.status === 'IN_PROGRESS') {
      const interval = setInterval(() => {
        fetchTrip();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [trip]);

  const handleComplete = async () => {
    if (!trip) return;
    try {
      setCompleting(true);
      await completeTrip(trip.id);
      // Refrescar el detalle
      await fetchTrip();
      // Opcional: redirigir al dashboard
      navigate('/driver');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al completar el viaje');
    } finally {
      setCompleting(false);
    }
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
            <p><span className="font-semibold">Calificación del pasajero:</span> {trip.passengerRating} ⭐</p>
          )}
          {trip.ratingComment && (
            <p><span className="font-semibold">Comentario:</span> {trip.ratingComment}</p>
          )}
        </div>

        {canComplete && (
          <div className="mt-4">
            <Button onClick={handleComplete} disabled={completing} variant="success">
              {completing ? 'Completando...' : 'Completar viaje'}
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DriverTripDetail;
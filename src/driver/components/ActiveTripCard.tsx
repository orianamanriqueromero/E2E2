import React from 'react';
import type { Trip } from '../../types';
import Badge from '../../shared/Badge';
import CompleteTripButton from './CompleteTripButton';

interface ActiveTripCardProps {
  trip: Trip;
  onComplete?: () => void;
}

const ActiveTripCard: React.FC<ActiveTripCardProps> = ({ trip, onComplete }) => {
  const passenger = trip.passenger;

  return (
    <div className="border-2 border-blue-500 rounded p-4 shadow-md mb-4 bg-blue-50">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-bold text-lg">Viaje activo</p>
          <p><span className="font-semibold">Origen:</span> {trip.pickupAddress}</p>
          <p><span className="font-semibold">Destino:</span> {trip.dropoffAddress}</p>
          <p><span className="font-semibold">Pasajero:</span> {passenger.firstName} {passenger.lastName}</p>
          <p><span className="font-semibold">Estado:</span> <Badge status={trip.status} /></p>
        </div>
        {/* ✅ AQUÍ ESTÁ LA CORRECCIÓN: pasar tripId, NO trip */}
        <CompleteTripButton tripId={trip.id} onComplete={onComplete} />
      </div>
    </div>
  );
};

export default ActiveTripCard;
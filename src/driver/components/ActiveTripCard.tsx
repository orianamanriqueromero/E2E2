import React from 'react';
import { Trip } from '../../types';
import Button from '../../shared/components/Button';
import Badge from '../../shared/components/Badge';

interface ActiveTripCardProps {
  trip: Trip;
  onComplete: (id: number) => void;
  loading?: boolean;
}

const ActiveTripCard: React.FC<ActiveTripCardProps> = ({ trip, onComplete, loading }) => {
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
        <Button
          onClick={() => onComplete(trip.id)}
          disabled={loading}
          variant="success"
        >
          Completar viaje
        </Button>
      </div>
    </div>
  );
};

export default ActiveTripCard;
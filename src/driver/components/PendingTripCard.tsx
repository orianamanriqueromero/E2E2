import React from 'react';
import type { Trip } from '../../types';
import Button from '../../shared/Button';
import Badge from '../../shared/Badge';

interface PendingTripCardProps {
  trip: Trip;
  onAccept: (id: number) => void;
  loading?: boolean;
}

const PendingTripCard: React.FC<PendingTripCardProps> = ({ trip, onAccept, loading }) => {
  return (
    <div className="border rounded p-4 shadow-sm mb-3">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold">Origen: {trip.pickupAddress}</p>
          <p className="text-gray-600">Destino: {trip.dropoffAddress}</p>
          <p className="text-sm text-gray-500">Solicitado: {new Date(trip.requestedAt).toLocaleString()}</p>
          <Badge status={trip.status} />
        </div>
        <Button
          onClick={() => onAccept(trip.id)}
          disabled={loading}
          variant="primary"
        >
          Aceptar
        </Button>
      </div>
    </div>
  );
};

export default PendingTripCard;
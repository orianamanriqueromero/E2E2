import React from 'react';
import type { Trip } from '../../types';
import Badge from '../../shared/Badge';

interface DriverTripListProps {
  trips: Trip[];
  title?: string;
}

const DriverTripList: React.FC<DriverTripListProps> = ({ trips, title = 'Historial' }) => {
  if (trips.length === 0) {
    return <p className="text-gray-500">No hay viajes en esta lista.</p>;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <ul className="space-y-2">
        {trips.map((trip) => (
          <li key={trip.id} className="border rounded p-3 flex justify-between items-center">
            <div>
              <p><span className="font-medium">Origen:</span> {trip.pickupAddress}</p>
              <p><span className="font-medium">Destino:</span> {trip.dropoffAddress}</p>
              <p className="text-sm text-gray-500">
                {trip.completedAt ? `Completado: ${new Date(trip.completedAt).toLocaleString()}` : ''}
              </p>
              <Badge status={trip.status} />
            </div>
            <div>
              {trip.passenger && (
                <span className="text-sm">Pasajero: {trip.passenger.firstName} {trip.passenger.lastName}</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DriverTripList;
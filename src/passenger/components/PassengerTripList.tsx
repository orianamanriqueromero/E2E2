import type { Trip } from '../../shared/types';
import TripCard from './TripCard';

interface PassengerTripListProps {
  trips: Trip[];
}

function PassengerTripList({ trips }: PassengerTripListProps) {
  if (trips.length === 0) {
    return <p className="muted">Todavía no tienes viajes. ¡Pide tu primer viaje!</p>;
  }

  return (
    <div>
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
}

export default PassengerTripList;

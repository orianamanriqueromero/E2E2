import type { User } from '../../shared/types';

interface DriverCardProps {
  driver: User;
}

function DriverCard({ driver }: DriverCardProps) {
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong>
          🚗 {driver.firstName} {driver.lastName}
        </strong>
        <span>⭐ {driver.rating > 0 ? driver.rating.toFixed(1) : 'Sin rating'}</span>
      </div>
    </div>
  );
}

export default DriverCard;

import React, { useState } from 'react';
import Button from '../../shared/Button';
import { completeTrip } from '../driverService';

interface CompleteTripButtonProps {
  tripId: number;
  onComplete?: () => void;   // callback opcional para refrescar o redirigir
}

const CompleteTripButton: React.FC<CompleteTripButtonProps> = ({ tripId, onComplete }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleComplete = async () => {
    try {
      setLoading(true);
      setError(null);
      await completeTrip(tripId);
      if (onComplete) onComplete();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al completar el viaje');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        onClick={handleComplete}
        disabled={loading}
      >
        {loading ? 'Completando...' : 'Completar viaje'}
      </Button>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default CompleteTripButton;
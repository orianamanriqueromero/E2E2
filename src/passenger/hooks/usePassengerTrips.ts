import { useCallback, useEffect, useState } from 'react';

import { getApiError } from '../../shared/api';
import type { Trip } from '../../shared/types';
import { getMyTrips } from '../passengerService';

export function usePassengerTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setError(null);
      const data = await getMyTrips();
      setTrips(data);
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { trips, loading, error, refresh };
}

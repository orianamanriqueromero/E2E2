import { useState, useEffect, useCallback } from 'react';
import * as driverService from '../driverService';
import { Trip } from '../../types';
import { useAuth } from '../../auth/hooks/useAuth'; // Ajusta la ruta según tu AuthContext

export const useDriverTrips = () => {
  const [pendingTrips, setPendingTrips] = useState<Trip[]>([]);
  const [myTrips, setMyTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const fetchPendingTrips = useCallback(async () => {
    try {
      setLoading(true);
      const data = await driverService.getPendingTrips();
      setPendingTrips(data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al cargar viajes pendientes');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMyTrips = useCallback(async () => {
    try {
      const data = await driverService.getMyTrips();
      setMyTrips(data);
    } catch (err: any) {
      console.error(err);
    }
  }, []);

  const fetchAll = useCallback(async () => {
    await Promise.all([fetchPendingTrips(), fetchMyTrips()]);
  }, [fetchPendingTrips, fetchMyTrips]);

  useEffect(() => {
    if (token) {
      fetchAll();
    }
  }, [token, fetchAll]);

  const acceptTrip = useCallback(async (id: number) => {
    try {
      const updated = await driverService.acceptTrip(id);
      await fetchAll(); // Refresca ambas listas
      return updated;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al aceptar el viaje');
      throw err;
    }
  }, [fetchAll]);

  const completeTrip = useCallback(async (id: number) => {
    try {
      const updated = await driverService.completeTrip(id);
      await fetchAll();
      return updated;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al completar el viaje');
      throw err;
    }
  }, [fetchAll]);

  return {
    pendingTrips,
    myTrips,
    loading,
    error,
    fetchPendingTrips,
    fetchMyTrips,
    fetchAll,
    acceptTrip,
    completeTrip,
  };
};
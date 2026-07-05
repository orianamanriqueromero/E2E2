import api from '../services/axios';
import { Trip } from '../types';

export const getPendingTrips = async (): Promise<Trip[]> => {
  const response = await api.get('/trips/pending');
  return response.data;
};

export const getMyTrips = async (): Promise<Trip[]> => {
  const response = await api.get('/trips/my');
  return response.data;
};

export const getTripById = async (id: number): Promise<Trip> => {
  const response = await api.get(`/trips/${id}`);
  return response.data;
};

export const acceptTrip = async (id: number): Promise<Trip> => {
  const response = await api.patch(`/trips/${id}/accept`);
  return response.data;
};

export const completeTrip = async (id: number): Promise<Trip> => {
  const response = await api.patch(`/trips/${id}/complete`);
  return response.data;
};
import api from '../shared/api';
import type { CreateTripRequest, RateTripRequest, Trip, User } from '../shared/types';

export async function getMe(): Promise<User> {
  const { data } = await api.get<User>('/users/me');
  return data;
}

export async function getAvailableDrivers(): Promise<User[]> {
  const { data } = await api.get<User[]>('/drivers/available');
  return data;
}

export async function getMyTrips(): Promise<Trip[]> {
  const { data } = await api.get<Trip[]>('/trips');
  return data;
}

export async function getTrip(id: number): Promise<Trip> {
  const { data } = await api.get<Trip>(`/trips/${id}`);
  return data;
}

export async function requestTrip(body: CreateTripRequest): Promise<Trip> {
  const { data } = await api.post<Trip>('/trips', body);
  return data;
}

export async function rateTrip(id: number, body: RateTripRequest): Promise<Trip> {
  const { data } = await api.post<Trip>(`/trips/${id}/rate`, body);
  return data;
}

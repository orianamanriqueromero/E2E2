import { useState, type SubmitEvent } from 'react';

import { getApiError } from '../../shared/api';
import Button from '../../shared/Button';
import Input from '../../shared/Input';
import type { Trip } from '../../shared/types';
import { requestTrip } from '../passengerService';

interface RequestTripFormProps {
  onCreated: (trip: Trip) => void;
}

function RequestTripForm({ onCreated }: RequestTripFormProps) {
  const [pickupAddress, setPickupAddress] = useState('');
  const [dropoffAddress, setDropoffAddress] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const trip = await requestTrip({ pickupAddress, dropoffAddress });
      onCreated(trip);
    } catch (err) {
      setError(getApiError(err));
      setSubmitting(false);
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <Input
        label="Origen"
        placeholder="Av. Javier Prado 100"
        value={pickupAddress}
        onChange={(e) => setPickupAddress(e.target.value)}
        required
      />
      <Input
        label="Destino"
        placeholder="Miraflores, Lima"
        value={dropoffAddress}
        onChange={(e) => setDropoffAddress(e.target.value)}
        required
      />
      {error && <p className="error">{error}</p>}
      <Button type="submit" disabled={submitting}>
        {submitting ? 'Solicitando...' : 'Pedir viaje'}
      </Button>
    </form>
  );
}

export default RequestTripForm;

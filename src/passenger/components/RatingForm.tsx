import { useState, type SubmitEvent } from 'react';

import { getApiError } from '../../shared/api';
import Button from '../../shared/Button';
import type { Trip } from '../../shared/types';
import { rateTrip } from '../passengerService';

interface RatingFormProps {
  tripId: number;
  onRated: (trip: Trip) => void;
}

function RatingForm({ tripId, onRated }: RatingFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (rating < 1) {
      setError('Selecciona una calificación de 1 a 5 estrellas');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const trip = await rateTrip(tripId, {
        rating,
        comment: comment.trim() || undefined,
      });
      onRated(trip);
    } catch (err) {
      setError(getApiError(err));
      setSubmitting(false);
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3 style={{ marginTop: 0 }}>Califica tu viaje</h3>
      <div className="stars" role="radiogroup" aria-label="Calificación">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            className={value <= rating ? 'on' : ''}
            onClick={() => setRating(value)}
            aria-label={`${value} estrellas`}
          >
            ★
          </button>
        ))}
      </div>
      <div className="field" style={{ marginTop: '0.75rem' }}>
        <label htmlFor="rating-comment">Comentario (opcional)</label>
        <textarea
          id="rating-comment"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="¿Cómo estuvo tu viaje?"
        />
      </div>
      {error && <p className="error">{error}</p>}
      <Button type="submit" disabled={submitting}>
        {submitting ? 'Enviando...' : 'Enviar calificación'}
      </Button>
    </form>
  );
}

export default RatingForm;

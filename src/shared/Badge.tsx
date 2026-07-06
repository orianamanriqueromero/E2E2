import React from 'react';
import type { TripStatus } from '../types';

interface BadgeProps {
  status: TripStatus;
}

const Badge: React.FC<BadgeProps> = ({ status }) => {
  const colors = {
    PENDING: 'bg-yellow-200 text-yellow-800',
    IN_PROGRESS: 'bg-blue-200 text-blue-800',
    COMPLETED: 'bg-green-200 text-green-800',
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
      {status}
    </span>
  );
};

export default Badge;
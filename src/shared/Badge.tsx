import type { TripStatus } from './types';

const LABELS: Record<TripStatus, string> = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN PROGRESS',
  COMPLETED: 'COMPLETED',
};

interface BadgeProps {
  status: TripStatus;
}

function Badge({ status }: BadgeProps) {
  return <span className={`badge badge-${status.toLowerCase()}`}>{LABELS[status]}</span>;
}

export default Badge;

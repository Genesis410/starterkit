import { Badge } from '@/components/ui/badge';

interface SubscriptionStatusBadgeProps {
  status: string;
}

export function SubscriptionStatusBadge({ status }: SubscriptionStatusBadgeProps) {
  const getStatusVariant = () => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'default';
      case 'trialing':
        return 'secondary';
      case 'canceled':
      case 'incomplete':
      case 'incomplete_expired':
      case 'past_due':
      case 'unpaid':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getStatusText = () => {
    switch (status.toLowerCase()) {
      case 'trialing':
        return 'On Trial';
      case 'active':
        return 'Active';
      case 'canceled':
        return 'Canceled';
      case 'incomplete':
        return 'Incomplete';
      case 'incomplete_expired':
        return 'Incomplete Expired';
      case 'past_due':
        return 'Past Due';
      case 'unpaid':
        return 'Unpaid';
      default:
        return status;
    }
  };

  return (
    <Badge variant={getStatusVariant()}>
      {getStatusText()}
    </Badge>
  );
}
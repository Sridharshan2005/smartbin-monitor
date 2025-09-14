import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Trash2, 
  Droplets, 
  Zap, 
  Shield, 
  Recycle,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

interface BinStatusCardProps {
  id: string;
  type: 'tiny-particle' | 'plastic' | 'metal' | 'solid-waste' | 'sanitary-waste';
  fillLevel: number;
  location: string;
  lastUpdated: string;
}

const binConfig = {
  'tiny-particle': {
    name: 'Tiny Particle Bin',
    icon: Droplets,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  'plastic': {
    name: 'Plastic Bin',
    icon: Recycle,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  'metal': {
    name: 'Metal Bin',
    icon: Zap,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
  },
  'solid-waste': {
    name: 'Solid Waste Bin',
    icon: Trash2,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
  },
  'sanitary-waste': {
    name: 'Sanitary Waste Bin',
    icon: Shield,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
};

const getStatusInfo = (fillLevel: number) => {
  if (fillLevel < 60) {
    return {
      status: 'Low',
      color: 'text-status-low',
      bgColor: 'bg-status-low-bg',
      icon: CheckCircle,
      variant: 'secondary' as const,
    };
  } else if (fillLevel < 85) {
    return {
      status: 'Medium',
      color: 'text-status-medium',
      bgColor: 'bg-status-medium-bg',
      icon: Clock,
      variant: 'secondary' as const,
    };
  } else {
    return {
      status: 'High',
      color: 'text-status-high',
      bgColor: 'bg-status-high-bg',
      icon: AlertTriangle,
      variant: 'destructive' as const,
    };
  }
};

const getProgressColor = (fillLevel: number) => {
  if (fillLevel < 60) return 'bg-status-low';
  if (fillLevel < 85) return 'bg-status-medium';
  return 'bg-status-high';
};

const BinStatusCard: React.FC<BinStatusCardProps> = ({
  id,
  type,
  fillLevel,
  location,
  lastUpdated,
}) => {
  const config = binConfig[type];
  const statusInfo = getStatusInfo(fillLevel);
  const Icon = config.icon;
  const StatusIcon = statusInfo.icon;

  return (
    <Card className="shadow-card hover:shadow-elevated transition-all duration-300 animate-scale-in">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${config.bgColor} flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${config.color}`} />
            </div>
            <div>
              <CardTitle className="text-sm font-medium">{config.name}</CardTitle>
              <p className="text-xs text-muted-foreground">ID: {id}</p>
            </div>
          </div>
          <Badge variant={statusInfo.variant} className="flex items-center gap-1">
            <StatusIcon className="w-3 h-3" />
            {statusInfo.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Fill Level</span>
            <span className="font-medium">{fillLevel}%</span>
          </div>
          <div className="relative">
            <Progress value={fillLevel} className="h-2" />
            <div 
              className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-500 ${getProgressColor(fillLevel)}`}
              style={{ width: `${fillLevel}%` }}
            />
          </div>
        </div>

        <div className="space-y-1 text-xs text-muted-foreground">
          <div className="flex justify-between">
            <span>Location:</span>
            <span className="text-foreground">{location}</span>
          </div>
          <div className="flex justify-between">
            <span>Last Updated:</span>
            <span className="text-foreground">{lastUpdated}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BinStatusCard;
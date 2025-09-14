import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Locate } from 'lucide-react';

const mockBinLocations = [
  { id: 'BIN-001', lat: 40.7128, lng: -74.0060, status: 'low', type: 'Plastic' },
  { id: 'BIN-002', lat: 40.7614, lng: -73.9776, status: 'medium', type: 'Metal' },
  { id: 'BIN-003', lat: 40.7505, lng: -73.9934, status: 'high', type: 'Solid Waste' },
  { id: 'BIN-004', lat: 40.7282, lng: -73.7949, status: 'low', type: 'Sanitary' },
  { id: 'BIN-005', lat: 40.6892, lng: -74.0445, status: 'medium', type: 'Tiny Particle' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'low': return 'bg-status-low';
    case 'medium': return 'bg-status-medium';
    case 'high': return 'bg-status-high';
    default: return 'bg-gray-500';
  }
};

const MapSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Navigation className="w-5 h-5 text-primary" />
              GPS Bin Tracking
            </CardTitle>
            <Badge variant="outline" className="text-primary">
              <Locate className="w-3 h-3 mr-1" />
              Live Tracking
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Map Placeholder */}
          <div className="relative w-full h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border-2 border-dashed border-primary/20 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Interactive Map</h3>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                  Real GPS tracking integration would display bin locations here. 
                  Connect Google Maps or Leaflet for live tracking.
                </p>
              </div>
            </div>
            
            {/* Mock Pin Indicators */}
            <div className="absolute inset-0 pointer-events-none">
              {mockBinLocations.map((bin, index) => (
                <div
                  key={bin.id}
                  className="absolute animate-pulse-green"
                  style={{
                    left: `${20 + index * 15}%`,
                    top: `${30 + (index % 2) * 20}%`,
                  }}
                >
                  <div className={`w-4 h-4 rounded-full ${getStatusColor(bin.status)} border-2 border-white shadow-lg`}>
                    <div className={`w-8 h-8 rounded-full ${getStatusColor(bin.status)} opacity-30 absolute -inset-2 animate-ping`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Bin Location List */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Bin Locations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockBinLocations.map((bin) => (
              <div key={bin.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/30 hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(bin.status)}`} />
                  <div>
                    <p className="font-medium text-sm">{bin.id}</p>
                    <p className="text-xs text-muted-foreground">{bin.type} Bin</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">
                    {bin.lat.toFixed(4)}, {bin.lng.toFixed(4)}
                  </p>
                  <Badge 
                    variant={bin.status === 'high' ? 'destructive' : 'secondary'}
                    className="text-xs"
                  >
                    {bin.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MapSection;
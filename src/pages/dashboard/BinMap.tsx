import React from 'react';
import MapSection from '@/components/MapSection';

const BinMap: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Bin Map</h1>
        <p className="text-muted-foreground">Real-time GPS tracking of all waste bins</p>
      </div>
      
      <MapSection />
    </div>
  );
};

export default BinMap;
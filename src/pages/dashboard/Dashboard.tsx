import React, { useState, useEffect } from 'react';
import BinStatusCard from '@/components/BinStatusCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  RefreshCw,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BinData {
  id: string;
  type: 'tiny-particle' | 'plastic' | 'metal' | 'solid-waste' | 'sanitary-waste';
  fillLevel: number;
  location: string;
  lastUpdated: string;
}

const Dashboard: React.FC = () => {
  const [binData, setBinData] = useState<BinData[]>([
    {
      id: 'BIN-001',
      type: 'tiny-particle',
      fillLevel: 25,
      location: 'North Wing',
      lastUpdated: '2 min ago',
    },
    {
      id: 'BIN-002',
      type: 'plastic',
      fillLevel: 78,
      location: 'Main Entrance',
      lastUpdated: '1 min ago',
    },
    {
      id: 'BIN-003',
      type: 'metal',
      fillLevel: 92,
      location: 'Cafeteria',
      lastUpdated: '3 min ago',
    },
    {
      id: 'BIN-004',
      type: 'solid-waste',
      fillLevel: 45,
      location: 'South Parking',
      lastUpdated: '5 min ago',
    },
    {
      id: 'BIN-005',
      type: 'sanitary-waste',
      fillLevel: 67,
      location: 'Medical Wing',
      lastUpdated: '4 min ago',
    },
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshData = async () => {
    setIsRefreshing(true);
    
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setBinData(prev => prev.map(bin => ({
      ...bin,
      fillLevel: Math.max(0, Math.min(100, bin.fillLevel + Math.floor(Math.random() * 10) - 5)),
      lastUpdated: 'Just now',
    })));
    
    setIsRefreshing(false);
  };

  const getStatusCounts = () => {
    const low = binData.filter(bin => bin.fillLevel < 60).length;
    const medium = binData.filter(bin => bin.fillLevel >= 60 && bin.fillLevel < 85).length;
    const high = binData.filter(bin => bin.fillLevel >= 85).length;
    return { low, medium, high };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Smart Waste Bin Monitoring System</p>
        </div>
        <Button 
          onClick={refreshData} 
          disabled={isRefreshing}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
        </Button>
      </div>

      {/* Status Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Bins</p>
                <p className="text-2xl font-bold">{binData.length}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Low Fill</p>
                <p className="text-2xl font-bold text-status-low">{statusCounts.low}</p>
              </div>
              <div className="w-12 h-12 bg-status-low-bg rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-status-low" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Medium Fill</p>
                <p className="text-2xl font-bold text-status-medium">{statusCounts.medium}</p>
              </div>
              <div className="w-12 h-12 bg-status-medium-bg rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-status-medium" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High Fill</p>
                <p className="text-2xl font-bold text-status-high">{statusCounts.high}</p>
              </div>
              <div className="w-12 h-12 bg-status-high-bg rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-status-high" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Status */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Real-time Bin Status
            </CardTitle>
            <Badge variant="outline" className="text-primary animate-pulse-green">
              <div className="w-2 h-2 bg-primary rounded-full mr-2" />
              Live Data
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Bin Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {binData.map((bin, index) => (
          <div
            key={bin.id}
            style={{ animationDelay: `${index * 100}ms` }}
            className="animate-scale-in"
          >
            <BinStatusCard {...bin} />
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-sm">Schedule Collection</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Activity className="w-5 h-5" />
              <span className="text-sm">Generate Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Zap className="w-5 h-5" />
              <span className="text-sm">System Health</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
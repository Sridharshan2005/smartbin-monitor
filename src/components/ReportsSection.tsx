import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, Calendar, BarChart3, PieChart as PieChartIcon } from 'lucide-react';

const weeklyData = [
  { day: 'Mon', plastic: 65, metal: 45, solid: 80, sanitary: 30, particle: 25 },
  { day: 'Tue', plastic: 75, metal: 55, solid: 70, sanitary: 40, particle: 35 },
  { day: 'Wed', plastic: 85, metal: 65, solid: 90, sanitary: 35, particle: 40 },
  { day: 'Thu', plastic: 70, metal: 50, solid: 85, sanitary: 45, particle: 30 },
  { day: 'Fri', plastic: 90, metal: 70, solid: 95, sanitary: 50, particle: 45 },
  { day: 'Sat', plastic: 60, metal: 40, solid: 75, sanitary: 25, particle: 20 },
  { day: 'Sun', plastic: 50, metal: 35, solid: 60, sanitary: 20, particle: 15 },
];

const monthlyTrend = [
  { month: 'Jan', fillLevel: 65 },
  { month: 'Feb', fillLevel: 72 },
  { month: 'Mar', fillLevel: 68 },
  { month: 'Apr', fillLevel: 75 },
  { month: 'May', fillLevel: 82 },
  { month: 'Jun', fillLevel: 78 },
];

const binTypeData = [
  { name: 'Plastic', value: 35, color: '#22c55e' },
  { name: 'Metal', value: 25, color: '#eab308' },
  { name: 'Solid Waste', value: 20, color: '#6b7280' },
  { name: 'Sanitary', value: 15, color: '#ef4444' },
  { name: 'Tiny Particle', value: 5, color: '#3b82f6' },
];

const ReportsSection: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Collections</p>
                <p className="text-2xl font-bold">156</p>
                <p className="text-xs text-primary flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +12% from last week
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Fill Level</p>
                <p className="text-2xl font-bold">73%</p>
                <Badge variant="secondary" className="mt-1">
                  Optimal Range
                </Badge>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <PieChartIcon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Bins</p>
                <p className="text-2xl font-bold">5/5</p>
                <Badge variant="secondary" className="mt-1 bg-status-low-bg text-status-low">
                  All Online
                </Badge>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Fill Levels */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Weekly Fill Levels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="plastic" fill="#22c55e" name="Plastic" />
                <Bar dataKey="metal" fill="#eab308" name="Metal" />
                <Bar dataKey="solid" fill="#6b7280" name="Solid" />
                <Bar dataKey="sanitary" fill="#ef4444" name="Sanitary" />
                <Bar dataKey="particle" fill="#3b82f6" name="Particle" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Trend */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Monthly Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="fillLevel" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bin Distribution */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChartIcon className="w-5 h-5 text-primary" />
            Waste Distribution by Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="w-full lg:w-1/2">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={binTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {binTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full lg:w-1/2 space-y-3">
              {binTypeData.map((item) => (
                <div key={item.name} className="flex items-center justify-between p-3 rounded-lg bg-accent/20">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="text-muted-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsSection;
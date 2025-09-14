import React from 'react';
import ReportsSection from '@/components/ReportsSection';

const Reports: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground">Analytics and insights for waste management</p>
      </div>
      
      <ReportsSection />
    </div>
  );
};

export default Reports;

import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface FleetDemandChartProps {
  numOutlets: number;
}

const FleetDemandChart = ({ numOutlets }: FleetDemandChartProps) => {
  const chartData = useMemo(() => {
    const routeData = { A: { frozen: 0, chilled: 0, dry: 0 }, B: { frozen: 0, chilled: 0, dry: 0 }, C: { frozen: 0, chilled: 0, dry: 0 } };
    
    for (let i = 0; i < numOutlets; i++) {
      const route = String.fromCharCode(65 + (i % 3)) as 'A' | 'B' | 'C';
      const frozen = Math.floor(Math.random() * 500) + 100;
      const chilled = Math.floor(Math.random() * 400) + 100;
      const dry = Math.floor(Math.random() * 250) + 50;
      const forecastMultiplier = 1.0 + Math.random() * 0.2;
      
      routeData[route].frozen += Math.round(frozen * forecastMultiplier);
      routeData[route].chilled += Math.round(chilled * forecastMultiplier);
      routeData[route].dry += Math.round(dry * forecastMultiplier);
    }
    
    return [
      { route: 'Route A', 'Forecasted Frozen': routeData.A.frozen, 'Forecasted Chilled': routeData.A.chilled, 'Forecasted Dry': routeData.A.dry },
      { route: 'Route B', 'Forecasted Frozen': routeData.B.frozen, 'Forecasted Chilled': routeData.B.chilled, 'Forecasted Dry': routeData.B.dry },
      { route: 'Route C', 'Forecasted Frozen': routeData.C.frozen, 'Forecasted Chilled': routeData.C.chilled, 'Forecasted Dry': routeData.C.dry },
    ];
  }, [numOutlets]);

  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="route" />
          <YAxis label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="Forecasted Frozen" fill="#3B82F6" />
          <Bar dataKey="Forecasted Chilled" fill="#10B981" />
          <Bar dataKey="Forecasted Dry" fill="#F59E0B" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FleetDemandChart;

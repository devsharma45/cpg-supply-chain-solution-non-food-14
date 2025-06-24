
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Package, DollarSign, TrendingUp, MapPin, BarChart3 } from 'lucide-react';

interface FleetKPICardsProps {
  numOutlets: number;
}

const FleetKPICards = ({ numOutlets }: FleetKPICardsProps) => {
  const kpiData = useMemo(() => {
    // Calculate total trucks needed (simplified)
    const totalTrucks = Math.ceil(numOutlets / 3); // Rough estimate
    
    // Calculate average load factor
    const avgLoadFactor = 65 + Math.random() * 25; // 65-90%
    
    // Calculate total cost
    const totalCost = totalTrucks * 120; // RM per truck per route
    
    // Calculate route performance
    const totalDrops = numOutlets;
    const totalDistance = numOutlets * (Math.random() * 20 + 10); // 10-30km per outlet
    const dropDensity = totalDrops / totalDistance;
    
    return {
      totalTrucks,
      avgLoadFactor: Math.round(avgLoadFactor * 10) / 10,
      totalCost,
      totalDrops,
      totalDistance: Math.round(totalDistance),
      dropDensity: Math.round(dropDensity * 100) / 100,
    };
  }, [numOutlets]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">🚛 Total Trucks</CardTitle>
          <Truck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{kpiData.totalTrucks}</div>
          <p className="text-xs text-muted-foreground">Vehicles required</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">📦 Avg Load Factor</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{kpiData.avgLoadFactor}%</div>
          <p className="text-xs text-muted-foreground">Capacity utilization</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">💸 Est. Delivery Cost</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">RM {kpiData.totalCost}</div>
          <p className="text-xs text-muted-foreground">Total route cost</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">📍 Total Drops</CardTitle>
          <MapPin className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{kpiData.totalDrops}</div>
          <p className="text-xs text-muted-foreground">Delivery points</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">🛣️ Total Distance</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{kpiData.totalDistance} km</div>
          <p className="text-xs text-muted-foreground">Route distance</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">📊 Drop Density</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{kpiData.dropDensity}</div>
          <p className="text-xs text-muted-foreground">Drops per km</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FleetKPICards;

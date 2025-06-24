
import React, { useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface FleetDemandTableProps {
  numOutlets: number;
}

interface OutletData {
  outlet: string;
  route: string;
  frozen: number;
  chilled: number;
  dry: number;
  distance: number;
  forecastMultiplier: number;
  forecastedFrozen: number;
  forecastedChilled: number;
  forecastedDry: number;
}

const FleetDemandTable = ({ numOutlets }: FleetDemandTableProps) => {
  const data = useMemo(() => {
    const outlets: OutletData[] = [];
    for (let i = 0; i < numOutlets; i++) {
      const frozen = Math.floor(Math.random() * 500) + 100;
      const chilled = Math.floor(Math.random() * 400) + 100;
      const dry = Math.floor(Math.random() * 250) + 50;
      const distance = Math.floor(Math.random() * 25) + 5;
      const forecastMultiplier = 1.0 + Math.random() * 0.2;
      
      outlets.push({
        outlet: `BK_${(i + 1).toString().padStart(3, '0')}`,
        route: `Route ${String.fromCharCode(65 + (i % 3))}`,
        frozen,
        chilled,
        dry,
        distance,
        forecastMultiplier,
        forecastedFrozen: Math.round(frozen * forecastMultiplier),
        forecastedChilled: Math.round(chilled * forecastMultiplier),
        forecastedDry: Math.round(dry * forecastMultiplier),
      });
    }
    return outlets;
  }, [numOutlets]);

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Outlet</TableHead>
            <TableHead>Route</TableHead>
            <TableHead>Frozen (kg)</TableHead>
            <TableHead>Chilled (kg)</TableHead>
            <TableHead>Dry (kg)</TableHead>
            <TableHead>Distance (km)</TableHead>
            <TableHead>Forecast Multiplier</TableHead>
            <TableHead>Forecasted Frozen</TableHead>
            <TableHead>Forecasted Chilled</TableHead>
            <TableHead>Forecasted Dry</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{row.outlet}</TableCell>
              <TableCell>{row.route}</TableCell>
              <TableCell>{row.frozen}</TableCell>
              <TableCell>{row.chilled}</TableCell>
              <TableCell>{row.dry}</TableCell>
              <TableCell>{row.distance}</TableCell>
              <TableCell>{row.forecastMultiplier.toFixed(2)}</TableCell>
              <TableCell className="font-semibold text-blue-600">{row.forecastedFrozen}</TableCell>
              <TableCell className="font-semibold text-green-600">{row.forecastedChilled}</TableCell>
              <TableCell className="font-semibold text-orange-600">{row.forecastedDry}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FleetDemandTable;

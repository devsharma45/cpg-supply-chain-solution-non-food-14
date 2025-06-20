
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, AlertTriangle, DollarSign, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface CashFlowOverviewProps {
  timeframe: string;
  region: string;
}

const CashFlowOverview: React.FC<CashFlowOverviewProps> = ({ timeframe, region }) => {
  // Mock data for cash flow overview
  const dailyFlowData = [
    { date: '2024-01-15', inflow: 2500, outflow: 1800, net: 700 },
    { date: '2024-01-16', inflow: 2800, outflow: 2100, net: 700 },
    { date: '2024-01-17', inflow: 3200, outflow: 2400, net: 800 },
    { date: '2024-01-18', inflow: 2900, outflow: 2200, net: 700 },
    { date: '2024-01-19', inflow: 3500, outflow: 2800, net: 700 },
    { date: '2024-01-20', inflow: 3100, outflow: 2600, net: 500 },
    { date: '2024-01-21', inflow: 2700, outflow: 2300, net: 400 }
  ];

  const kpiData = [
    {
      title: 'Net Cash Position',
      value: '₹4,250 Cr',
      change: '+12.5%',
      trend: 'up',
      description: 'vs last period'
    },
    {
      title: 'Liquidity Coverage Ratio',
      value: '142%',
      change: '+3.2%',
      trend: 'up',
      description: 'Above regulatory minimum'
    },
    {
      title: 'Cash Burn Rate',
      value: '₹850 Cr/day',
      change: '-5.1%',
      trend: 'down',
      description: 'Average daily outflow'
    },
    {
      title: 'Forecast Accuracy',
      value: '94.2%',
      change: '+1.8%',
      trend: 'up',
      description: 'Last 30 days average'
    }
  ];

  const alerts = [
    { type: 'warning', message: 'ATM cash below threshold in 15 locations', priority: 'Medium' },
    { type: 'info', message: 'Surplus cash available for investment: ₹320 Cr', priority: 'Low' },
    { type: 'error', message: 'LCR approaching minimum in Western region', priority: 'High' }
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{kpi.title}</CardTitle>
              {kpi.trend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
              <div className="flex items-center space-x-2 mt-2">
                <Badge 
                  variant="outline" 
                  className={kpi.trend === 'up' ? 'text-green-700 border-green-200' : 'text-red-700 border-red-200'}
                >
                  {kpi.change}
                </Badge>
                <span className="text-xs text-gray-500">{kpi.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Cash Flow Trend */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Daily Cash Flow Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyFlowData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="inflow" stroke="#10b981" strokeWidth={2} name="Inflow" />
                <Line type="monotone" dataKey="outflow" stroke="#ef4444" strokeWidth={2} name="Outflow" />
                <Line type="monotone" dataKey="net" stroke="#3b82f6" strokeWidth={3} name="Net Position" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Inflow vs Outflow Comparison */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Today's Flow Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyFlowData.slice(-1)}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="inflow" fill="#10b981" name="Inflow (₹ Cr)" />
                <Bar dataKey="outflow" fill="#ef4444" name="Outflow (₹ Cr)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Alerts */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <span>Real-time Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  {alert.type === 'error' && <AlertTriangle className="w-5 h-5 text-red-500" />}
                  {alert.type === 'warning' && <AlertTriangle className="w-5 h-5 text-orange-500" />}
                  {alert.type === 'info' && <Zap className="w-5 h-5 text-blue-500" />}
                  <span className="text-sm text-gray-700">{alert.message}</span>
                </div>
                <Badge 
                  variant="outline"
                  className={
                    alert.priority === 'High' ? 'text-red-700 border-red-200' :
                    alert.priority === 'Medium' ? 'text-orange-700 border-orange-200' :
                    'text-blue-700 border-blue-200'
                  }
                >
                  {alert.priority}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CashFlowOverview;

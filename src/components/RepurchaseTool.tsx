
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Area, AreaChart } from 'recharts';
import { ShoppingCart, Target, TrendingDown, Calculator } from 'lucide-react';
import { Slider } from "@/components/ui/slider";

interface RepurchaseToolProps {
  selectedStore: string;
  selectedRegion: string;
}

const RepurchaseTool: React.FC<RepurchaseToolProps> = ({ selectedStore, selectedRegion }) => {
  const [optimizationTarget, setOptimizationTarget] = useState('spoilage');
  const [riskTolerance, setRiskTolerance] = useState([75]);

  const optimizedOrderData = [
    { 
      item: 'Beef Patties', 
      current: 500, 
      optimized: 420, 
      savings: 80, 
      spoilageReduction: 15,
      stockoutRisk: 2 
    },
    { 
      item: 'Lettuce', 
      current: 300, 
      optimized: 250, 
      savings: 50, 
      spoilageReduction: 25,
      stockoutRisk: 5 
    },
    { 
      item: 'Tomatoes', 
      current: 200, 
      optimized: 180, 
      savings: 20, 
      spoilageReduction: 20,
      stockoutRisk: 3 
    },
    { 
      item: 'Cheese', 
      current: 150, 
      optimized: 130, 
      savings: 20, 
      spoilageReduction: 18,
      stockoutRisk: 4 
    },
    { 
      item: 'Buns', 
      current: 800, 
      optimized: 720, 
      savings: 80, 
      spoilageReduction: 12,
      stockoutRisk: 1 
    }
  ];

  const spoilageReductionTrend = [
    { week: 'W1', baseline: 100, optimized: 85, savings: 450 },
    { week: 'W2', baseline: 95, optimized: 78, savings: 520 },
    { week: 'W3', baseline: 110, optimized: 82, savings: 680 },
    { week: 'W4', baseline: 105, optimized: 75, savings: 750 },
    { week: 'W5', baseline: 98, optimized: 70, savings: 820 },
    { week: 'W6', baseline: 102, optimized: 68, savings: 890 }
  ];

  const reorderScenarios = [
    {
      scenario: 'Conservative',
      description: 'Low stockout risk, higher inventory',
      spoilageReduction: '12%',
      costSavings: '$2,340',
      stockoutRisk: '0.5%',
      inventoryTurnover: '8.2x'
    },
    {
      scenario: 'Balanced',
      description: 'Optimal balance of cost and risk',
      spoilageReduction: '18%',
      costSavings: '$3,680',
      stockoutRisk: '2.1%',
      inventoryTurnover: '12.1x'
    },
    {
      scenario: 'Aggressive',
      description: 'Maximum cost savings, higher risk',
      spoilageReduction: '25%',
      costSavings: '$4,920',
      stockoutRisk: '4.8%',
      inventoryTurnover: '15.8x'
    }
  ];

  const getTotalSavings = () => {
    return optimizedOrderData.reduce((sum, item) => sum + item.savings, 0);
  };

  const getAverageSpoilageReduction = () => {
    const avg = optimizedOrderData.reduce((sum, item) => sum + item.spoilageReduction, 0) / optimizedOrderData.length;
    return Math.round(avg);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Smart Repurchase Tool</h2>
        <div className="flex space-x-4">
          <Select value={optimizationTarget} onValueChange={setOptimizationTarget}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="spoilage">Minimize Spoilage</SelectItem>
              <SelectItem value="cost">Minimize Cost</SelectItem>
              <SelectItem value="balanced">Balanced Approach</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-green-600 hover:bg-green-700">
            <Calculator className="w-4 h-4 mr-2" />
            Run Optimization
          </Button>
        </div>
      </div>

      {/* Optimization Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingDown className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-green-700">Potential Savings</p>
                <p className="text-2xl font-bold text-green-800">${getTotalSavings()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-blue-700">Spoilage Reduction</p>
                <p className="text-2xl font-bold text-blue-800">{getAverageSpoilageReduction()}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-sm text-orange-700">Order Frequency</p>
                <p className="text-2xl font-bold text-orange-800">2.3x/week</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calculator className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-sm text-purple-700">ROI</p>
                <p className="text-2xl font-bold text-purple-800">284%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Optimization Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Optimized Order Quantities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {optimizedOrderData.map((item, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{item.item}</h4>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      -{item.spoilageReduction}% spoilage
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Current Order</p>
                      <p className="font-semibold">{item.current} units</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Optimized Order</p>
                      <p className="font-semibold text-green-600">{item.optimized} units</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Cost Savings</p>
                      <p className="font-semibold text-green-600">${item.savings}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Stockout Risk</p>
                      <p className="font-semibold text-blue-600">{item.stockoutRisk}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Spoilage Reduction Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={spoilageReductionTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="baseline" fill="#ef4444" name="Baseline Spoilage" />
                <Bar yAxisId="left" dataKey="optimized" fill="#22c55e" name="Optimized Spoilage" />
                <Line yAxisId="right" type="monotone" dataKey="savings" stroke="#f97316" strokeWidth={3} name="Cumulative Savings ($)" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Risk Tolerance Setting */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Tolerance Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Level Target: {riskTolerance[0]}%
              </label>
              <Slider
                value={riskTolerance}
                onValueChange={setRiskTolerance}
                max={99}
                min={70}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Conservative (70%)</span>
                <span>Aggressive (99%)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scenario Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Reorder Strategy Scenarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reorderScenarios.map((scenario, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold text-gray-800">{scenario.scenario}</h4>
                  {index === 1 && (
                    <Badge className="bg-orange-100 text-orange-800">Recommended</Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-4">{scenario.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Spoilage Reduction:</span>
                    <span className="font-semibold text-green-600">{scenario.spoilageReduction}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost Savings:</span>
                    <span className="font-semibold text-green-600">{scenario.costSavings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Stockout Risk:</span>
                    <span className="font-semibold text-blue-600">{scenario.stockoutRisk}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Inventory Turnover:</span>
                    <span className="font-semibold">{scenario.inventoryTurnover}</span>
                  </div>
                </div>
                <Button 
                  className={`w-full mt-4 ${index === 1 ? 'bg-orange-600 hover:bg-orange-700' : 'bg-gray-600 hover:bg-gray-700'}`}
                  size="sm"
                >
                  {index === 1 ? 'Apply Strategy' : 'Select Strategy'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RepurchaseTool;

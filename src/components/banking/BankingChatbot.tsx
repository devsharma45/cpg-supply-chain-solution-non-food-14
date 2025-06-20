
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Bot, User, TrendingUp, AlertTriangle, DollarSign } from 'lucide-react';

const BankingChatbot: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m BankBot, your AI assistant for cash flow analysis. How can I help you today?',
      timestamp: '10:30 AM'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const quickActions = [
    { label: 'Today\'s Cash Position', icon: DollarSign, query: 'What is today\'s net cash position?' },
    { label: 'Weekly Forecast', icon: TrendingUp, query: 'Show me the 7-day cash flow forecast' },
    { label: 'ATM Alerts', icon: AlertTriangle, query: 'Any ATM cash alerts today?' },
    { label: 'Regional Analysis', icon: MessageSquare, query: 'Compare regional cash positions' }
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newUserMessage = {
      id: messages.length + 1,
      type: 'user' as const,
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      const newBotMessage = {
        id: messages.length + 2,
        type: 'bot' as const,
        content: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, newBotMessage]);
    }, 1000);
  };

  const generateBotResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('cash position') || lowerQuery.includes('net cash')) {
      return 'Today\'s net cash position is ₹4,250 Cr, which is 12.5% higher than yesterday. The increase is primarily due to higher corporate deposits (+₹320 Cr) and lower loan disbursements (-₹180 Cr). Liquidity Coverage Ratio stands at 142%, well above the regulatory minimum.';
    }
    
    if (lowerQuery.includes('forecast') || lowerQuery.includes('prediction')) {
      return 'Based on our AI-LSTM model, the 7-day forecast shows stable cash flows with an average daily net position of ₹3,200 Cr. Key factors: Expected loan repayments of ₹1,200 Cr over the period, seasonal deposit inflows during festival season, and scheduled corporate disbursements of ₹800 Cr.';
    }
    
    if (lowerQuery.includes('atm') || lowerQuery.includes('alert')) {
      return 'Current ATM alerts: 15 locations have cash below threshold (₹5 lakh). High priority locations: Bangalore MG Road (₹1.5L), Kolkata Park Street (₹1.2L). Recommended action: Schedule immediate cash replenishment for these locations. Estimated impact: ₹45L total requirement.';
    }
    
    if (lowerQuery.includes('regional') || lowerQuery.includes('region')) {
      return 'Regional analysis shows: North region has surplus of ₹100 Cr (+9.1% vs target), South region has deficit of ₹50 Cr (-5.0% vs target). Recommendation: Transfer ₹75 Cr from North to South region to optimize liquidity distribution. This will improve overall efficiency by 3.2%.';
    }
    
    if (lowerQuery.includes('repo rate') || lowerQuery.includes('rbi')) {
      return 'Recent RBI repo rate changes impact analysis: With the current rate at 6.5%, our net interest margin improved by 15 basis points. Cash flow impact: Additional ₹25 Cr monthly from lending spread improvement. Forecast suggests continued positive impact over next quarter.';
    }

    if (lowerQuery.includes('quarter') || lowerQuery.includes('3%')) {
      return 'End-of-quarter cash balance under 3% interest rate rise scenario: Predicted balance ₹3,850 Cr (vs ₹4,250 Cr base case). Impact breakdown: Reduced deposit inflows (-₹200 Cr), increased borrowing costs (-₹150 Cr), higher loan demand (+₹50 Cr). Recommendation: Maintain higher liquidity buffer.';
    }
    
    return 'I can help you analyze cash flows, forecast positions, identify risks, and provide actionable insights. Try asking about specific metrics, regional performance, or what-if scenarios. For example: "Why is cash position lower today?" or "Predict impact of interest rate changes."';
  };

  const handleQuickAction = (query: string) => {
    setInputMessage(query);
    handleSendMessage();
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleQuickAction(action.query)}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <action.icon className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-900">{action.label}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chat Interface */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Bot className="w-5 h-5 text-blue-600" />
            <span>BankBot - AI Assistant</span>
            <Badge variant="outline" className="text-green-700 border-green-200">Online</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Messages */}
          <div className="h-96 overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 rounded-lg">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-900 shadow-sm border border-gray-200'
                }`}>
                  <div className="flex items-start space-x-2">
                    {message.type === 'bot' && <Bot className="w-4 h-4 mt-1 text-blue-600" />}
                    {message.type === 'user' && <User className="w-4 h-4 mt-1 text-white" />}
                    <div>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about cash flows, forecasts, or get insights..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button onClick={handleSendMessage} className="px-4">
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {/* Suggested Queries */}
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="cursor-pointer hover:bg-gray-100" onClick={() => handleQuickAction('Why is today\'s net cash position lower?')}>
                Why is cash position lower?
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-gray-100" onClick={() => handleQuickAction('Shift ₹200 Cr from surplus branch to deficit zones')}>
                Cash reallocation suggestions
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-gray-100" onClick={() => handleQuickAction('Summarize cashflow impact of recent RBI repo rate hike')}>
                RBI rate impact analysis
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BankingChatbot;

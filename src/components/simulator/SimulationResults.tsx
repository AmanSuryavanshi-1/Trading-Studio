
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/common/Card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  Legend,
  Cell
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { InfoIcon } from "lucide-react";

// Sample data
const performanceData = [
  { date: "2023-01", value: 10000 },
  { date: "2023-02", value: 10500 },
  { date: "2023-03", value: 10300 },
  { date: "2023-04", value: 10800 },
  { date: "2023-05", value: 11200 },
  { date: "2023-06", value: 11100 },
  { date: "2023-07", value: 11600 },
  { date: "2023-08", value: 12100 },
  { date: "2023-09", value: 12400 },
  { date: "2023-10", value: 12200 },
  { date: "2023-11", value: 12800 },
  { date: "2023-12", value: 13100 },
  { date: "2024-01", value: 12900 },
  { date: "2024-02", value: 13400 },
  { date: "2024-03", value: 13900 },
  { date: "2024-04", value: 14300 },
];

const monthlyReturns = [
  { month: "Jan", value: 5.0 },
  { month: "Feb", value: -1.9 },
  { month: "Mar", value: 4.8 },
  { month: "Apr", value: 3.7 },
  { month: "May", value: -0.9 },
  { month: "Jun", value: 4.5 },
  { month: "Jul", value: 4.3 },
  { month: "Aug", value: 2.5 },
  { month: "Sep", value: -1.6 },
  { month: "Oct", value: 4.9 },
  { month: "Nov", value: 2.3 },
  { month: "Dec", value: -1.5 },
];

const tradeHistory = [
  { date: "2023-02-14", type: "Buy", symbol: "AAPL", price: 152.87, quantity: 10, amount: 1528.70 },
  { date: "2023-03-05", type: "Sell", symbol: "AAPL", price: 161.52, quantity: 10, amount: 1615.20 },
  { date: "2023-03-12", type: "Buy", symbol: "MSFT", price: 286.14, quantity: 5, amount: 1430.70 },
  { date: "2023-04-20", type: "Buy", symbol: "GOOGL", price: 105.33, quantity: 15, amount: 1579.95 },
  { date: "2023-05-08", type: "Sell", symbol: "MSFT", price: 308.97, quantity: 5, amount: 1544.85 },
  { date: "2023-05-19", type: "Buy", symbol: "NVDA", price: 312.64, quantity: 4, amount: 1250.56 },
  { date: "2023-06-27", type: "Sell", symbol: "GOOGL", price: 122.76, quantity: 15, amount: 1841.40 },
  { date: "2023-07-12", type: "Buy", symbol: "AMZN", price: 134.68, quantity: 12, amount: 1616.16 },
  { date: "2023-08-04", type: "Sell", symbol: "NVDA", price: 445.12, quantity: 4, amount: 1780.48 },
  { date: "2023-09-15", type: "Buy", symbol: "TSLA", price: 274.39, quantity: 6, amount: 1646.34 },
  { date: "2023-10-11", type: "Sell", symbol: "AMZN", price: 148.71, quantity: 12, amount: 1784.52 },
];

export function SimulationResults() {
  // Calculate metrics
  const startValue = performanceData[0].value;
  const endValue = performanceData[performanceData.length - 1].value;
  const totalReturn = ((endValue - startValue) / startValue) * 100;
  
  // Chart settings
  const chartConfig = {
    area: {
      gradient: {
        id: "colorValue",
        color: "hsl(var(--primary))",
        opacity: { start: 0.3, end: 0 }
      }
    }
  };
  
  return (
    <div className="container max-w-6xl py-10 animate-fade-in">
      <header className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Simulation Results</h1>
            <p className="text-muted-foreground">Tech Growth Strategy • Jan 2023 - Apr 2024</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-3 py-1.5 text-sm bg-secondary rounded-md hover:bg-secondary/80 transition-colors">
              Export Data
            </button>
            <button className="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-colors">
              Save Strategy
            </button>
          </div>
        </div>
        
        <div className="p-3 bg-muted rounded-md text-sm flex items-center gap-2">
          <InfoIcon className="h-4 w-4 text-muted-foreground" />
          <span>This simulation is based on historical data and does not guarantee future results.</span>
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in">
        <MetricCard
          title="Total Return"
          value={`+${totalReturn.toFixed(1)}%`}
          description="Overall performance"
          trend="positive"
        />
        <MetricCard
          title="Weekly Win Rate"
          value="68.3%"
          description="Positive weeks"
          progress={68}
          trend="positive"
        />
        <MetricCard
          title="Max Drawdown"
          value="-8.2%"
          description="Largest decline"
          progress={8}
          trend="negative"
        />
      </div>
      
      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="trades">Trade History</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="animate-fade-in">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Value</CardTitle>
                <CardDescription>Performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={performanceData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id={chartConfig.area.gradient.id} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={chartConfig.area.gradient.color} stopOpacity={chartConfig.area.gradient.opacity.start}/>
                          <stop offset="95%" stopColor={chartConfig.area.gradient.color} stopOpacity={chartConfig.area.gradient.opacity.end}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                      <XAxis 
                        dataKey="date" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                        domain={['dataMin - 1000', 'dataMax + 1000']}
                      />
                      <Tooltip 
                        formatter={(value) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
                        labelFormatter={(label) => {
                          const date = new Date(label);
                          return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                        }}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          borderColor: 'hsl(var(--border))',
                          borderRadius: 'var(--radius)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="hsl(var(--primary))" 
                        fillOpacity={1}
                        fill={`url(#${chartConfig.area.gradient.id})`} 
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Returns (%)</CardTitle>
                  <CardDescription>Performance breakdown by month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyReturns}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                        <XAxis 
                          dataKey="month" 
                          axisLine={false} 
                          tickLine={false}
                          tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: 'hsl(var(--muted-foreground))' }}
                          tickFormatter={(value) => `${value}%`}
                        />
                        <Tooltip 
                          formatter={(value) => [`${value}%`, 'Return']}
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            borderColor: 'hsl(var(--border))',
                            borderRadius: 'var(--radius)',
                          }}
                        />
                        <Bar 
                          dataKey="value" 
                          fill="hsl(var(--primary))"
                          radius={[4, 4, 0, 0]}
                        >
                          {monthlyReturns.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={entry.value >= 0 ? 'hsl(var(--positive))' : 'hsl(var(--negative))'}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Key Statistics</CardTitle>
                  <CardDescription>Performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-2 gap-4 text-sm">
                    <MetricItem label="Annualized Return" value="+22.4%" />
                    <MetricItem label="Sharpe Ratio" value="1.83" />
                    <MetricItem label="Sortino Ratio" value="2.14" />
                    <MetricItem label="Beta" value="0.87" />
                    <MetricItem label="Alpha" value="8.3%" />
                    <MetricItem label="R-Squared" value="0.76" />
                    <MetricItem label="Avg. Trade Duration" value="18.4 days" />
                    <MetricItem label="Win/Loss Ratio" value="2.3" />
                    <MetricItem label="Total Trades" value="42" />
                    <MetricItem label="Profitable Trades" value="29 (69%)" />
                  </dl>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="performance" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Detailed performance analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Monthly Performance</h4>
                  <div className="grid grid-cols-4 gap-4">
                    {Array.from({ length: 12 }).map((_, i) => {
                      const monthName = new Date(2023, i, 1).toLocaleString('default', { month: 'short' });
                      const randomValue = (Math.random() * 10 - 3).toFixed(1);
                      const isPositive = parseFloat(randomValue) >= 0;
                      
                      return (
                        <div key={i} className="p-3 bg-muted rounded-md">
                          <div className="text-xs text-muted-foreground">{monthName}</div>
                          <div className={cn(
                            "text-lg font-medium",
                            isPositive ? "text-positive" : "text-negative"
                          )}>
                            {isPositive ? "+" : ""}{randomValue}%
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Rolling Returns</h4>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData.map((entry, index) => {
                        return {
                          date: entry.date,
                          "3m": index > 2 ? ((entry.value / performanceData[index - 3].value) - 1) * 100 : null,
                          "6m": index > 5 ? ((entry.value / performanceData[index - 6].value) - 1) * 100 : null,
                          "12m": index > 11 ? ((entry.value / performanceData[index - 12].value) - 1) * 100 : null,
                        };
                      })}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                        <XAxis 
                          dataKey="date" 
                          axisLine={false} 
                          tickLine={false}
                          tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: 'hsl(var(--muted-foreground))' }}
                          tickFormatter={(value) => `${value.toFixed(1)}%`}
                        />
                        <Tooltip 
                          formatter={(value: any) => [`${value?.toFixed(2)}%`, 'Return']}
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            borderColor: 'hsl(var(--border))',
                            borderRadius: 'var(--radius)',
                          }}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="3m" 
                          stroke="#8884d8" 
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 4 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="6m" 
                          stroke="#82ca9d" 
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 4 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="12m" 
                          stroke="#ffc658" 
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trades" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Trade History</CardTitle>
              <CardDescription>Recent trades executed by the strategy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Type</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Symbol</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Price</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Quantity</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tradeHistory.map((trade, index) => (
                      <tr key={index} className="border-b last:border-0 hover:bg-muted/50">
                        <td className="py-3 px-4 text-sm">{trade.date}</td>
                        <td className="py-3 px-4">
                          <span className={cn(
                            "px-2 py-1 text-xs rounded",
                            trade.type === "Buy" ? "bg-positive/20 text-positive" : "bg-negative/20 text-negative"
                          )}>
                            {trade.type}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-medium">{trade.symbol}</td>
                        <td className="py-3 px-4 text-right">${trade.price.toFixed(2)}</td>
                        <td className="py-3 px-4 text-right">{trade.quantity}</td>
                        <td className="py-3 px-4 text-right font-medium">${trade.amount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analysis" className="animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Volatility Analysis</CardTitle>
                <CardDescription>Risk assessment metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Strategy Volatility</span>
                      <span className="text-sm font-medium">18.4%</span>
                    </div>
                    <Progress value={18} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Market Volatility</span>
                      <span className="text-sm font-medium">22.7%</span>
                    </div>
                    <Progress value={23} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Downside Deviation</span>
                      <span className="text-sm font-medium">7.2%</span>
                    </div>
                    <Progress value={7} className="h-2" />
                  </div>
                  
                  <div className="pt-4">
                    <h4 className="text-sm font-medium mb-2">Risk Assessment</h4>
                    <div className="p-3 bg-muted rounded-md">
                      <p className="text-sm">
                        This strategy shows moderate volatility with good downside protection. 
                        The Sharpe ratio of 1.83 indicates good risk-adjusted returns compared 
                        to the benchmark.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Drawdown Analysis</CardTitle>
                <CardDescription>Historical drawdowns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={performanceData.map((entry, index) => {
                        const maxValue = Math.max(...performanceData.slice(0, index + 1).map(item => item.value));
                        const drawdown = ((entry.value / maxValue) - 1) * 100;
                        return {
                          date: entry.date,
                          drawdown: drawdown < 0 ? drawdown : 0,
                        };
                      })}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorDrawdown" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--negative))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--negative))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                      <XAxis 
                        dataKey="date" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        tickFormatter={(value) => `${value.toFixed(1)}%`}
                      />
                      <Tooltip 
                        formatter={(value: any) => [`${value.toFixed(2)}%`, 'Drawdown']}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          borderColor: 'hsl(var(--border))',
                          borderRadius: 'var(--radius)',
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="drawdown" 
                        stroke="hsl(var(--negative))" 
                        fillOpacity={1}
                        fill="url(#colorDrawdown)" 
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Major Drawdowns</h4>
                  <div className="space-y-2">
                    {[
                      { start: "Feb 2023", end: "Mar 2023", depth: "-5.4%", duration: "32 days", recovery: "18 days" },
                      { start: "May 2023", end: "Jun 2023", depth: "-8.2%", duration: "41 days", recovery: "29 days" },
                      { start: "Dec 2023", end: "Jan 2024", depth: "-6.1%", duration: "27 days", recovery: "22 days" },
                    ].map((drawdown, index) => (
                      <div key={index} className="grid grid-cols-5 text-sm py-2 border-b last:border-0">
                        <div>{drawdown.start}</div>
                        <div>{drawdown.end}</div>
                        <div className="text-negative">{drawdown.depth}</div>
                        <div>{drawdown.duration}</div>
                        <div>{drawdown.recovery}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  trend: "positive" | "negative" | "neutral";
  progress?: number;
}

function MetricCard({ title, value, description, trend, progress }: MetricCardProps) {
  return (
    <Card className="animate-scale-in">
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-1">{title}</h3>
        <p className={cn(
          "text-2xl font-bold mb-1",
          trend === "positive" && "text-positive",
          trend === "negative" && "text-negative"
        )}>
          {value}
        </p>
        <p className="text-muted-foreground text-sm mb-3">{description}</p>
        
        {progress !== undefined && (
          <Progress 
            value={progress} 
            className={cn(
              "h-1.5",
              trend === "positive" && "bg-positive/20 [&>div]:bg-positive",
              trend === "negative" && "bg-negative/20 [&>div]:bg-negative"
            )} 
          />
        )}
      </CardContent>
    </Card>
  );
}

interface MetricItemProps {
  label: string;
  value: string;
}

function MetricItem({ label, value }: MetricItemProps) {
  return (
    <div className="py-2">
      <dt className="text-muted-foreground mb-1">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}


'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, Legend, Sector, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BlueprintBackground } from '@/components/layout/blueprint-background';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { useTheme } from 'next-themes';

// Initial sample data
const initialMetalDistributionData = [
  { continent: 'Africa', Steel: 4000, Aluminum: 2400, Copper: 1800 },
  { continent: 'Asia', Steel: 9500, Aluminum: 7300, Copper: 6500 },
  { continent: 'Europe', Steel: 6800, Aluminum: 5200, Copper: 4100 },
  { continent: 'N. America', Steel: 7200, Aluminum: 6800, Copper: 3900 },
  { continent: 'S. America', Steel: 3500, Aluminum: 2100, Copper: 2400 },
  { continent: 'Oceania', Steel: 1500, Aluminum: 900, Copper: 600 },
];

const generateInitialPieData = (barData: typeof initialMetalDistributionData) => {
    return barData.map(item => ({
        name: item.continent,
        value: item.Steel + item.Aluminum + item.Copper
    }));
};

const chartConfig = {
    Steel: { label: "Steel", color: "hsl(210 15% 60%)" }, // Grey for Steel
    Aluminum: { label: "Aluminum", color: "hsl(210 20% 85%)" }, // Light Grey for Aluminum
    Copper: { label: "Copper", color: "hsl(30 70% 60%)" }, // Orangey-brown for Copper
};

const PIE_COLORS = [
    'hsl(45, 100%, 50%)', // Gold
    'hsl(210, 70%, 55%)', // Blue
    'hsl(340, 82%, 60%)', // Pink
    'hsl(160, 70%, 45%)', // Teal
    'hsl(260, 70%, 65%)', // Purple
    'hsl(10, 80%, 55%)',  // Orange
];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="text-sm md:text-base font-bold">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 5} // Pop out effect
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{ filter: `drop-shadow(0 0 8px ${fill})` }}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="hsl(var(--primary))" className="text-xs md:text-sm">{`Total ${value.toLocaleString()}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="hsl(var(--muted-foreground))" className="text-xs">
        {`(Share ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};


export default function AnalyticsPage() {
  const { theme } = useTheme();
  const tickColor = theme === 'dark' ? '#A1A1AA' : '#71717A'; // zinc-400 or zinc-500
  
  const [barData, setBarData] = useState(initialMetalDistributionData);
  const [pieData, setPieData] = useState(generateInitialPieData(initialMetalDistributionData));
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newBarData = barData.map(item => ({
        ...item,
        Steel: Math.max(1000, item.Steel + (Math.random() - 0.5) * 2500),
        Aluminum: Math.max(800, item.Aluminum + (Math.random() - 0.5) * 2000),
        Copper: Math.max(500, item.Copper + (Math.random() - 0.5) * 1500),
      }));
      setBarData(newBarData);
      setPieData(generateInitialPieData(newBarData));
    }, 5000); // Slower interval: 5 seconds

    return () => clearInterval(interval);
  }, [barData]);

  return (
    <div className="fade-in">
      <section className="py-16 md:py-24 bg-background relative overflow-hidden">
        <BlueprintBackground />
        <div className="container max-w-7xl relative">
          <div className="text-center mb-12 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-48 h-48 md:w-64 md:h-64 opacity-10">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                      <circle
                          cx="50"
                          cy="50"
                          r="45"
                          stroke="url(#glow-gradient-analytics)"
                          strokeWidth="5"
                          fill="none"
                          className="color-scanner-ring"
                      />
                      <text
                          x="50"
                          y="55"
                          textAnchor="middle"
                          fill="url(#color-shift-gradient)"
                          fontSize="20"
                          fontWeight="bold"
                          style={{ filter: 'blur(1.5px)' }}
                          className="animate-multi-color-text-glow"
                      >
                          KAWADY
                      </text>
                  </svg>
              </div>
            </div>
            <svg width="0" height="0">
              <defs>
                <linearGradient id="glow-gradient-analytics" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: 'hsl(210, 70%, 55%)', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
            </svg>
            <div className="relative">
              <h1 className="text-4xl md:text-5xl font-bold text-primary">Live Analytics Dashboard</h1>
              <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
                Visualizing the global distribution and usage of key metals in construction and fabrication.
                <br />
                <span className="relative flex h-3 w-3 mx-auto mt-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    <span className="ml-4 text-xs text-green-400 uppercase font-bold tracking-wider">live</span>
                </span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            <Card className="shadow-lg bg-card/80 backdrop-blur-sm border-accent/20">
              <CardHeader>
                <CardTitle>Metal Usage by Continent (in Tons)</CardTitle>
                <CardDescription>A look at the consumption of primary metals across different continents.</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[400px] w-full">
                  <BarChart data={barData} margin={{ top: 20, right: 20, bottom: 5, left: -20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={tickColor} strokeOpacity={0.2} />
                      <XAxis dataKey="continent" stroke={tickColor} tick={{ fill: tickColor, fontSize: 12 }} tickLine={{ stroke: tickColor }} />
                      <YAxis stroke={tickColor} tick={{ fill: tickColor, fontSize: 12 }} tickLine={{ stroke: tickColor }} width={40} />
                      <RechartsTooltip cursor={{fill: 'hsla(var(--muted))'}} content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="Steel" fill="var(--color-Steel)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Aluminum" fill="var(--color-Aluminum)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Copper" fill="var(--color-Copper)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="shadow-lg bg-card/80 backdrop-blur-sm border-accent/20">
              <CardHeader>
                <CardTitle>Total Metal Distribution</CardTitle>
                <CardDescription>The proportion of total metal consumption by each continent.</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="h-[400px] w-full">
                  <PieChart>
                    <Pie
                      activeIndex={activeIndex}
                      activeShape={renderActiveShape}
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      onMouseEnter={onPieEnter}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend iconType="circle" />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>
    </div>
  );
}


'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, Legend, Sector, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
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

const initialCostIndexData = [
    { year: '2020', index: 100 },
    { year: '2021', index: 105 },
    { year: '2022', index: 115 },
    { year: '2023', index: 122 },
    { year: '2024', index: 128 },
];

const initialDemandData = [
    { month: 'Jan', Nairobi: 40, 'Mombasa': 24, Kisumu: 18 },
    { month: 'Feb', Nairobi: 30, 'Mombasa': 14, Kisumu: 22 },
    { month: 'Mar', Nairobi: 50, 'Mombasa': 48, Kisumu: 20 },
    { month: 'Apr', Nairobi: 28, 'Mombasa': 39, Kisumu: 25 },
    { month: 'May', Nairobi: 60, 'Mombasa': 38, Kisumu: 29 },
    { month: 'Jun', Nairobi: 34, 'Mombasa': 43, Kisumu: 35 },
];

const initialMaterialPriceData = [
    { month: 'Jan', steel: 120, aluminum: 180 },
    { month: 'Feb', steel: 125, aluminum: 185 },
    { month: 'Mar', steel: 130, aluminum: 175 },
    { month: 'Apr', steel: 128, aluminum: 182 },
    { month: 'May', steel: 135, aluminum: 190 },
    { month: 'Jun', steel: 140, aluminum: 195 },
];

const generateInitialPieData = (barData: typeof initialMetalDistributionData) => {
    return barData.map(item => ({
        name: item.continent,
        value: item.Steel + item.Aluminum + item.Copper
    }));
};

const barChartConfig = {
    Steel: { label: "Steel", color: "hsl(210 15% 60%)" },
    Aluminum: { label: "Aluminum", color: "hsl(210 20% 85%)" },
    Copper: { label: "Copper", color: "hsl(30 70% 60%)" },
};

const lineChartConfig = {
    cost: { label: 'Cost Index', color: 'hsl(var(--accent))' },
    demandNairobi: { label: 'Nairobi', color: 'hsl(160, 70%, 45%)' },
    demandMombasa: { label: 'Mombasa', color: 'hsl(260, 70%, 65%)' },
    demandKisumu: { label: 'Kisumu', color: 'hsl(340, 82%, 60%)' },
    steel: { label: 'Steel', color: 'hsl(210 15% 60%)' },
    aluminum: { label: 'Aluminum', color: 'hsl(210 20% 85%)' },
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
  const [costData, setCostData] = useState(initialCostIndexData);
  const [demandData, setDemandData] = useState(initialDemandData);
  const [materialPriceData, setMaterialPriceData] = useState(initialMaterialPriceData);
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Bar Chart Data
      const newBarData = barData.map(item => ({
        ...item,
        Steel: Math.max(1000, item.Steel + (Math.random() - 0.5) * 500),
        Aluminum: Math.max(800, item.Aluminum + (Math.random() - 0.5) * 400),
        Copper: Math.max(500, item.Copper + (Math.random() - 0.5) * 300),
      }));
      setBarData(newBarData);
      setPieData(generateInitialPieData(newBarData));

      // Line Charts Data
      setCostData(prev => prev.map(d => ({ ...d, index: d.index + (Math.random() * 0.5) })));
      setDemandData(prev => prev.map(d => ({
          ...d,
          Nairobi: Math.max(10, d.Nairobi + (Math.random() - 0.5) * 5),
          'Mombasa': Math.max(10, d['Mombasa'] + (Math.random() - 0.5) * 5),
          Kisumu: Math.max(10, d.Kisumu + (Math.random() - 0.5) * 5),
      })));
      setMaterialPriceData(prev => prev.map(d => ({
          ...d,
          steel: Math.max(100, d.steel + (Math.random() - 0.5) * 3),
          aluminum: Math.max(150, d.aluminum + (Math.random() - 0.5) * 4),
      })))

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
                <ChartContainer config={barChartConfig} className="h-[400px] w-full">
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

      {/* Market & Trend Insights Section */}
      <section className="py-16 md:py-24 bg-card/50 relative overflow-hidden">
        <BlueprintBackground />
        <div className="container max-w-7xl relative">
          <div className="text-center mb-12 relative">
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">Market &amp; Trend Insights</h2>
              <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
                Your expert source for navigating construction costs, regional demand, and material price fluctuations.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
             <Card className="shadow-lg bg-card/80 backdrop-blur-sm border-accent/20">
              <CardHeader>
                <CardTitle>Construction Cost Index</CardTitle>
                <CardDescription>2020-Present</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={lineChartConfig} className="h-[300px] w-full">
                    <LineChart data={costData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={tickColor} strokeOpacity={0.2} />
                        <XAxis dataKey="year" stroke={tickColor} tick={{ fill: tickColor, fontSize: 12 }} />
                        <YAxis domain={['dataMin - 5', 'dataMax + 5']} stroke={tickColor} tick={{ fill: tickColor, fontSize: 12 }} />
                        <RechartsTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line type="monotone" dataKey="index" stroke="var(--color-cost)" strokeWidth={2} dot={false} />
                    </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="shadow-lg bg-card/80 backdrop-blur-sm border-accent/20">
              <CardHeader>
                <CardTitle>Regional Demand Fluctuation</CardTitle>
                <CardDescription>Project inquiries by major city</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={lineChartConfig} className="h-[300px] w-full">
                    <LineChart data={demandData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={tickColor} strokeOpacity={0.2} />
                        <XAxis dataKey="month" stroke={tickColor} tick={{ fill: tickColor, fontSize: 12 }} />
                        <YAxis stroke={tickColor} tick={{ fill: tickColor, fontSize: 12 }} />
                        <RechartsTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line type="monotone" dataKey="Nairobi" stroke="var(--color-demandNairobi)" strokeWidth={2} />
                        <Line type="monotone" dataKey="Mombasa" stroke="var(--color-demandMombasa)" strokeWidth={2} />
                        <Line type="monotone" dataKey="Kisumu" stroke="var(--color-demandKisumu)" strokeWidth={2} />
                    </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
           <div className="grid grid-cols-1 gap-8">
            <Card className="shadow-lg bg-card/80 backdrop-blur-sm border-accent/20">
              <CardHeader>
                <CardTitle>Material Price Index</CardTitle>
                <CardDescription>Fluctuations in key raw material costs (per Ton)</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={lineChartConfig} className="h-[300px] w-full">
                    <LineChart data={materialPriceData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={tickColor} strokeOpacity={0.2} />
                        <XAxis dataKey="month" stroke={tickColor} tick={{ fill: tickColor, fontSize: 12 }} />
                        <YAxis domain={['dataMin - 10', 'dataMax + 10']} stroke={tickColor} tick={{ fill: tickColor, fontSize: 12 }} />
                        <RechartsTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line type="monotone" dataKey="steel" name="Steel" stroke="var(--color-steel)" strokeWidth={2} />
                        <Line type="monotone" dataKey="aluminum" name="Aluminum" stroke="var(--color-aluminum)" strokeWidth={2} />
                    </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
           </div>
        </div>
      </section>
    </div>
  );
}

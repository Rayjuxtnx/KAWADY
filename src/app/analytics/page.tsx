
'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, Legend, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BlueprintBackground } from '@/components/layout/blueprint-background';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
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
    Steel: { label: "Steel", color: "hsl(210 15% 60%)" },
    Aluminum: { label: "Aluminum", color: "hsl(210 20% 85%)" },
    Copper: { label: "Copper", color: "hsl(30 70% 60%)" },
};

const PIE_COLORS = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
    'hsl(var(--accent))',
];

export default function AnalyticsPage() {
  const { theme } = useTheme();
  const tickColor = theme === 'dark' ? '#A1A1AA' : '#71717A'; // zinc-400 or zinc-500
  
  const [barData, setBarData] = useState(initialMetalDistributionData);
  const [pieData, setPieData] = useState(generateInitialPieData(initialMetalDistributionData));

  useEffect(() => {
    const interval = setInterval(() => {
      const newBarData = barData.map(item => ({
        ...item,
        Steel: Math.max(1000, item.Steel + (Math.random() - 0.5) * 1500),
        Aluminum: Math.max(800, item.Aluminum + (Math.random() - 0.5) * 1000),
        Copper: Math.max(500, item.Copper + (Math.random() - 0.5) * 800),
      }));
      setBarData(newBarData);
      setPieData(generateInitialPieData(newBarData));
    }, 3000);

    return () => clearInterval(interval);
  }, [barData]);

  return (
    <div className="fade-in">
      <section className="py-16 md:py-24 bg-background relative overflow-hidden">
        <BlueprintBackground />
        <div className="container max-w-7xl relative">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary">Live Analytics Dashboard</h1>
            <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
              Visualizing the global distribution and usage of key metals in construction and fabrication.
              <br />
              <span className="text-xs text-accent">live</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            <Card className="shadow-lg bg-card/80 backdrop-blur-sm border-accent/20">
              <CardHeader>
                <CardTitle>Metal Usage by Continent (in Tons)</CardTitle>
                <CardDescription>A look at the consumption of primary metals across different continents.</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[400px] w-full">
                  <ResponsiveContainer>
                    <BarChart data={barData} margin={{ top: 20, right: 20, bottom: 5, left: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={tickColor} strokeOpacity={0.2} />
                        <XAxis dataKey="continent" stroke={tickColor} tick={{ fill: tickColor }} tickLine={{ stroke: tickColor }} />
                        <YAxis stroke={tickColor} tick={{ fill: tickColor }} tickLine={{ stroke: tickColor }} />
                        <RechartsTooltip cursor={{fill: 'hsla(var(--muted))'}} content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="Steel" fill="var(--color-Steel)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="Aluminum" fill="var(--color-Aluminum)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="Copper" fill="var(--color-Copper)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
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
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip cursor={{fill: 'hsla(var(--muted))'}} content={<ChartTooltipContent nameKey="name" />} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>
    </div>
  );
}

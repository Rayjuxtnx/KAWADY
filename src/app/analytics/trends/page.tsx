
'use client';

import { useState, useEffect } from 'react';
import { XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, LineChart, Line, Tooltip as RechartsTooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BlueprintBackground } from '@/components/layout/blueprint-background';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { useTheme } from 'next-themes';

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

const lineChartConfig = {
    cost: { label: 'Cost Index', color: 'hsl(var(--accent))' },
    demandNairobi: { label: 'Nairobi', color: 'hsl(160, 70%, 45%)' },
    demandMombasa: { label: 'Mombasa', color: 'hsl(260, 70%, 65%)' },
    demandKisumu: { label: 'Kisumu', color: 'hsl(340, 82%, 60%)' },
    steel: { label: 'Steel', color: 'hsl(210 15% 60%)' },
    aluminum: { label: 'Aluminum', color: 'hsl(210 20% 85%)' },
};

export default function TrendsPage() {
    const { theme } = useTheme();
    const tickColor = theme === 'dark' ? '#A1A1AA' : '#71717A'; // zinc-400 or zinc-500

    const [costData, setCostData] = useState(initialCostIndexData);
    const [demandData, setDemandData] = useState(initialDemandData);
    const [materialPriceData, setMaterialPriceData] = useState(initialMaterialPriceData);

    useEffect(() => {
        const interval = setInterval(() => {
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
    }, []);

    return (
        <div className="fade-in">
            <section className="py-16 md:py-24 bg-card/50 relative overflow-hidden">
                <BlueprintBackground />
                <div className="container max-w-7xl relative">
                    <div className="text-center mb-12 relative">
                        <div className="relative">
                        <h1 className="text-4xl md:text-5xl font-bold text-primary">Market &amp; Trend Insights</h1>
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

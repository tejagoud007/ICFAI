import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { BorderBeam } from 'border-beam';

// Colors for our charts
const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
const PIE_COLORS = ['#ffd11a', '#b463cf', '#DC143C', '#6699ff', '#ff66b3'];

export default function StudentAnalytics() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch and parse the CSV dataset
    Papa.parse('/StudentsPerformance.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        setData(results.data);
        setLoading(false);
      },
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-slate-400">
        <p>Loading analytics data...</p>
      </div>
    );
  }

  // 1. Calculate Average Scores by Gender
  const scoresByGender = data.reduce((acc, curr) => {
    if (!curr.gender) return acc;
    if (!acc[curr.gender]) {
      acc[curr.gender] = { gender: curr.gender, count: 0, math: 0, reading: 0, writing: 0 };
    }
    acc[curr.gender].math += curr['math score'] || 0;
    acc[curr.gender].reading += curr['reading score'] || 0;
    acc[curr.gender].writing += curr['writing score'] || 0;
    acc[curr.gender].count += 1;
    return acc;
  }, {});

  const genderAverages = Object.values(scoresByGender).map((g: any) => ({
    gender: g.gender,
    Math: Math.round(g.math / g.count),
    Reading: Math.round(g.reading / g.count),
    Writing: Math.round(g.writing / g.count),
  }));

  // 2. Race/Ethnicity Distribution (for Pie Chart)
  const raceDistribution = data.reduce((acc, curr) => {
    const race = curr['race/ethnicity'];
    if (!race) return acc;
    acc[race] = (acc[race] || 0) + 1;
    return acc;
  }, {});

  const raceData = Object.entries(raceDistribution).map(([name, value]) => ({
    name,
    value,
  })).sort((a, b) => a.name.localeCompare(b.name));

  // 3. Parental Education vs Average Scores
  const parentalScores = data.reduce((acc, curr) => {
    const edu = curr['parental level of education'];
    if (!edu) return acc;
    if (!acc[edu]) {
      acc[edu] = { name: edu, count: 0, total: 0 };
    }
    const avgScore = ((curr['math score'] || 0) + (curr['reading score'] || 0) + (curr['writing score'] || 0)) / 3;
    acc[edu].total += avgScore;
    acc[edu].count += 1;
    return acc;
  }, {});

  const parentalAverages = Object.values(parentalScores).map((p: any) => ({
    name: p.name,
    'Average Score': Math.round(p.total / p.count),
  })).sort((a, b) => b['Average Score'] - a['Average Score']);

  return (
    <div className="space-y-6 mt-8">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white tracking-tight">Kaggle Dataset Analytics</h2>
        <p className="text-slate-400 mt-1 text-sm">
          Insights drawn from the "Students Performance in Exams" dataset.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Race / Ethnicity Pie Chart */}
        <BorderBeam size="md" colorVariant="colorful" strength={0.5} theme="dark">
          <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col items-center h-full">
            <h3 className="text-sm font-semibold text-white mb-4 self-start">Race/Ethnicity Distribution</h3>
            <div className="w-full h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={raceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {raceData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                    itemStyle={{ color: '#e2e8f0' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </BorderBeam>

        {/* Scores by Gender Bar Chart */}
        <BorderBeam size="md" colorVariant="colorful" strength={0.5} theme="dark">
          <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col h-full">
            <h3 className="text-sm font-semibold text-white mb-4">Average Scores by Gender</h3>
            <div className="w-full h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={genderAverages} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="gender" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                    cursor={{fill: '#1e293b'}}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="Math" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Reading" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Writing" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </BorderBeam>

        {/* Parental Education Bar Chart (Full Width) */}
        <div className="md:col-span-2">
          <BorderBeam size="md" colorVariant="colorful" strength={0.5} theme="dark">
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col h-full">
              <h3 className="text-sm font-semibold text-white mb-4">Impact of Parental Education on Overall Score</h3>
              <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={parentalAverages} layout="vertical" margin={{ top: 10, right: 30, left: 60, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                    <XAxis type="number" stroke="#94a3b8" fontSize={12} domain={[0, 100]} tickLine={false} axisLine={false} />
                    <YAxis type="category" dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} width={120} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                      cursor={{fill: '#1e293b'}}
                    />
                    <Bar dataKey="Average Score" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </BorderBeam>
        </div>

      </div>
    </div>
  );
}


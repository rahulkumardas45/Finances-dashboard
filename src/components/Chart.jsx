import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

import CustomTooltip from "./animationinchart/CustomTooltip";

// basic colors for pie chart
const COLORS = ["#3B82F6", "#22C55E", "#EF4444", "#F59E0B"];

export function LineChartComponent({ chartData }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border">

      {/* header section */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-700">
          Balance Trend
        </h3>

        {/* just a static growth indicator */}
        <span className="text-sm text-green-500">
          +12% this year
        </span>
      </div>

      {/* chart container */}
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={chartData}>

          {/* gradient fill under the line */}
          <defs>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* x axis shows months */}
          <XAxis dataKey="month" />

          {/* y axis shows values */}
          <YAxis />

          {/* custom tooltip */}
          <Tooltip content={<CustomTooltip />} cursor={false} />

          {/* main line / area */}
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#3B82F6"
            strokeWidth={2}
            fill="url(#colorBalance)"
            dot={{ r: 3 }}         // small dots
            activeDot={{ r: 5 }}   // bigger on hover
            animationDuration={1000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PieChartComponent({ chartData }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border">

      <h3 className="font-semibold text-gray-700 mb-2">Spending Breakdown</h3>

      <ResponsiveContainer width="100%" height={220}> <PieChart tabIndex={-1}>

        <Pie data={chartData} dataKey="value" outerRadius={80}>

          {chartData.map((_, index) => (<Cell key={index} fill={COLORS[index % COLORS.length]} />))}
          
        </Pie> <Tooltip /> </PieChart> </ResponsiveContainer>
    </div>);

}
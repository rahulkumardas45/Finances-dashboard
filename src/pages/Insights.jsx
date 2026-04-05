import { useStore } from "../store/useStore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function Insights() {
  const { transactions } = useStore();

  // get only expense items
  const expenseList = transactions.filter(
    (item) => item.type === "expense"
  );

  // calculate category totals
  const categoryTotals = {};
  expenseList.forEach((item) => {
    if (!categoryTotals[item.category]) {
      categoryTotals[item.category] = 0;
    }
    categoryTotals[item.category] += item.amount;
  });

  // find highest category
  let highestCategory = "N/A";
  if (Object.keys(categoryTotals).length > 0) {
    highestCategory = Object.keys(categoryTotals).reduce((a, b) =>
      categoryTotals[a] > categoryTotals[b] ? a : b
    );
  }

  // monthly totals
  const monthlyTotals = {};

  transactions.forEach((item) => {
    if (item.type === "expense") {
      const month = item.date.slice(0, 7);

      if (!monthlyTotals[month]) {
        monthlyTotals[month] = 0;
      }

      monthlyTotals[month] += item.amount;
    }
  });

  const months = Object.keys(monthlyTotals).sort();

  const currentMonth = months[months.length - 1];
  const previousMonth = months[months.length - 2];

  const currentValue = monthlyTotals[currentMonth] || 0;
  const previousValue = monthlyTotals[previousMonth] || 0;

  const difference = currentValue - previousValue;


  // calculate percentage change
  let percentChange = 0;

  if (previousValue !== 0) {
    percentChange = ((difference / previousValue) * 100).toFixed(1);
  }

  // insight text
  let insightText = "Your spending is stable.";
  if (difference > 0) {
    insightText = "Spending increased compared to last month.";
  } else if (difference < 0) {
    insightText = "Good job! Spending decreased this month.";
  }

  // prepare chart data
  const chartData = Object.keys(categoryTotals).map((category) => ({
    category,
    amount: categoryTotals[category],
  }));

  const maxValue =
    chartData.length > 0
      ? Math.max(...chartData.map((item) => item.amount))
      : 0;


  // group income & expense per month
  const monthlyDataMap = {};

  transactions.forEach((item) => {
    const month = item.date.slice(0, 7);

    if (!monthlyDataMap[month]) {
      monthlyDataMap[month] = {
        income: 0,
        expense: 0,
      };
    }

    if (item.type === "income") {
      monthlyDataMap[month].income += item.amount;
    } else {
      monthlyDataMap[month].expense += item.amount;
    }
  });

  // convert to array
  const incomeExpenseData = Object.keys(monthlyDataMap)
    .sort()
    .map((month) => {
      const date = new Date(month + "-01");

      return {
        month: date.toLocaleString("default", { month: "short" }),
        income: monthlyDataMap[month].income,
        expense: monthlyDataMap[month].expense,
      };
    });

  return (
    <div className="space-y-6">

      {/* ---------- top summary cards ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* highest category */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition">
          <p className="text-gray-500 text-sm">
            Highest Spending category
          </p>

          <h2 className="text-xl font-semibold text-red-500 mt-1">
            {highestCategory}
          </h2>
        </div>

        {/* current month */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition">
          <p className="text-gray-500 text-sm">
            Current Month Expenses
          </p>

          <h2 className="text-lg font-semibold mt-1">
            ₹{currentValue}
          </h2>

          <p className="text-xs text-gray-400">
            vs ₹{previousValue} last month Expenses
          </p>
        </div>

        {/* difference */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition">
          <p className="text-gray-500 text-sm">
            Change(Expenses)
          </p>

          <h2
            className={`text-lg font-semibold mt-1 ${difference > 0 ? "text-red-500" : "text-green-500"
              }`}
          >
            {difference > 0 ? "+" : ""}
            ₹{difference}
          </h2>

          <p className="text-xs text-gray-400">
            vs last month
          </p>
        </div>
      </div>

      {/* ---------- insight message ---------- */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition">
        <p className="text-gray-500 text-sm mb-1">
          Insight
        </p>

        <p className="text-gray-700">{insightText}</p>
      </div>

      {/* ---------- bar chart ---------- */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-gray-700 font-semibold">
            Expense Distribution
          </h3>

          <span className="text-xs text-gray-400">
            category-wise
          </span>
        </div>

        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData}>
            <XAxis dataKey="category" />
            <YAxis />

            {/* cleaner tooltip */}
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
              cursor={false}
            />

            <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
              {chartData.map((item, index) => (
                <Cell
                  key={index}
                  fill={
                    item.amount === maxValue
                      ? "#EF4444"
                      : "#3B82F6"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition">

        <div className="flex justify-between items-center mb-3">
          <h3 className="text-gray-700 font-semibold">
            Income vs Expense (Monthly)
          </h3>

          <span className="text-xs text-gray-400">
            comparison
          </span>
        </div>

        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={incomeExpenseData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />

            <Bar dataKey="income" fill="#22C55E" radius={[6, 6, 0, 0]} />
            <Bar dataKey="expense" fill="#EF4444" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm border">

        <h3 className="text-gray-500 text-sm mb-2">
          Monthly Observation
        </h3>

        {incomeExpenseData.map((item, index) => {
          let text = "";

          if (item.income > item.expense) {
            text = "Savings month 💰";
          } else if (item.income < item.expense) {
            text = "Overspending ⚠️";
          } else {
            text = "Balanced ⚖️";
          }

          return (
            <p key={index} className="text-sm text-gray-700">
              {item.month}: {text}
            </p>
          );
        })}
      </div>

    </div>
  );
}
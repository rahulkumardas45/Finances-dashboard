import Card from "../components/Card";
import { useStore } from "../store/useStore";
import {
  LineChartComponent,
  PieChartComponent,
} from "../components/Chart";

export default function Dashboard() {
  const { transactions } = useStore();

  // calculate total income
  const incomeTotal = transactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  // calculate total expense
  const expenseTotal = transactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const currentBalance = incomeTotal - expenseTotal;

  const lineData = [
    { month: "Jan", balance: 12000 },
    { month: "Feb", balance: 18000 },
    { month: "Mar", balance: 15000 },
    { month: "Apr", balance: 22000 },
    { month: "May", balance: 26000 },
    { month: "Jun", balance: 24000 },
    { month: "Jul", balance: 30000 },
    { month: "Aug", balance: 28000 },
    { month: "Sep", balance: 35000 },
    { month: "Oct", balance: 40000 },
    { month: "Nov", balance: 38000 },
    { month: "Dec", balance: 45000 },
  ];

  // This function converts mockdata transactions into pie chart data
  function getPieData(transactions) {
    const result = {};

    for (let i = 0; i < transactions.length; i++) {
      const item = transactions[i];

      // Only take expense data 
      if (item.type === "expense") {
        if (result[item.category]) {
          result[item.category] += item.amount;
        } else {
          result[item.category] = item.amount;
        }
      }
    }

    // Convert object into array format for chart
    const finalData = [];

    for (let key in result) {
      finalData.push({
        name: key,
        value: result[key],
      });
    }

    return finalData;
  }

  const pieData = getPieData(transactions);



  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card title="Total Balance" amount={`₹${currentBalance}`} />
        <Card title="Income" amount={`₹${incomeTotal}`} color="text-green-500" />
        <Card title="Expenses" amount={`₹${expenseTotal}`} color="text-red-500" />
      </div>

      <div className="grid md:grid-cols-2 gap-6 ">
        <LineChartComponent chartData={lineData} />
        <PieChartComponent chartData={pieData} />
      </div>
    </div>
  );
}
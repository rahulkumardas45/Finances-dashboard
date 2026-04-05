export default function Card({ title, amount, color }) {
    return (
        <div className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border hover:shadow-md transition">
            <p className="text-gray-500">{title}</p>
            <h2 className={`text-2xl font-bold ${color}`}>{amount}</h2>
        </div>

    )
}
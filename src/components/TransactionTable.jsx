export default function TransactionTable({ data, onEdit, role }) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-[900px] w-full text-sm">

        {/* table header */}
        <thead className="bg-gray-100 text-gray-600 text-sm">
          <tr>
            <th className="p-3 whitespace-nowrap">S.No</th>
            <th className="p-2 whitespace-nowrap text-sm">Date</th>
            <th className="p-3 whitespace-nowrap">Amount</th>
            <th className="p-3 whitespace-nowrap">Category</th>
            <th className="p-3 whitespace-nowrap">Type</th>
            {role === "admin" && <th className="p-3 whitespace-nowrap">Actions</th>}
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id}
              className="text-center border-t hover:bg-gray-50 transition"
            >
              {/* serial number */}
              <td className="p-3 text-gray-500">{index + 1}</td>

              {/* date */}
              <td className="p-3">{item.date}</td>

              {/* amount */}
              <td className="p-2 whitespace-nowrap text-sm">₹{item.amount}</td>

              {/* category */}
              <td className="p-3">{item.category}</td>

              {/* type badge */}
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${item.type === "income"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                    }`}
                >
                  {item.type}
                </span>
              </td>

              {/* actions */}
              {role === "admin" && (
                <td className="p-3">
                  <button
                    onClick={() => onEdit(item)}
                    className="text-blue-500 hover:text-blue-700 text-sm"
                  >
                    Edit
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* empty state */}
      {data.length === 0 && (
        <div className="text-center p-6 text-gray-400">
          No transactions found
        </div>
      )}
    </div>
  );
}
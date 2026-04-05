export default function CustomTooltip({ active, payload, label }) {
  // if tooltip is not active or no data, don't render anything
  if (!active || !payload || payload.length === 0) return null;

  const value = payload[0].value;

  return (
    <div className="bg-white px-3 py-2 rounded-lg shadow border">
      {/* month or label */}
      <p className="text-gray-500 text-xs">{label}</p>

      {/* value */}
      <p className="text-blue-500 font-semibold">₹ {value}</p>
    </div>
  );
}
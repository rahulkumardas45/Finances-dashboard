import { NavLink } from "react-router-dom";

export default function Sidebar({ open, setOpen }) {
  return (
    <div
      className={`fixed md:static top-0 left-0 h-full w-64 bg-white border-r z-50
      transform transition-transform duration-300
      ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      {/* header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-lg font-semibold">
          💰 Finance
        </h1>

        {/* close button mobile */}
        <button
          className="md:hidden text-lg"
          onClick={() => setOpen(false)}
        >
          ✕
        </button>
      </div>

      {/* nav links */}
      <nav className="p-4 space-y-2">

        <NavLink
          to="/"
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded-lg transition 
            ${isActive
              ? "bg-blue-100 text-blue-600 font-medium"
              : "text-gray-600 hover:bg-gray-100"}`
          }
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/transactions"
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded-lg transition 
            ${isActive
              ? "bg-blue-100 text-blue-600 font-medium"
              : "text-gray-600 hover:bg-gray-100"}`
          }
        >
          💳 Transactions
        </NavLink>

        <NavLink
          to="/insights"
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded-lg transition 
            ${isActive
              ? "bg-blue-100 text-blue-600 font-medium"
              : "text-gray-600 hover:bg-gray-100"}`
          }
        >
          📈 Insights
        </NavLink>

      </nav>
    </div>
  );
}
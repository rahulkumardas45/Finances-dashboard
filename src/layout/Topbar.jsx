import { useStore } from "../store/useStore";

export default function Topbar({ setOpen }) {
  const { role, setRole } = useStore();

  return (
    <div className="flex items-center justify-between bg-blue-600 px-3 py-3 border-b">

      {/* LEFT SIDE (menu + title) */}
      <div className="flex items-center gap-2 min-w-0">

        {/* menu button */}
        <button
          className="md:hidden text-xl text-white shrink-0"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>

        {/* title */}
        <h2 className="font-semibold text-sm text-white truncate">
          Finance Dashboard
        </h2>
      </div>

      {/* RIGHT SIDE (role dropdown) */}
      <div className="shrink-0">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-1 rounded text-sm"
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>
      </div>
    </div>
  );
}
import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function MainLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">

      {/* overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* main */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* topbar */}
        <Topbar setOpen={setOpen} />

        {/* content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-5 md:p-6">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}
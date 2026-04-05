export default function Footer() {
  return (
    <footer className="bg-white border-t px-4 py-3 mt-auto">
  <div className="text-center text-sm text-gray-500">
    © {new Date().getFullYear()} Finance Dashboard. All rights reserved.
  </div>
</footer>
  );
}
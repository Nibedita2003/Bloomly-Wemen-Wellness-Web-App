import { Link, useLocation } from "react-router-dom";
import { Home, Calendar, BarChart2, Heart } from "lucide-react";

export default function BottomNav() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t flex justify-around items-center py-2 z-50">

      {/* Home */}
      <Link
        to="/"
        className={`flex flex-col items-center text-xs ${
          isActive("/") ? "text-pink-500" : "text-gray-500"
        }`}
      >
        <Home size={18} />
        Home
      </Link>

      {/* Calendar */}
      <Link
        to="/calendar"
        className={`flex flex-col items-center text-xs ${
          isActive("/calendar") ? "text-pink-500" : "text-gray-500"
        }`}
      >
        <Calendar size={18} />
        Calendar
      </Link>

      {/* + BUTTON */}
      <Link
        to="/add"
        className="bg-pink-500 text-white p-4 rounded-full -mt-8 shadow-lg"
      >
        +
      </Link>

      {/* Self Care */}
      <Link
        to="/care"
        className={`flex flex-col items-center text-xs ${
          isActive("/care") ? "text-pink-500" : "text-gray-500"
        }`}
      >
        <Heart size={18} />
        Care
      </Link>

      {/* Analysis */}
      <Link
        to="/analysis"
        className={`flex flex-col items-center text-xs ${
          isActive("/analysis") ? "text-pink-500" : "text-gray-500"
        }`}
      >
        <BarChart2 size={18} />
        Analysis
      </Link>

    </div>
  );
}
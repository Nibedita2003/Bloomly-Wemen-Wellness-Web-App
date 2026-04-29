import TopBar from "./components/TopBar";
import CycleCard from "./components/CycleCard";
import CalendarStrip from "./components/CalendarStrip";
import TodayStatus from "./components/TodayStatus";
import BottomNav from "./components/BottomNav";

export default function App() {
  return (
    
    <div className="min-h-screen bg-pink-50 flex flex-col">
      <div className="flex-1 w-full max-w-md mx-auto p-4 sm:p-6">
        <TopBar />
        <CycleCard />
        <CalendarStrip />
        <TodayStatus />
      </div>

      <BottomNav />
    </div>
  );
}
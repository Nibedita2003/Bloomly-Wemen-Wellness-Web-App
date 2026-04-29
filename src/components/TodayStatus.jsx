export default function TodayStatus() {
  return (
    <div className="bg-white p-3 sm:p-4 rounded-2xl shadow mb-4">
      <h3 className="font-semibold text-sm sm:text-base mb-2">Today</h3>

      <p className="text-gray-600 text-xs sm:text-sm">
        You are in <span className="text-pink-500 font-medium">Luteal Phase</span>
      </p>

      <div className="mt-3 flex gap-2 flex-wrap">
        <span className="bg-pink-100 px-2 sm:px-3 py-1 rounded-full text-xs">
          Mood 😊
        </span>
        <span className="bg-pink-100 px-2 sm:px-3 py-1 rounded-full text-xs">
          Energy ⚡
        </span>
      </div>
    </div>
  );
}

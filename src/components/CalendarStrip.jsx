export default function CalendarStrip() {
  const days = Array.from({ length: 14 }, (_, i) => i + 15);

  return (
    <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 mb-4">
      {days.map((day, index) => {
        const isActive = index === 4;

        return (
          <div
            key={day}
            className={`min-w-[45px] sm:min-w-[60px] text-center p-2 rounded-xl text-xs sm:text-sm ${
              isActive
                ? "bg-pink-500 text-white"
                : "bg-white shadow"
            }`}
          >
            <p>Mon</p>
            <p className="font-bold">{day}</p>
          </div>
        );
      })}
    </div>
  );
}
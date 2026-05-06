export const calculateBMI = (weightKg, heightCm) => {
  const weight = Number(weightKg);
  const height = Number(heightCm);

  if (!weight || !height) return null;

  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  return Number(bmi.toFixed(1));
};

export const getBMICategory = (bmi) => {
  if (bmi < 18.5) return { text: "Underweight range. Focus on nutrition! \ud83e\udd57", color: "text-blue-500" };
  if (bmi <= 24.9) return { text: "Healthy weight. Perfect balance! \u2728", color: "text-emerald-500" };
  if (bmi <= 29.9) return { text: "Overweight range. Stay active! \ud83d\udeb6\u200d\u2640\ufe0f", color: "text-orange-500" };
  return { text: "Obesity range. Small daily goals help! \u2764\ufe0f", color: "text-rose-500" };
};

export const predictNextPeriod = (lastStartDate, averageCycleLength = 28) => {
  const lastDate = new Date(lastStartDate);
  const nextDate = new Date(lastDate);
  nextDate.setDate(lastDate.getDate() + averageCycleLength);
  return nextDate;
};

export const getDetailedCycleData = (lastStartDate, cycleLength = 28) => {
  if (!lastStartDate) return null;
  const start = new Date(lastStartDate);

  // 1. Period Window: 7 Days (Rose)
  const periodDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d.toDateString();
  });

  // 2. Ovulation: Day 14 (Purple)
  const ovulationDate = new Date(start);
  ovulationDate.setDate(start.getDate() + (cycleLength - 14));

  // 3. Fertile Window: 2 days before/after ovulation (Light Rose)
  const fertileDays = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(ovulationDate);
    d.setDate(ovulationDate.getDate() - 2 + i);
    return d.toDateString();
  });

  return {
    periodDays,
    ovulationDate: ovulationDate.toDateString(),
    fertileDays,
    nextPeriodDate: predictNextPeriod(start, cycleLength)
  };
};

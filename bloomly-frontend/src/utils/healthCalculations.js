// /**
//  * Existing BMI Calculations
//  */
// export const calculateBMI = (weightKg, heightCm) => {
//   if (!weightKg || !heightCm) return null;
//   const heightInMeters = heightCm / 100;
//   const bmi = weightKg / (heightInMeters * heightInMeters);
//   return bmi.toFixed(1);
// };

// export const getBMICategory = (bmi) => {
//   if (bmi < 18.5) return { label: "Underweight", color: "text-blue-500" };
//   if (bmi < 25) return { label: "Healthy", color: "text-green-500" };
//   if (bmi < 30) return { label: "Overweight", color: "text-yellow-500" };
//   return { label: "Obese", color: "text-red-500" };
// };

// /**
//  * Enhanced Cycle Logic
//  */
// export const predictNextPeriod = (lastStartDate, averageCycleLength = 28) => {
//   const lastDate = new Date(lastStartDate);
//   const nextDate = new Date(lastDate);
//   nextDate.setDate(lastDate.getDate() + averageCycleLength);
//   return nextDate;
// };

// export const getDetailedCycleData = (lastStartDate, cycleLength = 28) => {
//   if (!lastStartDate) return null;
//   const start = new Date(lastStartDate);

//   // 1. Period Window: 7 Days highlighted from start date
//   const periodDays = Array.from({ length: 7 }, (_, i) => {
//     const d = new Date(start);
//     d.setDate(start.getDate() + i);
//     return d.toDateString();
//   });

//   // 2. Ovulation: Calculated as 14 days before the next expected period
//   const ovulationDate = new Date(start);
//   ovulationDate.setDate(start.getDate() + (cycleLength - 14));

//   // 3. Fertile Window: 5 days (2 days before and 2 after ovulation)
//   const fertileDays = Array.from({ length: 5 }, (_, i) => {
//     const d = new Date(ovulationDate);
//     d.setDate(ovulationDate.getDate() - 2 + i);
//     return d.toDateString();
//   });

//   // 4. Future Prediction
//   const nextPeriodDate = predictNextPeriod(start, cycleLength);

//   return {
//     periodDays,
//     ovulationDate: ovulationDate.toDateString(),
//     fertileDays,
//     nextPeriodDate
//   };
// };
// Keep your existing BMI calculations here...
// Keep your existing BMI code...

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
    nextPeriodDate: new Date(start.getTime() + cycleLength * 24 * 60 * 60 * 1000)
  };
};
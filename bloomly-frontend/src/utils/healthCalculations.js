export const calculateBMI = (weightKg, heightCm) => {
  if (!weightKg || !heightCm) return null;
  const heightInMeters = heightCm / 100;
  const bmi = weightKg / (heightInMeters * heightInMeters);
  return bmi.toFixed(1);
};

export const getBMICategory = (bmi) => {
  if (bmi < 18.5) return { label: "Underweight", color: "text-blue-500" };
  if (bmi < 25) return { label: "Healthy", color: "text-green-500" };
  if (bmi < 30) return { label: "Overweight", color: "text-yellow-500" };
  return { label: "Obese", color: "text-red-500" };
};


export const predictNextPeriod = (lastStartDate, averageCycleLength = 28) => {
  const lastDate = new Date(lastStartDate);
  const nextDate = new Date(lastDate);
  
  // Add the average cycle length to the last start date
  nextDate.setDate(lastDate.getDate() + averageCycleLength);
  
  return nextDate; // This returns a Date object for your UI to display
};
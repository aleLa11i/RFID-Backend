import { NextClass, SubjectRow } from "../interfaces/student.interface";

export const getTargetDayNumber = (dayOfWeek: string): number => {
  switch (dayOfWeek) {
    case "Monday":
      return 0;
    case "Tuesday":
      return 1;
    case "Wednesday":
      return 2;
    case "Thursday":
      return 3;
    case "Friday":
      return 4;
    case "Saturday":
      return 5;
    case "Sunday":
      return 6;
    default:
      return -1;
  }
};

export const calculateNextClass = (subjects: SubjectRow[]): NextClass | null => {
  if (subjects.length === 0) return null;

  const now = new Date();
  const currentDay = now.getDay() === 0 ? 6 : now.getDay() - 1; // semana arranca en lunes
  const currentTimeStr = now.toTimeString().slice(0, 8);

  let nextClass: NextClass | null = null;
  let minDiffTime = Infinity;

  for (const subject of subjects) {
    const targetDay = getTargetDayNumber(subject.dayOfWeek);
    if (targetDay === -1) continue;

    let daysUntil = (targetDay - currentDay + 7) % 7;
    if (daysUntil === 0 && subject.startTime <= currentTimeStr) {
      daysUntil = 7;
    }

    const occurrenceDate = new Date(now);
    occurrenceDate.setDate(now.getDate() + daysUntil);

    const [hours, minutes, seconds] = subject.startTime.split(":").map(Number);
    occurrenceDate.setHours(hours || 0, minutes || 0, seconds || 0, 0);

    const diffTime = occurrenceDate.getTime() - now.getTime();
    if (diffTime < minDiffTime) {
      minDiffTime = diffTime;
      nextClass = { ...subject, nextOccurrence: occurrenceDate };
    }
  }

  return nextClass;
}
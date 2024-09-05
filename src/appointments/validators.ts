import { Hours } from './enums';

export const isWeekday = (date: any): boolean => {
  const parsedDate = new Date(date);
  return (
    !isNaN(parsedDate.getTime()) &&
    parsedDate.getDay() !== 0 &&
    parsedDate.getDay() !== 6
  );
};

export function isValidHour(hour: Hours): boolean {
  const validHours = [
    Hours.NINE,
    Hours.TEN,
    Hours.ELEVEN,
    Hours.TWELVE,
    Hours.THIRTEEN,
    Hours.FOURTEEN,
    Hours.FIFTEEN,
    Hours.SIXTEEN,
    Hours.SEVENTEEN,
  ];
  return validHours.includes(hour);
}

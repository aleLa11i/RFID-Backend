export interface CreateSubjectDto {
  name: string;
  classroom?: string;
  floor?: number;
  teacher1?: string;
  teacher2?: string;
  dayOfWeek: string; // el mismo valor que entiende getTargetDayNumber
  startTime: string; // "HH:MM:SS"
}
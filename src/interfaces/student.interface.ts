import { Exam, Payment, Student } from "../models";

export interface SubjectRow {
  id: number;
  name: string;
  classroom: string;
  floor: number;
  teacher1: string;
  teacher2: string | null;
  dayOfWeek: string;
  startTime: string; // "HH:MM:SS"
}

export interface NextClass extends SubjectRow {
  nextOccurrence: Date;
}

export interface StudentDashboard {
  student: Student;
  nextClass: NextClass | null;
  nextExam: Exam | null;
  pendingPayments: Payment[];
}

export interface CreateStudentDto {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  institutionalEmail?: string;
  address?: string;
  typeDoc?: string;
  numDoc?: string;
  gender?: string;
  isRegular?: boolean;
}
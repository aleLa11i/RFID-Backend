import { CreateStudentDto, StudentDashboard } from "../interfaces/student.interface";
import { Student } from "../models";
import studentRepository from "../repositories/student.repository";

class StudentService {
  getAll = (): Promise<Student[]> => studentRepository.findAll();

  getById = (id: number): Promise<Student | null> => studentRepository.findById(id);

  getByUid = (uid: string): Promise<Student | null> => studentRepository.findByUid(uid);

  create = (data: CreateStudentDto): Promise<Student> => studentRepository.create(data);

  getDashboard = (uid: string): Promise<StudentDashboard | null> => studentRepository.getDashboard(uid);
}

export default new StudentService();
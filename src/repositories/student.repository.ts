import { Op } from "sequelize";
import { sequelize, Student, Subject, StudentSubject, Exam, Payment } from "../models";
import { calculateNextClass, getTargetDayNumber } from "../utils/time.utils";
import { NextClass, StudentDashboard, SubjectRow } from "../interfaces/student.interface";
import { CreateStudentDto } from "../interfaces/student.interface";


class StudentRepository {
  private findStudentSubjects = async (studentId: number): Promise<SubjectRow[]> => {
    const subjects = await Subject.findAll({
      include: [
        {
          model: StudentSubject,
          where: { studentId },
          attributes: [], // solo se usa para el JOIN, no se traen sus columnas
          required: true, // INNER JOIN
        },
      ],
    });

    // .toJSON() para trabajar con objetos planos tipados, no instancias de Sequelize
    return subjects.map((s) => s.toJSON() as SubjectRow);
  };

  private findNextExam = async (studentId: number): Promise<Exam | null> => {
    const today = new Date().toISOString().slice(0, 10);

    return Exam.findOne({
      include: [
        {
          model: Subject,
          required: true,
          attributes: [],
          include: [
            {
              model: StudentSubject,
              where: { studentId },
              attributes: [],
              required: true,
            },
          ],
        },
      ],
      where: {
        date: { [Op.gte]: today },
      },
      order: [
        ["date", "ASC"],
        ["startTime", "ASC"],
      ],
    });
  };

  findAll = async (): Promise<Student[]> => {
    return Student.findAll();
  };

  findById = async (id: number): Promise<Student | null> => {
    return Student.findByPk(id);
  };

  findByUid = async (uid: string): Promise<Student | null> => {
    return Student.findOne({ where: { uid } });
  };

  create = async (data: CreateStudentDto): Promise<Student> => {
    const { uid, firstName, lastName, email, institutionalEmail, address, typeDoc, numDoc, gender, isRegular } = data;
    return Student.create({
      uid,
      firstName,
      lastName,
      email,
      institutionalEmail,
      address,
      typeDoc,
      numDoc,
      gender,
      isRegular,
    });
  };

  getDashboard = async (uid: string): Promise<StudentDashboard | null> => {
    const student = await Student.findOne({ where: { uid } });
    if (!student) return null;

    const studentId = student.getDataValue("id") as number;

    const [subjectRows, nextExam, pendingPayments] = await Promise.all([
      this.findStudentSubjects(studentId),
      this.findNextExam(studentId),
      Payment.findAll({
        where: { studentId, isPaid: false },
        order: [["dueDate", "ASC"]],
      }),
    ]);

    return {
      student,
      nextClass: calculateNextClass(subjectRows),
      nextExam,
      pendingPayments,
    };
  };
}

export default new StudentRepository();
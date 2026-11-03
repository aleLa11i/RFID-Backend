import sequelize from "../config/database";
import Student from "./student.model";
import Subject from "./subject.model";
import StudentSubject from "./studentSubject.model";
import Exam from "./exam.model";
import StudentExam from "./studentExam.model";
import Payment from "./payment.model";

Student.belongsToMany(Subject, { through: StudentSubject, foreignKey: "studentId" });
Subject.belongsToMany(Student, { through: StudentSubject, foreignKey: "subjectId" });
Student.hasMany(StudentSubject, { foreignKey: "studentId" });
StudentSubject.belongsTo(Student, { foreignKey: "studentId" });
Subject.hasMany(StudentSubject, { foreignKey: "subjectId" });
StudentSubject.belongsTo(Subject, { foreignKey: "subjectId" });
Subject.hasMany(Exam, { foreignKey: "subjectId" });
Exam.belongsTo(Subject, { foreignKey: "subjectId" });
Student.hasMany(StudentExam, { foreignKey: "studentId" });
StudentExam.belongsTo(Student, { foreignKey: "studentId" });
Exam.hasMany(StudentExam, { foreignKey: "examId" });
StudentExam.belongsTo(Exam, { foreignKey: "examId" });
Student.hasMany(Payment, { foreignKey: "studentId" });
Payment.belongsTo(Student, { foreignKey: "studentId" });

export {
  sequelize,
  Student,
  Subject,
  StudentSubject,
  Exam,
  StudentExam,
  Payment,
};
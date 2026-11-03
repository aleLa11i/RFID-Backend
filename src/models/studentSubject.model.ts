import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

// Interfaz para los atributos del modelo
interface StudentSubjectAttributes {
  id: number;
  studentId: number;
  subjectId: number;
  averageGrade?: number | null;
  attendance: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

// Interfaz para la creación del modelo (id es autoincremental e attendance tiene valor por defecto)
interface StudentSubjectCreationAttributes extends Optional<StudentSubjectAttributes, "id" | "attendance"> {}

class StudentSubject extends Model<StudentSubjectAttributes, StudentSubjectCreationAttributes> implements StudentSubjectAttributes {
  public id!: number;
  public studentId!: number;
  public subjectId!: number;
  public averageGrade!: number | null;
  public attendance!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
}

StudentSubject.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "student_id",
    },
    subjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "subject_id",
    },
    averageGrade: {
      type: DataTypes.FLOAT,
      allowNull: true, // puede no haber notas cargadas todavía
      field: "average_grade",
    },
    attendance: {
      type: DataTypes.FLOAT,
      defaultValue: 0, // porcentaje 0-100
    },
  },
  {
    sequelize,
    modelName: "StudentSubject",
    tableName: "student_subject",
    underscored: true,
    paranoid: true,
    indexes: [
      // Constraint compuesto: un alumno no puede estar inscripto dos veces en la misma materia
      { unique: true, fields: ["student_id", "subject_id"] },
    ],
  }
);

export default StudentSubject;
import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

// Interfaz para los atributos del modelo
interface StudentExamAttributes {
  id: number;
  studentId: number;
  examId: number;
  result?: number | null;
  isPresent: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

// Interfaz para la creación del modelo (id es autoincremental e isPresent tiene valor por defecto)
interface StudentExamCreationAttributes extends Optional<StudentExamAttributes, "id" | "isPresent"> {}

class StudentExam extends Model<StudentExamAttributes, StudentExamCreationAttributes> implements StudentExamAttributes {
  public id!: number;
  public studentId!: number;
  public examId!: number;
  public result!: number | null;
  public isPresent!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
}

StudentExam.init(
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
    examId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "exam_id",
    },
    result: {
      type: DataTypes.FLOAT,
      allowNull: true, // puede no estar corregido todavía
    },
    isPresent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: "is_present",
    },
  },
  {
    sequelize,
    modelName: "StudentExam",
    tableName: "student_exam",
    underscored: true,
    paranoid: true,
    indexes: [{ unique: true, fields: ["student_id", "exam_id"] }],
  }
);

export default StudentExam;
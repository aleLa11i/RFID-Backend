import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

interface ExamAttributes {
  id: number;
  subjectId: number;
  classroom?: string | null;
  dayOfWeek?: string | null;
  date: string | Date;
  startTime: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

// Interfaz para la creación del modelo (el 'id' es opcional porque es autoincremental)
interface ExamCreationAttributes extends Optional<ExamAttributes, "id"> {}

class Exam extends Model<ExamAttributes, ExamCreationAttributes> implements ExamAttributes {
  public id!: number;
  public subjectId!: number;
  public classroom!: string | null;
  public dayOfWeek!: string | null;
  public date!: string | Date;
  public startTime!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
}

Exam.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    subjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "subject_id",
    },
    classroom: {
      type: DataTypes.STRING,
      allowNull: true, // puede diferir del salón de cursada
    },
    dayOfWeek: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "day_of_week",
    },
    date: {
      type: DataTypes.DATEONLY, // solo fecha, sin hora (equivalente a datatypes.Date en Go)
      allowNull: false,
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
      field: "start_time",
    },
  },
  {
    sequelize,
    modelName: "Exam",
    tableName: "exam",
    underscored: true,
    paranoid: true,
  }
);

export default Exam;
import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

// Interfaz para los atributos del modelo
interface SubjectAttributes {
  id: number;
  name: string;
  classroom?: string | null;
  floor?: number | null;
  teacher1?: string | null;
  teacher2?: string | null;
  dayOfWeek: string;
  startTime: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

// Interfaz para la creación del modelo (id es autoincremental)
interface SubjectCreationAttributes extends Optional<SubjectAttributes, "id"> {}

class Subject extends Model<SubjectAttributes, SubjectCreationAttributes> implements SubjectAttributes {
  public id!: number;
  public name!: string;
  public classroom!: string | null;
  public floor!: number | null;
  public teacher1!: string | null;
  public teacher2!: string | null;
  public dayOfWeek!: string;
  public startTime!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
}

Subject.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    classroom: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    floor: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    teacher1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    teacher2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dayOfWeek: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "day_of_week",
    },
    startTime: {
      type: DataTypes.TIME, // solo horario, sin fecha (equivalente a datatypes.Time en Go)
      allowNull: false,
      field: "start_time",
    },
  },
  {
    sequelize,
    modelName: "Subject",
    tableName: "subject",
    underscored: true,
    paranoid: true,
  }
);

export default Subject;
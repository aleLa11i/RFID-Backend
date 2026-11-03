import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

// Interfaz para los atributos del modelo
interface StudentAttributes {
  id: number;
  uid?: string | null;
  firstName: string;
  lastName: string;
  email: string;
  institutionalEmail?: string | null;
  address?: string | null;
  typeDoc?: string | null;
  numDoc?: string | null;
  gender?: string | null;
  isRegular: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

// Interfaz para la creación del modelo (id es autoincremental e isRegular tiene valor por defecto)
interface StudentCreationAttributes extends Optional<StudentAttributes, "id" | "isRegular"> {}

class Student extends Model<StudentAttributes, StudentCreationAttributes> implements StudentAttributes {
  public id!: number;
  public uid!: string | null;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public institutionalEmail!: string | null;
  public address!: string | null;
  public typeDoc!: string | null;
  public numDoc!: string | null;
  public gender!: string | null;
  public isRegular!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // equivalente al gorm.Model con IDENTITY de SQL Server
    },
    uid: {
      type: DataTypes.STRING(32), // margen para UID de RFID en hex, con o sin separadores
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "first_name",
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "last_name",
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    institutionalEmail: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "institutional_email",
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    typeDoc: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "type_doc",
    },
    numDoc: {
      type: DataTypes.STRING(50), // string, no number: documentos pueden tener letras/ceros a la izquierda
      allowNull: true,
      field: "num_doc",
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isRegular: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: "is_regular",
    },
  },
  {
    sequelize,
    modelName: "Student",
    tableName: "student",
    underscored: true,
    paranoid: true,
    indexes: [
      { unique: true, fields: ["uid"] },
      { unique: true, fields: ["email"] },
    ],
  }
);

export default Student;
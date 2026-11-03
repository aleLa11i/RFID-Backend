import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

// Interfaz para los atributos del modelo
interface PaymentAttributes {
  id: number;
  studentId: number;
  amount: number | string; // Sequelize devuelve decimals como string o number para preservar precisión
  dueDate: string | Date;
  paidAt?: Date | null;
  isPaid: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

// Interfaz para la creación del modelo (id es autoincremental, isPaid y paidAt tienen valores opcionales o por defecto)
interface PaymentCreationAttributes extends Optional<PaymentAttributes, "id" | "isPaid" | "paidAt"> {}

class Payment extends Model<PaymentAttributes, PaymentCreationAttributes> implements PaymentAttributes {
  public id!: number;
  public studentId!: number;
  public amount!: number | string;
  public dueDate!: string | Date;
  public paidAt!: Date | null;
  public isPaid!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
}

Payment.init(
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
    amount: {
      // DECIMAL(10,2), igual que gorm:"type:decimal(10,2)". Sequelize lo
      // devuelve como STRING por defecto (no float), para no perder precisión
      // en JS -- mismo motivo por el que usamos decimal.Decimal en Go.
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATEONLY, // solo fecha
      allowNull: false,
      field: "due_date",
    },
    paidAt: {
      type: DataTypes.DATE, // día + hora juntos
      allowNull: true,
      field: "paid_at",
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: "is_paid",
    },
  },
  {
    sequelize,
    modelName: "Payment",
    tableName: "payment",
    underscored: true,
    paranoid: true,
  }
);

export default Payment;
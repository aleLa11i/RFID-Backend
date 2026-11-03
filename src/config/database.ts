import "dotenv/config";
import { Sequelize } from "sequelize";
import { requireEnv } from "./env";

const sequelize = new Sequelize(
  requireEnv("DB_NAME"),
  requireEnv("DB_USER"),
  requireEnv("DB_PASSWORD"),
  {
    host: requireEnv("DB_HOST"),
    port: Number(requireEnv("DB_PORT")),
    dialect: "mssql",
    dialectOptions: {
      options: {
        // Para desarrollo local. En producción, sacar trustServerCertificate
        // y usar un certificado válido.
        encrypt: false,
        trustServerCertificate: true,
      },
    },
    logging: false,
  }
);

export default sequelize;
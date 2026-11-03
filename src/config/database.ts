import "dotenv/config";
import { Sequelize } from "sequelize";
import { requireEnv } from "./env";

export function optionalEnv(name: string, fallback: string): string {
  return process.env[name] ?? fallback;
}

// En local: DB_ENCRYPT=false (SQL Server con certificado autofirmado)
// En Azure: DB_ENCRYPT=true (o no definirla)
const encrypt = optionalEnv("DB_ENCRYPT", "true") !== "false";


const sequelize = new Sequelize(
  requireEnv("DB_NAME"),
  requireEnv("DB_USER"),
  requireEnv("DB_PASSWORD"),
  {
    host: requireEnv("DB_HOST"),
    port: Number(optionalEnv("DB_PORT", "1433")),
    dialect: "mssql",
    dialectOptions: {
      options: {
        encrypt,
        // Solo se confía en certificados autofirmados en local.
        // Azure tiene un certificado válido, así que ahí queda en false.
        trustServerCertificate: !encrypt,
        // La base serverless de Azure puede tardar en despertarse
        connectTimeout: 60000,
      },
    },
    pool: { max: 5, min: 0, idle: 10000, acquire: 60000 },
    retry: { max: 5 },
    logging: false,
  }
);

export default sequelize;
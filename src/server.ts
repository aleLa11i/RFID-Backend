import "dotenv/config";
import app from "./app";
import { sequelize } from "./models";

const PORT = process.env.PORT || 8080;

const start = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established");

    await sequelize.sync();
    console.log("Database migration completed");

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

start();
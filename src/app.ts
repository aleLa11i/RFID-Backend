import express, { Application, Request, Response } from "express";
import cors from "cors";
import routes from "./routes";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get("/health-check", (req: Request, res: Response) => {
  res.json({ message: "OK" });
});

app.use("/api", routes);

export default app;
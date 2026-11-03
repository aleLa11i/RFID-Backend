import { Router } from "express";
import studentController from "../controllers/student.controller";

const router: Router = Router();

router.get("/", studentController.getAll);
router.get("/uid/:uid", studentController.getByUid);
router.get("/:id", studentController.getById);
router.post("/", studentController.createStudent); //TODO: validaciones zod
router.get("/:uid/dashboard", studentController.getDashboard);

export default router;
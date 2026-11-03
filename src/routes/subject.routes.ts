import { Router } from "express";
import subjectController from "../controllers/subject.controller";

const router: Router = Router();

router.get("/", subjectController.getAll);
router.get("/:id", subjectController.getById);
router.post("/", subjectController.createSubject); //TODO: validaciones zod

export default router;
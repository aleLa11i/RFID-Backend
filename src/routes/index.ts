import { Router } from "express";
import studentRoutes from "./student.routes";
import subjectRoutes from "./subject.routes";
import paymentRoutes from "./payment.routes";

const router: Router = Router();

router.use("/students", studentRoutes);
router.use("/subjects", subjectRoutes);
router.use("/payments", paymentRoutes);

export default router;
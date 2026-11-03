import { Router } from "express";
import paymentController from "../controllers/payment.controller";

const router: Router = Router();

router.post("/", paymentController.createPayment);
router.get("/student/:id", paymentController.getAllByStudent);

export default router;
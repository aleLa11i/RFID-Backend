import { Request, Response } from "express";
import { ValidationError } from "sequelize";
import { CreatePaymentDto } from "../interfaces/payment.interface";
import paymentService from "../services/payment.service";

class PaymentController {

    getAllByStudent = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id as string);
            if (!Number.isInteger(id) || id <= 0) {
                res.status(400).json({ error: "Id must be a positive integer" });
                return;
            }
            const payments = await paymentService.getAllByStudent(id);
            if (!payments) {
                res.status(404).json({ error: "student not found" });
                return;
            }
            res.json(payments);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Unknown error";
            res.status(500).json({ error: message });
        }
    }

    createPayment = async (
        req: Request<Record<string, string>, unknown, CreatePaymentDto>,
        res: Response
    ): Promise<void> => {
        try {
            const payment = await paymentService.create(req.body);
            if (!payment) {
                res.status(404).json({ error: "student not found" });
                return;
            }
            res.status(201).json(payment);
        } catch (err: unknown) {
            if (err instanceof ValidationError) {
                res.status(400).json({ error: err.errors.map((e) => e.message) });
                return;
            }
            const message = err instanceof Error ? err.message : "Unknown error";
            res.status(500).json({ error: message });
        }
    };
}

export default new PaymentController();
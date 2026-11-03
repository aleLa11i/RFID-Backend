import { CreatePaymentDto } from "../interfaces/payment.interface";
import { Payment } from "../models";

class PaymentRepository {
    getAllByStudent = async (id: number): Promise<Payment[]> => {
        return Payment.findAll({
            where: { studentId: id },
            order: [["dueDate", "DESC"]], // el más reciente primero
        });
    }

    create = async (data: CreatePaymentDto): Promise<Payment> => {
        const { amount, dueDate, studentId } = data;
        return Payment.create({
            amount,
            dueDate,
            studentId,
            isPaid: false,
        });
    };
}
export default new PaymentRepository();

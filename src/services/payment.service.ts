import { CreatePaymentDto } from "../interfaces/payment.interface";
import { Payment } from "../models";
import studentRepository from "../repositories/student.repository";
import paymentRepository from "../repositories/payment.repository";

class PaymentService {

  getAllByStudent = async (id: number): Promise<Payment[] | null> => {
    const student = await studentRepository.findById(id);
    if (!student) return null;
    return paymentRepository.getAllByStudent(id);
  }

  create = async (data: CreatePaymentDto): Promise<Payment | null> => {
    const student = await studentRepository.findById(data.studentId);
    if (!student) return null;
    return paymentRepository.create(data);
  };
}

export default new PaymentService();
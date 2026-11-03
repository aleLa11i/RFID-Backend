export interface CreatePaymentDto {
    studentId: number;
    amount: number | string; // string también vale: ej "15000.50"
    dueDate: string; // "YYYY-MM-DD"
}
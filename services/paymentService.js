import { PaymentModel } from "../models/PaymentModel.js";

export const paymentService = {};

paymentService.savePaymentMethodDetails = async(userId, paymentMethod, paymentDetails) => {
    await PaymentModel.updateOne(
        { userId },
        { paymentMethod, paymentDetails },
        { upsert: true },
    );
    return { success: true };
};

paymentService.processPayment = async(userId, sessionId, payment) => {
    // Implement actual payment gateway integration here
    // For now, assume payment is always successful
    return { success: true };
};

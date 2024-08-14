import { PaymentModel } from "../models/PaymentModel";
import { PAYMENT_MESSAGE } from "../utils/constants";



export const paymentService = {};


paymentService.savePaymentMethodDetails = async (userId, paymentMethod, paymentDetails) => {
    try 
    {
        await PaymentModel.updateOne(
            { userId },
            { paymentMethod, paymentDetails },
            { upsert: true }
        );
        return { success: true, message: 'Payment method and details saved successfully' };
    } 
    catch (error) 
    {
        return { success: false, message: error.message };
    }
};





paymentService.processPayment = async (userId, sessionId, payment) => {
    try 
    {
        // Implement actual payment gateway integration here
        // For now, assume payment is always successful
        return { success: true, message: PAYMENT_MESSAGE.PAYMENT_SUCCESSFUL };
    } 
    catch (error) 
    {
        return { success: false, message: error.message };
    }
};


















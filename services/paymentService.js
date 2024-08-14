import { PaymentModel } from "../models/PaymentModel";



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



















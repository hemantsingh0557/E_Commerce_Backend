




export const paymentController = {} ;


paymentController.selectPaymentMethod = async (payload) => {
    const { userId, paymentMethod, paymentDetails } = payload;
    const result = await paymentService.savePaymentMethodDetails(userId, paymentMethod, paymentDetails);
    return { statusCode: result.success ? 200 : 400, data: { message: result.message } };
};























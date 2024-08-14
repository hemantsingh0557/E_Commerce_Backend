import { paymentService } from "../services/paymentService.js";
import { createErrorResponse, createSuccessResponse } from "../utils/commonFunctions/responseUtils.js";
import { RESPONSE_MESSAGE } from "../utils/messages.js";
import { ERROR_TYPES } from "../utils/constants.js";

export const paymentController = {};

// Select Payment Method
paymentController.selectPaymentMethod = async (payload) => {
    const { userId, paymentMethod, paymentDetails } = payload;
    const result = await paymentService.savePaymentMethodDetails(userId, paymentMethod, paymentDetails);
    if (!result.success) {
        return createErrorResponse(RESPONSE_MESSAGE.PAYMENT_METHOD_SAVE_FAILED, ERROR_TYPES.INTERNAL_SERVER_ERROR);
    }
    return createSuccessResponse(RESPONSE_MESSAGE.PAYMENT_METHOD_SAVED_SUCCESSFULLY);
};

// Process Payment
paymentController.processPayment = async (payload) => {
    const { userId, sessionId, payment } = payload;
    const result = await paymentService.processPayment(userId, sessionId, payment);
    if (!result.success) {
        return createErrorResponse(RESPONSE_MESSAGE.PAYMENT_PROCESSING_FAILED, ERROR_TYPES.INTERNAL_SERVER_ERROR);
    }
    return createSuccessResponse(RESPONSE_MESSAGE.PAYMENT_SUCCESSFUL);
};

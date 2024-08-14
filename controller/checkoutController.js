import { checkoutService } from "../services/checkoutService.js";
import { restoreProductService } from "../services/restoreProductService.js";
import { createErrorResponse, createSuccessResponse } from "../utils/commonFunctions/responseUtils.js";
import { RESPONSE_MESSAGE } from "../utils/messages.js";
import { ERROR_TYPES } from "../utils/constants.js";

export const checkoutController = {};

// Initiate Checkout
checkoutController.initiateCheckout = async(payload) => {
    const { userId, items } = payload;
    const result = await checkoutService.validateAndLockItems(userId, items);
    
    if (result.message) {
        return createErrorResponse(result.message, ERROR_TYPES.BAD_REQUEST);
    }
    
    return createSuccessResponse(RESPONSE_MESSAGE.INITIATED_SUCCESSFULLY, { checkoutSessionId: result.sessionId });
};

// Leave Checkout
checkoutController.leaveCheckout = async(payload) => {
    const { userId } = payload;
    await restoreProductService.restoreLockedProducts(userId);
    return createSuccessResponse(RESPONSE_MESSAGE.PRODUCT_RELEASED_SUCCESSFULLY);
};
 
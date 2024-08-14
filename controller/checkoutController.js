import { checkoutService } from "../services/checkoutService.js";
import { restoreProductService } from "../services/restoreProductService.js";
import { CHECKOUT_MESSAGE } from "../utils/constants.js";



export const checkoutController = { }  ; 




checkoutController.initiateCheckout = async (payload) => {
    const { userId, items } = payload;
    const validationResponse = await checkoutService.validateAndLockItems(userId, items);
    if (!validationResponse.success) return { statusCode: 400, data: { message: validationResponse.message } };
    const response = {
        message: CHECKOUT_MESSAGE.INITIATED_SUCCESSFULLY,
        checkoutSessionId: validationResponse.sessionId,
    };
    return { statusCode: 200, data: response };
}







checkoutController.leaveCheckout = async (payload) => {
    const { userId } = payload;
    const releaseProducts = await restoreProductService.restoreLockedProducts(userId);
    if (!releaseProducts.success) return { statusCode: 400, data: { message: releaseProducts.message } };
    const response = {
        message: releaseProducts.message,
    };
    return { statusCode: 200, data: response };
};





































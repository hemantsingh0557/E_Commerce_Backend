import { checkoutService } from "../services/checkoutService.js";




export const checkoutController = { }  ; 


checkoutController.initiateCheckout = async(payload) => {
    const { userId, items } = payload;
    const validationResponse = await checkoutService.validateAndLockItems(userId, items);
    if (!validationResponse.success) return { statusCode: 400, data: { message: validationResponse.message } , };
    const response = {
        message: "Checkout initiated successfully",
        checkoutSessionId: validationResponse.sessionId,
    } ;
    return { statusCode: 200, data: response } ; 
}






































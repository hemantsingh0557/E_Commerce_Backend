



export const checkoutController = { }  ; 


checkoutController.processCheckout = async(payload) => {
    let { userId, items } = payload;
    const checkoutResult = await checkoutService.processCheckoutDb(userId, items);
    if (!checkoutResult.success) return { statusCode: 500, data: { message: checkoutResult.message } };
    const response = {
        message: checkoutResult.message,
        userId: userId,
    };
    return { statusCode: 200, data: response };
}






































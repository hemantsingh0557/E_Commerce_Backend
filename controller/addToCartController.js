
import { addToCartService } from "../services/addToCardService.js";



export const addToCartController = {};


addToCartController.addProductToCart = async (payload) => {
    const { userId, cartItems } = payload ;
    const addProductToUserCart = await addToCartService.addProductToCartDb(userId, cartItems);

    if (!addProductToUserCart.success) return res.status(400).json({ statusCode: 400, data: { message: addProductToUserCart.message } });
    const response = {
        message: addProductToUserCart.message,
        userId: userId,
        successItems: addProductToUserCart.successItems,
        errorItems: addProductToUserCart.errorItems
    } ;
    return { statusCode: 200 , data: response };
};



addToCartController.removeProductFromCart = async (payload) => {
    const { userId, productId , productVariationId } = payload ;
    const removeProductFromUserCart = await addToCartService.removeProductFromCartInDb(userId, productId , productVariationId);
    if (!removeProductFromUserCart.success) return res.status(400).json({ statusCode: 400, data: { message: removeProductFromUserCart.message } });
    const response = { message: removeProductFromUserCart.message, userId: userId, } ;
    return { statusCode: 200 , data: response };
};











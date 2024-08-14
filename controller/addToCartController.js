
import { addToCartService } from "../services/addToCardService.js";



const addToCartController = {};

addToCartController.addProductToCart = async (payload) => {
    const { userId, cart } = payload ;
    const addProductToCart = await addToCartService.addProductToCartDb(userId, cart);

    if (!addProductToCart.success) return res.status(400).json({ statusCode: 400, data: { message: addProductToCart.message } });
    const response = {
        message: addProductToCart.message,
        userId: userId,
        successItems: addProductToCart.successItems,
        errorItems: addProductToCart.errorItems
    } ;
    return res.status(200).json({
        statusCode: 200 ,
        data: response
    });
};

export { addToCartController };









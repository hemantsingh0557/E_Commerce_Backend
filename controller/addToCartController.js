
import { addToCartService } from "../services/addToCartService";



const addToCartController = {};

addToCartController.addProductToCart = async (req, res) => {
    const { userId, cart } = req.body;
    const addProductToCart = await addToCartService.addProductToCartDb(userId, cart);

    if (!addProductToCart.success) {
        return res.status(400).json({
            statusCode: 400,
            data: { message: addProductToCart.message }
        });
    }

    return res.status(200).json({
        statusCode: 200,
        data: {
            message: addProductToCart.message,
            userId: userId,
            successItems: addProductToCart.successItems,
            errorItems: addProductToCart.errorItems
        }
    });
};

export { addToCartController };









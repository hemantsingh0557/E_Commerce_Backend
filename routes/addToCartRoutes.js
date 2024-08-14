
import Joi from 'joi' ;
import { addToCartController } from '../controller/addToCartController';


export const addToCardRoutes = [
    {
        method: 'post',
        path: '/addToCart',
        schema: {
            body: Joi.object({
                userId: Joi.string().length(24).hex().required(),
                cart: Joi.array().items(Joi.object({
                    productId: Joi.string().length(24).hex().required(),
                    productQuantity: Joi.number().min(1).required(),
                    size: Joi.string().valid('S', 'M', 'L', 'XL', '2XL', '3XL').optional(),
                    color: Joi.string().optional(),
                })).required()
            })
        },
        auth: true,
        controller: addToCartController.addProductToCart,
    }
]



























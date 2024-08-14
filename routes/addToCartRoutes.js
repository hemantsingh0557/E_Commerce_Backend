
import Joi from 'joi' ;
import { addToCartController } from '../controller/addToCartController.js';

export const addToCardRoutes = [
    {
        method: 'post',
        path: '/addToCart',
        schema: {
            body: Joi.object({
                cartItems : Joi.array().items(Joi.object({
                    productId: Joi.string().length(24).hex().required(),
                    productVariationId : Joi.string().length(24).hex().required(),
                    productQuantity: Joi.number().min(1).required(),
                })).required()
            })
        },
        auth: true,
        controller: addToCartController.addProductToCart,
    } ,
    {
        method: 'delete',
        path: '/removeProductFromCart',
        schema: {
            body: Joi.object({
                productId: Joi.string().length(24).hex().required(),
                productVariationId : Joi.string().length(24).hex().required(),
            })
        },
        auth: true,
        controller: addToCartController.removeProductFromCart,
    }
]



























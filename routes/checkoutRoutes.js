import Joi from 'joi';
import { checkoutController } from "../controller/checkoutController.js";





export const checkoutRoutes = [
    {
        method: 'post',
        path: '/initiateCheckout',
        schema: {
            body: Joi.object({
                items: Joi.array().items(
                    Joi.object({
                        productId: Joi.string().length(24).hex().required(),
                        productQuantity: Joi.number().min(1).max(10).required(),
                        productPrice: Joi.number().required(),
                        productSize: Joi.string().valid('S', 'M', 'L', 'XL', '2XL', '3XL').required(),
                        productColor: Joi.string().required(),
                    })
                ).required()
            })
        },
        auth: true,
        controller: checkoutController.initiateCheckout,
    },
    {
        method: 'post',
        path: '/leaveCheckout' ,
        auth: true,
        controller: checkoutController.leaveCheckout,
    },
];








































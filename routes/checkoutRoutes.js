import Joi from 'joi';
import { checkoutController } from "../controller/checkoutController.js";





export const checkoutRoutes = [
    {
        method: 'post',
        path: '/initiateCheckout',
        schema: {
            body: Joi.object({
                items: Joi.array().items(Joi.object({
                    productId: Joi.string().length(24).hex().required(),
                    productVariationId: Joi.string().length(24).hex().required(),
                    productQuantity: Joi.number().min(1).required(),
                })).required()
            })
        },
        auth: true,
        controller: checkoutController.initiateCheckout,
    } ,    
    {
        method: 'get',
        path: '/leaveCheckout' ,
        auth: true,
        controller: checkoutController.leaveCheckout,
    },
];








































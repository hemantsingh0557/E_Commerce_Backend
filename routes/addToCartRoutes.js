
import Joi from 'joi' ;
import { addToCartController } from '../controller/addToCartController';





export const addToCardRoutes = [
    {
        method : 'post' ,
        path : '/addToCart' ,
        schema : {
            body : Joi.object({
                productId : Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
                productQuantity: Joi.number().integer().positive().min(1).required()
            })
        } ,
        auth : true ,
        controller : addToCartController.addProductToCart ,
    }
]






























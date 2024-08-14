
import Joi from 'joi' ;
import { checkoutController } from "../controller/checkoutController";





export const checkoutRoutes = [
    {
        methods : 'post' ,
        path : '/checkoutOrder' ,
        schema : {
            body : Joi.object({
                userId : Joi.string().length(24).hex().required() ,
                items : Joi.array().items({
                    productId : Joi.string().length(24).hex().required() ,
                    productQuantity : Joi.number().min(1).max(10).required() ,
                    productPrice : Joi.number.required() ,
                    productSize : Joi.string( 'S' , 'M' , 'L' , 'XL' , '2XL' , '3XL'  ).required() ,
                    productColor : Joi.string().required() ,
                })
            })
        } ,
        auth : true ,
        controller :  checkoutController.processCheckout  ,
    } ,
]











































import Joi from 'joi' ;
import { orderController } from '../controller/orderController';



export const orderReviewRoutes = [
    {
        method : 'post' ,
        path : 'orderReview' ,
        schema : {
            body : Joi.object({
                sessionId : Joi.string().length(24).hex().required() ,
                addressId : Joi.string().length(24).hex().required() ,
                paymentDetailsId : Joi.string().length(24).hex().required() ,
            })
        } ,
        auth : true ,
        controller : orderController.showOrderSummary ,
    }
]

import Joi from "joi" ;
import { orderController } from "../controller/orderController.js";



export const orderRoutes = [
    {
        method : "post" ,
        path : "/orderReview" ,
        schema : {
            body : Joi.object({
                sessionId : Joi.string().length(24).hex().required() ,
                addressId : Joi.string().length(24).hex().required() ,
                paymentDetailsId : Joi.string().length(24).hex().required() ,
            }),
        } ,
        auth : true ,
        controller : orderController.showOrderSummary ,
    } ,
    {
        method: "post",
        path: "/placeOrder",
        schema: {
            body: Joi.object({
                sessionId: Joi.string().length(24).hex().required(),
                paymentMethodId: Joi.string().length(24).hex().required(),
                addressId: Joi.string().length(24).hex().required(),
            }),
        },
        auth: true,
        controller: orderController.placeOrder,
    } ,
    {
        method: "get",
        path: "/getAllOrders",
        schema: {
            query: Joi.object({ 
                page: Joi.number().min(1).optional(), 
                limit: Joi.number().min(1).optional(), 
            }),
        } ,
        auth: true,
        controller: orderController.getAllOrders,
    } ,
];
 




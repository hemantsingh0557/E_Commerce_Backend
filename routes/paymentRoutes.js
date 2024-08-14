
import Joi from 'joi' ;
import { paymentController } from '../controller/paymentController';




export const paymentRoutes = [
    {
        method : 'post' ,
        path : '/selectPaymentMethod' ,
        schema : {
            body: Joi.object({
                paymentMethod: Joi.string().valid( 'upi' , 'credit_card', 'debit_card', 'wallet', 'bank_transfer', 'pod').required(),
                paymentDetails : Joi.string().required()  ,
            })
        } ,
        auth : true ,
        contrller : paymentController.selectPaymentMethod  ,
    } ,
    {
        method : 'post' ,
        path : '/initiatePayment' ,
        schema : {
            body: Joi.object({
                paymentMethod: Joi.string().valid( 'upi' , 'credit_card', 'debit_card', 'wallet', 'bank_transfer', 'pod').required(),
                paymentDetails : Joi.string().required()  ,
            })
        } ,
        auth : true ,
        contrller : paymentController.selectPaymentMethod  ,
    } ,
]




























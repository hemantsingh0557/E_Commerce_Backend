
import Joi from "joi" ;
import { otpController } from "../controller/otpController.js";





const otpRoutes = [
    {
        method : 'post' ,
        path : '/sendOtp' ,
        schema : {
            body : Joi.object({
                email: Joi.string().email().required(), 
                mobileNumber : Joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required() ,
            })
        } ,
        controller : otpController.sentOtp 
    } ,
    {
        method : 'post' ,
        path : '/varifyOtp' ,
        schema : {
            body : Joi.object({
                email: Joi.string().email().required(), 
            })
        } ,
        controller : otpController.varifyOtp 
    } ,

]


export {otpRoutes} ;


















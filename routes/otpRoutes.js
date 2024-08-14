
import Joi from "joi" ;
import { otpController } from "../controller/otpController.js";





const otpRoutes = [
    {
        method : 'post' ,
        path : 'varifyOtp' ,
        schema : {
            body : Joi.object({
                email: Joi.string().email().required(), 
            })
        } ,
        controller : otpController.varifyOtp 
    } ,

]


export {otpRoutes} ;


















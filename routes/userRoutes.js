
import Joi from 'joi' ; 
import { userController } from '../controller/userController.js';

const userRoutes = [
    {
        method : "post" ,
        path : "user/signUp",
        schema : {
            body : Joi.object({
                name: Joi.string().required(),   
                age : Joi.number().min(10).max(100) ,
                email: Joi.string().email().required(), 
                mobileNumber : Joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required() ,
                password: Joi.string().min(4).required(),
                confirmPassword : Joi.ref("password") ,
            }).required()
        },
        auth : false ,
        controller : userController.userSignUp
    },
    {
        method : "post" ,
        path : "user/signIn",
        schema : {
            body : Joi.object({
                email: Joi.string().email().required(),   
                password: Joi.string().min(4).required(),
                // mobileNumber : Joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required() ,
            }).required()
        } ,
        auth : true ,
        controller : userController.userSignIn
    }


] ;

export {userRoutes} ;















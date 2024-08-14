
import Joi from 'joi' ;
import { addressController } from '../controller/addressController.js';



export const addressRoutes = [
    {
        method: 'post',
        path: '/addAddress', 
        schema: {
            body: Joi.object({
                recepientName : Joi.string().required() ,
                mobileNumber : Joi.string().pattern(/^[0-9]{10}$/).required() ,
                street: Joi.string().required(),
                landMark: Joi.string().optional(), 
                city: Joi.string().required(),
                state: Joi.string().required(),
                postalCode: Joi.string().pattern(/^[A-Z][0-9]{10}$/).required(), 
                country: Joi.string().required(),
                addressType: Joi.string().valid('home', 'work', 'other').default('home').required(),
            })
        },
        auth: true,
        controller: addressController.addAddress,
    } ,
    {
        method: 'get',
        path: '/getAddress', 
        schema: {
            params: Joi.object({
                addressId: Joi.string().length(24).hex().required(), 
            }),
        },
        auth: true,
        controller: addressController.getAddress,
    } ,
    {
        method: 'put',
        path: '/updateAddress/:addressId', 
        schema: {
            params: Joi.object({
                addressId: Joi.string().length(24).hex().required(), 
            }),
            body: Joi.object({
                recepientName : Joi.string().optional() ,
                mobileNumber : Joi.string().pattern(/^[0-9]{10}$/).optional() ,
                street: Joi.string().optional(),
                landMark: Joi.string().optional(), 
                city: Joi.string().optional(),
                state: Joi.string().optional(),
                postalCode: Joi.string().pattern(/^[A-Z][0-9]{10}$/).optional(), 
                country: Joi.string().optional(),
                addressType: Joi.string().valid('home', 'work', 'other').default('home').optional(),
            })
        },
        auth: true,
        controller: addressController.updateAddress,
    } ,
    {
        method: 'delete',
        path: '/removeAddress/:addressId',
        schema: {
            params: Joi.object({
                addressId: Joi.string().length(24).hex().required(), 
            })
        },
        auth: true,
        controller: addressController.removeAddress,
    } ,
    {
        method: 'get',
        path: '/getAllUserAddresses/:userId', 
        schema: {
            params: Joi.object({
                addressId: Joi.string().length(24).hex().required(), 
            })
        },
        auth: true,
        controller: addressController.getAllUserAddresses,
    } ,
]

































import Joi from 'joi' ;
import { adminController } from '../controller/adminController.js';



export const adminRoutes = [
    {
        method : 'get' ,
        path : '/getProductDetail/:productId' ,
        schema : {
            params : Joi.object({
                productId : Joi.string().length(24).hex().required() ,
            })
        } ,
        auth : true ,
        controller : adminController.getProductDetail 
    } ,
    {
        method: 'post',
        path: '/addProduct',
        schema: {
            body: Joi.object({
                name: Joi.string().required(),
                description: Joi.string(),
                category: Joi.string().required(),
                tags: Joi.array().items(Joi.string()),
                warranty: Joi.string(),
                returnPolicy: Joi.string(),
                variation: Joi.object({
                    sku: Joi.string().required(),
                    size: Joi.string().valid('S', 'M', 'L', 'XL', '2XL', '3XL'),
                    color: Joi.string(),
                    price: Joi.number().required(),
                    stock: Joi.number().default(1),
                    discount: Joi.number().default(0),
                    images: Joi.array().items(Joi.string())
                }).required(),
                rating: Joi.number(),
                brandsName: Joi.string(),
                material: Joi.string(),
                inStock: Joi.boolean().default(true)
            })
        },
        auth: true,
        controller: adminController.addProduct
    },    
    {     
        method: 'put',
        path: '/updateProduct/:productId',
        schema: {
            params: Joi.object({
                productId: Joi.string().length(24).hex().required()
            }),
            body: Joi.object({
                name: Joi.string(),
                description: Joi.string(),
                category: Joi.string(),
                tags: Joi.array().items(Joi.string()),
                warranty: Joi.string(),
                returnPolicy: Joi.string(),
                variation: Joi.object({
                    sku: Joi.string(),
                    size: Joi.string().valid('S', 'M', 'L', 'XL', '2XL', '3XL'),
                    color: Joi.string(),
                    price: Joi.number(),
                    stock: Joi.number().default(1),
                    discount: Joi.number().default(0),
                    images: Joi.array().items(Joi.string())
                }),
                rating: Joi.number(),
                brandsName: Joi.string(),
                material: Joi.string(),
                inStock: Joi.boolean().default(true)
            })
        },
        auth: true,
        controller: adminController.updateProduct
    } ,
    {
        method : 'delete' ,
        path : '/deleteProduct/:productId' ,
        schema : {
            params : Joi.object({
                productId : Joi.string().length(24).hex().required() ,
            })
        } ,
        auth : true ,
        controller : adminController.deleteProduct 
    } ,
]

































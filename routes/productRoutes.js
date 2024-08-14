
import Joi from "joi";
import { productController } from "../controller/productController.js";



export const productRoutes = [
    {
        method: 'get',
        path: '/productSearch',
        schema: {
            query: Joi.object({
                searchText: Joi.string().optional(), 
                category: Joi.string().optional(), 
                minPrice: Joi.number().min(0).optional(), 
                maxPrice: Joi.number().min(0).optional(), 
                minRating: Joi.number().min(0).max(5).optional(),  
                maxRating: Joi.number().min(0).max(5).optional(),  
                sortField: Joi.string().valid('price', 'name', 'rating').optional(), 
                sortOrder: Joi.string().valid('asc', 'desc').optional(), 
                brandsName: Joi.string().optional(),
                size: Joi.string().valid('S', 'M', 'L', 'XL', '2XL', '3XL').optional(),
                material: Joi.string().optional(),  
                discount: Joi.number().min(0).optional(),  
                page: Joi.number().min(1).optional(), 
                limit: Joi.number().min(1).optional(), 
                inStock: Joi.boolean().optional()  
            })
        } ,
        auth : false ,
        controller : productController.searchProducts ,
    },
    {
        method: 'get',
        path: '/viewProduct/:productId',
        schema: {
            params: Joi.object({
                productId: Joi.string().length(24).hex().required(), 
            })
        },
        auth: false,
        controller: productController.viewProduct ,
    } ,
] ;














































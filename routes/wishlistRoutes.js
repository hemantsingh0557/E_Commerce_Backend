
import Joi from 'joi' ; 
import { wishlistController } from '../controller/wishlistController.js';





export const wishlistRoutes = [
    {
        method : 'post' ,
        path : '/addToWishlist' ,
        schema  :{
            body : Joi.object({
                productId: Joi.string().length(24).hex().required()
            })
        } ,
        auth : true ,
        controller : wishlistController.addToWishlist 
    } ,
    {
        method : 'delete' ,
        path : '/removeFromWishlist' ,
        schema  :{
            body : Joi.object({
                productId: Joi.string().length(24).hex().required()
            })
        } ,
        auth : true ,
        controller : wishlistController.removeFromWishlist 
    } ,
    {
        method : 'get' ,
        path : '/getWishlist' ,
        auth : true ,
        controller : wishlistController.getWishlist 
    } ,
]




























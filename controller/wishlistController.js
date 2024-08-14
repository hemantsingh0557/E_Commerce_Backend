import { wishlistService } from "../services/wishlistService";
import { WISHLIST_MESSAGE } from "../utils/constants";




export const wishlistController = {} ;


wishlistController.addToWishlist = async(payload) =>{
    let {userId , productId } = payload ;
    const addProductToWishlist = await wishlistService.addProductToWishlistDb(userId , productId ) ;
    if( ! addProductToWishlist.success ) return { statusCode : 500 , data : { message : addProductToWishlist.message } } ;
    const response = {
        message : addProductToWishlist.message ,
        userId : userId ,
        productId : productId 
    }
    return {
        statusCode : 201 ,
        data : response 
    }
}




wishlistController.getWishlist = async(payload) =>{
    let {userId } = payload ;
    const getAllProductFromWishlist = await wishlistService.getAllProductFromWishlistDb(userId  ) ;
    if( ! getAllProductFromWishlist.success ) return { statusCode : 500 , data : { message : getAllProductFromWishlist.message } } ;
    const response = {
        message : getAllProductFromWishlist.message  ,
        userId : userId ,
        allProducts : getAllProductFromWishlist.data ,
    }
    return {
        statusCode : 200 ,
        data : response 
    }
}





wishlistController.removeFromWishlist = async(payload) =>{
    let {userId , productId } = payload ;
    const removeProductFromWishlist = await wishlistService.removeProductFromWishlistDb(userId , productId ) ;
    if( ! removeProductFromWishlist.success ) return { statusCode : 500 , data : { message : removeProductFromWishlist.message } } ;
    const response = {
        message : removeProductFromWishlist.message ,
        userId : userId ,
        productId : productId 
    }
    return {
        statusCode : 200 ,
        data : response 
    }
}
































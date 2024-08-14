import { addToCartService } from "../services/addToCardService";





const addToCartController = {} ; 

addToCartController.addProductToCart = async(payload) => {
    let { userId , productId , productQuantity } = payload ; 
    const addProductToCart = await addToCartService.addProductToCartDb(userId , productId , productQuantity ) ;
    if( ! addProductToCart.success ) return { statusCode : 400 , data: { message : addProductToCart.message , } } ;
    const response = { 
        message : addProductToCart.message ,
        userId : userId ,
    }
    return {
        statusCode : 200 ,
        data : response ,
    }
}
export {addToCartController} ;



























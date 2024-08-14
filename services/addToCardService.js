import { AddToCartModel } from "../models/addToCartModel";
import { ProductModel } from "../models/productModel";
import { ADD_TO_CART_MESSAGE } from "../utils/constants";




export const  addToCartService = {} ;


addToCartService.addProductToCartDb = async(userId , productId , productQuantity ) => {
    let productInCart = await AddToCartModel.findOne({productId : productId}) ;
    if( productInCart ) productQuantity += productInCart.productQuantity  ;
    const productInDb = await ProductModel.findOne({_id :productId }) ;
    if( productInDb.productQuantity < productQuantity ) return { success: false, message: ADD_TO_CART_MESSAGE.INSUFFICIENT_STOCK };
    if( productInCart ) productInCart.productQuantity = productQuantity  ;
    else{
        const newProductDetailsObject = {
            userId : userId ,
            productId : productId ,
            productQuantity : productQuantity 
        }
        productInCart = new AddToCartModel(newProductDetailsObject)  ;
    }
    await productInCart.save() ;
    return { success : true , message : ADD_TO_CART_MESSAGE.ADD_SUCCESSFULLY } ;
}






















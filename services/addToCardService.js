
import { AddToCartModel } from "../models/addToCartModel.js";
import { ProductModel, ProductVariationsModel } from "../models/ProductModel.js";
import { ADD_TO_CART_MESSAGE, PRODUCTS_MESSAGE } from "../utils/constants.js";



export const addToCartService = {};

addToCartService.addProductToCartDb = async (userId, cartItems) => {
    let successItems = [];
    let errorItems = [];

    for (let item of cartItems) 
    {
        try 
        {
            const productVariation = await ProductVariationsModel.findOne({_id: item.productVariationId,productId: item.productId});
            if (item.productQuantity > productVariation.stock) 
            {
                item.productQuantity = productVariation.stock; 
                errorItems.push({ productId: item.productId, message: `${ADD_TO_CART_MESSAGE.REQUESTED_QUANTITY_EXCEEDS_STOCK}${productVariation.stock}` });
            }
            const existingItem = await AddToCartModel.findOneAndUpdate(
                {
                    userId,
                    productId: item.productId,
                    productVariationId: item.productVariationId,
                },
                { quantity: item.productQuantity },
                { new: true, upsert: true } 
            );
            successItems.push({ productId: item.productId, quantity: existingItem.quantity });
        } 
        catch (error) 
        {
            errorItems.push({ productId: item.productId, error: error.message });
        }
    }
    let message = '';
    if (successItems.length > 0 && successItems.length == cartItems.length ) message = ADD_TO_CART_MESSAGE.CART_UPDATED_SUCCESSFULLY ;
    else if (successItems.length > 0 && successItems.length != cartItems.length ) message = ADD_TO_CART_MESSAGE.CART_UPDATED_PARTIALLY  ;
    else message = ADD_TO_CART_MESSAGE.FAILED_TO_UPDATE_CART;
    return {
        message,
        successItems,
        errorItems,
        success: successItems.length > 0
    };
};










addToCartService.removeProductFromCartInDb = async (userId, productId , productVariationId) => {
    const removeProdcut = await AddToCartModel.findOneAndDelete( { userId , productId , productVariationId  } ) ; 
    if( !removeProdcut ) return { success : false , message : ADD_TO_CART_MESSAGE.ITEM_NOT_FOUND  } ; 
    return { success : true , message : ADD_TO_CART_MESSAGE.ITEM_REMOVED_SUCCESSFULLY  } ; 
};









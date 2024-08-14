
import { AddToCartModel } from "../models/addToCartModel.js";
import { ProductModel } from "../models/productModel.js";
import { ADD_TO_CART_MESSAGE } from "../utils/constants.js";



export const addToCartService = {};

addToCartService.addProductToCartDb = async (userId, cart) => {
    let successItems = [];
    let errorItems = [];

    for (let item of cart) {
        try {
            const product = await ProductModel.findById(item.productId);
            if (item.productQuantity > product.stockQuantity) {
                item.productQuantity = product.stockQuantity;
                errorItems.push({ productId: item.productId, message: `Requested quantity exceeds stock. Added maximum available: ${product.stockQuantity}` });
            }
            const existingItem = await AddToCartModel.findOne({
                userId,
                productId: item.productId,
                size: item.size,
                color: item.color
            });
            if (existingItem) 
            {
                existingItem.productQuantity += item.productQuantity ;
                await existingItem.save();
            } 
            else 
            {
                const newItem = new AddToCartModel({
                    userId,
                    productId: item.productId,
                    productQuantity: item.productQuantity ,
                    size: item.size,
                    color: item.color
                });
                await newItem.save();
            }
            successItems.push({ productId: item.productId, quantity: quantityToAdd });
        } 
        catch (error) 
        {
            errorItems.push({ productId: item.productId, error: ADD_TO_CART_MESSAGE.INTERNAL_ERROR });
        }
    }

    let message = successItems.length ? (successItems.length === cart.length)
        ? ADD_TO_CART_MESSAGE.CART_UPDATED_SUCCESSFULLY
        : ADD_TO_CART_MESSAGE.CART_UPDATED_PARTIALLY
        : ADD_TO_CART_MESSAGE.FAILED_TO_UPDATE_CART;

    if (successItems.length) message += ` ${successItems.length} ${ADD_TO_CART_MESSAGE.ITEMS_SUCCESSFULLY_UPDATED}`;
    if (errorItems.length) message += ` ${errorItems.length} ${ADD_TO_CART_MESSAGE.ITEMS_STOCK_ISSUES}`;

    return {
        message,
        successItems,
        errorItems,
        success: successItems.length > 0 
    };
};









import { AddToCartModel } from "../models/addToCartModel.js";
import { ProductVariationsModel } from "../models/ProductModel.js";
import { RESPONSE_MESSAGE } from "../utils/messages.js";

export const addToCartService = {};

// Add Product to Cart in Database
addToCartService.addProductToCartDb = async (userId, cartItems) => {
    let successItems = [];
    let errorItems = [];

    for (let item of cartItems) 
    {
        try 
        {
            const productVariation = await ProductVariationsModel.findOne({ _id: item.productVariationId, productId: item.productId });
            if (item.productQuantity > productVariation.stock) {
                item.productQuantity = productVariation.stock;
                errorItems.push({
                    productId: item.productId,
                    message: `${RESPONSE_MESSAGE.INSUFFICIENT_STOCK}${productVariation.stock}`
                });
            }
            const existingItem = await AddToCartModel.findOneAndUpdate(
                { userId, productId: item.productId, productVariationId: item.productVariationId },
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
    return {
        successItems,
        errorItems
    };
};

// Remove Product from Cart in Database
addToCartService.removeProductFromCartInDb = async (userId, productId, productVariationId) => {
    const removedProduct = await AddToCartModel.findOneAndDelete({ userId, productId, productVariationId });
    return removedProduct;
};


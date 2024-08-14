

import { LockedProductModel } from "../models/LockedProductModel.js";
import { ProductVariationsModel } from "../models/ProductModel.js";
import { CHECKOUT_MESSAGE, LOCK_TIMEOUT, PRODUCTS_MESSAGE } from "../utils/constants.js";
import { generateSessionId } from "../utils/helperFunctions.js";




export const checkoutService = { };

checkoutService.validateAndLockItems = async (userId, items) => {
    try 
    {
        // const addToCartResponse = await addToCartService.addProductToCartDb(userId, items);
        // if (!addToCartResponse.success) return { success: false, message: addToCartResponse.message };
        const sessionId = generateSessionId();
        for (let item of items) 
        {
            const productVariation = await ProductVariationsModel.findById(item.productVariationId);
            if (!productVariation) return { success: false, message: CHECKOUT_MESSAGE.PRODUCT_VARIATION_NOT_FOUND };
            if (productVariation.stock < item.productQuantity) return { success: false, message: CHECKOUT_MESSAGE.VARIATION_OUT_OF_STOCK };

            await LockedProductModel.findOneAndUpdate(
                { productId: item.productId, productVariationId: item.productVariationId },
                { sessionId, quantity: item.productQuantity, expiresAt: new Date(Date.now() + LOCK_TIMEOUT * 1000) },
                { upsert: true }
            );

            productVariation.stock -= item.productQuantity;
            await productVariation.save();
        }
        return { success: true, sessionId };
    } 
    catch (error) 
    {
        return { success: false, message: error.message };
    }
};


























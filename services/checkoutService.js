

import { LockedProductModel } from "../models/LockedProductModel.js";
import { ProductModel } from "../models/ProductModel.js";
import { CHECKOUT_MESSAGE, LOCK_TIMEOUT } from "../utils/constants.js";
import { generateSessionId } from "../utils/helperFunctions.js";




export const checkoutService = { };

checkoutService.validateAndLockItems = async (userId, items) => {
    try 
    {
        const sessionId = generateSessionId(); 
        for (let item of items) 
        {
            const product = await ProductModel.findById(item.productId);
            const variation = product.variations.find(v => v.size === item.productSize && v.color === item.productColor);
            if (!variation) return { success: false, message: `Variation not found` };
            if (variation.stock < item.productQuantity) return { success: false, message: `Insufficient stock for product ${product.name}` };
            await LockedProductModel.updateOne(
                { productId: product._id, userId, size: item.productSize, color: item.productColor },
                { sessionId, quantity: item.productQuantity, expiresAt: new Date(Date.now() + LOCK_TIMEOUT * 1000) },
                { upsert: true }
            );
            variation.stock -= item.productQuantity;
            await product.save();
        }
        return { success: true, sessionId };
    }
    catch (error) 
    {
        return { success: false, message: "Error processing items" };
    }
};



























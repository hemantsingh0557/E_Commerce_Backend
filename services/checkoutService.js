import { LockedProductModel } from "../models/LockedProductModel.js";
import { ProductVariationsModel } from "../models/ProductModel.js";
import { RESPONSE_MESSAGE } from "../utils/messages.js";
import { LOCK_TIMEOUT } from "../utils/constants.js";
import { generateSessionId } from "../utils/helperFunctions.js";

export const checkoutService = {};

// Validate and Lock Items
checkoutService.validateAndLockItems = async (userId, items) => {
    const sessionId = generateSessionId();

    for (let item of items) {
        const productVariation = await ProductVariationsModel.findById(item.productVariationId);
        if (!productVariation) return { message: CHECKOUT_MESSAGE.PRODUCT_VARIATION_NOT_FOUND };
        if (productVariation.stock < item.productQuantity) return { message: RESPONSE_MESSAGE.VARIATION_OUT_OF_STOCK };

        await LockedProductModel.findOneAndUpdate(
            { productId: item.productId, productVariationId: item.productVariationId },
            { sessionId, quantity: item.productQuantity, expiresAt: new Date(Date.now() + LOCK_TIMEOUT * 1000) },
            { upsert: true }
        );

        productVariation.stock -= item.productQuantity;
        await productVariation.save();
    }
    
    return { sessionId };
};

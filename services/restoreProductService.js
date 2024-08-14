

import { LockedProductModel } from '../models/LockedProductModel.js';
import { ProductModel } from '../models/ProductModel.js';
import { CHECKOUT_MESSAGE } from '../utils/constants.js';

export const restoreProductService = {};

restoreProductService.restoreLockedProducts = async (userId) => {
    try 
    {
        const locks = await LockedProductModel.find({ userId });
        for (const lock of locks) {
            const product = await ProductModel.findById(lock.productId);
            const variation = product.variations.find(v => v.size === lock.size && v.color === lock.color);
            if (variation) {
                variation.stock += lock.quantity;
                await product.save();
            }
        }
        await LockedProductModel.deleteMany({ userId });
        return { success: true, message: CHECKOUT_MESSAGE.PRODUCT_RELEASED_SUCCESSFULLY };
    } 
    catch (error) 
    {
        console.error("Error restoring locked products:", error);
        return { success: false, message: `${CHECKOUT_MESSAGE.FAILED_TO_RESTORE_PRODUCT} ${error.message}` };
    }
};








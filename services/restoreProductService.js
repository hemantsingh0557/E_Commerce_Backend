

import { LockedProductModel } from '../models/LockedProductModel.js';
import { ProductModel, ProductVariationsModel } from '../models/ProductModel.js';
import { CHECKOUT_MESSAGE } from '../utils/constants.js';




export const restoreProductService = {};



restoreProductService.restoreLockedProducts = async (userId) => {
    try 
    {
        const locks = await LockedProductModel.find({ userId });
        for (const lock of locks) 
        {
            const productVariation = await ProductVariationsModel.findById(lock.productVariationId);
            if (productVariation) {
                productVariation.stock += lock.quantity;
                await productVariation.save();
            }
        }
        await LockedProductModel.deleteMany({ userId });
        return { success: true, message: CHECKOUT_MESSAGE.PRODUCT_RELEASED_SUCCESSFULLY };
    } 
    catch (error) 
    {
        return { success: false, message: error.message };
    }
};












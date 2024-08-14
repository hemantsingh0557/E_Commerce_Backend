import { LockedProductModel } from "../models/LockedProductModel.js";
import { ProductVariationsModel } from "../models/ProductModel.js";

export const restoreProductService = {};

restoreProductService.restoreLockedProducts = async(userId) => {
    const locks = await LockedProductModel.find({ userId });
    for (const lock of locks) {
        const productVariation = await ProductVariationsModel.findById(lock.productVariationId);
        if (productVariation) {
            productVariation.stock += lock.quantity;
            await productVariation.save();
        }
    }
    await LockedProductModel.deleteMany({ userId });
    return; 
};
 
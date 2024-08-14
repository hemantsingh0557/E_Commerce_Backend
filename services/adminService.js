import { ProductModel, ProductVariationsModel } from "../models/ProductModel.js";

export const adminService = {};

// Get Product Detail from Database
adminService.getProductDetailFromDb = async (productId) => {
    return await ProductModel.findOne({ _id: productId });
};

// Add Product to Database
adminService.addProductToDb = async (productDetails) => {
    const newProduct = new ProductModel(productDetails);
    return await newProduct.save();
};

// Update Base Product Details in Database
adminService.updateBaseProductDetailsInDb = async (productId, updateData) => {
    return await ProductModel.findByIdAndUpdate(productId, updateData, { new: true });
};

// Add Product Variation in Database
adminService.addProductVariationInDb = async (productId, updateData) => {
    const newProductVariation = new ProductVariationsModel({ productId, ...updateData });
    return await newProductVariation.save();
};

// Update Product Variation in Database
adminService.updateProductVariationInDb = async (productVariationId, updateData) => {
    return await ProductVariationsModel.findByIdAndUpdate(productVariationId, updateData, { new: true });
};

// Delete Product from Database
adminService.deleteProductFromDb = async (productId) => {
    await ProductVariationsModel.deleteMany({ productId });
    return await ProductModel.findByIdAndDelete(productId);
};

// Delete Product Variation from Database
adminService.deleteProductVariationByIdFromDb = async (productVariationId) => {
    return await ProductVariationsModel.findByIdAndDelete(productVariationId);
};
 
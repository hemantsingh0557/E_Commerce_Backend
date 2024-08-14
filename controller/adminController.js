import { adminService } from "../services/adminService.js";
import { createErrorResponse, createSuccessResponse } from "../utils/commonFunctions/responseUtils.js";
import { RESPONSE_MESSAGE } from "../utils/messages.js";
import { ERROR_TYPES } from "../utils/constants.js";

export const adminController = {};

// Get Product Detail
adminController.getProductDetail = async(payload) => {
    const { productId } = payload;

    const productDetail = await adminService.getProductDetailFromDb(productId);
    if (!productDetail) {
        return createErrorResponse(RESPONSE_MESSAGE.PRODUCT_NOT_FOUND, ERROR_TYPES.DATA_NOT_FOUND);
    }
    return createSuccessResponse(RESPONSE_MESSAGE.PRODUCTS_FETCHED_SUCCESSFULLY , { product: productDetail });
};

// Add Product
adminController.addProduct = async(payload) => {
    const { productDetails } = payload;

    const newProduct = await adminService.addProductToDb({ productDetails });
    if (!newProduct) {
        return createErrorResponse(RESPONSE_MESSAGE.FAILED_TO_ADD_PRODUCT, ERROR_TYPES.BAD_REQUEST);
    }
    return createSuccessResponse(RESPONSE_MESSAGE.PRODUCT_ADDED_SUCCESSFULLY, { product: newProduct });
};

// Update Base Product Details
adminController.updateBaseProductDetails = async(payload) => {
    const { productId, ...updateData } = payload;

    const updatedProduct = await adminService.updateBaseProductDetailsInDb(productId, updateData);
    if (!updatedProduct) {
        return createErrorResponse(RESPONSE_MESSAGE.BASE_PRODUCT_NOT_FOUND, ERROR_TYPES.DATA_NOT_FOUND);
    }
    return createSuccessResponse(RESPONSE_MESSAGE.BASE_PRODUCT_UPDATED_SUCCESSFULLY, { product: updatedProduct });
};

// Add Product Variation
adminController.addProductVariation = async(payload) => {
    const { productId, ...variationData } = payload;

    const newVariation = await adminService.addProductVariationInDb(productId, variationData);
    if (!newVariation) {
        return createErrorResponse(RESPONSE_MESSAGE.FAILED_TO_ADD_PRODUCT_VARIATION, ERROR_TYPES.BAD_REQUEST);
    }
    return createSuccessResponse(RESPONSE_MESSAGE.PRODUCT_VARIATION_ADDED_SUCCESSFULLY, { variation: newVariation });
};

// Update Product Variation
adminController.updateProductVariation = async(payload) => {
    const { productVariationId, ...updateData } = payload;

    const updatedVariation = await adminService.updateProductVariationInDb(productVariationId, updateData);
    if (!updatedVariation) {
        return createErrorResponse(RESPONSE_MESSAGE.PRODUCT_VARIATION_NOT_FOUND, ERROR_TYPES.DATA_NOT_FOUND);
    }
    return createSuccessResponse(RESPONSE_MESSAGE.PRODUCT_VARIATION_UPDATED_SUCCESSFULLY, { variation: updatedVariation });
};

// Delete Product
adminController.deleteProduct = async(payload) => {
    const { productId } = payload;

    const deletedProduct = await adminService.deleteProductFromDb(productId);
    if (!deletedProduct) {
        return createErrorResponse(RESPONSE_MESSAGE.PRODUCT_NOT_FOUND, ERROR_TYPES.DATA_NOT_FOUND);
    }
    return createSuccessResponse(RESPONSE_MESSAGE.PRODUCT_DELETED_SUCCESSFULLY);
};

// Delete Product Variation
adminController.deleteProductVariation = async(payload) => {
    const { productVariationId } = payload;

    const deletedVariation = await adminService.deleteProductVariationByIdFromDb(productVariationId);
    if (!deletedVariation) {
        return createErrorResponse(RESPONSE_MESSAGE.PRODUCT_VARIATION_NOT_FOUND, ERROR_TYPES.DATA_NOT_FOUND);
    }
    return createSuccessResponse(RESPONSE_MESSAGE.PRODUCT_VARIATION_DELETED_SUCCESSFULLY);
};

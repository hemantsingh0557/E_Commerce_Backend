import { productService } from "../services/productService.js";
import { RESPONSE_MESSAGE } from "../utils/messages.js";
import { ERROR_TYPES } from "../utils/constants.js";
import { createErrorResponse, createSuccessResponse } from "../utils/commonFunctions/responseUtils.js";

export const productController = {};

productController.searchProducts = async (payload) => {
    const {
        searchText, category, minPrice, maxPrice, minRating, maxRating, sortField, sortOrder,
        brandsName, size, color, material, discount, page, limit, inStock
    } = payload;

    const { productsResult, totalCount } = await productService.searchProducts({
        searchText, category, minPrice, maxPrice, minRating, maxRating, sortField, sortOrder,
        brandsName, size, color, material, discount, page, limit, inStock
    });

    if (totalCount === 0) {
        return createErrorResponse(RESPONSE_MESSAGE.NO_PRODUCTS_FOUND, ERROR_TYPES.DATA_NOT_FOUND);
    }

    const response = {
        message: RESPONSE_MESSAGE.PRODUCTS_SEARCH_SUCCESSFULLY,
        total: totalCount,
        productsResult
    };

    return createSuccessResponse(RESPONSE_MESSAGE.PRODUCTS_SEARCH_SUCCESSFULLY, response);
};

productController.viewProduct = async (payload) => {
    const { productId, userId } = payload;

    const productDetails = await productService.viewSpecificProduct(productId, userId);

    if (!productDetails.length) {
        return createErrorResponse(RESPONSE_MESSAGE.NO_PRODUCT_FOUND, ERROR_TYPES.DATA_NOT_FOUND);
    }

    const response = {
        message: RESPONSE_MESSAGE.PRODUCT_FETCHED_SUCCESSFULLY, 
        productDetails: productDetails[0] 
    };

    return createSuccessResponse(RESPONSE_MESSAGE.PRODUCT_FETCHED_SUCCESSFULLY, response);
};

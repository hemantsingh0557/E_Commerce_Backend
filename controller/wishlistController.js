import { wishlistService } from "../services/wishlistService.js";
import { RESPONSE_MESSAGE } from "../utils/messages.js";
import { createErrorResponse, createSuccessResponse } from "../utils/commonFunctions/responseUtils.js";
import { ERROR_TYPES } from "../utils/constants.js";

export const wishlistController = {};

wishlistController.addToWishlist = async (payload) => {
    const { userId, productId } = payload;
    try {
        await wishlistService.addProductToWishlistDb(userId, productId);
        return createSuccessResponse(RESPONSE_MESSAGE.ADD_SUCCESSFULLY, { userId, productId });
    } catch (error) {
        return createErrorResponse(RESPONSE_MESSAGE.FAILED_TO_ADD, ERROR_TYPES.INTERNAL_SERVER_ERROR);
    }
};

wishlistController.removeFromWishlist = async (payload) => {
    const { userId, productId } = payload;
    try {
        const removedProduct = await wishlistService.removeProductFromWishlistDb(userId, productId);
        if (!removedProduct) return createErrorResponse(RESPONSE_MESSAGE.PRODUCT_NOT_FOUND, ERROR_TYPES.DATA_NOT_FOUND);
        return createSuccessResponse(RESPONSE_MESSAGE.PRODUCT_DELETED_SUCCESSFULLY, { userId, productId });
    } catch (error) {
        return createErrorResponse(RESPONSE_MESSAGE.FAILED_TO_DELETED_PRODUCTS, ERROR_TYPES.INTERNAL_SERVER_ERROR);
    }
};

wishlistController.getWishlist = async (payload) => {
    const { userId } = payload;
    try {
        const allProducts = await wishlistService.getAllProductFromWishlistDb(userId);
        if (allProducts.length === 0) {
            return createSuccessResponse(RESPONSE_MESSAGE.NO_PRODUCT_IN_WISHLIST, { userId, allProducts });
        }
        return createSuccessResponse(RESPONSE_MESSAGE.PRODUCTS_FETCHED_SUCCESSFULLY, { userId, allProducts });
    } catch (error) {
        return createErrorResponse(RESPONSE_MESSAGE.NO_PRODUCTS_FOUND, ERROR_TYPES.INTERNAL_SERVER_ERROR);
    }
};

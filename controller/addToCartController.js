import { createErrorResponse, createSuccessResponse } from "../utils/commonFunctions/responseUtils.js";
import { RESPONSE_MESSAGE } from "../utils/messages.js";
import { ERROR_TYPES } from "../utils/constants.js";
import { addToCartService } from "../services/addToCardService.js";

export const addToCartController = {};

// Add Product to Cart
addToCartController.addProductToCart = async (payload) => {
    const { userId, cartItems } = payload;
    const { successItems, errorItems } = await addToCartService.addProductToCartDb(userId, cartItems);
    
    if (errorItems.length > 0) {
        return createErrorResponse(
            RESPONSE_MESSAGE.CART_UPDATE_PARTIALLY_SUCCESSFUL,
            ERROR_TYPES.PARTIAL_SUCCESS
        );
    }

    return createSuccessResponse(
        RESPONSE_MESSAGE.CART_UPDATED_SUCCESSFULLY,
        { userId, successItems, errorItems }
    );
};

// Remove Product from Cart
addToCartController.removeProductFromCart = async (payload) => {
    const { userId, productId, productVariationId } = payload;
    const removedProduct = await addToCartService.removeProductFromCartInDb(userId, productId, productVariationId);

    if (!removedProduct) {
        return createErrorResponse(RESPONSE_MESSAGE.ITEM_NOT_FOUND, ERROR_TYPES.DATA_NOT_FOUND);
    }

    return createSuccessResponse(RESPONSE_MESSAGE.ITEM_REMOVED_SUCCESSFULLY, { userId });
};



import { orderService } from "../services/orderService.js";
import { createErrorResponse, createSuccessResponse } from "../utils/commonFunctions/responseUtils.js";
import { RESPONSE_MESSAGE } from "../utils/messages.js";
import { ERROR_TYPES } from "../utils/constants.js";

export const orderController = {};

// Show Order Summary
orderController.showOrderSummary = async (payload) => {
    const { userId, sessionId, addressId, paymentDetailsId } = payload;
    const orderSummary = await orderService.getOrderSummary(userId, sessionId, addressId, paymentDetailsId);

    if (!orderSummary) {
        return createErrorResponse(RESPONSE_MESSAGE.FAILED_TO_GET_ORDER_SUMMARY, ERROR_TYPES.DATA_NOT_FOUND);
    }

    return createSuccessResponse(RESPONSE_MESSAGE.ORDER_SUMMARY_FETCHED_SUCCESSFULLY, { orderSummary });
};

// Place Order
orderController.placeOrder = async (payload) => {
    const { userId, sessionId, addressId, paymentMethodId } = payload;
    const orderConfirmation = await orderService.placeOrderInDb(userId, sessionId, addressId, paymentMethodId);

    if (!orderConfirmation) {
        return createErrorResponse(RESPONSE_MESSAGE.FAILED_TO_PLACE_ORDER, ERROR_TYPES.INTERNAL_SERVER_ERROR);
    }

    return createSuccessResponse(RESPONSE_MESSAGE.ORDER_PLACED_SUCCESSFULLY, { orderConfirmation });
};

// Get All Orders
orderController.getAllOrders = async (payload) => {
    const { userId, page = 1, limit = 10 } = payload;
    const orders = await orderService.getAllOrdersDetailsFromDb(userId, page, limit);

    if (!orders.length) {
        return createErrorResponse(RESPONSE_MESSAGE.NO_ORDERS_FOUND, ERROR_TYPES.DATA_NOT_FOUND);
    }

    return createSuccessResponse(RESPONSE_MESSAGE.ORDERS_FETCHED_SUCCESSFULLY, { orders });
};

import { LockedProductModel } from "../models/LockedProductModel.js";
import { OrderItemModel, OrderModel } from "../models/OrderModel.js";
import { PaymentModel } from "../models/PaymentModel.js";
import { ORDER_MESSAGE } from "../utils/constants.js";
import { calculateTotalAmount } from "../utils/helperFunctions.js";
import { paymentService } from "./paymentService.js";





export const orderService = {} ; 


orderService.getOrderSummary = async (userId, sessionId, addressId, paymentDetailsId) => {
    try 
    {
        const getAllProducts = await LockedProductModel.aggregate([
            {
                $match: { userId: mongoose.Types.ObjectId(userId), sessionId }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'productDetails'
                }
            },
            {
                $unwind: { path: '$productDetails', preserveNullAndEmptyArrays: true }
            },
            {
                $lookup: {
                    from: 'productVariations',
                    localField: 'productVariationId',
                    foreignField: '_id',
                    as: 'variationDetails'
                }
            },
            {
                $unwind: { path: '$variationDetails', preserveNullAndEmptyArrays: true }
            },
            {
                $project: {
                    _id: 0,
                    productId: 1,
                    productVariationId: 1,
                    quantity: 1,
                    sessionId: 1,
                    productDetails: {
                        _id: 1,
                        name: 1,
                        category: 1,
                    },
                    variationDetails: {
                        _id: 1,
                        price: 1,
                        color: 1,
                        size: 1,
                        stock: 1 ,
                        weight: 1,
                        capacity: 1 ,
                    },
                    totalPrice: { $multiply: ['$quantity', '$variationDetails.price'] }
                }
            },
            {
                $group: {
                    _id: null,
                    items: { $push: '$$ROOT' },
                    subtotal: { $sum: '$totalPrice' }
                }
            },
            {
                $addFields: {
                    totalItems: { $size: '$items' },
                    totalPrice: { $sum: '$subtotal' }
                }
            }
        ]);

        if (!getAllProducts.length) return { success: false, message: ORDER_MESSAGE.FAILED_TO_GET_PRODUCT_DETAIL };
        const orderSummary = getAllProducts[0];
        const address = await AddressModel.findById(addressId);
        if (!address) return { success: false, message: ORDER_MESSAGE.ADDRESS_NOT_FOUND };
        const paymentDetails = await PaymentDetailsModel.findById(paymentDetailsId);
        if (!paymentDetails) return { success: false, message: ORDER_MESSAGE.PAYMENT_DETAILS_NOT_FOUND };
        const discount = 0; // Assuming discount is applied later
        const totalAfterDiscount = orderSummary.subtotal - discount;

        return {
            success: true,
            message: ORDER_MESSAGE.SUCCESSFULLY_FETCHED_PRODUCT_DETAIL,
            data: {
                items: orderSummary.items,
                subtotal: orderSummary.subtotal,
                discount,
                totalAfterDiscount,
                totalItems: orderSummary.totalItems,
                address,
                paymentDetails
            }
        };
    } 
    catch (error) 
    {
        return { success: false, message: error.message };
    }
};



orderService.placeOrderInDb = async (userId, sessionId, addressId, paymentMethodId) => {
    try 
    {
        const payment = await PaymentModel.findById(paymentMethodId);
        if (payment.paymentMethod !== 'COD') 
        {
            const paymentResult = await paymentService.processPayment(userId, sessionId, payment);
            if (!paymentResult.success) return { success: false, message: paymentResult.message };
        }
        const lockedProducts = await LockedProductModel.find({ sessionId });
        const newOrder = new OrderModel({
            userId,
            totalAmount: calculateTotalAmount(lockedProducts),
            shippingAddress: addressId,
            paymentMethod: paymentMethodId,
        });
        await newOrder.save();
        for (let product of lockedProducts) 
        {
            const newOrderItem = new OrderItemModel({
                orderId: newOrder._id,
                userId,
                productId: product.productId,
                quantity: product.quantity,
                price: product.price,
                size: product.size,
                color: product.color,
            });
            await newOrderItem.save();
        }
        await LockedProductModel.deleteMany({ sessionId });
        return { success: true, message: ORDER_MESSAGE.ORDER_PLACED_SUCCESSFULLY, data: newOrder._id };
    } 
    catch (error) 
    {
        return { success: false, message: error.message };
    }
}






orderService.getAllOrdersDetailsFromDb = async (userId, page, limit) => {
    try 
    {
        const getAllOrders = await OrderItem.find({ userId: userId })
            .sort({ orderDate: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        
        if (!getAllOrders.length) return { success: false, message: ORDER_MESSAGE.ORDER_NOT_FOUND };
        return { success: true, message: ORDER_MESSAGE.ORDER_FETCHED_SUCCESSFULLY, data: getAllOrders };
    } 
    catch (error) 
    {
        return { success: false, message: error.message };
    }
}




























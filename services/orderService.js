import { LockedProductModel } from "../models/LockedProductModel";
import { OrderItemModel, OrderModel } from "../models/OrderModel";
import { PaymentModel } from "../models/PaymentModel";
import { ORDER_MESSAGE } from "../utils/constants";
import { calculateTotalAmount } from "../utils/helperFunctions";
import { paymentService } from "./paymentService";





export const orderService = {} ; 


orderService.getOrderSummary = async( userId , sessionId ) => {
    try
    {
        const getAllProducts = await LockedProductModel.find({sessionId:sessionId}) ;
        if( !getAllProducts.length ) return { success : false , message : ORDER_MESSAGE.FAILED_TO_GET_PRODUCT_DETAIL } ;
        return { success : true , message : ORDER_MESSAGE.SUCCESSFULLY_FETCHED_PRODUCT_DETAIL , data : getAllProducts } ;
    }
    catch(error)
    {
        return { success : false , message : error.message } ;
    }
}


orderService.placeOrderInDb = async (userId, sessionId, addressId, paymentMethodId) => {
    try {
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




























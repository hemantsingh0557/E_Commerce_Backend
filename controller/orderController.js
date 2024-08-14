import { orderService } from "../services/orderService";









export const orderController = {} ; 


orderController.showOrderSummary = async(payload) => {
    // const { userId , sessionId , addressId , paymentDetailsId } = payload ;
    const { userId , sessionId  } = payload ;
    const getUserOrderSummary = await orderService.getOrderSummary(userId , sessionId ) ;
    if( ! getUserOrderSummary.success ) return { statusCode : 400 , data : { message : getUserOrderSummary.message }  } ;
    const response = {
        message : getUserOrderSummary.message ,
        userId : userId ,
        orderSummary : getUserOrderSummary.data ,
    }
    return { statusCode : 200 , data : response  } ;
}




orderController.placeOrder = async(payload) => {
    const { userId , sessionId , addressId , paymentMethodId } = payload ;
    const placeUserOrder = await orderService.placeOrderInDb( userId , sessionId , addressId , paymentMethodId ) ;
    if( ! placeUserOrder.success ) return { statusCode : 400 , data : { message : placeUserOrder.message }  } ;
    const response = {
        message : placeUserOrder.message ,
        userId : userId ,
        orderDetails : placeUserOrder.data ,
    }
    return { statusCode : 200 , data : response  } ;
}




orderController.getAllOrders = async (payload) => {
    const { userId, page = 1, limit = 10 } = payload;
    const getUserOrdersDetails = await orderService.getAllOrdersDetailsFromDb(userId, page, limit);
    if (!getUserOrdersDetails.success) return { statusCode: 400, data: { message: getUserOrdersDetails.message } };
    const response = {
        message: getUserOrdersDetails.message,
        userId: userId,
        orderDetails: getUserOrdersDetails.data,
    };
    return { statusCode: 200, data: response };
}

































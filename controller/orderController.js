import { orderService } from "../services/orderService";









export const orderController = {} ; 


orderController.showOrderSummary = async(payload) => {
    const { userId , sessionId , addressId , paymentDetailsId } = payload ;
    const getUserOrderSummary = await orderService.getOrderSummary(userId , sessionId , addressId , paymentDetailsId) ;
    if( ! getUserOrderSummary.success ) return { statusCode : 400 , data : { message : getUserOrderSummary.message }  } ;
    const response = {
        message : getUserOrderSummary.message ,
        userId : userId ,
        orderSummary : getUserOrderSummary.data ,
    }
    return { statusCode : 200 , data : response  } ;
}
































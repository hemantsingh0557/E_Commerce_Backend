

import { CHECKOUT_MESSAGE } from "../utils/constants";





export const checkoutService = { } ;

checkoutService.processOrder = async(userId , items ) =>{
    try {
        const orderItems = [] ; 
        let totalAmount = 0 ; 
        for (const item of items) 
        {
            const product = await ProductModel.findById(item.productId) ;
            if (item.productQuantity > product.stockQuantity) return { success: false, message: `${CHECKOUT_MESSAGE.PRODUCT_STOCK_ISSUE} ${item.productId}` } ; 
            totalAmount += item.productPrice * item.productQuantity ; 
            orderItems.push({
                productId: item.productId,
                quantity: item.productQuantity,
                size: item.productSize,
                color: item.productColor,
                price: item.productPrice
            }) ; 
            product.stockQuantity -= item.productQuantity ; 
            await product.save() ; 
            const order = new OrderModel({
                orderId : 'randowm string of 20 characters' ,
                userId,
                productId : item.productId ,
                productQuantity : item.productQuantity ,
                totalPrice : item.productPrice * item.productQuantity , 
                size: item.productSize,
                color: item.productColor,
                status: 'Pending' 
            });
            await order.save() ; 
        }
        await AddToCartModel.deleteMany({ userId }) ; 
        return { success: true, message: CHECKOUT_MESSAGE.ORDER_PLACED_SUCCESSFULLY } ; 
    } 
    catch (error) 
    {
        return { success: false, message: error.message + CHECKOUT_MESSAGE.FAILED_TO_PLACE_ORDER } ; 
    }
};
































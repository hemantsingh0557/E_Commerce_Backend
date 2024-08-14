

import { CHECKOUT_MESSAGE } from "../utils/constants.js";





export const checkoutService = { } ;

checkoutService.validateAndLockItems = async(userId , items ) =>{
    try 
    {
        for (let item of items) 
        {
            const product = await ProductModel.findById(item.productId);
            if(product.stock < item.productQuantity) return { success: false, message: `Insufficient stock for product ${product.name}` };
            product.stock -= item.productQuantity;
            await product.save();
        }
        const sessionId = generateSessionId();
        return { success: true, sessionId };
    } 
    catch (error) 
    {
        console.error("Error in validateAndLockItems:", error);
        return { success: false, message: "Error processing items" };
    }
};
































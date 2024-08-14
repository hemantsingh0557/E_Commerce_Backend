import { WishListModel } from "../models/WishlistModel.js";
import { WISHLIST_MESSAGE } from "../utils/constants.js";



export const wishlistService = {};



wishlistService.addProductToWishlistDb = async (userId, productId) => {
    try 
    {
        const wishlistObject = new WishListModel({ userId: userId, productId: productId });
        await wishlistObject.save();
        return { success: true, message: WISHLIST_MESSAGE.ADD_SUCCESSFULLY };
    } 
    catch (error) 
    {
        return { success: false, message: WISHLIST_MESSAGE.FAILED_TO_ADD };
    }
};





wishlistService.removeProductFromWishlistDb = async (userId, productId) => {
    try 
    {
        const requiredProduct = await WishListModel.findOneAndDelete({ userId: userId, productId: productId });
        if (!requiredProduct) return { success: false, message: WISHLIST_MESSAGE.PRODUCT_NOT_FOUND };
        return { success: true, data: requiredProduct, message: WISHLIST_MESSAGE.PRODUCT_DELETED_SUCCESSFULLY };
    } 
    catch (error) 
    {
        return { success: false, message: WISHLIST_MESSAGE.FAILED_TO_DELETED_PRODUCTS };
    }
};






wishlistService.getAllProductFromWishlistDb = async (userId) => {
    try 
    {
        const allProducts = await WishListModel.aggregate([
            {
                $match: { _id: mongoose.Types.ObjectId(userId) }  
            },
            {
                $lookup : {
                    from : 'products' ,
                    localField : 'productId' ,
                    foreignField : '_id' ,
                    as : "products"
                }
            },
            {
                $unwind : { path : "$products" , preserveNullAndEmptyArrays: true } ,
            } ,
        ]);
        if (allProducts.length === 0) return { success: true, data: allProducts, message: WISHLIST_MESSAGE.NO_PRODUCT_IN_WISHLIST };
        return { success: true, data: allProducts, message: WISHLIST_MESSAGE.PRODUCTS_FETCHED_SUCCESSFULLY };
    } 
    catch (error) 
    {
        return { success: false, message: WISHLIST_MESSAGE.FAILED_TO_FETCHED_PRODUCTS };
    }
};





















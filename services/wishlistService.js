import { WishListModel } from "../models/WishlistModel.js";

export const wishlistService = {};

wishlistService.addProductToWishlistDb = async (userId, productId) => {
    const wishlistObject = new WishListModel({ userId, productId });
    await wishlistObject.save();
};

wishlistService.removeProductFromWishlistDb = async (userId, productId) => {
    const removedProduct = await WishListModel.findOneAndDelete({ userId, productId });
    return removedProduct;
};

wishlistService.getAllProductFromWishlistDb = async (userId) => {
    const allProducts = await WishListModel.aggregate([
        {
            $match: { userId: mongoose.Types.ObjectId(userId) }
        },
        {
            $lookup: {
                from: 'products',
                localField: 'productId',
                foreignField: '_id',
                as: 'products'
            }
        },
        {
            $unwind: { path: '$products', preserveNullAndEmptyArrays: true }
        }
    ]);
    return allProducts;
};

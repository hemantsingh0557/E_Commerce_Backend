import mongoose from "mongoose";
import { ProductModel } from "../models/ProductModel.js";

export const productService = {};

productService.searchProducts = async (filters) => {
    const {
        searchText, category, minPrice = 0, maxPrice = Infinity, minRating = 1, maxRating = 5,
        sortField = 'name', sortOrder = 'asc', brandsName, size, color, material, discount = 0,
        page = 1, limit = 10, inStock = true
    } = filters;
    const pipeline = [
        {
            $lookup: {
                from: 'productVariations',
                localField: '_id',
                foreignField: 'productId',
                as: 'variations'
            }
        },
        { $unwind: { path: '$variations', preserveNullAndEmptyArrays: true } }
        // Add more lookup stages for rating and wishlist here
    ];
    const matchStage = {};
    if (searchText) matchStage.$text = { $search: searchText };
    if (category) matchStage.category = category;
    if (brandsName) matchStage.brandsName = brandsName;
    if (color) matchStage['variations.color'] = color;
    if (material) matchStage.material = material;
    if (size) matchStage['variations.size'] = size; // Size filter added
    matchStage['variations.price'] = { $gte: minPrice, $lte: maxPrice };
    matchStage['variations.discount'] = { $gte: discount };
    matchStage['variations.inStock'] = inStock;
    if (Object.keys(matchStage).length > 0) pipeline.push({ $match: matchStage });
    const sortStage = {};
    if (sortField) sortStage[sortField] = sortOrder === 'asc' ? 1 : -1;
    pipeline.push({ $sort: sortStage });
    pipeline.push({ $skip: (page - 1) * limit });
    pipeline.push({ $limit: limit });

    const productsResult = await ProductModel.aggregate(pipeline);
    const countPipeline = [
        ...pipeline.slice(0, -2), // Exclude $skip and $limit
        { $count: 'total' }
    ];
    const totalProducts = await ProductModel.aggregate(countPipeline);
    const totalCount = totalProducts.length > 0 ? totalProducts[0].total : 0;
    return {
        productsResult,
        totalCount
    };
};

productService.viewSpecificProduct = async (productId, userId) => {
    const productDetails = await ProductModel.aggregate([
        {
            $match: { _id: mongoose.Types.ObjectId(productId) }
        },
        {
            $lookup: {
                from: 'productVariations',
                localField: '_id',
                foreignField: 'productId',
                as: 'variations'
            }
        },
        { $unwind: { path: '$variations', preserveNullAndEmptyArrays: true } },
        {
            $lookup: {
                from: 'wishlists',
                let: { product_id: '$_id', user_id: userId },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ['$userId', '$$user_id'] },
                                    { $eq: ['$productId', '$$product_id'] }
                                ]
                            }
                        }
                    }
                ],
                as: 'wishlist'
            }
        },
        {
            $addFields: {
                isInWishlist: userId ? { $gt: [{ $size: '$wishlist' }, 0] } : false
            }
        }
    ]);
    return productDetails;
};

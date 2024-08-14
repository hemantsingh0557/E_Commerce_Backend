

import { ProductModel } from "../models/ProductModel.js";


export const productService = {};

productService.searchProducts = async (filters) => {
    const { searchText, category, minPrice =0 , maxPrice = Infinity , minRating = 1 , maxRating = 5, sortField = 'name', sortOrder = 'asc', 
        brandsName, size, color, material, discount, page = 1, limit = 10, inStock } = filters;

    let query = {};
    if(searchText) query.$text = { $search: searchText };
    if(category) query.category = category;
    query.price = {};
    query.price.$gte = minPrice;
    query.price.$lte = maxPrice;
    query.rating = {};
    query.rating.$gte = minRating;
    query.rating.$lte = maxRating;
    if(brandsName) query.brandsName = brandsName;
    if(size) query["variations.size"] = size;
    if(color) query["variations.color"] = color;
    if(material) query.material = material;
    if(discount !== undefined) query["variations.discount"] = discount;
    if(inStock !== undefined) query["variations.stock"] = { $gt: 0 };

    // Sorting and pagination
    const sort = {};
    if(sortField) sort[sortField] = sortOrder === 'desc' ? -1 : 1;

    const products = await ProductModel.find(query)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

    const totalProducts = await ProductModel.countDocuments(query);

    const result = {
        products,
        total: totalProducts,
        page: parseInt(page),
        totalPages: Math.ceil(totalProducts / limit),
    }
    return result ;
};





productService.ViewSpecificProduct = async(productId) => {
    const productDetails = await ProductModel.findOne({_id : productId }) ;
    return productDetails ;
}
































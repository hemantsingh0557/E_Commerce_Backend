import { productService } from "../services/productService.js";
import { PRODUCTS_MESSAGE } from "../utils/constants.js";


export const productController = {} ; 




productController.searchProducts = async (payload) => {
    const { searchText, category, minPrice, maxPrice, minRating, maxRating, sortField, sortOrder, brandsName, size, color, material, discount, page, limit, inStock } = payload;
    const results = await productService.searchProducts({ searchText, category, minPrice, maxPrice, minRating, maxRating, sortField, 
        sortOrder, brandsName, size, color, material, discount, page, limit, inStock });

    if (!results.success) return { statusCode: 404, data: { message: results.message } };
    const response = {
        message: results.message,
        ...results.data,
    };
    return { statusCode: 200, data: response };
};




productController.viewProduct = async (payload) => 
{
    const { productId, userId } = payload;  
    const productDetails = await productService.ViewSpecificProduct(productId, userId);
    if (!productDetails.success) return { statusCode: 400, data: { message: productDetails.message } };
    const response = {
        message: productDetails.message,
        productDetails: productDetails.data
    };
    return { statusCode: 200, data: response };
};






















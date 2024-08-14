import { productService } from "../services/productService.js";
import { PRODUCTS_MESSAGE } from "../utils/constants.js";


export const productController = {} ; 




productController.searchProducts = async (payload) => {
    const { searchText, category, minPrice, maxPrice, minRating, maxRating, sortField, sortOrder, brandsName, size, color, material, discount, page, limit, inStock } = payload ;
    const results = await productService.searchProducts({ searchText, category, minPrice, maxPrice, minRating, maxRating, sortField, 
        sortOrder, brandsName, size, color, material, discount, page, limit, inStock  }); 


    if (results.total === 0) return { statusCode: 404, data : { message : PRODUCTS_MESSAGE.NO_PRODUCTS_FOUND }  }  ;
    const response = {
        message: PRODUCTS_MESSAGE.PRODUCTS_SEARCH_SUCCESSFULLY,
        ...results,
    };
    return {
        statusCode: 200,
        data: response
    };
};





productController.viewProduct = async (payload) => {
    const { productId } = payload ;
    const productDetails = await productService.ViewSpecificProduct(productId) ;
    const response = {
        message : PRODUCTS_MESSAGE.PRODUCT_FETCHED ,
        productDetails ,
    }
    return {
        statusCode : 200 ,
        data : response 
    }
};

























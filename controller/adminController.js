import { adminService } from "../services/adminService.js";





export const adminController = {} ; 


adminController.getProductDetail = async (payload) => {
    const { productId } = payload ;
    const productDetailById = await adminService.getProductDetailFromDb(productId) ;
    if( ! productDetailById.success ) return { statuCode : 400 , data : { message : productDetailById.message } } ;
    const response = {
        message : productDetailById.message ,
        data : productDetailById.data ,
    }
    return { statuCode : 200 , data : response } ;
}


adminController.addProduct = async (payload) => {
    const { variations, ...productDetailsObject } = payload;
    const addNewProduct = await adminService.addProductToDb({ ...productDetailsObject, variations });
    if (!addNewProduct.success) return { statusCode: 400, data: { message: addNewProduct.message } };
    const response = {
        message: addNewProduct.message,
        data: addNewProduct.data
    };
    return { statusCode: 201, data: response };
};



// // // need to correct it
adminController.updateProduct = async (payload) => {
    const { productId } = payload ;
    const updateData = payload ;
    const updateResult = await adminService.updateProductInDb(productId, updateData);
    if (!updateResult.success) return { statusCode: 400, data: { message: updateResult.message } };
    const response = {
        message: updateResult.message,
        data: updateResult.data
    };
    return { statusCode: 200, data: response };
};



adminController.deleteProduct = async (payload) => {
    const { productId } = payload ;
    const deleteProductById = await adminService.deleteProductFromDb(productId) ;
    if( ! deleteProductById.success ) return { statuCode : 400 , data : { message : deleteProductById.message } } ;
    const response = {
        message: deleteProductById.message,
    };
    return { statusCode: 200, data: response };
}



adminController.deleteProductVariation = async (payload) => {
    const { productVariationId } = payload ;
    const deleteProductVariationById = await adminService.deleteProductVariationByIdFromDb(productVariationId) ;
    if( ! deleteProductVariationById.success ) return { statuCode : 400 , data : { message : deleteProductVariationById.message } } ;
    const response = {
        message: deleteProductVariationById.message,
    };
    return { statusCode: 200, data: response };
}


























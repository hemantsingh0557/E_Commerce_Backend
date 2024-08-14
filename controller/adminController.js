import { adminService } from "../services/adminService.js";
import { ADDRESS_MESSAGE, ADMIN } from "../utils/constants.js";





export const adminController = {} ; 


adminController.getProductDetail = async (payload) => {
    const { userId , userRole , productId } = payload ;
    if( userRole != ADMIN ) return { statuCode : 400 , data : { message : ADDRESS_MESSAGE.USER_MUST_ADMIN } } ;
    const productDetailById = await adminService.getProductDetailFromDb(productId) ;
    if( ! productDetailById.success ) return { statuCode : 400 , data : { message : productDetailById.message } } ;
    const response = {
        message : productDetailById.message ,
        data : productDetailById.data ,
    }
    return { statuCode : 200 , data : response } ;
}


adminController.addProduct = async (payload) => {
    const { userId , userRole , variations, ...productDetailsObject } = payload;
    if( userRole != ADMIN ) return { statuCode : 400 , data : { message : ADDRESS_MESSAGE.USER_MUST_ADMIN } } ;
    const addNewProduct = await adminService.addProductToDb({ ...productDetailsObject, variations });
    if (!addNewProduct.success) return { statusCode: 400, data: { message: addNewProduct.message } };
    const response = {
        message: addNewProduct.message,
        data: addNewProduct.data
    };
    return { statusCode: 201, data: response };
};


adminController.updateBaseProductDetails = async (payload) => {
    const { userId , userRole , productId, ...updateData } = payload;
    if( userRole != ADMIN ) return { statuCode : 400 , data : { message : ADDRESS_MESSAGE.USER_MUST_ADMIN } } ;
    const updateResult = await adminService.updateBaseProductDetailsInDb(productId, updateData);
    if (!updateResult.success) return { statusCode: 400, data: { message: updateResult.message } };
    const response = {
        message: updateResult.message,
        data: updateResult.data
    };
    return { statusCode: 200, data: response };
};



adminController.addProductVariation = async (payload) => {
    const { userId , userRole , productId, files, ...updateData } = payload;
    if( userRole != ADMIN ) return { statuCode : 400 , data : { message : ADDRESS_MESSAGE.USER_MUST_ADMIN } } ;
    const productVariationResult = await adminService.addProductVariationInDb(productId, updateData);
    if (!productVariationResult.success)  return { statusCode: 400, data: { message: productVariationResult.message } };
    const response = { 
        message: productVariationResult.message, 
        data: productVariationResult.data
    };
    return { statusCode: 200, data: response };
};




adminController.updateProductVariation = async (payload) => {
    const { userId , userRole , productVariationId , ...updateData } = payload;
    if( userRole != ADMIN ) return { statuCode : 400 , data : { message : ADDRESS_MESSAGE.USER_MUST_ADMIN } } ;
    const updateResult = await adminService.updateProductVariationInDb(productVariationId, updateData);
    if (!updateResult.success) return { statusCode: 400, data: { message: updateResult.message } };
    const response = { 
        message: updateResult.message, 
        data: updateResult.data
    } ;
    return { statusCode: 200, data: response };
};




adminController.deleteProduct = async (payload) => {
    const { userId , userRole , productId } = payload ;
    if( userRole != ADMIN ) return { statuCode : 400 , data : { message : ADDRESS_MESSAGE.USER_MUST_ADMIN } } ;
    const deleteProductById = await adminService.deleteProductFromDb(productId) ;
    if( ! deleteProductById.success ) return { statuCode : 400 , data : { message : deleteProductById.message } } ;
    const response = {
        message: deleteProductById.message,
    };
    return { statusCode: 200, data: response };
}



adminController.deleteProductVariation = async (payload) => {
    const { userId , userRole , productVariationId } = payload ;
    if( userRole != ADMIN ) return { statuCode : 400 , data : { message : ADDRESS_MESSAGE.USER_MUST_ADMIN } } ;
    const deleteProductVariationById = await adminService.deleteProductVariationByIdFromDb(productVariationId) ;
    if( ! deleteProductVariationById.success ) return { statuCode : 400 , data : { message : deleteProductVariationById.message } } ;
    const response = {
        message: deleteProductVariationById.message,
    };
    return { statusCode: 200, data: response };
}


























import { ProductModel } from "../models/ProductModel.js";
import { ADMIN_ACTIVITY_MESSAGE } from "../utils/constants.js";





export const adminService = {} ; 

adminService.getProductDetailFromDb = async (productId) => {
    const productDetail = await ProductModel.findOne({_id : productId }) ;
    if( !productDetail ) return { success :false  , message : ADMIN_ACTIVITY_MESSAGE.PORDUCT_NOT_FOUND } ;
    return { success : true , message : ADMIN_ACTIVITY_MESSAGE.FETCHED_PRODUCT_SUCCESSFULLY , data : productDetail } ;
}


adminService.addProductToDb = async (productDetails) => {
    try 
    {
        const existingVariation = await ProductModel.findOne({ 'variations.sku': productDetails.variations[0].sku });
        if (existingVariation) {
            return { success: false, message: ADMIN_ACTIVITY_MESSAGE.SKU_ALREADY_EXISTS.replace('{sku}', productDetails.variations[0].sku) };
        }
        const newProduct = new ProductModel(productDetails);
        const savedProduct = await newProduct.save();
        return { success: true, message: ADMIN_ACTIVITY_MESSAGE.PRODUCT_ADDED_SUCCESSFULLY, data: savedProduct };
    } 
    catch (error) 
    {
        return { success: false, message: ADMIN_ACTIVITY_MESSAGE.FAILED_TO_ADD_PRODUCT, error: error.message };
    }
};


adminService.updateProductInDb = async (productId, updateDetails) => {
    try 
    {
        const product = await ProductModel.findById(productId);
        if(!product) return { success: false, message: ADMIN_ACTIVITY_MESSAGE.PRODUCT_NOT_FOUND };
        if(updateDetails.variation && updateDetails.variation.sku) 
        {
            const existingVariation = await ProductModel.findOne({ 'variations.sku': updateDetails.variation.sku });
            if (existingVariation && existingVariation._id.toString() !== productId) {
                return { success: false, message: ADMIN_ACTIVITY_MESSAGE.SKU_ALREADY_EXISTS.replace('{sku}', updateDetails.variation.sku) };
            }
        }
        const updatedProduct = await ProductModel.findByIdAndUpdate(productId, updateDetails, { new: true });
        if(!updatedProduct) return { success: false, message: ADMIN_ACTIVITY_MESSAGE.FAILED_TO_UPDATE_PRODUCT };
        return { success: true, message: ADMIN_ACTIVITY_MESSAGE.PRODUCT_UPDATED_SUCCESSFULLY, data: updatedProduct };
    } 
    catch (error) 
    {
        return { success: false, error: error.message };
    }
};


adminService.deleteProductFromDb = async (productId) => {
    const productDetail = await ProductModel.findOneAndDelete({_id : productId }) ;
    if( !productDetail ) return { success :false  , message : ADMIN_ACTIVITY_MESSAGE.PORDUCT_NOT_FOUND } ;
    return { success : true , message : ADMIN_ACTIVITY_MESSAGE.PRODUCT_DELETED_SUCCESSFULLY } ;
}



























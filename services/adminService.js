import { ProductModel, ProductVariationsModel } from "../models/ProductModel.js";
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
        const newProduct = new ProductModel(productDetails);
        const savedProduct = await newProduct.save();
        return { success: true, message: ADMIN_ACTIVITY_MESSAGE.PRODUCT_ADDED_SUCCESSFULLY, data: savedProduct };
    } 
    catch (error) 
    {
        return { success: false, message: error.message };
    }
};


adminService.updateBaseProductDetailsInDb = async (productId, updateData) => {
    try 
    {
        const product = await ProductModel.findById(productId);
        if (!product)  return { success: false, message: ADMIN_ACTIVITY_MESSAGE.BASE_PRODUCT_NOT_FOUND };
        const updatedProduct = await ProductModel.findByIdAndUpdate(productId, updateData, { new: true });
        if (!updatedProduct)  return { success: false, message: ADMIN_ACTIVITY_MESSAGE.FAILED_TO_UPDATE_BASE_PRODUCT };
        return { success: true, message: ADMIN_ACTIVITY_MESSAGE.BASE_PRODUCT_UPDATED_SUCCESSFULLY, data: updatedProduct };
    } 
    catch (error) 
    {
        return { success: false, message: error.message };
    }
};

adminService.addProductVariationInDb = async (productId, updateData) => {
    try 
    {
        const newProductVariation = new ProductVariationsModel({ productId , ...updateData });
        const savedProductVariation = await newProductVariation.save();
        if (!savedProductVariation) return { success: false, message: ADMIN_ACTIVITY_MESSAGE.FAILED_TO_ADD_PRODUCT_VARIATION };
        return { success: true, message: ADMIN_ACTIVITY_MESSAGE.PRODUCT_VARIATION_ADDED_SUCCESSFULLY, data: savedProductVariation };
    } 
    catch (error) 
    {
        return { success: false, message: error.message };
    }
};



adminService.updateProductVariationInDb = async (productVariationId, updateData) => {
    try 
    {
        const productVariation = await ProductVariationsModel.findById(productVariationId);
        if (!productVariation) return { success: false, message: ADMIN_ACTIVITY_MESSAGE.PRODUCT_VARIATION_NOT_FOUND };
        const updatedProductVariation = await ProductVariationsModel.findByIdAndUpdate( productVariationId, updateData, { new: true }  );
        if (!updatedProductVariation) return { success: false, message: ADMIN_ACTIVITY_MESSAGE.FAILED_TO_UPDATE_PRODUCT_VARIATION };
        return { success: true, message: ADMIN_ACTIVITY_MESSAGE.PRODUCT_VARIATION_UPDATED_SUCCESSFULLY, data: updatedProductVariation };
    } 
    catch (error) 
    {
        return { success: false, message: error.message };
    }
};



adminService.deleteProductFromDb = async (productId) => {
    try 
    {
        await ProductVariationsModel.deleteMany({ productId: productId });
        const productDetail = await ProductModel.findByIdAndDelete(productId);
        if (!productDetail) return { success: false, message: ADMIN_ACTIVITY_MESSAGE.PRODUCT_NOT_FOUND };
        return { success: true, message: ADMIN_ACTIVITY_MESSAGE.PRODUCT_DELETED_SUCCESSFULLY };
    } 
    catch (error) 
    {
        return { success: false, message: error.message };
    }
};


adminService.deleteProductVariationByIdFromDb = async (productVariationId) => {
    try 
    {
        const productVariationDetail = await ProductVariationsModel.findByIdAndDelete(productVariationId);
        if (!productVariationDetail) return { success: false, message: ADMIN_ACTIVITY_MESSAGE.PRODUCT_NOT_FOUND };
        return { success: true, message: ADMIN_ACTIVITY_MESSAGE.PRODUCT_DELETED_SUCCESSFULLY };
    } 
    catch (error) 
    {
        return { success: false, message: error.message };
    }
};



























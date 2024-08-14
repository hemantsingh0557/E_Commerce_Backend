import { AddressModel } from "../models/AddressModel.js";
import { ADDRESS_MESSAGE } from "../utils/constants.js";






export const addressService = {} ;


addressService.addAddressToDb = async( addressDetails ) =>{
    try
    {
        const existingAddress = await AddressModel.findOne(addressDetails) ;
        if( existingAddress ) return {success : false , message : ADDRESS_MESSAGE.ALREADY_EXIST } ;
        const addressDetailsDoc = new AddressModel(addressDetails) ;
        addressDetailsDoc.save() ;
        return {success : true , message : ADDRESS_MESSAGE.ADDED_SUCCESSFULLY } ;
    }
    catch(error)
    {
        return { success : false , message : error.message } ;
    }
}

addressService.getAddressToDb = async( userId , addressId ) =>{
    try
    {
        const existingAddress = await AddressModel.findOne({_id : addressId , userId : userId }) ;
        if( !existingAddress ) return {success : false , message : ADDRESS_MESSAGE.NOT_EXIST } ;
        return {success : true , message : ADDRESS_MESSAGE.ADDED_SUCCESSFULLY , data : existingAddress } ;
    }
    catch(error)
    {
        return { success : false , message : error.message } ;
    }
}

addressService.updateAddressToDb = async( updateAddressDetails ) =>{
    try
    {
        const { addressId, ...updateData } = updateAddressDetails;
        const updatedAddress = await AddressModel.findByIdAndUpdate(addressId, updateData, { new: true });
        if(!updatedAddress) return { success: false, message: ADDRESS_MESSAGE.NOT_EXIST };
        return {success : true , message : ADDRESS_MESSAGE.ADDRESS_UPDATED_SUCCESSFULLY } ;
    }
    catch(error)
    {
        return { success : false , message : error.message } ;
    }
}


addressService.removeAddressFromDb = async( addressId ) =>{
    try
    {
        const removeUserAddress = await AddressModel.findByIdAndDelete(addressId);
        if (!removeUserAddress) return { success: false, message: ADDRESS_MESSAGE.NOT_EXIST };
        return { success: true, message: ADDRESS_MESSAGE.ADDRESS_DELETED_SUCCESSFULLY };
    }
    catch(error)
    {
        return { success : false , message : error.message } ;
    }
}




addressService.getAllUserAddressesFromDb = async( userId ) =>{
    try
    {
        const getUserAddresses = await AddressModel.find({ userId });
        if (!getUserAddresses.length) return { success: false, message: ADDRESS_MESSAGE.NO_ADDRESS_FOUND };
        return { success: true, message: ADDRESS_MESSAGE.FETCHED_ALL_ADDRESSES, data: getUserAddresses };
    }
    catch(error)
    {
        return { success : false , message : error.message } ;
    }
}







 



















import { AddressModel } from "../models/AddressModel.js";

export const addressService = {};

// Add Address to Database
addressService.addAddressToDb = async(addressDetails) => {
    const addressDetailsDoc = new AddressModel(addressDetails);
    await addressDetailsDoc.save();
    return addressDetailsDoc;
};

// Get Address from Database
addressService.getAddressToDb = async(userId, addressId) => {
    return await AddressModel.findOne({ _id: addressId, userId });
};

// Update Address in Database
addressService.updateAddressToDb = async(updateAddressDetails) => {
    const { userId , addressId, ...updateData } = updateAddressDetails;
    return await AddressModel.updateOne({ _id:addressId, userId : userId } ,{ updateData }, { new: true });
};

// Remove Address from Database
addressService.removeAddressFromDb = async(addressId) => {
    return await AddressModel.findByIdAndDelete(addressId);
};

// Get All User Addresses from Database
addressService.getAllUserAddressesFromDb = async(userId) => {
    return await AddressModel.find({ userId });
};





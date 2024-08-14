import { addressService } from "../services/addressService.js";
import { createErrorResponse, createSuccessResponse } from "../utils/commonFunctions/responseUtils.js";
import { RESPONSE_MESSAGE } from "../utils/messages.js";
import { ERROR_TYPES } from "../utils/constants.js";

export const addressController = {};

// Add Address
addressController.addAddress = async(payload) => {
    const { userId, ...addressDetails } = payload;
    const addedAddress = await addressService.addAddressToDb({ userId, ...addressDetails });
    return createSuccessResponse(RESPONSE_MESSAGE.ADDRESS_ADDED_SUCCESSFULLY, { userId, address: addedAddress });
};

// Get Address
addressController.getAddress = async(payload) => {
    const { userId, addressId } = payload;
    const address = await addressService.getAddressToDb(userId, addressId);
    if (!address) {
        return createErrorResponse(RESPONSE_MESSAGE.ADDRESS_NOT_FOUND, ERROR_TYPES.DATA_NOT_FOUND);
    }
    return createSuccessResponse(RESPONSE_MESSAGE.ADDRESS_FETCHED_SUCCESSFULLY, { address });
};

// Update Address
addressController.updateAddress = async(payload) => {
    const { userId , addressId, ...updateAddressDetails } = payload;
    const updatedAddress = await addressService.updateAddressToDb({ userId , addressId, ...updateAddressDetails });
    if (!updatedAddress) {
        return createErrorResponse(RESPONSE_MESSAGE.ADDRESS_NOT_FOUND, ERROR_TYPES.DATA_NOT_FOUND);
    }
    return createSuccessResponse(RESPONSE_MESSAGE.ADDRESS_UPDATED_SUCCESSFULLY, { address: updatedAddress });
};

// Remove Address
addressController.removeAddress = async(payload) => {
    const { userId ,addressId } = payload;
    const removedAddress = await addressService.removeAddressFromDb(addressId);
    if (!removedAddress) {
        return createErrorResponse(RESPONSE_MESSAGE.ADDRESS_NOT_FOUND, ERROR_TYPES.DATA_NOT_FOUND);
    }
    return createSuccessResponse(RESPONSE_MESSAGE.ADDRESS_DELETED_SUCCESSFULLY);
};

// Get All User Addresses
addressController.getAllUserAddresses = async(payload) => {
    const { userId } = payload;
    const addresses = await addressService.getAllUserAddressesFromDb(userId);
    if (!addresses.length) {
        return createErrorResponse(RESPONSE_MESSAGE.NO_ADDRESS_FOUND, ERROR_TYPES.DATA_NOT_FOUND);
    }
    return createSuccessResponse(RESPONSE_MESSAGE.ADDRESSES_FETCHED_SUCCESSFULLY, { addresses });
};

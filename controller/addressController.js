
import { addressService } from "../services/addressService.js";



export const  addressController = {} ;



addressController.addAddress = async (payload) =>{
    // let { userId , recepientName , mobileNumber , street , landMark , city , state , postalCode , country , addressType } = payload ;  
    let { userId , ...addressDetails } = payload ;  
    const addNewAddress = await addressService.addAddressToDb( addressDetails ) ;
    if( ! addNewAddress.success ) return { statusCode : 400 , data : { message : addNewAddress.message } } ;
    const response = {
        message : addNewAddress.message ,
        userId : userId ,
    }
    return { statusCode : 201 , data : response } ;
}


addressController.getAddress = async (payload) =>{
    let { userId , addressId} = payload ; 
    const getUserAddress = await addressService.getAddressToDb( userId , addressId ) ;
    if( ! getUserAddress.success ) return { statusCode : 400 , data : { message : getUserAddress.message } } ;
    const response = {
        message : getUserAddress.message ,
        userId : userId ,
    }
    return { statusCode : 201 , data : response } ;
}




addressController.updateAddress = async (payload) =>{
    // let { addressId , userId , recepientName , mobileNumber , street , landMark , city , state , postalCode , country , addressType } = payload ;  
    let { userId , ...updateAddressDetails } = payload ;  
    const updateUserAddress = await addressService.updateAddressToDb(updateAddressDetails ) ;
    if( ! updateUserAddress.success ) return { statusCode : 400 , data : { message : updateUserAddress.message } } ;
    const response = {
        message : updateUserAddress.message ,
        userId : userId ,
    }
    return { statusCode : 200 , data : response } ;
}




addressController.removeAddress = async (payload) =>{
    let { addressId } = payload ;  
    const removeUserAddress = await addressService.removeAddressFromDb(addressId ) ;
    if( ! removeUserAddress.success ) return { statusCode : 400 , data : { message : removeUserAddress.message } } ;
    const response = {
        message : removeUserAddress.message ,
        userId : userId ,
    }
    return { statusCode : 200 , data : response } ;
}



addressController.getAllUserAddresses = async (payload) =>{
    let { userId } = payload ;  
    const userAddresses = await addressService.getAllUserAddressesFromDb(userId ) ;
    if( ! userAddresses.success ) return { statusCode : 400 , data : { message : userAddresses.message } } ;
    const response = {
        message : userAddresses.message ,
        userId : userId ,
        allUserAddress : userAddresses.data ,
    }
    return { statusCode : 200 , data : response } ;
}






















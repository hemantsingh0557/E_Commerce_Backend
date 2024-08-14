

import { userModel } from "../models/userModel.js"




export const findUserInDB = async(email , mobileNumber ) => {
    let user = await userModel.findOne({ $or : [ {email : email } , {mobileNumber :mobileNumber} ] }) ;
    return user ;  
}


export const saveUser = async (userDetailsObject) => {
    const userDetails = new userModel(userDetailsObject);
    return await userDetails.save(); 
}

























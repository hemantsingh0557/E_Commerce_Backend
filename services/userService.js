

import { userModel } from "../models/userModel.js"


const userService = {} ;

userService.findUserInDB = async( email , mobileNumber ) => {
    let user = await userModel.findOne({ $or : [ {email : email } , {mobileNumber :mobileNumber} ] }) ;
    return user ;  
}


userService.saveUser = async (userDetailsObject) => {
    const userDetails = new userModel(userDetailsObject);
    return await userDetails.save(); 
}

userService.verfiyUser = async (userId) => {
    await userModel.findOneAndUpdate( { _id: userId }, { isOtpVerified: true }, { new: true } );
}



export {userService} ;


























import { userModel } from "../models/userModel.js"
import { RESPONSE_MESSAGE } from "../utils/constants.js";


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



userService.resetPasswordInDb = async (userId, hashedPassword) => {
    try 
    {
        const user = await userModel.findById(userId);
        if (!user) return { success: false, message: RESPONSE_MESSAGE.USER_NOT_EXIST };
        user.password = hashedPassword;
        await user.save();
        return { success: true, message: RESPONSE_MESSAGE.PASSWORD_RESET  };
    } 
    catch (error) 
    {
        return { success: false, message: error.message };
    }
};


export {userService} ;
























import { otpService } from "../services/otpService.js";
import { findUserInDB } from "../services/userService.js";
import { RESPONSE_MESSAGE } from "../utils/constants.js";





const otpController = {} ;




otpController.sentOtp = async (payload) => {
    let { email , mobileNumber } = payload ; 
    const user = await findUserInDB(email , mobileNumber ); 
    if( ! user )  return { statusCode : 400 , data: { message : RESPONSE_MESSAGE.USER_NOT_EXIST  } } ;
    const sentOtp = await otpService.sendOtp(user._id , email, mobileNumber); 
    if (!sentOtp.success) return { statusCode: 500, data: { message: sentOtp.message } };
    const response = {
        message : sentOtp.message ,
    }
    return {
        statusCode: 200,
        data : response ,
    };
}

otpController.varifyOtp = async (payload) => {
    let { email , mobileNumber , enteredOtp } = payload ; 
    const user = await findUserInDB(email , mobileNumber ); 
    if( ! user )  return { statusCode : 400 , data: { message : RESPONSE_MESSAGE.USER_NOT_EXIST  } } ;
    const varifyOtp = otpService.verifyOtp( user._id , enteredOtp ) ;
    if (!varifyOtp.success) return { statusCode: 400, data: { message: varifyOtp.message } };
    const jwtPayloadObject = { _id: user._id, email : user.email, mobileNumber : user.mobileNumber };
    const token = generateJWTAccessToken(jwtPayloadObject) ;
    const response = {
        message : sentOtp.message ,
        token
    }
    return {
        statusCode: 200,
        data : response ,
    };
}




export {otpController} ;






















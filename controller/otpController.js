import { otpService } from "../services/otpService.js";
import { userService } from "../services/userService.js";
import { RESPONSE_MESSAGE } from "../utils/constants.js";
import { generateJWTAccessToken } from "../utils/helperFunctions.js";





const otpController = {} ;




otpController.sentOtp = async (payload) => {
    let { userId , email , mobileNumber } = payload ; 
    // console.log( payload  )
    // console.log(  userId , email , mobileNumber )
    // const user = await userService.findUserInDB(email , mobileNumber ); 
    // if( ! user )  return { statusCode : 400 , data: { message : RESPONSE_MESSAGE.USER_NOT_EXIST  } } ;
    const sentOtp = await otpService.sendOtp( userId , email, mobileNumber); 
    if (!sentOtp.success) return { statusCode: 500, data: { message: sentOtp.message } };
    const response = {
        message : sentOtp.message ,
        userId 
    }
    return {
        statusCode: 200,
        data : response ,
    };
}

otpController.verifyOtp = async (payload) => {
    let { userId , enteredOtp } = payload ; 
    // const user = await userService.findUserInDB( userId ); 
    // if( ! user )  return { statusCode : 400 , data: { message : RESPONSE_MESSAGE.USER_NOT_EXIST  } } ;
    const varifyOtp = await otpService.verifyOtp( userId , enteredOtp ) ;
    // if (!varifyOtp.success) return { statusCode: 400, data: { message: varifyOtp.message } };
    // const jwtPayloadObject = { _id: user._id, email : user.email, mobileNumber : user.mobileNumber };
    const jwtPayloadObject = { userId : userId };
    const token = generateJWTAccessToken(jwtPayloadObject) ;
    const response = {
        message : varifyOtp.message ,
        userId ,
        token
    }
    return {
        statusCode: 200,
        data : response ,
    };
}




export {otpController} ;






















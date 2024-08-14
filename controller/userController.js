import { userService } from "../services/userService.js";
import bcrypt from 'bcrypt' ;
import { otpService } from "../services/otpService.js";
import { generateJWTAccessToken, generateOtp } from "../utils/helperFunctions.js";
import { OTP_MESSAGE, RESPONSE_MESSAGE, SALT_ROUNDS } from "../utils/constants.js";


const userController = { } ;
 
       
userController.userSignUp = async (payload) => {
    let { name, age, email, mobileNumber, password } = payload;
    email = email.toLowerCase();
    const existingUser = await userService.findUserInDB(email, mobileNumber);
    if (existingUser) return { statusCode : 409 , data: { message : RESPONSE_MESSAGE.USER_EXIST , } } ;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUserDetails = {
        name: name,
        age: age, 
        email: email,
        mobileNumber: mobileNumber,
        password: hashedPassword,
        isOtpVerified: false
    };
    const savedUserObj = await userService.saveUser(newUserDetails);
    const response = {
        message : RESPONSE_MESSAGE.SIGNED_UP ,
        userDetails : savedUserObj
    }
    return {
        statusCode: 201,
        data : response ,
    };
};
            

    
userController.userSignIn = async (payload) => {
    let { email , password , mobileNumber } = payload ;
    if(email) email = email.toLowerCase() ; 
    const user = await userService.findUserInDB(email , mobileNumber ); 
    if( ! user )  return { statusCode : 400 , data: { message : RESPONSE_MESSAGE.USER_NOT_EXIST  } } ;
    if( email )
    {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return { statusCode : 400 , data: { message : RESPONSE_MESSAGE.PASSWORD_MISMATCH  } } ;
    }
    if (!user.isOtpVerified || mobileNumber ) 
    {
        return { 
            statusCode : 403 , 
            data :{
                message : RESPONSE_MESSAGE.VARIFY_OTP ,
                user : { email , mobileNumber } 
            }
        } ;
    }
    const jwtPayloadObject = { userId : user._id , userRole : user.userRole };
    const token = generateJWTAccessToken(jwtPayloadObject) ;
    const response = {
        message :  RESPONSE_MESSAGE.SIGNED_IN ,
        userDetails : user ,
        token : token 
    }
    return { 
        statusCode: 200,
        data : response ,
    };
};


    
userController.sendOtpForPasswordReset = async (payload) => {
    let { email , mobileNumber } = payload ;
    if(email) email = email.toLowerCase() ; 
    const user = await userService.findUserInDB(email , mobileNumber ); 
    if( ! user )  return { statusCode : 400 , data: { message : RESPONSE_MESSAGE.USER_NOT_EXIST  } } ;
    // const otp = generateOtp();
    // await otpService.sendOtp(email, otp);
    // return res.status(200).json({ message: 'OTP sent to your email.' });
    const response = { message :  OTP_MESSAGE.OTP_SENT , userId : user._id }
    return { statusCode: 200, data : response  };
};


userController.resetPassword = async (payload) => {
    const { userId , newPassword } = payload;
    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
    const resetResult = await userService.resetPasswordInDb(userId, hashedPassword);
    if (!resetResult.success) return { statusCode : 400 , data: { message : resetResult.message  } }
    const response = { message :  resetResult.message , userId } ;
    return { statusCode: 200, data : response  };
};



export {userController} ; 

















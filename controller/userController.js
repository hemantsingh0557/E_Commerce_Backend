import { userService } from "../services/userService.js";
import bcrypt from 'bcrypt' ;
import { otpService } from "../services/otpService.js";
import { generateJWTAccessToken, generateOtp } from "../utils/helperFunctions.js";
import { RESPONSE_MESSAGE } from "../utils/constants.js";

const saltRounds = 10 ;

const userController = { } ;
 
       
userController.userSignUp = async (payload) => {
    let { name, age, email, mobileNumber, password } = payload;
    email = email.toLowerCase();
    const existingUser = await userService.findUserInDB(email, mobileNumber);
    if (existingUser) return { statusCode : 409 , data: { message : RESPONSE_MESSAGE.USER_EXIST , } } ;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
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





export {userController} ; 


















import { findUserInDB, saveUser } from "../services/userService.js";
import bcrypt from 'bcrypt' ;
import { otpService } from "../services/otpService.js";
import { generateJWTAccessToken, generateOtp } from "../utils/helperFunctions.js";
import { RESPONSE_MESSAGE } from "../utils/constants.js";

const saltRounds = 10 ;

const userController = { } ;
 
       
userController.userSignUp = async (payload) => {
    let { name, age, email, mobileNumber, password } = payload;
    email = email.toLowerCase();
    const existingUser = await findUserInDB(email, mobileNumber);
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
    const savedUserObj = await saveUser(newUserDetails);
    // const otp = generateOtp();
    // const otpSent = await otpService.sendOtp(email, mobileNumber, otp);
    // if (!otpSent) return res.status(500).json({ message: "Failed to send OTP. Please try again." });
    // const otpObject = { userId: savedUserObj._id, userOtp: otp };
    // await otpService.saveOtpForUser(otpObject);
    const response = {
        message : RESPONSE_MESSAGE.SIGNED_UP ,
        userDetails : savedUserObj
    }
    return {
        statusCode: 201,
        data : response ,
        // success: true,
        // message: "New user signed up successfully. Now please verify your OTP.",
        // user: newUserDetails ,
    };
    // res.status(201).json({
    //     statusCode: 201,
    //     data : response ,
    //     // success: true,
    //     // message: "New user signed up successfully. Now please verify your OTP.",
    //     // user: newUserDetails ,
    // });
};
            

    
userController.userSignIn = async (payload) => {
    console.log( "okook   " ,  payload ) ;
    let { email , password , mobileNumber } = payload ;
    if(email) email = email.toLowerCase() ; 
    const user = await findUserInDB(email , mobileNumber ); 
    if( ! user )  return { statusCode : 400 , data: { message : RESPONSE_MESSAGE.USER_NOT_EXIST  } } ;
    if( email )
    {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return { statusCode : 400 , data: { message : RESPONSE_MESSAGE.PASSWORD_MISMATCH  } } ;
    }
    if (!user.isOtpVerified) 
    {
        // const otp = generateOtp();
        // const otpSent = await otpService.sendOtp(email, mobileNumber, otp);
        // if (!otpSent) return res.status(500).json({ message: "Failed to send OTP. Please try again." });
        // const otpObject = { userId: user._id, userOtp: otp }; 
        // await otpService.saveOtpForUser(otpObject);
        return { 
            statusCode : 403 , 
            data :{
                message : RESPONSE_MESSAGE.VARIFY_OTP ,
                user : { email , mobileNumber } 
            }
        } ;
    }
    const jwtPayloadObject = { _id: user._id, email : user.email , mobileNumber : user.mobileNumber };
    const token = generateJWTAccessToken(jwtPayloadObject) ;
    const response = {
        message :  RESPONSE_MESSAGE.SIGNED_IN ,
        userDetails : user ,
        token : token 
    }
    res.status(200).json({
        statusCode: 200,
        data : response ,
        // success: true,
        // message: "User signed in successfully",
        // token, 
        // user
    });
};




// userController.userSignUp = async (req, res) => {
//     let { name, age, email, mobileNumber, password } = req.body;
//     email = email.toLowerCase();
//     const existingUser = await findUserInDB(email, mobileNumber);
//     if (existingUser) return res.status(400).json({ message: "Email or mobile number already exists" });
//     const hashedPassword = await bcrypt.hash(password, saltRounds);
//     const newUserDetails = {
//         name: name,
//         age: age,
//         email: email,
//         mobileNumber: mobileNumber,
//         password: hashedPassword,
//         isOtpVerified: false
//     };
//     const savedUserObj = await savedUser(newUserDetails);
//     // const otp = generateOtp();
//     // const otpSent = await otpService.sendOtp(email, mobileNumber, otp);
//     // if (!otpSent) return res.status(500).json({ message: "Failed to send OTP. Please try again." });
//     // const otpObject = { userId: savedUserObj._id, userOtp: otp };
//     // await otpService.saveOtpForUser(otpObject);
//     res.status(201).json({
//         status: 201,
//         success: true,
//         message: "New user signed up successfully. Please verify your OTP.",
//         user: newUserDetails ,
//     });
// };


// userController.userSignIn = async(req , res) => {
//     let { email , password , mobileNumber } = req.body ;
//     email = email.toLowerCase() ; 
//     const user = await findUserInDB(email , mobileNumber ); 
//     if( ! user )  return res.status(400).json({ message: "User does not exist " });
//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) return res.status(401).json({ message: "Unauthorized access" });
//     if (!user.isOtpVerified) 
//     {
//         const otp = generateOtp();
//         const otpSent = await otpService.sendOtp(email, mobileNumber, otp);
//         if (!otpSent) return res.status(500).json({ message: "Failed to send OTP. Please try again." });
//         const otpObject = { userId: user._id, userOtp: otp }; 
//         await otpService.saveOtpForUser(otpObject);
//         return res.status(403).json({ message: "Please verify your OTP" });
//     }
//     const jwtPayloadObject = { _id: user._id, email, mobileNumber };
//     const token = generateJWTAccessToken(jwtPayloadObject) ;
//     res.status(200).json({
//         status: 200,
//         success: true,
//         message: "User signed in successfully",
//         token, 
//         user
//     });
// }





export {userController} ; 


















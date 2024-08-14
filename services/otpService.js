import mongoose from "mongoose";
import { otpModel } from "../models/otpModel.js";
import { OTP_MESSAGE } from "../utils/constants.js";
import { generateOtp, sendEmail } from "../utils/helperFunctions.js";
import { userService } from "./userService.js";



const otpService = {} ;


otpService.saveOtpForUser = async (otpObject) => {
    const userOtpObj = new otpModel(otpObject);
    // console.log( await userOtpObj.save() )
    await userOtpObj.save()  ;
    
};



otpService.getUserOtp = async (userId) => {
    const userOtpObj = await otpModel.findOne({userId}) ;
    // console.log( userOtpObj )
    return userOtpObj ;
};


otpService.clearUserOtpObject = async (id) => {
    console.log( id )
    await otpModel.findOneAndDelete({ _id: id });
};





otpService.sendOtp = async(userId , email , mobileNumber ) => {
    const response = { success: true, message: OTP_MESSAGE.OTP_SENT };
    const otp = generateOtp(); // Generate a 6-digit OTP in string format
    if (email) 
    {
        try
        {
            await sendEmail({
                to: email,
                subject: 'Your OTP',
                message: `<p>Your OTP is: <strong>${otp}</strong></p>`,
            });
        } 
        catch (error) 
        {
            response.success = false;
            response.message = OTP_MESSAGE.FAILED_EMAIL_OTP ;
        }
    }

    // Sending OTP via mobile number
    // if (mobileNumber) 
    // {
    //     try 
    //     {
    //         await sendSms(mobileNumber, `Your OTP code is ${otp}. It will expire in 3 minutes.`);
    //     } 
    //     catch (error) 
    //     {
    //         console.error('Error sending SMS:', error);
    //         response.success = false;
    //         response.message = OTP_MESSAGE.FAILED_MOBILE_NUMBER_OTP;
    //     }
    // }
    // if (!response.success) response.message = 'Failed to send OTP via email and mobile number';
    if (response.success) 
    {
        try 
        {
            // console.log( userId , " okok " ,  otp ) ;
            await otpService.saveOtpForUser({ userId : userId,  userOtp : otp }); // Save OTP(string format) with userId
        } 
        catch (error) 
        {
            response.success = false;
            response.message = OTP_MESSAGE.FAILED_SAVE_OTP;
        }
    }
    return response;
}


otpService.verifyOtp = async(userId , enteredOtp ) => {
    const response = { success: true, message: OTP_MESSAGE.VERIFEID_OTP };
    const otpInDb = await otpService.getUserOtp(userId) ;
    if( !otpInDb ) return { success : false , message : OTP_MESSAGE.EXPIRED_OTP } ;
    console.log( otpInDb.userOtp , enteredOtp ) ;
    if( otpInDb.userOtp != enteredOtp ) return { success : false , message : OTP_MESSAGE.INVALID_OTP } ;
    console.log( typeof otpInDb.userOtp , typeof enteredOtp ) ;
    await userService.verfiyUser(userId);
    await otpService.clearUserOtpObject(otpInDb._id);
    return response;
}



export {otpService} ;














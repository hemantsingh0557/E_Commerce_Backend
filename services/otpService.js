import { otpModel } from "../models/otpModel.js";
import { OTP_MESSAGE } from "../utils/constants.js";
import { generateOtp, sendEmail } from "../utils/helperFunctions.js";



const otpService = {} ;


otpService.saveOtpForUser = async (otpObject) => {
    const userOtpObj = new otpModel(otpObject);
    await userOtpObj.save();
};



otpService.getUserOtp = async (userId) => {
    const userOtpObj = await otpModel.findOne({userId}) ;
    return userOtpObj.userOtp ;
};


otpService.clearUserOtp = async (userId) => {
    otpModel.findOneAndDelete({userId}) ;
};





otpService.sendOtp = async(userId , email , mobileNumber ) => {
    const response = { success: true, message: OTP_MESSAGE.OTP_SENT };
    const otp = generateOtp(); // Generate a 6-digit OTP
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
            console.error('Error sending email:', error);
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
            await otpService.saveOtpForUser({ userId, otp }); // Save OTP with userId
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
    if( otpInDb != enteredOtp ) return { success : false , message : OTP_MESSAGE.INVALID_OTP } ;
    await otpService.clearUserOtp(user._id);
    return response ;
}



export {otpService} ;














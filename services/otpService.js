import { otpModel } from "../models/otpModel.js";
import nodemailer from 'nodemailer' ;



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





otpService.sendOtp = async(email , mobileNumber , otp ) => {
    const response = { success: true, message: 'OTP sent successfully' };
    if (email) {
        const transporter = nodemailer.createTransport({
            service: 'yopmail', // Use your email service
            auth: {
                user: 'heamntsingh@yopmail.com', // Your email
                // pass: 'your-email-password' // Your email password
            }
        });
        const mailOptions = {
            from: 'heamntsingh@yopmail.com',
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}. It will expire in 3 minutes.`
        };
        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error sending email:', error);
            response.success = false;
            response.message = 'Failed to send OTP via email';
        }
    }
    // if (mobileNumber) {
    //     await sendSms(mobileNumber, `Your OTP code is ${otp}. It will expire in 3 minutes.`);
    // }
    return response;
}


otpService.verifyOtp = async(email , mobileNumber , otp ) => {

}



export {otpService} ;














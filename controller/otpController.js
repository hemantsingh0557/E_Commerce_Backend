import { otpService } from "../services/otpService.js";
import { findUserInDB } from "../services/userService.js";





const otpController = {} ;




otpController.varifyOtp = async (req , res) => {
    let { email , mobileNumber , enteredOtp } = req.body ; 
    const user = await findUserInDB(email , mobileNumber ); 
    if( ! user )  return res.status(400).json({ message: "User does not exist " });
    const otpInDb = otpService.getUserOtp(user._id) ;
    if( !otpInDb ) return res.status(401).json({ message: "OTP is expired or not found. Please try to resend the OTP" });
    if( otpInDb != enteredOtp ) res.status(401).json({ message: "Invalid OTP. Please enter the correct OTP" });
    await otpService.clearUserOtp(user._id);
    const jwtPayloadObject = { _id: user._id, email : user.email, mobileNumber : user.mobileNumber };
    const token = generateJWTAccessToken(jwtPayloadObject) ;
    res.status(200).json({
        status: 200,
        success: true,
        message: "User signed in successfully",
        token, 
        user
    });
}




export {otpController} ;






















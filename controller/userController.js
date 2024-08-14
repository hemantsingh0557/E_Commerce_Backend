import { findUserInDB, savedUser } from "../services/userService.js";
import bcrypt from 'bcrypt' ;
import { otpService } from "../services/otpService.js";
import { generateJWTAccessToken, generateOtp } from "../utils/helperFunctions.js";

const saltRounds = 10 ;

const userController = { } ;


// const registerUser = async (payload) => {
//     let { name, age, email, mobileNumber, password } = payload;
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
//     const otp = generateOtp();
//     const otpSent = await otpService.sendOtp(email, mobileNumber, otp);
//     if (!otpSent) return res.status(500).json({ message: "Failed to send OTP. Please try again." });
//     const otpObject = { userId: savedUserObj._id, userOtp: otp };
//     await otpService.saveOtpForUser(otpObject);
//     res.status(201).json({
//         status: 201,
//         success: true,
//         message: "New user signed up successfully. Please verify your OTP.",
//         user: newUserDetails ,
//     });



//     const userExist = await userModel.findOne({
//       username: username,
//       email: email,
//     });
//     if (userExist && userExist.isVerified) {
//       return {
//         statusCode: 409,
//         data: RESPONSE_MSGS.USER_EXIST,
//       };
//     } else if (userExist && !userExist.isVerified) {
//       return {
//         statusCode: 421,
//         data: {
//           message: RESPONSE_MSGS.VERIFY_EMAIL,
//           email: userExist.email,
//         },
//       };
//     }
  
//     const salt = bcrypt.genSaltSync(BCRYPT.SALT_ROUNDS);
  
//     const objToSaveToDb = {
//       name: name,
//       username: username,
//       password: bcrypt.hashSync(password, salt),
//       email: email,
//       profilePicture: file.path,
//     };
  
//     const registerUserM = await userModel.create(objToSaveToDb);
  
//     const response = {
//       message: "User Added Successfully",
//       userDetails: registerUserM,
//       userId: registerUserM._id,
//     };
  
//     return {
//       statusCode: 201,
//       data: response,
//     };
// };





userController.userSignUp = async (req, res) => {
    let { name, age, email, mobileNumber, password } = req.body;
    email = email.toLowerCase();
    const existingUser = await findUserInDB(email, mobileNumber);
    if (existingUser) return res.status(400).json({ message: "Email or mobile number already exists" });
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUserDetails = {
        name: name,
        age: age,
        email: email,
        mobileNumber: mobileNumber,
        password: hashedPassword,
        isOtpVerified: false
    };
    const savedUserObj = await savedUser(newUserDetails);
    const otp = generateOtp();
    // const otpSent = await otpService.sendOtp(email, mobileNumber, otp);
    // if (!otpSent) return res.status(500).json({ message: "Failed to send OTP. Please try again." });
    const otpObject = { userId: savedUserObj._id, userOtp: otp };
    await otpService.saveOtpForUser(otpObject);
    res.status(201).json({
        status: 201,
        success: true,
        message: "New user signed up successfully. Please verify your OTP.",
        user: newUserDetails ,
    });
};


userController.userSignIn = async(req , res) => {
    let { email , password , mobileNumber } = req.body ;
    email = email.toLowerCase() ; 
    const user = await findUserInDB(email , mobileNumber ); 
    if( ! user )  return res.status(400).json({ message: "User does not exist " });
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ message: "Unauthorized access" });
    if (!user.isOtpVerified) 
    {
        const otp = generateOtp();
        const otpSent = await otpService.sendOtp(email, mobileNumber, otp);
        if (!otpSent) return res.status(500).json({ message: "Failed to send OTP. Please try again." });
        const otpObject = { userId: user._id, userOtp: otp }; 
        await otpService.saveOtpForUser(otpObject);
        return res.status(403).json({ message: "Please verify your OTP" });
    }
    const jwtPayloadObject = { _id: user._id, email, mobileNumber };
    const token = generateJWTAccessToken(jwtPayloadObject) ;
    res.status(200).json({
        status: 200,
        success: true,
        message: "User signed in successfully",
        token, 
        user
    });
}





export {userController} ; 


















import { checkUserExists } from "../services/userService.js";
import bcrypt from 'bcrypt' ;


const saltRounds = 10 ;

const userController = { } ;



userController.userSignUp = async(req , res) => {
    let {name , age , email , mobileNumber , password , confirmPassword } = req.body ;
    email = email.toLowerCase() ; 
    const checkEmailExists = await checkUserExists(email); 
    if( checkEmailExists )  return res.status(400).json({ message: "Email already exists" });
    const hashedPassword = await bcrypt.hash(password , saltRounds ) ; 
    const userDetails = {
        name : name ,
        age : age ,
        email : email ,
        mobileNumber : mobileNumber ,
        password : hashedPassword ,
    }
    await singedUpUser(userDetails)
    // const jwtPlayloadObject = { email , mobileNumber } ;
    res.status(201).json({
        status: 201,
        success: true,
        message: "New user sing up successfully",
        user: userDetails,
        // token: jwtToken
    });
}



userController.userSignIn = async(req , res) => {

}





export {userController} ; 


















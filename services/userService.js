import { userModel } from "../models/userModel.js"







export const checkUserExists = async(email) => {
    let user = await userModel.findOne({email}) ;
    if( user ) return true ;
    return false ;  
}


export const singedUpUser = async(userDetailsObject ) => {
    const userDetails = new userModel(userDetailsObject) ;
    await userModel.Save() ;
}



























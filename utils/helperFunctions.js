

import jwt from 'jsonwebtoken' ; 



const  TOKEN_SECRET = process.env.TOKEN_SECRET ; 


export const generateJWTAccessToken = (jwtPayloadObject)  => {
    return jwt.sign(jwtPayloadObject, TOKEN_SECRET , { algorithm: 'HS256' , expiresIn: '300s' });
}


export const validateRequest = (schema) => {
    return (req , res , next ) => {
        if (schema.params) {
            const { error } = schema.params.validate(req.params, { abortEarly: false });
            if (error) {
                return res.status(400).json({
                    error: error.details.map(err => err.message),
                });
            }
        }
        if (schema.body) {
            const { error } = schema.body.validate(req.body, { abortEarly: false });
            if (error) {
                return res.status(400).json({
                    error: error.details.map(err => err.message),
                });
            }
        }
        next();
    }
}





export const generateOtp = () => {
    return Math.floor( 100000 + Math.random() * 900000 ).toString() ;
}


























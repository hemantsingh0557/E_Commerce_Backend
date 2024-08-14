

import jwt from 'jsonwebtoken' ; 
import nodeMailer from 'nodemailer' ;
import dotenv from 'dotenv' ;

dotenv.config() ;

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


export const sendEmail = async (options) => {
    try {
        const transporter = nodeMailer.createTransport({
            host: process.env.SMPT_HOST,
            port: process.env.SMPT_PORT,
            secure: true, // Use SSL for port 465
            auth: {
                user: process.env.SMPT_MAIL,
                pass: process.env.SMPT_APP_PASS,
            },
            authMethod: 'LOGIN', // Specify the authentication method
        });

        const mailOptions = {
            from: process.env.SMPT_MAIL,
            to: options.to,
            subject: options.subject,
            html: options.message,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw error; // Rethrow if you want to handle it further up the chain
    }
};






















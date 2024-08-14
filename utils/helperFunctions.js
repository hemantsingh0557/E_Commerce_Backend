

import jwt from 'jsonwebtoken' ; 
import nodeMailer from 'nodemailer' ;
import dotenv from 'dotenv' ;
import { v4 as uuidv4 } from 'uuid';


dotenv.config() ;

const  TOKEN_SECRET = process.env.TOKEN_SECRET ; 


export function generateSessionId() {
    return uuidv4();
}


export function generateOrderNumber() 
{
    const timestamp = new Date().getTime(); 
    const randomPart = Math.floor(Math.random() * 10000); 
    return `${timestamp}-${randomPart}`;
}



export function calculateTotalAmount(lockedProducts) {
    return lockedProducts.reduce((total, product) => total + (product.price * product.quantity), 0);
}



export const generateJWTAccessToken = (jwtPayloadObject)  => {
    return jwt.sign(jwtPayloadObject, TOKEN_SECRET , { algorithm: 'HS256' , expiresIn: '600s' });
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
};


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






















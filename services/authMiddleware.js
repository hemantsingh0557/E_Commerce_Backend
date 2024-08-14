import jwt from "jsonwebtoken" ; 

export const authenticateToken = async(req , res ,next ) => {
    try {
        const token = await req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET );
        const { userId , userRole } = decodedToken;
        req.user = userId ;
        req.role = userRole ;
        next();
    } catch(error) {
        res.status(401).json({ error });
    }
};






export const authenticateToken = async (req , res ,next ) => {
    try
    {
        const token = await req.headers.authorization.split(" ")[1];
        const decodedToken = await jwt.verify(token, process.env.TOKEN_SECRET  );
        const {userId , userRole } = await decodedToken;
        req.user = userId ;
        req.role = userRole ;
        next();
    }
    catch(error)
    {
        res.status(401).json({ error: "Invalid request!" });
    }
}




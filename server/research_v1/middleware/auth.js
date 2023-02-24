import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


const { config } = dotenv;
config();

const verifyToken = (req, res, next)=>{
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization.split(" ")[1];

    if(! token ){
        return res.status(403).send("A Token is required fo Authentication");
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
        res.status(200);
    } catch (error) {
        return res.status(401).send("Invalid Token");
    }

    return next();
}

export default verifyToken;
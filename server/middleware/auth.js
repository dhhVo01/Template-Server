import jwt from "jsonwebtoken";


export default async function verifyToken(req, res, next){
    const token = await req.headers.authorization.split(" ")[1];
    if (!token)
    {
        return res.status(403).send("A token is required for authentication");
    }
    try
    {
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        req.user = decoded;
    }catch(err)
    {
        return res.status(401).send("Invalid Token");
    }
    return next();
}
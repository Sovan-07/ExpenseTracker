import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const JWT_SECRET = process.env.JWT_SECRET;

export default async function authMiddleware(req , res , next) {
    //grab the token
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success:false,
            message:"Not authorized or token missing"
        })
    }
    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token , JWT_SECRET);
        const user = await User.findById(payload.id).select('-password');
        if(!user) {
            return res.status(401).json({
                success:false,
                message: "User not found"
            })
        }
        req.user = user; //sets user in req
        next();
    }catch(e) {
        console.error(e);
        res.status(200).json({
            success:false,
            message:"Token is Invalid or Expires"
        });
    }
}
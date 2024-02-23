const jwt=require('jsonwebtoken')

const jwtSecret=process.env.JWT_SECRET
module.exports=(req,res,next)=>{
    const token=req.header('_auth')
    console.log(token)


    if(!token) return res.status(401).send('Access denied. No token provided')
    try{
const extractedToken=token.split(' ')[1]

        const decoded=jwt.verify(extractedToken,jwtSecret)
        req.user=decoded
        next()
    }
    catch(err){
        res.status(400).send('Invalid token')
    }
}
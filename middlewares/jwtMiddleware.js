const jwt = require('jsonwebtoken') 
const jwtMiddleware = (req,res,next)=>{
    console.log("inside middleware");
    const token = req.headers['authorization'].split(" ")[1] // get token
    console.log(token);
    if(token!=''){
        try {
            const jwtRespone = jwt.verify(token,process.env.JWTPASSWORD)
        console.log(jwtRespone);
        req.userId = jwtRespone.userId
        
        } catch (error) {
           res.status(401).json("Authorization failed..... token is missing")
            
        }
        

    }else
    {
        res.status(404).json("Authorization failed... Token is missing!!!!")
    }
    next()

    
}
module.exports = jwtMiddleware
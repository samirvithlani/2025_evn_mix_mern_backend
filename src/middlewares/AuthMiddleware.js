const jwt = require("jsonwebtoken")
const secret = "samir"

const authMiddleware = async(req,res,next)=>{
    //req.headers
    //we are creating Bearer token
    var token = req.headers.authorization
    console.log("token",token)
    if(token){
        //it should be beraer token
        if(token.startsWith("Bearer ")){

            //to verify remove Bearer from starts
            //Bearer kasmsaiohsusasljaslsaksal -->split with sapce -->["Bearer","token"]
            token = token.split(" ")[1]
            //verify tokrn using jwt
            try{
                const decoded = await jwt.verify(token,secret)
                console.log("decoded..",decoded) //{id:"asnsjaoisaassoin"}
                //userModel -->id --->findById --> data --->valid.. no --> not valid user
                next()

            }catch(err){
                res.status(401).json({
                    message:"invalid token",
                    err:err
                })
            }
        }
        else{
            res.status(401).json({
                message:"token is not bearer token"
            })
        }

    }else{
        res.status(401).json({
            message:"token is required"
        })
    }

}
module.exports = authMiddleware
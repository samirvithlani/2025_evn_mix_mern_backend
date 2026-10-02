
//schema = userValidationSchema  == zod
//schema = productValidationSchema == zod
const validationMiddleware = (schema)=>(req,res,next)=>{

    try{
        //{name,age.} = {name:"raj",age:23}
        schema.parse(req.body) //exceptoin throw
        next()
    }
    catch(err){
        res.json({
            err:err
        })
    }
}
module.exports = validationMiddleware
//user define function..

// app.get("/user",(req,res)=>{

//     res.json({message:"user fetched",data:user})
// })

const getUsers = (req,res)=>{
    
        //response send
        res.json({message:"user fetched"})
}

module.exports ={
    getUsers
}
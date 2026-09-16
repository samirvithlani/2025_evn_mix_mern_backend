//user define function..

// app.get("/user",(req,res)=>{

//     res.json({message:"user fetched",data:user})
// })

const userModel = require("../models/UserModel")

const getUsers = async(req,res)=>{
    
        //db.users.find()
        const users = await userModel.find() 

        //response send
        res.json({message:"user fetched",data:users})
}

const  getUserById = (req,res)=>{
    //id --> req ?
    const id = req.params.id;
    res.json({
        message:"user by id",
        data:id
    })
}

module.exports ={
    getUsers,
    getUserById
}
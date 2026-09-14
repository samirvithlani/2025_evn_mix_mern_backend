//user define function..

// app.get("/user",(req,res)=>{

//     res.json({message:"user fetched",data:user})
// })

const getUsers = (req,res)=>{
    
        //response send
        res.json({message:"user fetched"})
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
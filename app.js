const express = require("express")
//create ref varibale of express
const app = express()


//GET API
//localhost:3000/test
//request ,response

app.get("/test",(req,res)=>{
    console.log("test api called...")
    res.send("test api called...")
})

const user = {id:1,name:"amit",age:23}

//localhost:3000/user
app.get("/user",(req,res)=>{

    res.json({message:"user fetched",data:user})
})

const users =[
    {id:1,name:"raj",age:23},
    {id:2,name:"ram",age:25},
    {id:3,name:"shyam",age:22},
    {id:4,name:"amit",age:27},
]


//localhost:3000/users
app.get("/users",(req,res)=>{
    res.json({
        message:"users fetched",
        data:users
    })
})




const PORT = 3000

//server creation
app.listen(PORT,()=>{
    console.log(`server started on PORT ${PORT}`)
})
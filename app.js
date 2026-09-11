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


//localhost:3000/book/101
app.get("/book/:id",(req,res)=>{
    console.log("req.params",req.params)
    console.log("id",req.params.id)
    res.json({
        message:"ok",
        id:req.params.id
    })
})

//locahost:3000/book1/101/java
app.get("/book1/:id/:name",(req,res)=>{

    console.log("params",req.params)
    res.json({
        message:"ok",
        id:req.params.id,
        name:req.params.name
    })
})

const books = [
    {id:1,name:"java"},
    {id:2,name:"python"},
    {id:3,name:"c"},
    {id:4,name:"cpp"},
]

//localhost:3000/findbook/1
app.get("/findbook/:id",(req,res)=>{

    //loop --> find function
    const foundBook = books.find((b)=>b.id == req.params.id)
    if(foundBook){
        res.json({
            message:"book found",
            data:foundBook
        })
    }else{
        res.json({
            message:"book not found"
        })
    }

})

const students = [
    {id:1,name:"fenil",age:18},
    {id:2,name:"raj",age:19},
    {id:3,name:"parth",age:21},
    {id:4,name:"jay",age:23},
    {id:5,name:"ajay",age:20},
    
]

//localhost:3000/filtstudent/21
app.get("/filtstudent/:age",(req,res)=>{
    
    const age = req.params.age;
    //age>20
    const foundStudents = students.filter((stu)=>stu.age>age)
    //founstudents=[] ---> array
    if(foundStudents.length>0){
        res.json({
            message:"studentfound",
            data:foundStudents
        })
    }
    else{
        res.json({
            message:"student not found",
            
        })
    }

})



const PORT = 3000

//server creation
app.listen(PORT,()=>{
    console.log(`server started on PORT ${PORT}`)
})
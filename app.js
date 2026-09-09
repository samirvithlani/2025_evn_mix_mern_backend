const express = require("express")
//create ref varibale of express
const app = express()



const PORT = 3000

//server creation
app.listen(PORT,()=>{
    console.log(`server started on PORT ${PORT}`)
})
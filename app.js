const express = require("express")
//create ref varibale of express
const app = express()
app.use(express.json()) //applied global middleware wich will accept json data as well
const dbConnection = require("./src/utils/DBConnections")
dbConnection() // db connection...



//routes require
const userRoutes = require("./src/routes/UserRoutes")
//give it to server
app.use(userRoutes)


const PORT = 3000
//server creation
app.listen(PORT,()=>{
    console.log(`server started on PORT ${PORT}`)
})
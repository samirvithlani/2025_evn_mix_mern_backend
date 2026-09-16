const mongoose = require("mongoose")

//user define fnc

const dbConnection = ()=>{

    mongoose.connect("mongodb://127.0.0.1:27017/node_evn_2026").then(()=>{
        console.log("db connected..")
    }).catch((err)=>{
        console.log("error in db connection",err)
    })

}
module.exports = dbConnection
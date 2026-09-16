const mongoose = require("mongoose")
//schema class
const Scehma = mongoose.Schema

//creating an object of schema class
const userModel = new Scehma({
    //fileds..  POST...
})

//mongoose.model("users",userModel) --> connect user table with userModel object
//we can user userModel as users collection
//eg: db.users.find() -->
//userModel.find()

module.exports = mongoose.model("users",userModel)

//if users collection is not available in connected db it will create...
//-->use controller...
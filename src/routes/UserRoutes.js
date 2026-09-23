//router is part of express
//and for createing apis we need only router not full express module..
const router = require("express").Router()
const userController = require("../controllers/UserController")

// router.get("/users",(req,res)=>{
//     //but this function is created already in controller so just call it
// })


//localhost:3000/users
router.get("/users",userController.getUsers)
//localhost:3000/user/101
router.get("/user/:id",userController.getUserById)

//delete
//localhost:3000/user/qwuqwouiqwk0102
router.delete("/:id",userController.deleteUserById)
router.post("/user",userController.createUser)
router.put("/user/:id",userController.updateUser)
module.exports = router
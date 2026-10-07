//router is part of express
//and for createing apis we need only router not full express module..
const router = require("express").Router()
const userController = require("../controllers/UserController")
const demoMiddleware = require("../middlewares/DemoMiddleware")
const validationMiddleware = require("../middlewares/ZodMiddleware")
const userValidationSchema = require("../validationshemas/UserValidationSchema")
const uplaod = require("../middlewares/UploadMiddleware")

// router.get("/users",(req,res)=>{
//     //but this function is created already in controller so just call it
// })


//localhost:3000/users
router.get("/users",demoMiddleware("python"),userController.getUsers)
//localhost:3000/user/101
router.get("/user/:id",userController.getUserById)

//delete
//localhost:3000/user/qwuqwouiqwk0102
router.delete("/:id",userController.deleteUserById)
//router.post("/user",validationMiddleware(userValidationSchema),userController.createUser)
router.post("/user",uplaod.single("file"),userController.createUser)
router.post("/userm",uplaod.array("file",3),userController.createUsermultipuleimages)
router.put("/user/:id",userController.updateUser)
module.exports = router
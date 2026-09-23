//user define function..

// app.get("/user",(req,res)=>{

//     res.json({message:"user fetched",data:user})
// })

const userModel = require("../models/UserModel");

const getUsers = async (req, res) => {
  //db.users.find()
  const users = await userModel.find();

  //response send
  res.json({ message: "user fetched", data: users });
};

const getUserById = async (req, res) => {
  //id --> req ?
  //db.users.find({_id:"6aaa83e3b399a3b5eaada9e1"})
  //db.users.find({_id:req.params.id})
  //userModel.find({_id:req.params.id})
  //find function return type  -> []

  const foundUser = await userModel.findById(req.params.id);
  if (foundUser) {
    res.json({
      message: "user found",
      data: foundUser,
    });
  } else {
    res.json({
      message: "user not found",
    });
  }
};

const deleteUserById = async (req, res) => {
  //id --> req.params
  //db.users.deleteOne({_id:req.params.id})
  //userModel.deleteOne({_id:req.params.id})
  //mongoose
  //userModel.findByIdAndDelete(req.params.id)

  const deletedUser = await userModel.findByIdAndDelete(req.params.id);
  if (deletedUser) {
    res.json({
      message: "user deleted",
      data: deletedUser,
    });
  } else {
    res.json({
      message: "user not found to delete.",
    });
  }
};

// const createUser = async(req,res)=>{
//   //req.params
//   //req.query
//   //req.body --->

//   //db.users.insertOne({name:"amit",age:23,status:true})
//   //userModel.inserOne({name:"amit",age:23,status:true})
//   //userModel.insertOne(req.body)

//   const savedUser = await userModel.insertOne(req.body)

//   console.log("req.body",req.body)
//   res.json({
//     message:"user saved..",
//     data:savedUser
//   })

// }

const createUser = async (req, res) => {
  try {
    const savedUser = await userModel.insertOne(req.body);

    console.log("req.body", req.body);
    res.json({
      message: "user saved..",
      data: savedUser,
    });
    
  } catch (err) {
    res.json({
      message: "error while saving user",
      err: err,
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  deleteUserById,
  createUser,
};

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
  }
  else{
    res.json({
      message: "user not found",
      
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
};

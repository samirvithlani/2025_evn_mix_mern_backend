//user define function..

// app.get("/user",(req,res)=>{

//     res.json({message:"user fetched",data:user})
// })

const userModel = require("../models/UserModel");
const mailSend = require("../utils/MailUtil")
const roleModel = require("../models/RoleModel")
const uploadToCloud = require("../utils/UploadToCloud")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const secret = "samir"

const getUsers = async (req, res) => {
  //db.users.find()
  const users = await userModel.find().populate("roleId"); //check column name

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

// const createUser = async (req, res) => {
//   try {
//     const savedUser = await userModel.insertOne(req.body);
//     //mail..
//     await mailSend(savedUser.email,"welcome mail",`Hello ${savedUser?.name} welcome to app`)
//     console.log("req.body", req.body);
//     res.json({
//       message: "user saved..",
//       data: savedUser,
//     });
    
//   } catch (err) {
//     res.json({
//       message: "error while saving user",
//       err: err,
//     });
//   }
// };


//file upload create user.
const createUser = async (req, res) => {
  try {
    console.log("req.file...",req.file)
    //const savedUser = await userModel.insertOne(req.body);
    const cloudinaryResponse = await uploadToCloud(req.file.path)
    console.log("cloundinay response",cloudinaryResponse)
    //{.... secure_url}
    //const savedUser = await userModel.insertOne({...req.body,profilePath:req.file.path});

    const salt = bcrypt.genSaltSync(12)
    const hashedPassword = bcrypt.hashSync(req.body.password,salt)
    const savedUser = await userModel.insertOne({...req.body,profilePath:cloudinaryResponse.secure_url,password:hashedPassword});
    //mail..
    //await mailSend(savedUser.email,"welcome mail",`Hello ${savedUser?.name} welcome to app`)
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


//create user with multipule images...
const createUsermultipuleimages = async (req, res) => {
  try {
    console.log("req.files...",req.files)
    //const savedUser = await userModel.insertOne(req.body);
    
    //loop.. req.files.len
    //upload to cloudinary ..

    const cloudinaryResponseres = await Promise.all(req.files.map((f)=>uploadToCloud(f.path)))  //[]
    const allImages = cloudinaryResponseres.map((url)=>url.secure_url)
    console.log(allImages)
  
    
    const savedUser = await userModel.insertOne({...req.body,profilePath:req.files[0].path});
    //mail..
    //await mailSend(savedUser.email,"welcome mail",`Hello ${savedUser?.name} welcome to app`)
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

const updateUser  = async(req,res)=>{

  //req.params.id
  //req.body
    //db.user.updateOne({_id:req.params.id},{$set:{req.body}})

    try{

      //const userAfterUpdate = await userModel.findByIdAndUpdate(req.params.id,req.body)
      const userAfterUpdate = await userModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
      if(userAfterUpdate){
        res.json({
          message:"user updated.",
          data:userAfterUpdate
        })
      }
      else{
        res.json({
          message:"user not found to update"
        })
      }

    }catch(err){
      res.json({
        message:"error while updating user",
        err:err
      })
    }

}

const loginUser = async(req,res)=>{

  const email = req.body.email
  const password = req.body.password // plain password..

  //founduser from email

  const foundUserFromEmail = await userModel.findOne({email:email})
  if(foundUserFromEmail){
    //comare password usng bcrypt
    if(bcrypt.compareSync(password,foundUserFromEmail.password)){
      //token genration...
      //const token = jwt.sign(foundUserFromEmail.toObject(),secret)
      const token = jwt.sign({id:foundUserFromEmail._id},secret)
      res.status(200).json({
        message:"user found",
        //data:foundUserFromEmail
        data:token
      })

    }
    else{
      res.status(401).json({
        message:"invalid password"
      })
    }

  }
  else{
    res.status(404).json({
      message:"user not found signup first."
    })
  }


}


module.exports = {
  getUsers,
  getUserById,
  deleteUserById,
  createUser,
  updateUser,
  createUsermultipuleimages,
  loginUser
};

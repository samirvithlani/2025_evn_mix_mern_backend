// //non param middleware..
// const demoMiddleware = (req,res,next)=>{

//         console.log("middleware called...")
//         //next();
//         res.json({
//             message:"go back"
//         })
// }

// module.exports = demoMiddleware

//param middleware..
const demoMiddleware = (data) => (req, res, next) => {
  console.log("middleware called...");
  console.log("data...", data);
  if (data == "js") {
    next();
  } else {
    res.json({
      message: "go back",
    });
  }
};

module.exports = demoMiddleware;

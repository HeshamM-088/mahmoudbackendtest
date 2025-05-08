const userSchema = require("../models/userSchema");
const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken");

const register= async(req,res)=>{
    const {email,name,password}=req.body;
    if(!email||!name||!password){
     return res.status(500).json({
    status:500,
    data:{data:null,message:"invalid routessssss"},
    })
    
}
    const checkexist= await userSchema.findOne({email})
    if(checkexist){
        return res.status(409).json({
          status: 409,
          data: { data: null, message: "user exist" },
        });
    }
    
    const hashedpassword= await bcrypt.hash(password,8);

    const registeredUser= await userSchema({
        name,
        email,
        password:hashedpassword,
    })
    await registeredUser.save()

    return res.status(201).json({
        status:201,
        data:{
            data:null,
            message:"user created"
        }
    })

}

const login=async(req,res)=>{
    const { email,password } = req.body; //try to login
if (!email || !password) {
  return res.status(500).json({
    status: 500,
    data: { data: null, message: "invalid routes" },
  });
}
const loggedUser= await userSchema.findOne({email});

if (!loggedUser) {
  return res.status(400).json({
    status: 400,
    data: { data: null, message: "email is invalid" },
  });
} 

const matched= await bcrypt.compare(password,loggedUser.password)
    
//console.log(matched);

const token= jwt.sign({
    email,
    name:loggedUser.name,
    role:loggedUser.role,
    _id:loggedUser._id,
},process.env.secretKey)

 
 return res.status(200).json({
   status: 200,
   data: { data: token,
     message: "user logged successfully" },
 });
}



module.exports={
    register,
    login
}
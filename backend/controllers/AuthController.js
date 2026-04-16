const User = require("../models/user.model");
const bcrypt =require("bcryptjs");
const jwt = require("jsonwebtoken");

//  Generate the  JWT 

const Createtoken = (id ,role) =>{
    return jwt.sign({id ,role} , process.env.JWT_SECRET ,{
         expiresIn: "7d", 
    });
} 

// Register Account

const registerUser = async(req , res) =>{
    try{
        const{name ,email ,password ,role} = req.body ;

          // check empty fields
    if (!name || !email || !password) {
      throw new ApiError("All fields are required", 400);
    }

        // user check
        const CheckUser = await User.findOne({email}) ;
       if(CheckUser) {
        return res.status(400).json({
            message :"User Already exists" ,
        });
       }

       const hashedPassword =  await bcrypt.hash(password ,10) ;

       const user = await User.create({
        name ,
        email ,
        password :  hashedPassword ,
        role ,
       }) 
       res.status(201).json({
        message : "User registered successfully" ,
        token: Createtoken(user._id, user.role),
        user
       })
    } catch(error) {
        res.status(500).json({
             message: error.message,
        });
    }
};

const loginUser =  async(req ,res) =>{
    try{
        const{email ,password} = req.body ;
        const user = await User.findOne({email}); 
        
        if(!user){
            return res.status(400).json({
                message : "invalid User"
            });
        }
        const isMatch = await bcrypt.compare(password ,user.password);
        if(!isMatch){
            return res.status(400).json({
                 message: "Invalid password",
            });
        }
        res.status(200).json({
            message : "Login Successful" ,
            token: Createtoken(user._id, user.role),
           user
        })
    }catch(error){
         res.status(500).json({
         message: error.message,
    });  
    }
}

module.exports = {
    registerUser ,loginUser
}
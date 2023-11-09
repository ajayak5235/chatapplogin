const User = require('../model/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const postUser = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;
    const existingUser = await User.findOne({ where: { email: email } });

    if (existingUser) {
      res.json({ message: "User already exists!" });
    } else {
        bcrypt.hash(password, 10 ,async (err,hash) =>{
            console.log('err',err)
            await User.create({
                name: name,
                email: email,
                phone: phone,
                password: hash,
              });
              res.status(201).json({ message: "User signed up successfully!" });
        } )
      
    }
  } catch (err) {
    console.log(err);  
    res.status(500).json({ message: "Internal Server Error" });  // Fix: Added response status and message
  }
};


const loginUser = async (req,res,next) =>{
    try{
        const {email,password} = req.body;

         const user = await User.findOne({where: {email:email}});
        if(user){
            bcrypt.compare(password,user.password, (err,response)=>{
                if(err){
                    console.log("in login line 39")
                    res.status(500).json({message:"Something went wrong"})
                }
                if(response === true){
                    res.status(200).json({success:true,message:"Login Succefully"})
                }
            })
        } else {
            res.json({success:false,message:"password is incorrect"})
        }

    } catch(err){
        console.log(err);
    }
}




module.exports = {
    loginUser,
  postUser,
};

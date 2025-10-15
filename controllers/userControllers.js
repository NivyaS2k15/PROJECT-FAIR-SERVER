const users = require('../models/userModel')
const jwt = require('jsonwebtoken')

exports.registerController = async (req, res) => {
  console.log("inside the register controller")
  console.log(req.body)

  const { username, email, password } = req.body

  try {
    const existingUser = await users.findOne({ email })

    if (existingUser) {
        
      return res.status(406).json("Already existing user..please login!!!!")
    }

    const newUser = new users({
      username,
      email,
      password,
      github: '',
      linkedin: '',
      profilePic: ''
    })

    await newUser.save()
    return res.status(200).json(newUser)

  } catch (error) {
    console.error("Error in registerController:", error)
    return res.status(500).json({ error: "Internal Server Error" })
  }
}

exports.loginController = async (req,res)=>{
    console.log("inside the login controller");
    const {email,password} = req.body
    console.log(email,password);
    try {
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            const token = jwt.sign({userId:existingUser._id},process.env.JWTPASSWORD)
            res.status(200).json({user:existingUser,token})
        }else{
            res.status(404).json("incorrect Email/password")
        }
    } catch (error) {
        res.status(401).json(error)
    }
    
}


// profile creation

exports.editUserController = async(req,res)=>{
  console.log("edit user profile controller");
  const {username,email,password,github,linkedin,profilePic} = req.body
  const uploadProfilepic = req.file? req.file.filename :profilePic
  const userId = req.userId
  try {
    const updateuser = await users.findByIdAndUpdate({_id:userId},{
      username,email,password,github,linkedin,profilePic:uploadProfilepic
    },{new:true})
    await updateuser.save()
    res.status(200).json(updateuser)
  } catch (error) {
    res.status(401).json(error)
  }


  
  
}
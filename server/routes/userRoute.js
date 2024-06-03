const router = require("express").Router();
const bcrypt = require("bcrypt")
const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
const authMiddleware = require("../middleware/authMiddleware");



router.post('/register', async (req,res)=>{

    try {
        const userExists = await User.findOne({email:req.body.email})
        if (userExists){
            return res.send({
                success:false,
                message:"User with this email already exists"
            })
        }

        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password,salt);
        req.body.password = hashPassword;

        const newUser = new User(req.body);
        console.log(newUser);
        await newUser.save();
        res.send({
            success:true,
            message:"User registered, Now please login"
        })
    }catch(err){
       console.log(err) 
    }
})

router.post('/login', async (req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return res.send({
                success:false,
                message:"User with this email does not exists"
            })
        }

        const validPassword = await bcrypt.compare(req.body.password,user.password);

        if(!validPassword){
            return res.send({
                success:false,
                message:"Invalid Password"
            })
        }

        const token = jwt.sign({userId:user._id},process.env.jwt_secret_key,{expiresIn:"1d"});
        console.log(token)

        res.send({
            success:true,
            message:"User Logged In",
            token:token
        })

    }catch(err){
        console.log(err)
    }
})

router.get("/get-current-user",authMiddleware, async (req,res)=>{
    try {
        const user = await User.findById(req.body.userId).select('-password');
        console.log(user)
        res.send({
            success:true,
            message:"User details fetched",
            data:user
        })
    } catch (err) {
        res.send({
            success:false,
            message:err.message
        })
    }
})

module.exports = router;
const express = require("express")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const router = express.Router()

const createToken = require("../middleware/auth")
const Users = require('../models/userModel');

router.post("/", async (req,res)=>{
    const {username , password } = req.body

    const userInfo = await Users.findOne({username})
    if (!userInfo){
        return res.status(401).json({ message: 'Email sifre hatali' });
    }
    /*
    const comparePassword = await bcrypt.compare(password,userInfo.password)
    if (!comparePassword){
        return res.status(401).json({ message: 'Email sifre hatali' });
    }*/

    try {
    const user = await Users.findOne({ username: username });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const token = jwt.sign({username:username,password:password},process.env.SECRET_KEY,{
        algorithm:"HS256",
        expiresIn:"1d"
    })
    res.cookie("token",token, {maxAge : 5 * 60 * 1000 ,httpOnly : true,path:"/",secure:true},)
    res.json({
        success:true,
        token})
    } catch (error) {
    console.error('Error getting product by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
    }
    
})
module.exports = router
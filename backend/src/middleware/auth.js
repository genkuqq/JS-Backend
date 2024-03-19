const jwt = require('jsonwebtoken')

const createToken = async (user,res) => {
    console.log(user)
    const payload ={
        sub: user._id,
        name : user.name
    }
    const token = await jwt.sign(payload,process.env.SECRET_KEY,{
        algorithm : "HS256",
        expiresIn : "7d",

    })
    return res.status(201).json({
        success:true,
        token
    })
}

module.exports = {
    createToken
}
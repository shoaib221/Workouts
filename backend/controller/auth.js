

const { User } = require( "../models/auth.js" );
const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const validaor = require( "validator" );
const jwt = require("jsonwebtoken");
const { requireAuth } = require("./middlewire.js");


authRouter.get("/test",  ( req, res, next ) => {
    
    res.status(200).json({ "msg": "ok" });
    next();
} )

const createToken = (_id)  => {
    return jwt.sign( {_id}, process.env.SECRET, { expiresIn: "1d" }  );
}

async function hashy( pass ) {
    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash( pass, salt );
    return hashpass;
}


function checkEmail ( email )
{
    if(!validaor.isEmail(email))
        throw Error("This is not a valid email");
    return true;
}


const Register = async ( req, response, nect ) => {

    const {email, password} = req.body;

    try {

        const exist = await User.findOne({ username: email });
        if( exist ) throw Error("Email already exists");
        const hashedpassword = await hashy(password);
        const user = await User.create({ username: email, password: hashedpassword });
        const token = createToken(user._id);
        response.status(200).json({email, token});

    } catch (error) {

        response.status(400).json({error: error.message})
    } 
    
    nect();
}


const Login = async ( request, response, next ) => {
    const { email, password } = request.body;
    
    try {
        const user = await User.findOne({ username : email });
        if (!user) throw Error('Incorrect email');

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw Error('Incorrect password');

        const token = createToken(user._id);
        response.status(200).json({email, token});
    
        next();
    }
    catch (error) {
        response.status(400).json({error: error.message});
    }

}




authRouter.post( "/register", Register );
authRouter.post( "/login", Login);
authRouter.use(requireAuth);


module.exports = { authRouter };
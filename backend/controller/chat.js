

const { User } = require( "../models/auth.js" );
const express = require("express");
const chatRouter = express.Router();
const bcrypt = require("bcrypt");
const validaor = require( "validator" );
const jwt = require("jsonwebtoken");
const { requireAuth } = require("./middlewire.js");
const { oauth2Client } = require("../utils/googleClient.js");
const axios = require("axios");



const fetchMessage  = async ( req, res, next ) => {
    console.log("fetch message");
    res.status(200).json( "ok" );
}



chatRouter.use( requireAuth );
chatRouter.post( "/fetchmessage", fetchMessage)

module.exports = { chatRouter };
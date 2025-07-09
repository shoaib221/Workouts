//console.log("controller");


const express = require("express");
const chatRouter = express.Router();
const bcrypt = require("bcrypt");
const validaor = require( "validator" );
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { User } = require( "../models/auth.js" );
const { requireAuth } = require("./middlewire.js");
const { oauth2Client } = require("../utils/googleClient.js");
const { onlineUserMap, io, multer_upload }  = require("../utils/socket.js");
const { Message } = require("../models/chat.js");
const { cloudinary } = require("../utils/cloudinary.js");
const { use } = require("react");
const fetch = require("node-fetch")



//console.log( "controller", onlineUserMap);


const fetchMessage  = async ( req, res, next ) => {
	console.log("fetch message");


	try {
		const {receiver} = req.body;
		const sender = req.username;

		console.log( sender, receiver );
		const messages = await Message.find({
			$or: [
				{ receiver: receiver, sender: sender },
				{ receiver: sender, sender: receiver },
			],
		});

		//console.log(messages);

		res.status(200).json( messages );
		next();
	} catch (error) {
		res.status(400).json({ error: error.message  });
	}
}


const sendMessage = async ( req, res, next ) => {
	console.log( "send message" );
	//console.log(onlineUserMap)

	try {
		const { receiver, text } = req.body;

		const new_message = new Message({
			sender: req.username,
			receiver : receiver,
			text : text
		})
		
		const saved_message = await new_message.save();
		console.log("here", saved_message);
		
		const receiver_socket_id = onlineUserMap[receiver]

		console.log( "receiver", receiver_socket_id )
		
		if( receiver_socket_id ) io.to( receiver_socket_id ).emit( "newMessage", saved_message );
		res.status(200).json(saved_message)
		next();
	} catch (err) {
		console.log(err.message);
		res.status(400).json( {error: err.message} );
	}
}


const FetchUsers = async ( req, res, next ) => {

	try {
		const users = await User.find( { username: { $ne: req.username } } )
		let onlineUsers = Object.keys(onlineUserMap)
		onlineUsers = onlineUsers.filter( x => x !== req.username )
		res.status(200).json( { users, onlineUsers } )
		next()
	} catch (err) {
		res.status(400).json( { error: err.message } )
	}	
}


const UploadImageClodianry = async ( req, res, next ) => {
	console.log( "upload image" )
	try {

		
		const { image } = req.body;
		
		if(!image) throw Error( "image not found" )
		const response = await cloudinary.uploader.upload(image)
		console.log( response.secure_url )
		
		await User.updateOne( { username: req.username }, { image: response.secure_url }  )
		const user =await User.findOne( { username: req.username } )
		console.log(user)
		res.status(200).json({ user })

	} catch (err) {
		console.log("error", err.error)
		res.status(400).json( { error: err.error } )
		
	} finally {
		next();
	}
}


const ReceiveFormData = async ( req, res, next ) => {
	try {
	console.log( req.body );
	console.log( req.file );
	res.status(200).json( { "msg": "ok" } );
	} catch (err) {
		res.status(400).json( { error: err.message } )
	}
}

const FormToCloud = async ( req, res, next ) => {
	try {
		console.log( req.body );
		console.log( req.file );
		
		let url = "http://localhost:4000/"+req.file.filename;
		
		
		res.status(200).json( { "url": url } );
	} catch (err) {
		console.log("error",err)
		res.status(400).json( { error: err.message } )
	}
}


chatRouter.use( requireAuth );
chatRouter.post( "/fetchmessage", fetchMessage);
chatRouter.post( "/sendmessage", sendMessage );
chatRouter.get( "/users", FetchUsers );
chatRouter.post( "/image", UploadImageClodianry );
chatRouter.post( "/formdata", multer_upload.single('photo'), ReceiveFormData );
chatRouter.post( '/formtocloud', multer_upload.single('photo'), FormToCloud );
module.exports = { chatRouter };


/*


export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      // Upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


*/
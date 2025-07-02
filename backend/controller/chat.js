console.log("controller");

const express = require("express");
const chatRouter = express.Router();
const bcrypt = require("bcrypt");
const validaor = require( "validator" );
const jwt = require("jsonwebtoken");
const axios = require("axios");

const { User } = require( "../models/auth.js" );
const { requireAuth } = require("./middlewire.js");
const { oauth2Client } = require("../utils/googleClient.js");
const { onlineUserMap, io }  = require("../utils/socket.js");
const { Message } = require("../models/chat.js");

console.log( "controller", onlineUserMap)

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

		console.log(messages);

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



chatRouter.use( requireAuth );
chatRouter.post( "/fetchmessage", fetchMessage)
chatRouter.post( "/sendmessage", sendMessage )

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
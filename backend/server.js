require('dotenv').config();

const express = require("express");
const cors= require("cors");
const { mainRouter }= require("./routes.js");
const mongoose = require("mongoose");
const http  =  require("http");
const { Server } = require("socket.io");
const jwt = require('jsonwebtoken');
const { User } = require("./models/auth.js");

const onlineUserMap = {};

const getSocketID = (userId) => {
	return onlineUserMap[userId];
}


mongoose.connect(process.env.MONGO_URI).then(() => {
	console.log( "Connected to MongoDB" );
	
	const app = express(); 
	const server = http.createServer(app);


	app.use(cors());
	app.use(express.json());
	app.use(mainRouter);
	
	app.use( ( req, res, next ) => {
		console.log("backend", new Date().toLocaleString() );
		
	} );


	const io = new Server( server, {
		cors: "http://localhost:3000"
	} );

	

	io.on( "connection", async (stream) => {
		

		const auth = stream.handshake.query.auth;
		
		if (!auth) console.log("No auth")
		
		//stream.close( 1008, "Not Authorized" )

  		const token = auth.split(' ')[1]

		

  		try {
    		const { _id } = jwt.verify(token, process.env.JWT_SECRET) 
			//console.log( "token", token );
			const ret = await User.findOne({_id}); 
			if( !ret ) throw Error("No such user"); 
			console.log( "A user connected in websocket", stream.id );
			
			onlineUserMap[ ret._id.toString() ] = stream.id;
			stream.emit( "OnlineUsers", Object.keys(onlineUserMap) )
			stream.on( "chat-shoaib", ( data ) => console.log( "chat-shoaib", data ) );
			stream.on( "disconnect", () => console.log( "A user disconnected from web socket", stream.id ) );

		}
		catch(error) {
			console.log( "socket failed", error.message );
		}

		
	} )


	server.listen(process.env.PORT, () => {
		console.log(`Listening on Port ${process.env.PORT}`);
	});


}).catch((err) => console.log(`Error: ${err}`));

module.exports = { onlineUserMap }
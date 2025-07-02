console.log("server");

const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const { io, onlineUserMap, app, server }  =  require("./utils/socket.js")
const { mainRouter }= require("./routes.js");
const { User } = require("./models/auth.js");


app.use(mainRouter);

app.use( ( req, res, next ) => {
	console.log("backend", new Date().toLocaleString() );
	
} );


mongoose.connect(process.env.MONGO_URI).then(() => {
	console.log( "Connected to MongoDB" );
	

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
			
			onlineUserMap[ ret.username.toString() ] = stream.id;
			io.emit( "OnlineUsers", Object.keys(onlineUserMap) )
			stream.on( "chat-shoaib", ( data ) => console.log( "chat-shoaib", data ) );
			stream.on( "disconnect", () => {
				console.log( "A user disconnected from web socket", stream.id)
				delete onlineUserMap[ ret.username.toString() ]
				io.emit( "OnlineUsers", Object.keys(onlineUserMap) );
				
			}  );

		}
		catch(error) {
			console.log( "socket failed", error.message );
		}

		
	} )


	server.listen(process.env.PORT, () => {
		console.log(`Listening on Port ${process.env.PORT}`);
	});


}).catch((err) => console.log(`Error: ${err}`));






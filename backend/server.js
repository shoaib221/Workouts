

const express = require("express");
const cors= require("cors");
const { mainRouter }= require("./routes.js");
const mongoose = require("mongoose");

require('dotenv').config()



const app = express(); 


app.use(cors());
app.use(express.json());
app.use(mainRouter);






app.use( ( req, res, next ) => {
    console.log( new Date().toLocaleString() );
    
} );

mongoose.connect(process.env.MONGO_URI).then(() => {
	console.log( "Connected to MongoDB" );
	app.listen(process.env.PORT, () => {
		console.log(`Listening on Port ${process.env.PORT}`);
	});
}).catch((err) => console.log(`Error: ${err}`));


require('dotenv').config();

const express = require("express");
const cors= require("cors");
const { mainRouter }= require("./routes.js");
const mongoose = require("mongoose");
const passport = require("passport");



mongoose.connect(process.env.MONGO_URI).then(() => {
	console.log( "Connected to MongoDB" );
	
	const app = express(); 
	app.use(cors());
	app.use(express.json());
	app.use(mainRouter);
	
	app.use( ( req, res, next ) => {
		console.log("backend", new Date().toLocaleString() );
		console.log("backend", new Date().toLocaleDateString() );
		console.log("backend", new Date().toLocaleTimeString() );
	} );


	app.listen(process.env.PORT, () => {
		console.log(`Listening on Port ${process.env.PORT}`);
	});


}).catch((err) => console.log(`Error: ${err}`));


require('dotenv').config();
const express = require("express");
const cors= require("cors");
const http  =  require("http");
const { Server } = require("socket.io");



const app = express(); 
app.use(cors());
app.use(express.json());
app.use( express.static('uploads') )

const server = http.createServer(app);
const io = new Server( server, {
	cors: "http://localhost:3000"
} );


const onlineUserMap = {  };

module.exports = { app, io, onlineUserMap, server }
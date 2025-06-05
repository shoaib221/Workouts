

const express = require("express");
const { productRouter } = require("./controller/product.js");
const { workoutRouter } = require("./controller/workout.js");
const { authRouter } = require("./controller/auth.js");



const mainRouter = express.Router();

mainRouter.use( "/workout", workoutRouter );
mainRouter.use( "/product", productRouter );
mainRouter.use( "/auth", authRouter );



module.exports = { mainRouter } ;


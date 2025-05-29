const express = require("express");
const { productRouter } = require("./controller/product.js")
const { workoutRouter } = require("./controller/workout.js")



const mainRouter = express.Router();
mainRouter.use( "/workout", workoutRouter );
mainRouter.use( "/product", productRouter );



module.exports = { mainRouter } ;


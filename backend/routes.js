const express = require("express");


const workoutRouter = express.Router();
const Test = require("./controller/Test.js");
const { updateWorkout, CreateWorkout, getWorkouts, deleteWorkout } = require("./controller/create.js");


workoutRouter.get( "/test", Test );
workoutRouter.post( "/create", CreateWorkout );
workoutRouter.get( "/pull", getWorkouts );
workoutRouter.delete( "/:id" , deleteWorkout );
workoutRouter.patch( "/:id", updateWorkout );


const mainRouter = express.Router();
mainRouter.use( "/workout", workoutRouter );


module.exports = mainRouter ;

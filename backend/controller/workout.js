

const express = require("express");
const Workout = require("../models/workout.js");


const CreateWorkout = async ( req, res, next ) => {
    const { title, load, reps } = req.body;
    console.log( req.body );

    try {
        const workout = await Workout.create({ title, load, reps });
        res.status(200).json( workout );
    } catch (error) {
        res.status(400).json( { error: error.message} );
    } finally {
        next();
    }
}


const getWorkouts = async ( req, res, next ) => {
    try {
        const workouts = await Workout.find({});
        res.status(200).json( workouts );
    } catch (error) {
        res.status(400).json( { error: error.message } );
    } finally {
        next();
    }
}

const deleteWorkout = async ( req, res, next ) => {
    const {id} = req.params;
    console.log( "delete "+ id);

    try {
        const ret = await Workout.deleteOne( { "_id" : id } );
        if( !ret ) res.status(400).json( { error : "No Such workout" } );
        else res.status(200).json(ret) 
    } catch (error) {
        res.status(400).json( { error: error.message } )
        console.log(error.message)
    }

    next();
}

const updateWorkout = async ( req, res, next ) => {
    const {id} = req.params;
    const updation = req.body;

    try {
        const ret = await Workout.updateOne({ "_id": id} , { $set : updation }  );
        if(!ret) res.status(400).json( { error: "No such workout" } );
        else res.status(200).json( ret );
        
    } catch( error ) {
        response.status(400).json( {  error: error.message } );
    } finally {
        next();
    }
}

const workoutRouter = express.Router();
workoutRouter.post( "/create", CreateWorkout );
workoutRouter.get( "/pull", getWorkouts );
workoutRouter.delete( "/:id" , deleteWorkout );
workoutRouter.patch( "/:id", updateWorkout );

module.exports = { workoutRouter }


const { response } = require("express");
const Workout = require("../models/workout.js");


const CreateWorkout = async ( req, res, next ) => {
    const { title, load, reps } = req.body;
    console.log( req.body );

    try {
        const workout = await Workout.create({ title, load, reps });
        res.status(200).json( workout );
    } catch (error) {
        res.status(400).json( {"error": error.message} );
    } finally {
        next();
    }
}


const getWorkouts = async ( req, res, next ) => {
    try {
        const workouts = await Workout.find({});
        res.status(200).json( workouts );
    } catch (error) {
        res.status(400).json( { "error": error.message } );
    } finally {
        next();
    }
}

const deleteWorkout = async ( req, res, next ) => {
    const {id} = req.params;
    console.log( "delete "+ id);

    try {
        await Workout.deleteOne( { "_id" : id } );
        console.log("success")
        response.status(200)
    } catch (error) {
        response.status(400).send( { "error": error } )
        console.log(error)
    }

    next();
}

const updateWorkout = async ( req, res, next ) => {
    const {id} = req.params;
    const updation = req.body;

    try {
        await Workout.updateOne({ "_id": id} , { $set : updation }  );
        response.status(200);
    } catch( error ) {
        response.status(400).send( { "error": error } );
    } finally {
        next();
    }
    
}

module.exports = {
    CreateWorkout, getWorkouts, deleteWorkout, updateWorkout
}
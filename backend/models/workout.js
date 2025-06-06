

const mongoose = require("mongoose");


const workoutSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        unique: true,
    },
    reps: {
        type: Number, 
        required: true 
    }, 
    load: { 
        type: Number, 
        required: true 
    },
    owner_id: {
        type: String,
        required: true
    }

}, { timestamps: true } );


module.exports = mongoose.model( "Workout", workoutSchema );


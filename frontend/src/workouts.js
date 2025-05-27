

import { useState, useEffect, useContext } from "react"
import { pullWorkout, deleteWorkoutURL } from "./urls"
import { Link } from "react-router-dom"
import { CreateWorkout } from "./CreateWorkout"
import { WorkoutContext } from "./WorkoutContext"




const WorkoutDetail = ( props ) => {
    console.log(props)

    const deleteId = async(id) => {
        try {
            const response = await fetch( deleteWorkoutURL+"/"+id, {
                method: "DELETE",
                headers : {
                    "Content-Type" : "application/json"
                }
            });

            const json = await response.json();

            if( !response.ok ) console.log( json.error );


        } catch(error) {
            console.error(error);
        }
    }

    return (
        <div className="Detail" >
            
                <p> 
                    Title: { props.workout.title } <br/>
                    Reps :{ props.workout.reps } <br/>
                    Load : { props.workout.load } <br/>
                    <button onClick={ () => { deleteId( props.workout._id ) }  }> Delete </button>
                </p>       
        </div>
    )
}

export const Workouts = () => {
    const { state, dispatch } = useContext( WorkoutContext )
    

    return (
        <div className="workouts" >
            
        </div>
    )
}
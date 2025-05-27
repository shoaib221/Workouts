import { createContext, useReducer } from "react";
import { useEffect } from "react";
import { pullWorkout, createWorkoutURL } from "./urls";


export const WorkoutContext = createContext();


const fetchWorkout = async () => {
    
    try {
        const response = await fetch(pullWorkout);
        console.log(response);
        const json = await response.json();
        console.log(json);
    } catch (err) {
        console.error(err);
    } finally {
        
    }
}

const createWorkout = async ( workout ) => {
    
    console.log(workout);

    const response = await fetch( createWorkoutURL, {
        method: "POST",
        body: JSON.stringify(workout),
        headers: {
            "Content-Type": "application/json"
        }
    } )

    const json = await response.json();

    if( response.ok ) 
    {
        setTitle("")
        setLoad("")
        setReps("")
        setError(null)
        dispatch( { type: "CREATE_WORKOUT", payload : json } )
        console.log(json.work)
    }
    else
    {
        setError(json.error)
    }


}

const workoutReducer = ( state, action ) => {
    
    if( action.type === "SET_WORKOUT" )
    {
        const res = fetchWorkout();
        return { workouts: res }
    }
    else if( action.type === "CREATE_WORKOUT" )
    {
        const res = createWorkout( action.payload )
        return { workouts: [ ...state.workouts, res ] }
    }
    else if( action.type === "DELETE_WORKOUT" )
    {
        const res = state.workouts.filter( w => w._id!== action.payload._id )
        return { workouts : res }
    }
    else
    {
        return { workouts : state.workouts }
    }
}

export const WorkoutContextProvider = ( { children } ) => {
    const [ state, dispatch ] = useReducer( workoutReducer, { workouts: null } );

    useEffect( () => {
        fetchWorkout();
    },[])

    return (
        <WorkoutContext.Provider value={ { ...state, dispatch } } >
            { children }
        </WorkoutContext.Provider>
    )
}
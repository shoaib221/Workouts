import { createContext, useReducer, useState } from "react";
import { useEffect } from "react";
import { pullWorkout, createWorkoutURL, deleteWorkoutURL } from "./urls";

export const WorkoutContext = createContext();

const aha =[ {  title : "title1",  author: "author1" }, {  title : "title1",  author: "author1" } ]

export const WorkoutContextProvider = ( { children } ) => {
    const [ workouts, setWorkouts ] = useState([])

    
    const fetchWorkout = async () => {
        
        try {
            const response = await fetch(pullWorkout);
            const json = await response.json();
            //console.log(response.ok, "json", typeof(json), json);
            if( response.ok ) setWorkouts(json)
            else console.log( response.error )
        } catch (error) {
            console.error(error);
        }
    }


    const createWorkout = async ( workout ) => {
        
        try {
            const response = await fetch( createWorkoutURL, {
            method: "POST",
            body: JSON.stringify(workout),
            headers: {
                "Content-Type": "application/json"
            }
            })

            const json = await response.json();

            if( response.ok ) setWorkouts( [ ...workouts, json ] )
            else throw Error(json.error)
        } catch (error) {
            console.error(error)
        }


        
    }

    const deleteId = async(id) => {
        
        try {
            
            const response = await fetch( deleteWorkoutURL+"/"+id, {
                method: "DELETE",
                headers : {
                    "Content-Type" : "application/json"
                }
            });
            
            const json = await response.json();
            
            if( response.ok ) 
            {
                const nxt = workouts.filter( x => x._id !=id )
                //console.log( "nxt", nxt )
                setWorkouts(nxt)
            }
            else console.error(json.error)

        } catch(error) {
            console.error( "bere", error );
            
        }
    }

    const updateWorkout = async(workout) => {

        try {
            const response = await fetch( deleteWorkoutURL+"/"+workout._id, {
            method: "PATCH",
            body: JSON.stringify( workout ),
            headers: { "Content-Type": "application/json" }
            } )

            const json = await response.json();
            if( response.ok ) 
            {
                const tmp = workouts.filter( x => x._id!== workout._id )
                tmp.push(json)
                setWorkouts(tmp)
            } 
            else console.error(json.error)
        } catch(error) {
            console.error(error);
        }
        
    }

    useEffect( () => {
        fetchWorkout();
    },[])

    return (
        <WorkoutContext.Provider value={ { workouts, fetchWorkout, deleteId, createWorkout, updateWorkout } } >
            { children }
        </WorkoutContext.Provider>
    )
}


/*

############   reducer 
const workoutReducer = async ( state, action ) => {
    
    if( action.type === "SET_WORKOUT" )
    {
        const res = await fetchWorkout();
        console.log( "here" )
        console.log( res )
        return { workouts: res }
    }
    else if( action.type === "CREATE_WORKOUT" )
    {
        const res = createWorkout( action.payload )
        return { workouts: [ ...state.workouts, res ] }
    }
    else if( action.type === "DELETE_WORKOUT" )
    {
        const flag = deleteId(action.id);
        const res = state.workouts;
        if( flag )  res = state.workouts.filter( w => w._id!== action.id );
        return { workouts : res }
    }
    else
    {
        return { workouts : state.workouts }
    }
}
*/


import { createContext, use, useContext, useReducer, useState } from "react";
import { useEffect } from "react";
import { pullWorkout, createWorkoutURL, deleteWorkoutURL } from '../urls';
import { AuthContext } from "./authContext";

export const WorkoutContext = createContext();

export const WorkoutContextProvider = ( { children } ) => {
    const [ workouts, setWorkouts ] = useState([]);
    const { user } = useContext(AuthContext);

    
    const fetchWorkout = async () => {
        //console.log( "fetchWorkout", user );
        const response = await fetch(pullWorkout, {
            headers: {'Authorization': `Bearer ${user.token}`} 
        });
        
        const json = await response.json();
        
        //console.log(response.ok, "json", typeof(json), json);
        if( response.ok ) setWorkouts(json);
        else console.error(json.error);
        
    }


    const createWorkout = async ( workout ) => {
        
        const response = await fetch( createWorkoutURL, {
            method: "POST",
            body: JSON.stringify(workout),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json();

        if( response.ok ) setWorkouts( [ ...workouts, json ] );
        else throw Error(json.error);
    }

    const deleteWorkout = async(id) => {
        
        const response = await fetch( deleteWorkoutURL+"/"+id, {
            method: "DELETE",
            headers : {
                "Content-Type" : "application/json",
                'Authorization': `Bearer ${user.token}`
            }
        });
        
        const json = await response.json();
        
        if( response.ok ) 
        {
            const nxt = workouts.filter( x => x._id !=id );
            setWorkouts(nxt);
        }
        else console.error(json.error);
        
    }

    const updateWorkout = async(workout) => {

        const response = await fetch( deleteWorkoutURL+"/"+workout._id, {
            method: "PATCH",
            body: JSON.stringify( workout ),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user.token}`
            }
        } )

        const json = await response.json();
        if( response.ok ) 
        {
            const tmp = workouts.filter( x => x._id!== workout._id )
            tmp.push(json)
            setWorkouts(tmp)
        } 
        else throw Error(json.error);

    }

    useEffect( () => {
        try { if(user) fetchWorkout(); }
        catch( error ) { console.error(error.message) }
    }, [user]);

    return (
        <WorkoutContext.Provider value={ { workouts, fetchWorkout, deleteWorkout, createWorkout, updateWorkout } } >
            { children }
        </WorkoutContext.Provider>
    )
}


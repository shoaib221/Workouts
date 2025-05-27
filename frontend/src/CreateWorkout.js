

import { useContext, useState } from "react";
import { createWorkoutURL } from "./urls";
import { WorkoutContext } from "./WorkoutContext";

export const CreateWorkout = () => {
    const [ title, setTitle ] = useState("")
    const [ load, setLoad ] = useState("")
    const [ reps, setReps ] = useState("")
    const [ error, setError ] = useState(null)
    const { state, dispatch } = useContext( WorkoutContext )


    const handleSubmit = async (e) => {
        e.preventDefault();

        const workout = { title, load, reps };

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

    return (
        <div className="CreateWorkout" >
            { error && <p>  { error } </p> }
            <form onSubmit={handleSubmit}>
                <h3>  Add a New Workout </h3>

                <p>
                    <label> Title </label>
                    <input
                        type="text"
                        onChange={ (e) => setTitle(e.target.value) }
                        value={title}
                    />
                </p>

                <p>
                <label> Load </label>
                <input
                    type="number"
                    onChange={ (e) => setLoad(e.target.value) }
                    value={load}
                />
                </p>

                <p>
                <label> Reps </label>
                <input
                    type="number"
                    onChange={ (e) => setReps(e.target.value) }
                    value={reps}
                />
                </p>

                <button> Add Workout </button>

            </form>
        </div>
    )
}
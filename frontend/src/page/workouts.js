

import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { WorkoutContext } from "../context/WorkoutContext"


const CreateWorkoutForm = () => {
    const [ title, setTitle ] = useState("")
    const [ load, setLoad ] = useState("")
    const [ reps, setReps ] = useState("")
    const [ error, setError ] = useState(null)
    const { createWorkout } = useContext(WorkoutContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await createWorkout( { title, reps, load } )
            setTitle("")
            setLoad("")
            setReps("")
            setError("")
        } catch (error2) {
            setError(error2)
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



const WorkoutDetail = ( props ) => {
    const { deleteId } = useContext(WorkoutContext);
    const [ updating, setUpdating ] = useState(false);

    const UpdateWorkoutForm = ( props ) => {
        const [ load, setLoad ] = useState("")
        const [ reps, setReps ] = useState("")
        const [ error, setError ] = useState(null)
        const { updateWorkout } = useContext(WorkoutContext)

        const handleSubmit = async (  ) => {
            const data = { _id: props.workout_id, load, reps };
            await updateWorkout(data)
            setUpdating(false)
        }

        return (
            <div className="UpdateWorkout" >
                { error && <p>  { error } </p> }
                <form onSubmit={handleSubmit}>
                    

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

                    <button onClick={ ( ) => handleSubmit() } > Submit </button>
                    <button onClick={ () => setUpdating(false) }> Cancel </button>

                </form>
            </div>
            )
        }



    return (
        <div className="Detail" >
        
            { props.workout.title } <br/>
            { props.workout.load } <br/>
            { props.workout.reps } <br/>
            { !updating &&
            <button onClick={ () => deleteId( props.workout._id ) } >
                Delete 
            </ button> }
            
            { !updating && <button onClick={ () => setUpdating(true) } > Update </button> }
            { updating && <UpdateWorkoutForm workout_id = { props.workout._id }/> }
            
            
        </div>
    )
}

export const Workouts = () => {
    const { workouts } = useContext( WorkoutContext )

    return (
        <div className="workouts" >
            <CreateWorkoutForm />
            <h1  > Workouts </h1>
            { workouts && workouts.map( i => <WorkoutDetail key={i._id} workout={i} /> ) }
        </div>
    )
}


/* ##########  OK

export const Workouts = () => {
    const { workouts } = useContext( WorkoutContext )

    const aray = [ "kal", "pal" ];
    const baray = [ { title: "title1", author: "author1" }, { title: "title2", author: "author2" } ]
    const caray = []
    const daray = null // null cannot be iterated without checking
    
    console.log( "aray", typeof(aray), aray );  // object
    console.log( "baray", typeof(baray), baray ); // object
    console.log( "caray", typeof(caray), caray ); // object
    console.log( "daray", typeof(daha), daray );  // object
    


    return (
        <div className="workouts" >
            { aray && aray.map( i => (<p key={i}>  {i} </p>) ) }
            { baray && baray.map( i => (<p key={i.title}>  {i.title} {i.author} </p>) ) }
            {  caray.map( i=> ( <p key={i}> {i} </p> ) ) }
            { daray && daray.map( i=> ( <p key={i}> {i} </p> ) ) }
        </div>
    )
}

*/


/*  ############ ERROR


*/
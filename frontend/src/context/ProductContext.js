import { fetchProductURL, createProductURL } from "../constants/urls";
import { createContext, useEffect, useReducer } from "react";


export const ProductContext = createContext()

const reducer =  ( state, action ) => {

    // console.log( "reducer" );
    
    if( action.type === "FETCH" ) 
    {
        console.log( action.type, action.data )
        return { products: action.data, test: "after" }
    }
    if( action.type === "CREATE" ) return { products : [...state.products, action.load] }
    return { products: state.products }
}

export const ProductProvider = ( {children} ) => { 
    
    const [ state, dispatchProduct ] = useReducer( reducer, { products: [], test: "before" } ) 

    return (
        <ProductContext.Provider value={ { ...state, dispatchProduct  } } >
            { children }
        </ProductContext.Provider>
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
        return { workouts : res };
    }
    else
    {
        return { workouts : state.workouts }
    }
}



*/
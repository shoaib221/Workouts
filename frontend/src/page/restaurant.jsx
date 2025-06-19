import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useContext, useReducer, useEffect, createContext } from "react";
import { AuthContext } from "../context/authContext";
import { Cart, AddToCart } from "./cart";

const api = axios.create( { baseURL: "http://localhost:4000" } );

export const RestaurantContext = createContext()

const cartReducer = (state, action) => {

    
    if( action.type === "add" ) 
    {
        let aray = [];

        //console.log( "reducer", action.product );
        
        if( state.cart ) 
        {
            let aha = state.cart.filter( x => x._id === action.product._id );
            //console.log(aha);
            if( aha.length > 0 ) 
            {
                aha = aha[0];
                //console.log( aha.quantity );
                aha.quantity =  Number(aha.quantity) + Number(action.product.quantity)/2;
                //console.log( aha.quantity );
            }
            else 
            {
                aha = action.product;
            }

            let tmp = state.cart.filter( x => x._id !== action.product._id );
            tmp.push(aha);
            aray = tmp;
        }
        else aray = [ action.product ];

        let url = "/cart/" + action.buyer + "/" + action.restaurant;
        localStorage.setItem( url, JSON.stringify( aray ) );
        return { cart : aray };
    }
    else if( action.type === "fetch" ) 
    {
        let url = "/cart/" + action.buyer + "/" + action.restaurant;
        //console.log( "url", url );
        const cart = JSON.parse(localStorage.getItem(url));
        return { cart };
    }
    else if( action.type === "delete" ) 
    {
        if(!state.cart) return {};
        let cart = state.cart.filter( i => i._id !== action.product._id );
        let url = "/cart/" + action.buyer + "/" + action.restaurant;
        //console.log( "url", url );
        localStorage.setItem( url, JSON.stringify(cart) );
        return { cart };
    }
    else if( action.type === "empty" ) 
    {
        return { cart : [] }
    }
    else return { cart: state.cart };
}


export const Restaurant = (props) => {
    const { _id } = useParams();
    const [ products, setProducts ] = useState([]);
    const [ restaurant, setRestaurant ] = useState(null);
    const { user } = useContext( AuthContext );
    const [ cartState, dispatchCart ] = useReducer(cartReducer, { cart: [] });


    async function fetchMenu (restaurant_id) {
        try {
            const response = await api.post( "/product/restaurant-menu", {restaurant_id, url: "fetchmenu"},
                { headers: { 'Authorization': `Bearer ${user.token}` } }
            );
            setProducts(response.data.products);
            setRestaurant( response.data.restaurant );
            dispatchCart( { type: "fetch",  restaurant: response.data.restaurant.username, buyer: user.email  } );
            
        } catch (err) {
            console.error( err.message );
        }
    }

    useEffect ( () => {
        fetchMenu(_id);
    }, [_id] )


    return (
    
        <div className="restaurant" >
            <h1>  { restaurant && restaurant.username } </h1>

            <div className="menu-list">
                { cartState.cart && restaurant && <Cart cart={cartState.cart} restaurant={restaurant.username} buyer={user.email} dispatch={dispatchCart} /> }
                <div className="menu" > 
                <h1> Menu </h1>
                { restaurant && products && products.map( x => ( 
                    <div key={x._id} className="menu-item" >
                        { x.name } at ${ x.price } per piece
                        <AddToCart  product={x} restaurant={restaurant.username} buyer={user.email} dispatch={dispatchCart} /> 
                    </div>
                 ) ) }
                </div>
            </div>
       </div> 
    
    )
}
import { createContext, useEffect, useState, useContext, useReducer } from "react";
import axios from "axios";
import { AuthContext } from "./authContext";

export const ProductContext = createContext();

const api = axios.create({
    baseURL: "http://localhost:4000",
    // withCredentials: true,
});

const reducer = (state, action) => {
    if( action.type === "add" ) 
    {
        
        let aray = [];
        if( state.cart ) aray = [ ...state.cart, action.data ];
        else aray = [ action.data ];

        localStorage.setItem( 'cart', JSON.stringify( aray ) );
        return { cart : aray };
    }
    else if( action.type === "set" ) 
    {
        const cart = JSON.parse(localStorage.getItem('cart'));
        return { cart };
    }
    else if( action.type === "delete" ) 
    {
        if(!state.cart) return {}
        let cart = state.cart.filter( i => i._id !== action.data._id );
        localStorage.setItem( 'cart', JSON.stringify(cart) );
        return { cart };
    }
    else return { cart: state.cart };
}

export const ProductProvider = ( {children} ) => {
    const [ products, setProducts ] = useState([]);
    const [stateCart, dispatchCart] = useReducer(reducer, { cart: [] } )
    const [ restairants, setRestaurants ] = useState([])
    const {user} = useContext(AuthContext);

    async function fetch () {
        try 
        {
            const response = await api.get( "/product/fetch",
                {headers: {'Authorization': `Bearer ${user.token}`}}
            );
            setProducts(response.data.products);
            setRestaurants(response.data.restaurants);
            //console.log(response.data)
        }
        catch (err) {
            console.error(err.message);
        }
        
    }

    async function deleteProduct (_id) {
        const response = await api.post( "/product/delete", { _id },
                {headers: {'Authorization': `Bearer ${user.token}`}}
            );
        
        let hlo = products.filter( i => i._id !==_id );
        setProducts(hlo);
    }

    useEffect( () => {
        if(user)
        {
            fetch();
            dispatchCart( { type: "set" } )
        }
        
    }, [user] )

    return (
        <ProductContext.Provider value={{ setProducts, products, deleteProduct, dispatchCart, ...stateCart }}>
            {children}
        </ProductContext.Provider>
    )
}
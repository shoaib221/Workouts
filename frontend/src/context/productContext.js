import { createContext, useEffect, useState, useContext, useReducer } from "react";
import axios from "axios";
import { AuthContext } from "./authContext";

export const ProductContext = createContext();

const api = axios.create({
    baseURL: "http://localhost:4000",
    // withCredentials: true,
});

export const ProductProvider = ( {children} ) => {
    const [ products, setProducts ] = useState([]);
    const [ restaurants, setRestaurants ] = useState([]);
    const {user} = useContext(AuthContext);

    async function fetch () {
        try 
        {
            const response = await api.get( "/product/fetch",
                {headers: {'Authorization': `Bearer ${user.token}`}}
            );
            setProducts(response.data.products);
            setRestaurants(response.data.restaurants);
            //console.log(response.data);
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
            
        }
        
    }, [user] )

    return (
        <ProductContext.Provider 
        value={{ restaurants, setProducts, products, deleteProduct }}>
            {children}
        </ProductContext.Provider>
    )
}
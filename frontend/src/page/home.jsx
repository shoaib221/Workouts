import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/productContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const api = axios.create( { baseURL: "http://localhost:4000" } );

export const Restaurant = (props) => {
    const { _id } = useParams()
    const [ products, setProducts ] = useState([])
    const { user } = useContext( AuthContext )

    async function fetchMenu (restaurant_id) {
        try {
            const response = await api.post( "/product/restaurant-menu", {restaurant_id},
                { headers: { 'Authorization': `Bearer ${user.token}` } }
            );
            setProducts(response.data);
        } catch (err) {
            console.error( err.message );
        }
    }

    useEffect ( () => {
        fetchMenu(_id)
    }, [_id] )

    return (
       <div className="restaurant" >
        
       </div> 
    )
}

export const Home = () => {
    const { restaurants } = useContext( ProductContext );
    const navigate = useNavigate()

    function fun1 ( _id ) {
        navigate( `/restaurant/${_id}` );
    }

    return (
        <div className="home" >
            <h1> Restaurants </h1>
            { restaurants && restaurants.map( r => (
                <div key={r._id} > 
                    <button onClick={ ()=> fun1( r._id ) } > { r.name } </button>
                </div>
            ) ) }
        </div>
    )
}
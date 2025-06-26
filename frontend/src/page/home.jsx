

import { useContext, useEffect, useReducer, useState } from "react";
import { ProductContext } from "../context/productContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { Cart, AddToCart } from "./cart";
import { Restaurant } from "./restaurant";
import { Navbar } from "./Navbar";


export const Home = () => {
    const { restaurants } = useContext( ProductContext );
    const navigate = useNavigate();

    function fun1 ( _id ) {
        navigate( `/restaurant/${_id}` );
    }

    return (
        <div className="home" >
            
            <h1 style={{ width: "100%" }} > Restaurants </h1>
            <div class='restaurant-list'>
            { restaurants && restaurants.map( r => (
                <div key={r._id} > 
                    <button onClick={ ()=> fun1( r._id ) } > { r.username } </button>
                </div>
            ) ) }
            </div>
        </div>
    )
}
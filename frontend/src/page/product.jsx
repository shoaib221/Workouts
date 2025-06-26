

import { useState, useEffect, useContext, createContext } from "react";
import { Link } from "react-router-dom";

import { ProductContext } from "../context/productContext";
import axios from "axios";
import { AuthContext } from "../context/authContext";

const api = axios.create({
    baseURL: "http://localhost:4000",
    // withCredentials: true,
});


const CreateProductForm = () => {
    const [ name, setName ] = useState("");
    const [ price, setPrice ] = useState("");
    const [ availability, setAvailability ] = useState(true);
    const [ error, setError ] = useState(null);
    const { products, setProducts } = useContext( ProductContext );
    const { user } = useContext(AuthContext);


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await api.post('/product/create',
                { price, name, availability },
                { headers: {'Authorization': `Bearer ${user.token}`} }
            );
            //console.log( response.data );
            setProducts( [ ...products, response.data ] );
            setName("");
            setPrice("");
            setError(null);
        }
        catch (err) {
            setError(err.response.data.error);
        }
        
    }

    return (
        <div className="create-product" >
            { error && <p className="error" >  { error } </p> }
            <form onSubmit={handleSubmit}>
                <h3>  Add a New Product </h3>

                <p>
                    
                    <input
                        placeholder="Name"
                        type="text"
                        onChange={ (e) => setName(e.target.value) }
                        value={name}
                    />
                </p>

                <p>
                
                <input
                    placeholder="Price"
                    type="number"
                    onChange={ (e) => setPrice(e.target.value) }
                    value={price}
                />
                </p>

                <button> Add Product </button>

            </form>
        </div>
    )
}


const ProductDetail = ( props ) => {
    const [ updating, setUpdating ] = useState(false);
    const [ quantity, setQuantity ] = useState(0);
    const { dispatchCart, deleteProduct } = useContext(ProductContext);

    const deletePro = async ( _id ) => {
        console.log(_id, "id");
        try {
            await deleteProduct(_id);
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div 
            className="product-detail" 
            style={ { border: "0px", margin: "5px" } }
        >
            { props.product.name } at ${ props.product.price } per KG 
            <button onClick={ ()=> { deletePro(props.product._id) } } > Delete </button>
        </div>
    )
}


export const Products = () => {
    const { products } = useContext( ProductContext );


    return (
        
        <div className="products" >
            
            <CreateProductForm />
            
            <div className="product-list">
                <h1> Products </h1>
                { products && products.map( i => <ProductDetail key={i._id} product={i} /> ) }
            </div>
        </div>
        
    )
}




/* ##########  OK

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    availability: {
        type: Date,
        required: true
    },
    owner: {
        type: String,
        required: true
    }
});

*/



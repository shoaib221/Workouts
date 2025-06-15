

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
    const [ price, setPrice ] = useState(0);
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
        }
        catch (err) {
            setError(err.message);
        }
        
    }

    return (
        <div className="create-product" >
            { error && <p>  { error } </p> }
            <form onSubmit={handleSubmit}>
                <h3>  Add a New Product </h3>

                <p>
                    <label> name </label>
                    <input
                        type="text"
                        onChange={ (e) => setName(e.target.value) }
                        value={name}
                    />
                </p>

                <p>
                <label> Price </label>
                <input
                    type="number"
                    onChange={ (e) => setPrice(e.target.value) }
                    value={price}
                />
                </p>

                <p>
                <label> availability </label>
                <input
                    type="number"
                    onChange={ (e) => setAvailability(e.target.value) }
                    value={availability}
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

    const AddToCart = ( product ) => {
        dispatchCart( { type: "add", data: { ...product, quantity } } )
    }

    return (
        <div className="product-detail" >
            Name : { props.product.name } <br/>
            Price : { props.product.price } <br/>

            <button onClick={ ()=> { deletePro(props.product._id) } } > Delete </button>

            <div>
                <button onClick={ ()=> { AddToCart(props.product) } }
                style={{"width": "50%"}} > Add To Cart </button>
                <label> Quantity </label>
                <input
                    type="number"
                    onChange={ (e) => setQuantity(e.target.value) }
                    value={quantity}
                    style={{"width": "50%"}}
                />
            </div>
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



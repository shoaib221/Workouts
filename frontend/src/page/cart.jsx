

import { AuthContext } from "../context/authContext";
import { useContext, useState } from "react";
import axios from "axios";



const api = axios.create( {
    baseURL: "http://localhost:4000"
} );



const CartItem = (props) => {
    

    function deleteProduct (  ) {
        props.dispatch( { type: "delete", product: props.product, restaurant: props.restaurant, buyer: props.buyer}  );
    }

    return (
        <div className="cart-item"  >
            { props.product.quantity } pieces { props.product.name } at ${props.product.price} per
            <button onClick={ () => deleteProduct() } >Remove</button>
        </div>
    )
}



export const Cart = (props) => {
    const { user } = useContext(AuthContext);
    const [ error, setError ] = useState(null);

    const placeOrder = async (  ) => {
        
        try {
            const response = await api.post( "/product/place-order", 
                {
                    products: props.cart, 
                    owner:  props.restaurant  
                }, 
                { headers: { 'Authorization': `Bearer ${user.token}` } }
            )
            props.dispatch( {type: "empty"} );
            setError( null )
        }
        catch (err) {
            console.log("placeorder error", err.response.data.error);
            setError( err.response.data.error );
        }
        
    }

    return (
        <div className="cart" >
            <h3> Cart </h3>
            { props.cart &&
            <div> 
                { props.cart.map( i => <CartItem key={i._id}  product={i} {...props}  /> ) }
                { error && <div> { error } </div>  }
                <button onClick={ () => placeOrder() } > Checkout </button>
            </div>
            }

            
        </div>
    )
}



export const AddToCart = (props) => {
    const [ quantity, setQuantity ] = useState(null);
    

    const addToCart =  (  ) => {
        console.log( "add to cart" );
        
        let pathao = { type: "add", product: {...props.product, quantity}, restaurant: props.restaurant, buyer: props.buyer };
        console.log(pathao);
        props.dispatch( pathao );
        setQuantity(0);
        console.log("success");
    }

    return (
        <div className="add-to-cart">
            
            <input
                placeholder="Quantity"
                type="number"
                onChange={ (e) => setQuantity(e.target.value) }
                value={quantity}
                style={{"width": "30%"}}
            />

            <button onClick={ ()=>  addToCart()  }
            style={{"width": "50%"}} > Add To Cart </button>
        </div>
    )
}
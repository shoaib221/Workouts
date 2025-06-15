
import { useContext } from "react";

import { ProductContext } from "../context/productContext";


const CartItem = (props) => {
    const { dispatchCart } = useContext(ProductContext);

    function deleteProduct ( product ) {
        dispatchCart( { type: "delete", data: product } )
    }

    return (
        <div className="cart-item" style={{ border: "1px solid #f12345", margin: "10px", padding: "10px" }} >
            Name { props.item.name } <br/>
            Price {props.item.price} <br/>
            Quantity { props.item.quantity } <br/>
            <button onClick={ () => deleteProduct(props.item) } >Remove</button>
        </div>
    )
}

export const Cart = () => {
    const { cart } = useContext( ProductContext );

    return (
        <div className="cart" >
            Hello Cart
            { cart && cart.map( i => <CartItem key={i._id}  item={i} /> ) }

            <button  > Checkout </button>
        </div>
    )
}
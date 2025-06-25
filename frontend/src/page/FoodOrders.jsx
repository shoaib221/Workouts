import { useEffect, useState } from "react"
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";

const api = axios.create( {  baseURL: "http://localhost:4000" } );


/////////////////////////////////////////////////////
const sOrderDetail = {
    width: "50%",
    backgroundColor: " #281e34",
    margin: "20px",
    border: "5px solid #280e34"
}

const sODS = {
    backgroundColor: " #280e34",
    border: "2px solid #281e34"
}



///////////////////////////////////////////////////////////

const OrderDetail = ( props ) => {
    const [ detail, setDetail ] = useState(false)

    const onDetail = () => {
        if( detail ) setDetail(false);
        else setDetail(true);
    }


    return (
        <div className="order-detail" style={sOrderDetail} >
            <button onClick={onDetail} >
                { props.order.buyer.username } purchased from { props.order.owner.username } with ${ props.order.total_price } at { props.order.when }
            </button>

            { detail && props.order.product_list && 
            <div  > 
            {props.order.product_list.map( x => (
                <div key={x._id}  style={sODS} >
                    {x.quantity} pieces { x.name } with ${x.price} per
                </div>
            ) ) }
            </div>}
        </div>
    )
}

export const MyOrders = () => {
    const [ rOrders, setRorders ] = useState(null);
    const [ pOrders, setPorders ] = useState(null);
    const [ error, setError ] = useState(null);
    const { user } = useContext( AuthContext );
    

    const fetch = async (  ) => {
        console.log(" fetch order ");
        try {
            const response = await api.get( "/product/my-orders", 
                { headers: { 'Authorization': `Bearer ${user.token}` } }
            );
            setRorders( response.data.received_orders );
            setPorders( response.data.placed_orders );
            console.log("success" , response.data);
            console.log( "pOrder", pOrders );
        } catch (err) {
            setError(err.response.data.error);
        }
    }

    useEffect ( () => { fetch() } , []  );


    return (
        <div id="orders" >
            {error}
            <div className="received-orders"> 
                <h2 style={{ color: "#e67272" }} > Received Orders </h2>
                { rOrders && rOrders.map( x => <OrderDetail key={x._id} order={x} /> ) }
            </div>

            <div className="received-orders"> 
                <h2 style={{ color: "#e67272" }} > Placed Orders </h2>
                { pOrders && pOrders.map( x => <OrderDetail key={x._id} order={x} /> ) }
            </div>

        </div>
    )
}
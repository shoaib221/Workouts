


import { useContext, useEffect, useState } from "react"
import { ProductContext } from "../context/ProductContext"
import { fetchProductURL, createProductURL } from "../constants/urls"


const CreateProduct = () => {
    const [ name , setName ] = useState("")
    const [ price, setPrice ] = useState(0)
    const [ validity, setValidity ] = useState(null)
    const [ made_in, setMadeIn ] = useState("")
    const [ error, setError ] = useState(null)
    const { dispatchProduct } = useContext( ProductContext )

    const handleSubmit = async ( e ) => {
        e.preventDefault();
        const product = { name, price, validity, made_in }
        
        try {
            const response = await fetch( createProductURL, {
                method: "POST",
                body: JSON.stringify( product ),
                headers: { "Content-Type": "application/json" }
            } )

            const json = await response.json();
            if( response.ok )  dispatchProduct( { type: "CREATE", load: json } );
            else console.error( json.error );
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="CreateProduct" >
            { error && <p>  { error } </p> }
            <form onSubmit={handleSubmit}>
                

                <p>
                <label> Name </label>
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
                <label> Validity </label>
                <input
                    type="number"
                    onChange={ (e) => setValidity(e.target.value) }
                    value={validity}
                />
                </p>

                <p>
                <label> Made in </label>
                <input
                    type="text"
                    onChange={ (e) => setMadeIn(e.target.value) }
                    value={made_in}
                />
                </p>

                <button onClick={ ( ) => handleSubmit() } > Submit </button>

            </form>
        </div>
    )
}

export const Product = () => {
    const { products, test, dispatchProduct } = useContext( ProductContext )

    const fetchProduct = async () => {
        
        try {
            const response = await fetch( fetchProductURL );
            const json = await response.json();
            
            if ( response.ok ) {
                //console.log( "fetch", json);
                await dispatchProduct( { type: "FETCH", data: json } );
                
            }
            else console.error(json.error);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect( () => {
        fetchProduct();
    },[] )

    return (
        <div className="Product">
            Hello { test }

            { products && products.map( p => (
                <div key={p._id}>  { p.name }   </div>
            ) ) }
            
        </div>
    )
}
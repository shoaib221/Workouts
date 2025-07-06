

import { useContext, useState } from "react";
import "../styles/test.css";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { useViewTransitionState } from "react-router-dom";


const api = axios.create( {
    baseURL: "http://localhost:4000"
} )


const Image = () => {
    const { user } = useContext(AuthContext)
    const [ imagePreview, setImagePreview ] = useState(null)
    const [ savedImage, setSavedImage ] = useState(null)
    


    const handleChange = (event) => {
        let file = event.target.files[0];
        
        if(file) {
            const reader =new FileReader()
            reader.readAsDataURL( file )
            reader.onload = () => {
                setImagePreview(reader.result);
                console.log(reader.result)
            }
        }
    }

    const handleSubmit = async () => {
        console.log(imagePreview)
        const response = await fetch( "http://localhost:4000/chat/image", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify(
                { image: imagePreview }
            )
        } )

        const json = await response.json();
        setSavedImage( json.secure_url )

    }

    

    return (
        <div>
            <img id="img1" src={imagePreview} alt='img1' style={{ height: "300px", width: "300px" }} />
            <input type="file" accept="image/*" onChange={handleChange} />
            <button onClick={handleSubmit} > Submit </button>
            <img src={savedImage} id="img2" style={{ height: "300px", width: "300px" }} />
        </div>
    )
}




export const Media = () => {

    return (
        <div className="media" >
            <Image />
        </div>
    )
}
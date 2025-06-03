

import { useState, useEffect } from "react";
import { registerURL, loginURL, logoutURL } from "../constants/urls";
import { useLogin, useSignup } from "../hooks/auth.js";


const Login = () => {
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const {login} = useLogin();


    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await login( email, password );
            setEmail("");
            setPassword("");
        }
        catch (err) {
            setError( err.message );
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="Login" >
            { error && <p>  { error } </p> }
            <form className="login" onSubmit={handleSubmit}>
                <h3>Log In</h3>
                
                <label>Email address:</label> 
                <input 
                type="email" 
                onChange={(e) => setEmail(e.target.value)} 
                value={email} 
                /> 

                <label>Password:</label>
                <input 
                type="password" 
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
                />

                { !loading && <button> Submit </button> }
                
            </form>
        </div>
    )
}


const Register = () => {
    const { signup } = useSignup();
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState( null );
    const [ loading, setLoading ] = useState( false );


    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await signup(email, password);
            setEmail("");
            setPassword("");
        } 
        catch ( err ) {
            setError(err.message);
        } 
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="Register" >
            { error && <p>  { error } </p> }
            <form className="register" onSubmit={handleSubmit}>
                <h3>Register</h3>
                
                <label>Email address:</label>
                <input 
                type="email" 
                onChange={(e) => setEmail(e.target.value)} 
                value={email} 
                />

                <label>Password:</label>
                <input 
                type="password" 
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
                />

                { !loading && <button> Submit </button> }
                
            </form>
        </div>
    )
}


export const Auth = () => {
    const [ login, toggle ] = useState(true)
    const [ option, changeOption ] = useState("register")

    const onChange = () =>
    {
        if( option==="register" ) 
        {
            changeOption("login");
            toggle(false)
        }
        else
        {
            changeOption("register");
            toggle(true)
        }
    }

    return (
        <div className="Auth">

            { login && <Login/> }
            { !login && <Register /> }

            <button onClick={onChange} > { option } </button>

        </div>
    )

}
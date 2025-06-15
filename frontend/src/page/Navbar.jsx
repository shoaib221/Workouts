import { Link } from "react-router-dom";
import { useLogout } from "../hooks/auth";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useContext(AuthContext)

    return (
        <header>
        <div className="container">
            
            
            { user && <div>
                <Link to="/" > Home </Link>
                <Link to='/product' > Product </Link>
                <Link to='/cart' > Cart </Link>
                { user.email } 
                <button onClick={logout} > Logout </button>  
             </div> }

        </div>
        </header>
    )
}

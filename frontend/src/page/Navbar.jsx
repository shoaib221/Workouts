import { Link } from "react-router-dom";
import { useLogout } from "../hooks/auth";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Snavbar = {
    color : "rgb(56, 177, 183)",
    margin: "2px",
    underlined: "false"
}

export const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useContext(AuthContext)

    return (
        
        <div className="navbar"  >
            
            { user && 
                <div >
                    { user.email } 
                    <Link style={Snavbar} to="/" > Home </Link>
                    <Link style={Snavbar} to='/product' > Product </Link>
                    <Link style={Snavbar} to="/orders"> Orders </Link>
                    <button onClick={logout} > Logout </button>  
                </div> 
            }

        </div>
        
    )
}

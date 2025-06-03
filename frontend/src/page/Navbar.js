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
            <Link to="/" >
                <h1> Workout Buddy </h1>
            </Link>
            { user && <button onClick={logout} > Logout </button> }
        </div>
        </header>
    )
}

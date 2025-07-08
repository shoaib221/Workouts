import { useContext } from "react"
import { AuthContext } from "../context/authContext"



export const Profile = () => {
    const { user } = useContext(AuthContext)
    

    return (
        <div className="profile">
            
        </div>
    )
}


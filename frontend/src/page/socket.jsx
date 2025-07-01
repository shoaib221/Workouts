
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import '../styles/socket.css';
import axios from "axios";

const api = axios.create( {  baseURL: "http://localhost:4000" } );



const SingleMessage = () => {


    return (
        <div className="single-message" >

        </div>
    )
}



export const Socket = () => {
    const [ message1, setMessage1 ] = useState("");
    const { socket, user } = useContext(AuthContext);
    const [ users, setUsers ] = useState(null);
    const [ currentUser, setCurrentUser ] = useState(null);
    const [messages, setMessages] = useState(null);

    const handleSubmit = () => {
        socket.emit( 'chat-shoaib', message1 );
        setMessage1("");
    }

    async function fetchUsers () 
    {
        try {
            const response = await api.get( "/auth/users", 
                { headers: { 'Authorization': `Bearer ${user.token}` } }
            );
            
            setUsers(response.data.users);
            console.log(response.data.users);
            

        } catch (err1) {
            console.log( err1.response.data.error );
        }
        
    }

    async function fetchMessage (receiver) 
    {
        setCurrentUser(receiver)
        try {
            const response = await api.post( "/chat/fetchmessage", 
            {
                receiver
            },
            {
                headers: { 'Authorization': `Bearer ${user.token}` }
            }
        )
        } catch (err) {

        }
    }


    useEffect( () => {
        if(user) fetchUsers();
        
    }, [user] )

    return (
        <div className="chatty" >
            
            <div id="leftbar" >
                {users && users.map( x =>
                    <button 
                        id={x.username} 
                        onClick={ () => fetchMessage(x._id) } 
                        className={ x._id === currentUser ? 'active': 'inactive' }
                    >
                        { x.username }
                    </button>
                ) }
                
            </div>

            <div id="rightbar" >
                <div id="header" >

                </div>
                <div id="message-body" >
                    { messages && messages.map( x => <SingleMessage id="1" message={x} /> ) }
                </div>

                <div id="input" >
                    <input 
                        type="text" 
                        onChange={(e) => setMessage1(e.target.value)} 
                        value={message1}
                        placeholder="Send Message" 
                    />
                    <button onClick={handleSubmit} > Send Message </button>
                </div>
            </div>
        </div>
    )
}
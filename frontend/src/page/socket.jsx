
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import '../styles/socket.css';
import axios from "axios";

const api = axios.create( {  baseURL: "http://localhost:4000" } );



const SingleMessage = (props) => {
    const { user } = useContext(AuthContext)

    return (
        
            <div className={ props.message.receiver === user.email? 'received': 'sent' }>
                { props.message.text }
            </div>
        
    )
}



export const Socket = () => {
    const [ messageInput, setMessageInput ] = useState("");
    const { socket, user } = useContext(AuthContext);
    const [ users, setUsers ] = useState(null);
    const [ currentUser, setCurrentUser ] = useState(null); //username
    const [messages, setMessages] = useState([]);

    const sendMessage = async () => {
        try {
            const response = await api.post ( "/chat/sendmessage", 
                {
                    text: messageInput,
                    receiver: currentUser
                },
                { headers: { 'Authorization': `Bearer ${user.token}` } }
            )
            setMessages( [ ...messages, response.data ] );
            setMessageInput("")
        } catch (err) {
            console.log( err.response.data.error );
        }
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

    async function fetchMessage () 
    {
        if(!currentUser) return;
        try {
            const response = await api.post( "/chat/fetchmessage", 
            {
                receiver: currentUser
            },
            {
                headers: { 'Authorization': `Bearer ${user.token}` }
            })
            setMessages(response.data)
            console.log(response.data);

        } catch (err) {
            console.log( err.response.data.error );
        }
    }

    const onSocket = () => {
        socket.on( "newMessage", (data) => {
            console.log("new message in socket")
            console.log(messages);
            const load = [ ...messages, data ];
            console.log( load );
            setMessages( load );
            console.log(messages);
        } )
    }

    const offSocket = () => {
        socket.off("newMessage");
    }

    
        
    socket.on( "newMessage", (data) => {
        console.log("new message in socket")
        console.log(messages);
        const load = [ ...messages, data ];
        console.log( load );
        setMessages( load );
        console.log(messages);
    } )

        

    useEffect( ()  => {
        if( currentUser ) fetchMessage()
    }, [currentUser] )

    useEffect( () => {
        if(user) fetchUsers();
        
    }, [user] )

    return (
        <div className="chatty" >
            
            <div id="leftbar" >
                {users && users.map( x =>
                    <button 
                        id={x.username} 
                        onClick={ () => setCurrentUser(x.username) } 
                        className={ x.username === currentUser ? 'active': 'inactive' }
                    >
                        { x.username }
                    </button>
                ) }
                
            </div>

            <div id="rightbar" >
                <div id="header" >
                    { currentUser && <h3> { currentUser } </h3> }
                </div>

                <div id="message-body" >
                    { messages && messages.map( x => <SingleMessage id={x._id} message={x} /> ) }
                </div>

                { currentUser && <div id="input" >
                    <input 
                        type="text" 
                        onChange={(e) => setMessageInput(e.target.value)} 
                        value={messageInput}
                        placeholder="Send Message" 
                    />
                    <button onClick={sendMessage} > Send Message </button>
                </div> }
            </div>
        </div>
    )
}
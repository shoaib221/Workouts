

import React from 'react';
import ReactDOM from 'react-dom/client';
import {GoogleOAuthProvider} from '@react-oauth/google';
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { useContext } from 'react';


import './styles/index.css';
import reportWebVitals from './reportWebVitals.js';
import { AuthContextProvider } from './context/authContext.js';
import { Navbar, OptionBar } from './page/Navbar';
import { Auth, Profile } from './auth.jsx';
import { AuthContext } from './context/authContext';
import { GoogleAuth } from './GoogleAuth.jsx';
import { PageNotFound } from './page/PageNotFound';
import { Socket } from "./page/socket";
import { Test } from "./page/test";
import { Chat } from "./page/chat";
import { Media } from './page/media.jsx';


const Home = () => {
	return (
		<div id="home" >
			<Link to='/chat' style={{ color: "white" }} >Chat</Link>
            <Link to='/chat' style={{ color: "white" }} >Chat Groups</Link>
            <Link to="/media" style={{ color: "white" }} > Media </Link>
		</div>
	)
}

function App() {
	const { user } = useContext( AuthContext );
	//console.log(user);

  	return (
		<div className="App">
			
			<Routes>
				<Route exact path="/" element={ user? <Home/> :  <Navigate to='/auth' /> } ></Route>
				<Route exact path='/auth' element={ user ? <Navigate to="/" /> : <Auth /> } >  </Route>
				<Route exact path='/google-auth' element={ user ? <Navigate to="/" /> : <GoogleAuth /> } >  </Route>
				<Route exact path='/profile' element={ user? <Profile /> : <Navigate to="/auth" /> } >  </Route>
				<Route exact path='/test' element={<Test />} >  </Route>
				<Route exact path='/chat' element={ user ? <Chat /> : <Navigate to="/auth" /> } ></Route>
				<Route exact path='/media' element={ user ? <Media /> : <Navigate to="/auth" /> } ></Route>
				<Route path='*' element={ <PageNotFound/> } ></Route>
			</Routes>

			

		</div>
  	);

}


const root = ReactDOM.createRoot(document.getElementById('root'));


root.render (
  	
    	<AuthContextProvider>
			
			<GoogleOAuthProvider clientId='538256178695-tshpqhedtonoe5psm1uf0c94heg065uh.apps.googleusercontent.com' >
        	
        		<BrowserRouter>
					<App />
				</BrowserRouter>
        	
			</GoogleOAuthProvider>
			
    	</AuthContextProvider>
  	
);

reportWebVitals();



import React from 'react';
import ReactDOM from 'react-dom/client';
import {GoogleOAuthProvider} from '@react-oauth/google';



import './styles/index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals.js';
import { AuthContextProvider } from './context/authContext.js';




const root = ReactDOM.createRoot(document.getElementById('root'));


root.render (
  	
    	<AuthContextProvider>
			
			<GoogleOAuthProvider clientId='538256178695-tshpqhedtonoe5psm1uf0c94heg065uh.apps.googleusercontent.com' >
        	
        		<App />
        	
			</GoogleOAuthProvider>
			
    	</AuthContextProvider>
  	
);

reportWebVitals();

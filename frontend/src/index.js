

import React from 'react';
import ReactDOM from 'react-dom/client';
import {GoogleOAuthProvider} from '@react-oauth/google';



import './styles/index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals.js';
import { AuthContextProvider } from './context/authContext.js';
import { WorkoutContextProvider } from './context/WorkoutContext.js';

import { ProductProvider } from './context/productContext.js';


const root = ReactDOM.createRoot(document.getElementById('root'));


root.render (
  	
    	<AuthContextProvider>
			<ProductProvider>
			<GoogleOAuthProvider clientId='538256178695-tshpqhedtonoe5psm1uf0c94heg065uh.apps.googleusercontent.com' >
        	<WorkoutContextProvider>
        		<App />
        	</WorkoutContextProvider>
			</GoogleOAuthProvider>
			</ProductProvider>
    	</AuthContextProvider>
  	
);

reportWebVitals();

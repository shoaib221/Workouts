

import React from 'react';
import ReactDOM from 'react-dom/client';
import './constants/index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './context/authContext.js';
import { WorkoutContextProvider } from './context/WorkoutContext.js';


const root = ReactDOM.createRoot(document.getElementById('root'));


root.render (
  	<React.StrictMode>
    	<AuthContextProvider>
        	<WorkoutContextProvider>
        		<App />
        	</WorkoutContextProvider>
    	</AuthContextProvider>
  	</React.StrictMode>
);

reportWebVitals();

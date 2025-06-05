

import './constants/App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Workouts } from './page/workouts';
import { Home } from './page/home';
import { Navbar } from './page/Navbar';
import { Auth } from './page/auth';
import { AuthContext } from './context/authContext';
import { useContext } from 'react';


function App() {
	const { user } = useContext( AuthContext );
	console.log(user);

  	return (
	
    <div className="App">
        <header className="App-header">
          	<BrowserRouter>
				<Navbar />
				<Routes>
					<Route exact path='/' element={user? <Home /> : <Navigate to="/auth" /> } >  </Route>
					<Route exact path='/workout' element={user ? <Workouts/> : <Navigate to="/auth" />  } >  </Route> 
					
					<Route exact path='/auth' element={ user ? <Navigate to="/" /> : <Auth /> } >  </Route>
				</Routes>
          	</BrowserRouter>
        </header>
    </div>
  	);

}

export default App;
